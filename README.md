# @cmg/core

Private core package for the Cosmetic Media Group Next.js application. `@cmg` is a placeholder npm scope. Replace it with a scope you control in this package and every consuming app import, dependency and `transpilePackages` entry before publishing.

The package contains page and layout implementations, shared React components, Sanity schemas and Studio configuration, content queries and loaders, fallback data, forms API handlers, metadata and global styles. The Next.js application retains thin route exports, configuration, environment variables and public assets.

## Build and use locally

Keep this source folder at `../cmg-core` next to the `cosmetic-media-group` app.

```bash
npm install
npm run build
npm pack
cd ../cosmetic-media-group
npm install ../cmg-core/cmg-core-1.0.0.tgz
npm run dev
```

Use the tarball filename reported by `npm pack` after changing the name or version. Rebuild, repack and reinstall after source changes. The build emits ESM JavaScript and declarations in `dist` for each module. Package exports retain module paths, for example `@cmg/core/data/fallback` and `@cmg/core/studio/config`.

Configure the consuming Next.js app with `transpilePackages: ['@cmg/core']`. Its root layout imports `@cmg/core/styles/globals.css`. Keep its `public` directory: images, fonts and other assets referenced by absolute URL are served by the app.

Environment variables remain in the app's `.env.local` and deployment environment. They include `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `NEXT_PUBLIC_SITE_URL`, optional `SANITY_API_READ_TOKEN` and `SANITY_API_WRITE_TOKEN`, analytics configuration and form webhook settings. Never bundle secrets into this package. Studio authentication and Sanity permissions still belong to the configured Sanity project.

## Publish privately

Replace the scope first, and ensure your npm account or organization has permission and a plan supporting private packages.

```bash
npm login
npm run build
npm pack --dry-run
npm publish --access restricted
```

Follow npm's authentication prompts. CI publishing credentials belong in the CI secret store. Once published, set the app dependency to the published version and install with an npm account authorized to read it. This package has been prepared locally; it has not been published by these instructions.

Private npm access controls who can download the package. This is not DRM: a downloaded copy or deployed website can keep running after npm access is removed. A controlled backend is required for ongoing license enforcement.
