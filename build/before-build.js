const fs = require('fs-extra')
const path = require('path')
const rollup = require('rollup')
const vuePlugin = require('rollup-plugin-vue')

const srcDir = path.resolve(__dirname, '../src')
const srcMirrorDir = path.resolve(__dirname, '../src-mirror')
const projectDir = path.resolve(__dirname, '..')

async function findAndReplace (filePath, pattern, target) {
  const content = (await fs.readFile(filePath)).toString()
  if (pattern.test(content)) {
    await fs.writeFile(filePath, content.replace(pattern, target))
  }
}

async function traverse (root) {
  const dir = await fs.opendir(root)
  for await (const dirent of dir) {
    const { name } = dirent
    if (dirent.isDirectory()) {
      await traverse(path.resolve(root, dirent.name))
    } else {
      const filePath = path.resolve(root, name)
      // change all vue import to js
      await findAndReplace(filePath, /\.vue/g, '.js')
      // build js output for vue file
      if (filePath.endsWith('.vue')) {
        console.log('make', filePath.replace(projectDir, ''))
        const rollupInputOptions = {
          input: filePath,
          external: (id) => {
            return !/\.vue\?vue/.test(id)
          },
          plugins: [
            vuePlugin({
              file: false
            })
          ]
        }
        const rollupOutputOptions = {
          format: 'esm',
          file: filePath.replace(/\.vue$/, '.js')
        }
        const bundle = await rollup.rollup(rollupInputOptions)
        await bundle.write(rollupOutputOptions)
        // remove original file
        await fs.unlink(filePath)
      }
    }
  }
}

;(async () => {
  try {
    if (await fs.pathExists(srcMirrorDir)) {
      await fs.emptyDir(srcMirrorDir)
      await fs.remove(srcMirrorDir)
    }
    await fs.mkdir(srcMirrorDir)
    await fs.copy(srcDir, srcMirrorDir)
    await fs.emptyDir(path.resolve(srcMirrorDir, '_deprecated/icons'))
    traverse(srcMirrorDir)
  } catch (err) {
    console.log(err)
  }
})()
