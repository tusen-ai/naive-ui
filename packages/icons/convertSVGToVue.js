const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const files = fs.readdirSync(__dirname).filter(name => name.endsWith('.svg'))

// console.log(files.map(file => file.replace('.vue', '')).map(file => `import ${_.camelCase(file)} from 'naive-ui/lib/icons/${file}'`).join('\n'))

// console.log(files.map(file => file.replace('.vue', '')).map(file => `'${file}'`).join(',\n'))

files.forEach(name => {
  const file = fs.readFileSync(path.resolve(__dirname, name)).toString()
  const vue = `<template>${file}</template>`
  fs.writeFileSync(path.resolve(__dirname, name.replace(/.svg$/, '.vue')), vue)
})

// const vues = files.map(file => file.replace(/.svg$/, '.vue'))

// // const indexFile = `${
// //   vues.map(vue => `import ${_.camelCase(vue.replace(/.vue$/, ''))} from './${vue}'`).join('\n')
// // }

// // export {
// // ${vues.map(vue => '  ' + _.camelCase(vue.replace(/.vue$/, ''))).join(',\n')}
// // }
// // `

// // fs.writeFileSync(path.resolve(__dirname, 'index.js'), indexFile)

files.forEach(file => fs.unlinkSync(path.resolve(__dirname, file)))
