import {copyFile} from 'node:fs/promises'
await copyFile(new URL('../src/styles.css', import.meta.url), new URL('../dist/src/styles.css', import.meta.url))
