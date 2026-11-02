<div align="center">

# Bounce Control Panel

**Returns visibility dashboard for fulfillment-centre operations**

<sub>QC pending aging · BAD-QC claims · TAT analysis · SPF window tracking · leadership analytics</sub>

<br>

[**▶ Live Demo**](https://bishtdeepak16.github.io/bounce-returns-dashboard/)

</div>

<br>

> **The live demo uses synthetic data.** All returns, clients, FCs and amounts in it are generated in the browser. The production system, its code and its data are private to the company; production screenshots below are masked. This repo shows the product, not company data.

---

## What it does
Returns coming back to a fulfillment centre need to be QC-checked, and every damaged (BAD) return needs a claim raised with the marketplace inside its Seller Protection Fund (SPF) window. Miss the window and the money is lost. Bounce gives operations and leadership one place to see:
- Which returns are still waiting for QC, and for how many days?
- Which BAD-QC returns have no claim ticket yet, and are they inside or past the SPF window?
- How fast is each FC and client turning returns around (TAT)?
- How much is being claimed and recovered, and where is it leaking?

## Highlights
- **QC Pending Daywise Aging:** FC → client → marketplace drill-down with D0 / D+3 / D+7 / D+14 / >D+14 buckets.
- **BAD QC, no ticket:** returns with damage but no claim raised, split by whether QC fell within or after the marketplace SPF window (Flipkart / Amazon 14 days, Meesho 7 days, CRED 3 days).
- **Negative Visibility:** SPF window already breached with no claim, and pending returns at risk of breaching, ranked by volume.
- **TAT Analysis:** shipment date → QC completed (or received) by FC and client, with weighted averages.
- **Returns and QC status distribution:** good vs BAD vs pending, damage types (product damage, box damage, shortage and more).
- **Macro Analytics (leadership view):** weighted average TAT, BAD QC rate, SPF claim approval %, month-on-month growth, reimbursement trend, SPF approval by marketplace and FC capacity utilisation.
- **Role-based access:** admin, FC user and client viewer, with data filtered by assigned FC and client.
- **Built for scale:** parallel paginated loading in a Web Worker, hot/cold data split, hourly auto-refresh in working hours, automatic fallback between data sources, and a diagnose panel.
- **Excel export** on every table for root-cause analysis and claim follow-up.

## Stack
Supabase (PostgREST views) · Google Apps Script · GitHub CDN for cached data · HTML / JS · Chart.js

---

<div align="center">

## 📸 Screenshots

<sub>Real dashboard. Client names, IDs and sensitive figures are masked.</sub>

<br>

**Returns over time · daily inbound volume with FC, client and marketplace filters**

<img src="dashboard%20images/DASHBOARD%20IMAGE%201.png" width="92%" alt="Bounce dashboard view 1">

<br><br>

**QC Pending, Daywise Aging · FC → client → marketplace drill-down by aging bucket**

<img src="dashboard%20images/DASHBOARD%20IMAGE%202.png" width="92%" alt="Bounce dashboard view 2">

<br><br>

**Returns and QC status distribution · damage classification and claims funnel**

<img src="dashboard%20images/DASHBOARD%20IMAGE%203.png" width="92%" alt="Bounce dashboard view 3">

<br><br>

**TAT Analysis · shipment to QC-completed turnaround by FC, client and marketplace**

<img src="dashboard%20images/DASHBOARD%20IMAGE%204.png" width="92%" alt="Bounce dashboard view 4">

<br><br>

**Negative Visibility · SPF window breached with no claim, and returns at risk of breach**

<img src="dashboard%20images/DASHBOARD%20IMAGE%205.png" width="92%" alt="Bounce dashboard view 5">

<br><br>

**Macro Analytics · leadership KPIs**

<img src="dashboard%20images/DASHBOARD%20IMAGE%206.png" width="92%" alt="Bounce dashboard view 6">

<br><br>

**Macro Analytics · recovery, SPF approval by marketplace, BAD QC rate and volume trends**

<img src="dashboard%20images/DASHBOARD%20IMAGE%207.png" width="92%" alt="Bounce dashboard view 7">

<br><br>

**Macro Analytics · TAT distribution, weighted TAT trend and FC capacity utilisation**

<img src="dashboard%20images/DASHBOARD%20IMAGE%208.png" width="92%" alt="Bounce dashboard view 8">

<br><br>

</div>

---

## About the live demo
Synthetic data (about 17.5K generated returns across 7 FCs, 10 sample brands and several marketplaces) is produced in the browser by `mock-bounce.js`, which stands in for the private Supabase and Apps Script backend, so the real front-end runs unchanged as a static page. No login or backend is needed.
