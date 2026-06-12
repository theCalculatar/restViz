// @ts-nocheck
const esbuild = require('esbuild')

const isWatch = process.argv.includes('--watch')

const config = {
  entryPoints: ['src/middleware/index.ts'],
  outfile: 'dist/middleware/index.cjs',
  minify: true,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  external: ['express', 'ejs'],
}

async function run() {
  if (isWatch) {
    const ctx = await esbuild.context(config)

    await ctx.watch()

    console.log('RestViz middleware watching...')
  } else {
    await esbuild.build(config)

    console.log('RestViz middleware built.')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
