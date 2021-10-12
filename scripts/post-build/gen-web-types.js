// I don't like web-types, why can't webstrom just work with typescript?
const fs = require('fs')
const path = require('path')
const { kebabCase } = require('lodash')

exports.genWebTypes = function genWebTypes () {
  const components = require('../../lib/components')
  const { default: version } = require('../../lib/version')

  const tags = []

  const scaffold = {
    $schema:
      'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: 'naive-ui',
    version,
    contributions: {
      html: {
        // we need to fill tags
        tags,
        attributes: [],
        'types-syntax': 'typescript'
      }
    }
  }

  const ignoredPropNames = ['theme', 'themeOverrides', 'builtinThemeOverrides']

  Object.entries(components).forEach(([exportName, component]) => {
    if (exportName[0] !== 'N') return
    if (exportName.startsWith('Nx')) return
    const { props } = component
    const name = kebabCase(exportName)
    const slots = []
    const attributes = []
    const events = []
    props &&
      Object.entries(props).forEach(([propName, prop]) => {
        if (propName.startsWith('internal')) return
        if (ignoredPropNames.includes(propName)) return
        if (propName.startsWith('on') && /[A-Z]/.test(propName[2])) {
          // is event
          events.push({
            name: kebabCase(propName.slice(2)),
            description: '-'
          })
        } else {
          const attribute = {
            name: kebabCase(propName),
            default: '-',
            description: '-'
          }
          const type = getType(prop)
          if (type !== null) {
            attribute.value = {
              type,
              kind: 'expression'
            }
          }
          // is attribute
          attributes.push(attribute)
        }
      })
    tags.push({
      name,
      slots,
      attributes,
      events
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
}

if (require.main === module) {
  exports.genWebTypes()
}
