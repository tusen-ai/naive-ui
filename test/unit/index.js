// import 'core-js/stable'
import 'regenerator-runtime/runtime'

// require all coverage files
// const packagesContext = require.context('../../packages', true, /\.js$/)
// packagesContext.keys().forEach(packagesContext)

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs/src/Pagination', true, /\.spec.js$/)
testsContext.keys().forEach(testsContext)
