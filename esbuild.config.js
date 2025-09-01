const { build } = require('esbuild')

build({
    entryPoints: ['src/middleware/index.js'],
    outfile: 'dist/middleware/index.cjs',
    minify: true,
    bundle: true,
    platform: 'node',   // target Node.js
    format: 'cjs',      // CommonJS output
    target: 'node18',   // adjust to your lowest Node version
    external: ['express'], // don't bundle express, let users install it
}).catch(() => process.exit(1))
