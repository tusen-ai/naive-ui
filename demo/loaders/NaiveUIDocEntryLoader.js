const path = require('path')
const fs = require('fs')
const template = fs.readFileSync(path.join(__dirname, 'ComponentDocumentationEntryTemplate.vue')).toString()

module.exports = () => template
