/* Synthetic backend for the Bounce Control Panel demo.
   Everything here is generated in the browser from a seeded random generator.
   No real company, client, customer or shipment data. */
(function () {
  // ── demo session (replaces login) ──
  try {
    sessionStorage.setItem('bounce_auth', JSON.stringify({ email: 'admin@example.com', full_name: 'Demo Admin', role: 'PTC_USER' }));
    sessionStorage.setItem('bounce_login_ts', String(Date.now()));
  } catch (e) {}

  // ── seeded PRNG ──
  let seed = 20260107;
  function rnd() { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
  function pick(arr, w) { if (!w) return arr[Math.floor(rnd() * arr.length)]; let s = w.reduce((a, b) => a + b, 0), x = rnd() * s; for (let i = 0; i < arr.length; i++) { x -= w[i]; if (x <= 0) return arr[i]; } return arr[arr.length - 1]; }
  const pad = n => String(n).padStart(2, '0');
  const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const addDays = (d, n) => { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; };

  const FCS = [
    { code: 'MUM', name: 'Mumbai FC', w: 22 }, { code: 'GGN', name: 'Gurugram FC', w: 20 }, { code: 'HYD', name: 'Hyderabad FC', w: 16 },
    { code: 'BLR', name: 'Bangalore FC', w: 15 }, { code: 'KOL', name: 'Kolkata FC', w: 11 }, { code: 'CHN', name: 'Chennai FC', w: 10 }, { code: 'KOC', name: 'Kochi FC', w: 6 }
  ];
  const FC_TAT = { MUM: 0.9, GGN: 1.0, HYD: 1.05, BLR: 0.95, KOL: 1.35, CHN: 1.1, KOC: 1.25 };
  const CLIENTS = [
    { n: 'Brand A', w: 18, mk: ['Flipkart', 'Amazon', 'Meesho'], mw: [5, 3, 2], bad: 0.17 },
    { n: 'Brand B', w: 15, mk: ['Flipkart', 'Amazon'], mw: [6, 4], bad: 0.13 },
    { n: 'Brand C', w: 13, mk: ['Amazon', 'Flipkart', 'CRED'], mw: [5, 4, 1], bad: 0.15 },
    { n: 'Brand D', w: 11, mk: ['Flipkart', 'Meesho'], mw: [6, 4], bad: 0.22 },
    { n: 'Brand E', w: 10, mk: ['Flipkart', 'Amazon', 'Shopify'], mw: [5, 3, 2], bad: 0.11 },
    { n: 'Brand F', w: 8, mk: ['Amazon', 'Flipkart'], mw: [6, 4], bad: 0.14 },
    { n: 'Brand G', w: 7, mk: ['Flipkart', 'CRED', 'Meesho'], mw: [5, 3, 2], bad: 0.19 },
    { n: 'Brand H', w: 6, mk: ['Meesho', 'Flipkart'], mw: [6, 4], bad: 0.25 },
    { n: 'Brand I', w: 6, mk: ['Flipkart', 'FirstCry'], mw: [6, 4], bad: 0.10 },
    { n: 'Brand J', w: 6, mk: ['Amazon', 'Shopify', 'Flipkart'], mw: [5, 3, 2], bad: 0.12 }
  ];
  const RTYPES = ['Customer Return', 'Courier Return', 'RTO'], RTW = [46, 34, 20];
  const LPS = ['Ekart', 'Delhivery', 'Xpress Bees', 'Shadowfax', 'Ecom Express'], LPW = [34, 26, 18, 12, 10];
  const DMG = ['Product Damage', 'Box Damage', 'Shortage', 'Wrong Product', 'Used Product', 'Parts Missing'];
  const DW = [34, 30, 20, 7, 6, 3];

  function monthFactor(m) { // 0=Jan … festive peak in Oct
    return [0.55, 0.7, 0.78, 0.82, 0.88, 0.9, 0.95, 1.05, 1.12, 1.45, 1.0, 1.0][m];
  }
  function tatDays(fc) {
    const x = rnd(); let d;
    if (x < 0.20) d = 0; else if (x < 0.50) d = 1; else if (x < 0.70) d = 2; else if (x < 0.82) d = 3;
    else if (x < 0.95) d = 4 + Math.floor(rnd() * 4); else d = 8 + Math.floor(rnd() * 8);
    if (rnd() < (FC_TAT[fc] - 1) * 0.5) d += 1 + Math.floor(rnd() * 2);
    return d;
  }
  const spfDays = mk => /cred/i.test(mk) ? 3 : /meesho/i.test(mk) ? 7 : 14;

  function generate() {
    let END = new Date(); const START = new Date(2026, 0, 7); END = new Date(); END.setHours(0, 0, 0, 0); if (END.getDate() <= 7) END = new Date(END.getFullYear(), END.getMonth(), 0);
    const rows = [], ready = [];
    let ctr = 100000;
    for (let d = new Date(START); d <= END; d = addDays(d, 1)) {
      const dow = d.getDay();
      const base = 70 * monthFactor(d.getMonth()) * (dow === 0 ? 0.55 : dow === 6 ? 0.8 : 1.0);
      const count = Math.max(8, Math.round(base * (0.82 + rnd() * 0.36)));
      for (let i = 0; i < count; i++) {
        const fc = pick(FCS, FCS.map(f => f.w)), cl = pick(CLIENTS, CLIENTS.map(c => c.w));
        const mk = pick(cl.mk, cl.mw);
        const age = Math.round((END - d) / 86400000);
        const tid = 'FMPP' + String(ctr++) + String(Math.floor(rnd() * 900 + 100));
        const recvLag = Math.floor(rnd() * 3);
        const row = {
          tracking_id: tid, fc_code: fc.code, fc_name: fc.name, client_name: cl.n, marketplace_name: mk,
          shipment_report_date: ymd(d), shipment_received_date: ymd(addDays(d, recvLag)),
          qc_status: 'PENDING', qc_completed_at: null, ticket_id: null, claim_status: null, reimbursement_amount: null,
          return_type: pick(RTYPES, RTW), logistics_partner: pick(LPS, LPW),
          order_id: 'OD' + String(Math.floor(rnd() * 9e14 + 1e14)), damage_summary: null
        };
        // QC outcome: pending probability depends on age
        const pendP = age <= 2 ? 0.62 : age <= 7 ? 0.25 : age <= 20 ? 0.07 : age <= 45 ? 0.011 : 0.003;
        if (rnd() < pendP) {
          row.qc_status = 'PENDING';
        } else {
          const t = tatDays(fc.code);
          const qcDate = addDays(d, Math.min(t, Math.max(age, 0)));
          row.qc_completed_at = ymd(qcDate) + 'T' + pad(9 + Math.floor(rnd() * 10)) + ':' + pad(Math.floor(rnd() * 60)) + ':00';
          if (rnd() < cl.bad) {
            row.qc_status = 'BAD';
            const n = rnd() < 0.78 ? 1 : rnd() < 0.8 ? 2 : 3, set = [];
            while (set.length < n) { const x = pick(DMG, DW); if (!set.includes(x)) set.push(x); }
            row.damage_summary = set.join(', ');
            const noTkt = rnd() < 0.05 && !/shopify|firstcry/i.test(mk);
            const late = (qcDate - d) / 86400000 > spfDays(mk);
            if (!noTkt || (late && rnd() < 0.5)) {
              if (!noTkt) {
                row.ticket_id = 'TKT-' + String(Math.floor(rnd() * 9e5 + 1e5));
                const cs = age < 6 ? 0.5 : 0.1, x = rnd();
                row.claim_status = x < cs ? 'Pending' : x < cs + (1 - cs) * 0.9 ? 'Approved' : 'Rejected';
                if (row.claim_status === 'Approved') row.reimbursement_amount = Math.round((300 + rnd() * rnd() * 5200) / 10) * 10;
              }
            }
          } else row.qc_status = 'GOOD';
        }
        rows.push(row);
        if (row.qc_status !== 'PENDING' || rnd() < 0.86) ready.push(tid);
      }
    }
    return { rows, ready };
  }
  const DATA = generate();
  window.__BOUNCE_DEMO = DATA;
  const isCold = r => r.qc_status === 'GOOD' || (r.qc_status === 'BAD' && r.ticket_id && (r.claim_status === 'Approved' || r.claim_status === 'Rejected'));

  // ── fake worker (replaces the Supabase / GitHub-CDN loader worker) ──
  window.__demoWorker = function () {
    const w = { onmessage: null, onerror: null, terminate() { this._dead = true; }, postMessage(m) {
      const emit = d => setTimeout(() => { if (!w._dead && w.onmessage) w.onmessage({ data: d }); }, 0);
      const c = DATA.rows.filter(isCold), h = DATA.rows.filter(r => !isCold(r));
      setTimeout(() => emit({ t: 'p', v: 25 }), 150);
      setTimeout(() => emit({ t: 'p', v: 60 }), 400);
      setTimeout(() => emit({ t: 'p', v: 88 }), 650);
      setTimeout(() => {
        if (m.t === 'sg') emit({ t: 'g', c, h });
        else { emit({ t: 'b', rows: DATA.rows, ld: DATA.rows.length, tot: DATA.rows.length }); emit({ t: 'd' }); }
      }, 800);
    } };
    return w;
  };

  // ── fetch override for the few REST calls made on the main thread ──
  const realFetch = window.fetch.bind(window);
  window.fetch = function (url, opts) {
    const u = String(url);
    if (u.indexOf('demo-supabase.invalid') >= 0) {
      const q = new URL(u); const off = +(q.searchParams.get('offset') || 0), lim = +(q.searchParams.get('limit') || 2000);
      let body = [];
      if (u.indexOf('uc_returns_cache') >= 0 && u.indexOf('select=tracking_number') >= 0) body = DATA.ready.slice(off, off + lim).map(t => ({ tracking_number: t }));
      else if (u.indexOf('vw_shipment_report') >= 0) body = DATA.rows.slice(0, 5).map(r => ({ qc_status: r.qc_status }));
      const hd = new Headers({ 'content-range': '0-0/' + DATA.rows.length });
      return Promise.resolve(new Response(JSON.stringify(body), { status: 200, headers: hd }));
    }
    return realFetch(url, opts);
  };
})();
