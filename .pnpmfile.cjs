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
    pkg.version = '3.2.33'
  }

  ;['dependencies', 'peerDependencies'].forEach((depsType) => {
    const deps = { ...pkg[depsType] }
    for (dep in pkg[depsType]) {
      if (isSameVersionVuePackage(dep)) {
        deps[dep] = '3.2.33'
      }
    }
    pkg[depsType] = deps
  })

  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
