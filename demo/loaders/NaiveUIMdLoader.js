const hljs = require('highlight.js')
const marked = require('marked')
// const prettier = require('prettier')

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeForHTML (input) {
  return input.replace(/([&<>'"])/g, char => escapeMap[char])
}

// Create your custom renderer.
const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && hljs.getLanguage(language))

  // Highlight only if the language is valid.
  // highlight.js escapes HTML in the code, but we need to escape by ourselves
  // when we don't use it.
  const highlighted = validLang
    ? hljs.highlight(language, code).value
    : escapeForHTML(code)

  // Render the highlighted code with `hljs` class.
  return `<pre v-pre><code class="${language}">${highlighted}</code></pre>`
}

marked.setOptions({
  renderer
})

module.exports = function (content) {
  // console.log(convertMd2Doc(content))
  return `<template><div class="markdown">${marked(content)}</div></template>`
}
