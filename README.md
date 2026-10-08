# @nomanbutt/cmg-core

Core package for the Cosmetic Media Group Next.js application. Owned by the npm account `nomanbutt`.

The package contains page and layout implementations, shared React components, Sanity schemas and Studio configuration, content queries and loaders, fallback data, forms API handlers, metadata and global styles. The Next.js application retains thin route exports, configuration, environment variables and public assets.

## Build and use locally

Keep this source folder at `../cmg-core` next to the `cosmetic-media-group` app.

```bash
npm install
npm run build
npm pack
cd ../cosmetic-media-group
npm install ../cmg-core/nomanbutt-cmg-core-1.0.0.tgz
npm run dev
```

Use the tarball filename reported by `npm pack` after changing the name or version. Rebuild, repack and reinstall after source changes. The build emits ESM JavaScript and declarations in `dist` for each module. Package exports retain module paths, for example `@nomanbutt/cmg-core/data/fallback` and `@nomanbutt/cmg-core/studio/config`.

Configure the consuming Next.js app with `transpilePackages: ['@nomanbutt/cmg-core']`. Its root layout imports `@nomanbutt/cmg-core/styles.css`. Keep its `public` directory: images, fonts and other assets referenced by absolute URL are served by the app.

Environment variables remain in the app's `.env.local` and deployment environment. They include `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`, optional `SANITY_API_READ_TOKEN` and `SANITY_API_WRITE_TOKEN`, analytics configuration and form webhook settings. Never bundle secrets into this package. Studio authentication and Sanity permissions still belong to the configured Sanity project.

## Publish to npm

The package is configured for public npm publication. Publishing requires npm login and the account's 2FA verification.

```bash
npm login
npm run build
npm pack --dry-run
npm publish --access public
```

Follow npm's authentication prompts. CI publishing credentials belong in the CI secret store. Once published, run `npm install @nomanbutt/cmg-core@1.0.0` in the app, then commit its updated package.json and lockfile.

To make the scoped package private later, upgrade to a paid npm plan and change Package Access in its npm settings. Update `publishConfig.access` to `restricted` for future releases and make the GitHub repository private as well if source access should be restricted. Existing downloaded copies remain usable. See https://docs.npmjs.com/changing-package-visibility/.

## Sanity types

`sanity.types.ts` is the package's checked-in schema/query type snapshot. The consuming app no longer generates package types during startup or build. After changing package schemas or queries, run `npm run sanity:typegen` in this package to regenerate the snapshot before rebuilding. The app's `npm run sanity:schema` command can extract the connected Studio schema for inspection.

## Public module boundaries

Import client components individually from `@nomanbutt/cmg-core/components/<name>` and server loaders from `@nomanbutt/cmg-core/lib/content`. Page entries live under `@nomanbutt/cmg-core/pages/*`; the form handler is `@nomanbutt/cmg-core/server/forms`. Avoid importing server loaders into client components. The build preserves each module's `use client` directive.

## Git hosting

Git hosting is optional for npm publishing. Keep this source in a separate private Git repository for version history and recovery. Commit source, configuration, README and the generated type snapshot; `.gitignore` excludes dependencies, build output, tarballs and environment files.
