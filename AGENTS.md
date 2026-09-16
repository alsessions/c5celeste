# AGENTS.md

## Project

- This is the Craft CMS 5 upgrade workspace for an existing Craft CMS 4 site. It runs PHP 8.3 in DDEV, with Twig templates, Tailwind CSS 4, and Alpine.js 3.
- The goal is to complete the Craft 5 upgrade without changing site behavior or design unless a compatibility fix requires it.
- The web root is `web/`. Templates live in `templates/`, source CSS in `src/css/`, and Craft configuration in `config/`.
- Keep solutions simple and consistent with the existing codebase. Prefer native Craft, Twig, Alpine, and Tailwind features over new abstractions or dependencies.

## Working Style

- Be friendly, relaxed, and human. Keep responses clear and reasonably detailed without becoming overly formal or terse.
- Lead with the result, then share enough context to make the reasoning, tradeoffs, and assumptions easy to follow.
- Treat the user like a capable collaborator. It is fine to be conversational, offer a useful observation, or explain what was checked along the way.
- Preserve unrelated work and follow existing naming, formatting, and template patterns.
- Keep comments brief and useful; do not explain obvious code.
- Never commit secrets or environment-specific values. Update `.env.example` with placeholders when a new variable is required.

## Development

- Use DDEV for PHP, Craft, Composer, and database commands.
- Start the site with `ddev start`.
- Run Craft commands with `ddev craft <command>` and Composer commands with `ddev composer <command>`.
- Use Composer to resolve the Craft 5 core and plugin upgrade together. Do not edit `composer.lock` by hand or bypass dependency conflicts without understanding them.
- Install front-end dependencies with `npm install` when needed.
- Run `npm run watch` during front-end development and `npm run build` for a minified production stylesheet.
- Treat `web/css/styles.css` as generated output; make CSS changes in `src/css/tailwind.css` or in Twig with utility classes.

## Craft 5 Upgrade

- Treat the current Craft 4 site and its content as the behavioral baseline. Keep upgrade changes focused and avoid unrelated refactors.
- Confirm every installed plugin has a Craft 5-compatible release before upgrading it. Remove or replace a plugin only when the upgrade requires it and its usage has been audited.
- Prefer current Craft 5 APIs and documented migration paths over compatibility shims. Check custom modules, config files, console commands, event handlers, element queries, field access, and Twig templates for deprecated or removed APIs.
- Back up the database before running Craft upgrades or migrations. Never run the production deployment flow unless explicitly asked.
- Run `ddev composer update` only when intentionally resolving the upgrade dependency set, then review both `composer.json` and `composer.lock`.
- Run `ddev craft up --interactive=0` to apply Craft and plugin migrations after dependencies resolve.
- Apply and review project config after the upgrade. Commit all required `config/project/` changes and migrations so deployment does not depend on manual control-panel work.
- Do not declare the upgrade complete until the control panel, front end, queue, mail/contact flows, image transforms, and critical authoring workflows have been checked.

## Craft and Twig

- Use Craft element queries and Twig filters directly where they keep the template clear.
- Escape untrusted output by default. Use `|raw` only for trusted or intentionally rendered HTML.
- Avoid database schema or content-model changes unless the task requires them.
- Make control-panel changes locally, commit the resulting `config/project/` changes, and apply project config in deployed environments.
- Reuse Craft 5-compatible installed plugins where appropriate, especially SEOmatic, ImageOptimize, Typogrify, Retcon, Quick Filters, CKEditor, Redactor, and the Contact Form plugin. Do not add a package when an installed plugin or Craft itself already solves the problem.

## Tailwind and Alpine

- The project has been upgraded to Tailwind CSS 4. Follow its current syntax and behavior while preserving the compatibility styles and legacy configuration already imported by `src/css/tailwind.css`.
- Prefer inline Tailwind utility classes in Twig over custom CSS. Add custom CSS only for genuinely reusable or unsupported behavior.
- Match existing responsive and visual conventions before introducing new design tokens.
- Use Alpine for small, local interactions. Keep state close to its markup and favor `x-data`, `x-show`, `x-bind`, and `x-on` over separate JavaScript files.
- Preserve keyboard access, visible focus states, semantic HTML, and appropriate ARIA attributes when adding interactions.
- Alpine is currently loaded from the shared head partial; do not load it again in individual templates.

## Verification

- Run `npm run build` after changing Tailwind classes or CSS.
- Run `ddev composer validate` and `ddev composer audit` after changing Composer dependencies.
- Run `ddev craft project-config/apply` when relevant, then verify there are no pending project-config changes.
- Check `ddev craft` and the control panel for Craft 5 deprecation, migration, or plugin errors.
- Inspect Craft logs in `storage/logs/` when diagnosing server-side failures.
- Test the smallest relevant surface first, then check nearby responsive, empty, error, logged-in, and logged-out states.

## Deployment

- Keep deployments compatible with `.deploy.sh`; do not replace or run the production deployment flow unless explicitly asked.
- The existing release sequence installs production Composer dependencies, runs Craft upgrades and migrations, clears caches, and drains the queue. Any Craft 5 change must remain safe under that sequence.
- Build production CSS with `npm run build` before release when front-end files change, and ensure the generated stylesheet is included in the release.
- Commit Craft project-config changes and any required migrations. Do not depend on manual production control-panel changes.
- Before the Craft 5 deployment, confirm plugin licenses and compatibility, required environment variables, database and asset backups, writable storage paths, queue behavior, and a tested rollback plan for the target environment.
