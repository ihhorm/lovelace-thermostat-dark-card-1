<!-- GitHub Copilot / AI agent instructions for contributors -->
# Copilot Instructions — lovelace-thermostat-dark-card

Purpose: Give AI/agents the essential, actionable knowledge to be productive in this repo.

**Big picture:**
- **What it is:** A Home Assistant Lovelace custom card (Thermostat — dark theme) implemented as a small TypeScript project using `lit-element` and the `custom-card-helpers` community package.
- **Runtime surface:** The card runs inside Home Assistant Lovelace UI. The main integration point is the `hass` object passed to the component and calls to `this._hass.callService(...)`.
- **Where logic lives:** UI rendering and interaction live in `src/` (see `thermostat-dark-card.ts`, `user-interface.ts`, `editor.ts`). Constants and types live in `src/const.ts` and `src/types.ts`. Localization is in `src/localize/`.

**Build / dev workflow (how to run and test locally):**
- `npm install` to install dependencies.
- `npm start` — runs Rollup in watch mode using `rollup.config.dev.js`. Useful for iterative UI changes; opens a dev server.
- `npm run build` — runs `lint` then Rollup (`rollup -c`) to produce the distributable bundle configured by `rollup.config.js`.
- `npm run lint` — runs `eslint src/*.ts`. Keep code consistent with existing lint rules and the older TypeScript setup.

**Key project patterns & conventions (project-specific):
- Use `lit-element` v2 decorators and class-style components. Follow existing property and lifecycle patterns (see `setConfig`, `shouldUpdate`, `hass` setter in `src/thermostat-dark-card.ts`).
- Card registration: the card is registered by pushing into `window.customCards` in `src/thermostat-dark-card.ts` (this is how the card appears in the UI card picker).
- Configuration defaults: `setConfig` mutates a cloned `cardConfig` and application-wide defaults are set there (e.g., `diameter = 400`, `pending = 3`, `step = 0.5`). When changing configuration behavior, update `setConfig` accordingly.
- HVAC mapping and sensors: the card supports either attribute-based or sensor-based HVAC state mapping (see `set hass(hass: HomeAssistant)` in `thermostat-dark-card.ts`). Respect the existing priority: config attribute → hvac sensor → entity attribute/state.

**Localization / strings:**
- Localized strings live under `src/localize/` with a `localize.ts` helper and per-language JSON files in `src/localize/languages/`.
- To add a new localized string: add the key to `src/localize/languages/en.json` (and other languages as appropriate) and reference it via the `localize('...')` helper used across the codebase.

**Important integration points:**
- Home Assistant state access: `hass.states[entity_id]` and attributes — do not assume attributes always exist; code checks and fallbacks are used across the repo.
- Service calls: use `this._hass.callService('climate', 'set_temperature', {...})` (see `_controlSetPoints`). Preserve the existing payload structure when changing set-point logic.

**Files to consult when making changes:**
- `src/thermostat-dark-card.ts` — main component and config handling.
- `src/user-interface.ts` — rendering helpers and SVG rendering / state updates.
- `src/editor.ts` — Lovelace editor element for the card.
- `src/localize/localize.ts` and `src/localize/languages/*.json` — localization.
- `rollup.config.dev.js`, `rollup.config.js` — build/dev bundling behavior.
- `package.json` — scripts and key dependency versions (note: `lit-element@2.x`, `typescript@3.9` and Rollup-based toolchain).

**Style & tooling hints (do not change without care):**
- The repo uses ESLint + Prettier and older TypeScript/Babel configs (see `devDependencies`). Large changes to TS config may require updating Rollup/Babel plugins.
- Keep decorator/babel settings unchanged unless you update rollup/babel plugin versions together.

**Releases & CI:**
- There are GitHub Actions in `.github/workflows/` for build and release; follow those for packaging and publishing.

If anything in these instructions is unclear or you'd like more detail (examples for editing localization, adding a new config option, or running the dev server inside Home Assistant), tell me which area to expand. 
