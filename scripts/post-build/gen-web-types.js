// I don't like web-types, why can't webstrom just work with typescript?
const fs = require('fs')
const path = require('path')
const { kebabCase } = require('lodash')

const baseDir = path.resolve(__dirname, '../..')

exports.genWebTypes = function genWebTypes () {
  const components = require('../../lib/components')
  const { default: version } = require('../../lib/version')

  const vueComponents = []

  const scaffold = {
    $schema:
      'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: 'naive-ui',
    version,
    'js-types-syntax': 'typescript',
    contributions: {
      html: {
        'vue-components': vueComponents
      }
    }
  }

  const ignoredPropNames = ['theme', 'themeOverrides', 'builtinThemeOverrides']

  Object.entries(components).forEach(([exportName, component]) => {
    if (exportName[0] !== 'N') return
    if (exportName.startsWith('Nx')) return

    const {
      props: docProps,
      slots: docSlots,
      description,
      docUrl
    } = loadDocs(component.name)

    const { props: componentProps } = component
    const name = exportName
    const slots = []
    const attributes = []
    const props = []
    const events = []
    componentProps &&
      Object.entries(componentProps).forEach(([propName, prop]) => {
        if (propName.startsWith('internal')) return
        if (ignoredPropNames.includes(propName)) return
        if (propName.startsWith('on') && /[A-Z]/.test(propName[2])) {
          // is event
          const event = {
            name: kebabCase(propName.slice(2)),
            'doc-url': docUrl
          }
          assignDocs(event, docProps[kebabCase(propName)])
          delete docProps[kebabCase(propName)]
          events.push(event)
        } else {
          const resultProp = {
            name: kebabCase(propName),
            'doc-url': docUrl
          }
          const type = prop ? getType(prop) : null
          if (type !== null) {
            resultProp.type = type
          }
          assignDocs(resultProp, docProps[resultProp.name])
          delete docProps[resultProp.name]
          props.push(resultProp)
        }
      })

    // Add the rest of the props and events from docs
    for (const name in docProps) {
      const prop = {
        name,
        'doc-url': docUrl
      }
      assignDocs(prop, docProps[name])
      if (prop.name.startsWith('on-')) {
        prop.name = prop.name.substring(3)
        events.push(prop)
      } else {
        props.push(prop)
      }
    }

    for (const name in docSlots) {
      const slot = {
        name,
        'doc-url': docUrl
      }
      assignDocs(slot, docSlots[name])
      slots.push(slot)
    }

    vueComponents.push({
      name,
      description,
      'doc-url': docUrl,
      source: {
        symbol: exportName
      },
      slots,
      attributes,
      props,
      js: {
        events
      }
    })
  })

  fs.writeFileSync(
    path.resolve(__dirname, '../../web-types.json'),
    JSON.stringify(scaffold, 0, 2),
    {
      encoding: 'utf-8'
    }
  )

  function getType (prop) {
    if (typeof prop !== 'object' && typeof prop !== 'function') {
      console.error(`invalid prop: ${prop}`)
      return null
    }
    if ('type' in prop) {
      return _getType(prop.type)
    }
    if ('validator' in prop) {
      return null
    }
    return _getType(prop)
  }

  function _getType (propType) {
    if (Array.isArray(propType)) {
      const types = propType.map(mapType)
      if (types.some((v) => v === null)) return null
      return types.join(' | ')
    }
    return mapType(propType)
  }

  function mapType (type) {
    switch (type) {
      case String:
        return 'string'
      case Number:
        return 'number'
      case Boolean:
        return 'boolean'
      case Array:
        return 'Array'
      case Object:
        return 'object'
      case Function:
        return 'Function'
      case Date:
        return 'Date'
    }
    console.error(`unkown type ${type}`)
    return null
  }

  function loadDocs (componentName) {
    let componentPath = kebabCase(componentName)
    switch (componentPath) {
      case 'row':
      case 'col':
        componentPath = 'legacy-grid'
        break
      case 'step':
        componentPath = 'steps'
        break
      case 'h-1':
      case 'h-2':
      case 'h-3':
      case 'h-4':
      case 'h-5':
      case 'h-6':
      case 'text':
      case 'p':
      case 'ul':
      case 'ol':
      case 'li':
      case 'hr':
      case 'a':
      case 'blockquote':
        componentPath = 'typography'
        break
      case 'th':
      case 'tr':
      case 'td':
      case 'thead':
      case 'tbody':
        componentPath = 'table'
        break
      case 'tab-pane':
      case 'tab':
        componentPath = 'tabs'
        break
    }
    let docsPath
    do {
      docsPath = path.resolve(
        baseDir,
        'src/' + componentPath + '/demos/enUS/index.demo-entry.md'
      )
      if (fs.existsSync(docsPath)) break
      componentPath = componentPath.substring(
        0,
        Math.max(0, componentPath.lastIndexOf('-'))
      )
    } while (componentPath)

    if (!componentPath) {
      console.log(`Docs not found for ${componentName}`)
      return {
        props: {},
        slots: {}
      }
    }
    const docsFile = fs.readFileSync(docsPath).toString()
    const props = extractSectionTable('Props')
    const slots = extractSectionTable('Slots')
    const description = extractComponentDescription()

    return {
      props,
      slots,
      description,
      docUrl: `https://www.naiveui.com/en-US/os-theme/components/${componentPath}`
    }

    function extractComponentDescription () {
      const description = docsFile.match(
        RegExp(`#.*${componentName}\n(.*)## Demos`, 's')
      )
      if (description) {
        return description[1].trim()
      }
    }

    function extractSectionTable (sectionName) {
      const result = {}
      try {
        const sectionHeaderRegex = RegExp(
          `##.*${componentName}[, ].*${sectionName}\n`
        )
        const location = docsFile.match(sectionHeaderRegex)
        if (!location || location.index < 0) return result
        let end = docsFile.indexOf('##', location.index + 3)
        if (end < 0) end = docsFile.length

        const rowRegex = /\|((\\\||[^|])+)/g
        const sectionContents = docsFile.substring(
          location.index + location[0].length,
          end
        )
        const table = sectionContents
          .split('\n')
          .map((it) => it.trim())
          .filter((it) => !!it && it.indexOf('| ---') < 0 && it.startsWith('|'))
          .map((it) => {
            const row = it.match(rowRegex)
            if (row === null) throw new Error('Failed to match: ' + it)
            return row.map((it) => it.substring(1).trim())
          })

        if (table.length > 0) {
          if (table[0][0] !== 'Name') {
            throw new Error('Bad table ' + sectionName + ' in ' + componentName)
          }
          for (let i = 1; i < table.length; i++) {
            const row = table[i]
            const name = row[0]
            const info = {}
            for (let j = 1; j < row.length; j++) {
              info[table[0][j].toLowerCase()] = row[j]
            }
            result[name] = info
          }
        }
      } catch (e) {
        console.error(
          `Failed to build table info for section ${sectionName} of ${componentName} under ${docsPath}`,
          e
        )
      }
      return result
    }
  }

  function assignDocs (target, docs) {
    if (!docs) return
    if (docs.parameters) {
      // For slot
      const type = strip(strip(docs.parameters, '`'), '(', ')')
      const objDefStart = type ? type.indexOf('{') : -1
      if (objDefStart >= 0) {
        target.type = type.substring(objDefStart).replaceAll('\\|', '|')
      }
    }
    if (docs.type) {
      // For props and events
      target.type = strip(docs.type, '`').replaceAll('\\|', '|')
    }
    if (docs.description) {
      target.description = docs.description
    }
    if (docs.default) {
      target.default = strip(docs.default, '`')
    }
    if (docs.version) {
      target['description-sections'] = { since: docs.version }
    }
  }

  function strip (str, prefix, suffix) {
    if (!str) return str
    if (!suffix) suffix = prefix
    if (str.startsWith(prefix) && str.endsWith(suffix)) {
      return str.substring(1, str.length - 1).trim()
    }
    return str
  }
}

if (require.main === module) {
  exports.genWebTypes()
}
