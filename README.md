# Bounce Control Panel — Returns Visibility Dashboard (demo)

A live returns-management dashboard for fulfilment-centre operations: QC pending aging, BAD-QC claims with no ticket, TAT analysis, SPF (Seller Protection Fund) window breaches and a leadership macro-analytics page.

**This is a demo.** All data is synthetic (about 17.5K generated returns across 7 FCs, 10 sample brands and 4–6 marketplaces) and is produced in the browser by `mock-bounce.js`. No backend, login or real company data is involved. Open `index.html` to run it.

## What it shows
- **QC Pending, Daywise Aging:** FC → client → marketplace drill-down with D0 / D+3 / D+7 / D+14 / >D+14 buckets
- **BAD QC, No Ticket:** BAD-QC returns with no claim raised, split by whether QC fell within or after the marketplace SPF window
- **Returns & QC Status Distribution** and **TAT Analysis** (shipment → QC completed, weighted average)
- **Negative Visibility:** SPF window breached (no claim raised) and at-risk of breach (QC still pending), plus QC = N view
- **Macro Analytics:** Weighted Avg TAT, BAD QC rate, SPF claim approval %, MoM growth, reimbursement trend, FC capacity utilisation

## In production
Supabase (PostgREST view) as the direct source, with an Apps Script + GitHub-CDN hot/cold path as fallback, role-based access (admin / FC user / client viewer), parallel paginated loading in a Web Worker and hourly auto-refresh. The demo replaces all of that with a local synthetic data generator.

## Run / host
Open `index.html`, or enable GitHub Pages (Settings → Pages → main / root). Needs internet for fonts and the Excel-export library.

Screenshots are in `docs/`.
