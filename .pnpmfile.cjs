// We will lock vue version if there's regression
const lockVueVersion = false

const vueVersion = '3.2.36'

const isSameVersionVuePackage = (pkgName) =>
  [
    'vue',
    '@vue/shared',
    '@vue/compiler-sfc',
    '@vue/server-renderer',
    '@vue/reactivity',
    '@vue/reactivity-transform',
    '@vue/compiler-dom',
    '@vue/compiler-ssr',
    '@vue/compiler-core'
  ].some((name) => name === pkgName)

function readPackage(pkg) {
  if (isSameVersionVuePackage(pkg.name)) {
    pkg.version = vueVersion
  }

  ;['dependencies', 'peerDependencies'].forEach((depsType) => {
    const deps = { ...pkg[depsType] }
    for (dep in pkg[depsType]) {
      if (isSameVersionVuePackage(dep)) {
        deps[dep] = vueVersion
      }
    }
    pkg[depsType] = deps
  })

  return pkg
}

module.exports = lockVueVersion
  ? {
      hooks: {
        readPackage
      }
    }
  : {}
