import fs from 'node:fs'
import path, { dirname } from 'node:path'
import process, { argv } from 'node:process'
import { fileURLToPath } from 'node:url'
import { kebabCase } from 'lodash'
import * as components from '../../src/components'
import version from '../../src/version'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const baseDir = path.resolve(process.cwd())

interface WebTypesScaffold {
  $schema: string
  framework: string
  name: string
  version: string
  'js-types-syntax': string
  contributions: {
    html: {
      'vue-components': VueComponent[]
    }
  }
}

interface VueComponent {
  name: string
  description?: string
  'doc-url'?: string
  source: {
    symbol: string
  }
  slots: Slot[]
  attributes: any[]
  props: Prop[]
  js: {
    events: Event[]
  }
}

interface Slot {
  name: string
  'doc-url'?: string
  description?: string
  type?: string
  'description-sections'?: {
    since: string
  }
}

interface Prop {
  name: string
  'doc-url'?: string
  type?: string
  description?: string
  default?: string
  'description-sections'?: {
    since: string
  }
}

interface Event {
  name: string
  'doc-url'?: string
  description?: string
  type?: string
  'description-sections'?: {
    since: string
  }
}

export function genWebTypes(): void {
  const vueComponents: VueComponent[] = []

  const scaffold: WebTypesScaffold = {
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

  Object.entries(components).forEach(
    ([exportName, component]: [string, any]) => {
      if (exportName[0] !== 'N')
        return
      if (exportName.startsWith('Nx'))
        return

      const {
        props: docProps,
        slots: docSlots,
        description,
        docUrl
      } = loadDocs(component.name)

      const { props: componentProps } = component
      const name = exportName
      const slots: Slot[] = []
      const attributes: any[] = []
      const props: Prop[] = []
      const events: Event[] = []
      componentProps
      && Object.entries(componentProps).forEach(
        ([propName, prop]: [string, any]) => {
          if (propName.startsWith('internal'))
            return
          if (ignoredPropNames.includes(propName))
            return
          if (propName.startsWith('on') && /[A-Z]/.test(propName[2])) {
            // is event
            const event: Event = {
              name: kebabCase(propName.slice(2)),
              'doc-url': docUrl
            }
            assignDocs(event, docProps[kebabCase(propName)])
            delete docProps[kebabCase(propName)]
            events.push(event)
          }
          else {
            const resultProp: Prop = {
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
        }
      )

      // Add the rest of the props and events from docs
      for (const name in docProps) {
        const prop: Prop = {
          name,
          'doc-url': docUrl
        }
        assignDocs(prop, docProps[name])
        if (prop.name.startsWith('on-')) {
          ;(prop as any).name = prop.name.substring(3)
          events.push(prop as any)
        }
        else {
          props.push(prop)
        }
      }

      for (const name in docSlots) {
        const slot: Slot = {
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
    }
  )

  fs.writeFileSync(
    path.resolve(process.cwd(), 'web-types.json'),
    JSON.stringify(scaffold, null, 2),
    {
      encoding: 'utf-8'
    }
  )

  function getType(prop: any): string | null {
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

  function _getType(propType: any): string | null {
    if (Array.isArray(propType)) {
      const types = propType.map(mapType)
      if (types.includes(null))
        return null
      return types.join(' | ')
    }
    return mapType(propType)
  }

  function mapType(type: any): string | null {
    const typeMap = new Map<any, string>([
      [String, 'string'],
      [Number, 'number'],
      [Boolean, 'boolean'],
      [Array, 'Array'],
      [Object, 'object'],
      [Function, 'Function'],
      [Date, 'Date']
    ])

    if (typeMap.has(type)) {
      return typeMap.get(type)!
    }

    console.error(`unknown type ${type}`)
    return null
  }

  function loadDocs(componentName: string): {
    props: Record<string, any>
    slots: Record<string, any>
    description?: string
    docUrl?: string
  } {
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
    let docsPath: string | undefined
    do {
      docsPath = path.resolve(
        baseDir,
        `src/${componentPath}/demos/enUS/index.demo-entry.md`
      )
      if (fs.existsSync(docsPath))
        break
      componentPath = componentPath.substring(
        0,
        Math.max(0, componentPath.lastIndexOf('-'))
      )
    } while (componentPath)

    if (!componentPath || !docsPath) {
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

    function extractComponentDescription(): string | undefined {
      const description = docsFile.match(
        new RegExp(`#.*${componentName}\n(.*)## Demos`, 's')
      )
      if (description) {
        return description[1].trim()
      }
    }

    function extractSectionTable(sectionName: string): Record<string, any> {
      const result: Record<string, any> = {}
      try {
        const sectionHeaderRegex = new RegExp(
          `##.*${componentName}[, ].*${sectionName}\n`
        )
        const location = docsFile.match(sectionHeaderRegex)
        if (!location || location.index === undefined || location.index < 0)
          return result
        let end = docsFile.indexOf('##', location.index + 3)
        if (end < 0)
          end = docsFile.length

        const rowRegex = /\|((?:\\\||[^|])+)/g
        const sectionContents = docsFile.substring(
          location.index + location[0].length,
          end
        )
        const table = sectionContents
          .split('\n')
          .map(it => it.trim())
          .filter(it => !!it && !it.includes('| ---') && it.startsWith('|'))
          .map((it) => {
            const row = it.match(rowRegex)
            if (row === null)
              throw new Error(`Failed to match: ${it}`)
            return row.map(it => it.substring(1).trim())
          })

        if (table.length > 0) {
          if (table[0][0] !== 'Name') {
            throw new Error(`Bad table ${sectionName} in ${componentName}`)
          }
          for (let i = 1; i < table.length; i++) {
            const row = table[i]
            const name = row[0]
            const info: Record<string, any> = {}
            for (let j = 1; j < row.length; j++) {
              info[table[0][j].toLowerCase()] = row[j]
            }
            result[name] = info
          }
        }
      }
      catch (e) {
        console.error(
          `Failed to build table info for section ${sectionName} of ${componentName} under ${docsPath}`,
          e
        )
      }
      return result
    }
  }

  function assignDocs(target: any, docs: any): void {
    if (!docs)
      return
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

  function strip(str: string, prefix: string, suffix?: string): string {
    if (!str)
      return str
    if (!suffix)
      suffix = prefix
    if (str.startsWith(prefix) && str.endsWith(suffix)) {
      return str.substring(1, str.length - 1).trim()
    }
    return str
  }
}

if (import.meta.url === `file://${argv[1]}`) {
  genWebTypes()
}
