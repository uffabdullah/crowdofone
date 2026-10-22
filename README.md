# CrowdOfOne

Marketing site for CrowdOfOne, a synthetic audience simulator. The demo runs on local sample data, so it works with no API keys.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the URL Vite prints. `/` is the landing page. `/demo` is the simulator.

## Build

```bash
npm run build
npm run preview
```

This is a client-side app. A static host needs to serve `index.html` for `/demo` as well as `/`.

## Placeholder stats

Crowd size, the demo countdown, and the GPU versus sequential comparison live in `src/content/stats.ts`. Those numbers are placeholders, not measured benchmarks.

## Swap the demo for a real simulation

`simulate()` in `src/lib/simulate.ts` returns `Promise<SimulateResult>`. It currently calls the mock. Request and response types are in `src/lib/types.ts`.

To use your API, replace the mock call with `POST /simulate`. The comment above `simulate()` shows the request body and the expected `SimulateResult` response.

To use Supabase instead, copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. `src/lib/supabase.ts` creates a client only when both are set. The same comment shows a `functions.invoke('simulate')` call. Do not invent keys. With the variables empty, the site never contacts Supabase.
