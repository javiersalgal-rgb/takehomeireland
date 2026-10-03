# TakeHomeIreland

Irish personal finance tools: take-home pay, pay rise and bonus tax, tax reliefs, deemed disposal dates, net worth, spending, house costs and more. All tax rules are for 2026 and live in one place so they are easy to update. Everything a visitor types stays in their own browser.

## Open it in Visual Studio Code
1. Install **Node.js 20 LTS** from nodejs.org (check with `node -v` in a terminal). Install **Visual Studio Code** if you have not.
2. Unzip `takehomeireland-project.zip` somewhere you will keep it, for example `Documents/takehomeireland`.
3. In VS Code choose **File > Open Folder** and pick the `takehomeireland` folder. Accept the prompt to install the recommended extensions.
4. Open the terminal in VS Code (**Terminal > New Terminal**) and run:
   ```
   npm install
   npm run dev
   ```
5. Open http://localhost:5173 in your browser. Changes you save in VS Code show up straight away.

Press **Ctrl+Shift+B** (Cmd+Shift+B on Mac) to start the site from a task, and **Terminal > Run Task** for tests and builds.

## Commands
| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the site on your computer while you work |
| `npm test` | Runs all the engine and page tests |
| `npm run typecheck` | Checks the TypeScript |
| `npm run check` | Typecheck, tests and a full build in one go. Run it before you publish |
| `npm run build` | Makes the website in `dist/` |
| `npm run preview` | Serves `dist/` locally so you can try the real build |
| `npm run build:single` | Makes one self-contained `dist-single/index.html`, handy for sharing as a file |

## Put it on the internet
Run `npm run check`, then pick one. All three work with the files already in the project.
- **Netlify, quickest:** drag the `dist` folder onto app.netlify.com/drop. Or connect the repository, and `netlify.toml` sets the rest.
- **Vercel:** import the repository at vercel.com. It detects Vite on its own.
- **GitHub Pages:** push to a repository with a `main` branch, then in Settings > Pages set Source to GitHub Actions. `.github/workflows/deploy.yml` tests and publishes on every push.

Each tool has its own link, such as `https://your-site/#/rise`, so visitors can bookmark or share one. The site makes no outside requests: the fonts are bundled, and there is no analytics or ad code.

## Save the project with Git
```
git init
git add .
git commit -m "TakeHomeIreland"
```
Then create an empty repository on GitHub and follow the two lines it shows to push. `node_modules`, `dist` and `dist-single` are already ignored.

## Before real visitors arrive
- Check the figures against revenue.ie. Tax rules for a new year are in `src/engine/tax/rules/`, as described below.
- Add a page address and a social image to `index.html` once you have a domain.
- If you add analytics or ads, update the footer in `src/App.tsx`, which currently says nothing leaves the browser.
- `xlsx` (used only when someone uploads an Excel file to Portfolio) has a published security advisory with no fix on npm, so `npm audit` reports it. It is loaded only for `.xls` and `.xlsx` files, and `.csv` files do not use it. To remove the warning, delete that branch in `src/pages/Portfolio.tsx` and run `npm uninstall xlsx`.

## Where things are
- `src/engine/tax/` income tax, USC, PRSI, CGT, exit tax, DIRT. Rates are in `rules/2026.ts`.
- `src/engine/reliefs/` credits and reliefs (`rules.ts` amounts, `catalogue.ts` text and legislation).
- `src/engine/marginal/` tax on the next euro at any income, the rate bands, and the pay rise / bonus X-ray (with pension).
- `src/engine/deemed/` 8-year deemed disposal dates, bills, cash to set aside, and fund vs shares after the date.
- `src/engine/networth/` also covers part-time and career breaks, Child Benefit, the tax saved by marriage, and what each life event does on its own (`eventImpacts`).
- `src/engine/nextEuro/` ranks where extra money does the most good (cash cushion, employer match, debt, emergency fund, pension relief, deposit, investing) and spreads an amount down that order.
- `src/engine/{spending,piggy,house,investing,portfolio,networth}/` one folder per tool, each with tests.
- `src/ui/plans.ts` shared pay, spending and pocket calculations, so pages always agree.
- `src/ui/store.ts` small shared store (browser storage with an in-memory fallback).
- `src/pages/` one screen per tool.

## Updating for a new tax year
1. Copy `rules/2026.ts` to a new year and change the numbers.
2. Update `reliefs/rules.ts` and the amounts quoted in `reliefs/catalogue.ts`.
3. Update `houseRules2026` if the Central Bank or stamp duty rules change.
4. Run `npm test`.

## Known simplifications
- Next best euro: pension access is taken as age 60 and growth inside a pension is untaxed. Employer match is €1 for €1. Minimum debt payments are assumed paid. A certain saving counts one point higher than an expected return (`CERTAINTY`). Debts at 10% or more are cleared before the rest of the emergency fund (`EXPENSIVE`). Both are judgement calls, not rules.
- Life events: Child Benefit is €140 a month for up to 18 years and assumed to rise with prices. A partner is the same age as you and retires with you. Pay cuts do not change spending. Only one home is modelled.
- Deemed disposal planner: steady growth, tax paid from your pocket, no credit modelled when a fund falls after paying, and no fund-specific valuation dates.
- Pension withdrawals in the net worth tool use a flat tax rate, not the real rules.
- Investment growth tax is an annual drag at the exit tax rate.
- Reliefs list only the main conditions. Check revenue.ie before relying on a figure.
