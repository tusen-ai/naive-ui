function getComponent (componentName) {
  return (exportedComponents[componentName] || unexposedComponents[componentName])
}

function flattenStyles (component) {
  const flattenedStyles = []
  for (const styleDependency of component.styles) {
    if (styleDependency.startsWith('[]')) {
      flattenedStyles.push(...flattenStyles(
        getComponent(styleDependency.slice(2, styleDependency.length))
      ))
    } else {
      flattenedStyles.push(styleDependency)
    }
  }
  return Array.from(new Set(flattenedStyles)).sort()
}

const unexposedComponents = {
  Scrollbar: {
    styles: [
      'Scrollbar'
    ]
  },
  BaseTrackingRect: {
    styles: [
      'BaseTrackingRect'
    ]
  },
  BaseLoading: {
    styles: [
      'BaseLoading'
    ]
  },
  BaseSuffix: {
    styles: [
      'BaseSuffix',
      '[]BaseLoading'
    ]
  },
  BaseMenuMask: {
    styles: [
      'BaseMenuMask'
    ]
  },
  BaseSelection: {
    styles: [
      'BaseSelection',
      '[]BaseLoading',
      '[]Tag'
    ]
  },
  BaseSelectMenu: {
    styles: [
      'BaseSelectMenu',
      '[]BaseTrackingRect',
      '[]Empty',
      '[]Scrollbar',
      '~vue-virtual-scroller/dist/vue-virtual-scroller.css'
    ]
  },
  BaseSlotMachine: {
    styles: [
      'BaseSlotMachine'
    ]
  }
}

const exportedComponents = {
  Affix: {
    styles: [
      'Affix'
    ]
  },
  Alert: {
    styles: [
      'Alert'
    ]
  },
  Anchor: {
    styles: [
      'Anchor',
      '[]Affix'
    ]
  },
  AutoComplete: {
    styles: [
      'AutoComplete',
      '[]BaseSelection',
      '[]BaseSelectMenu',
      '[]Input'
    ]
  },
  Avatar: {
    styles: [
      'Avatar'
    ]
  },
  BackTop: {
    styles: [
      'BackTop'
    ]
  },
  Badge: {
    styles: [
      'Badge',
      '[]BaseSlotMachine'
    ]
  },
  Breadcrumb: {
    styles: [
      'Breadcrumb'
    ]
  },
  Button: {
    styles: [
      'Button',
      '[]BaseLoading',
      '[]Icon'
    ]
  },
  Card: {
    styles: [
      'Card',
      '[]Icon'
    ]
  },
  Cascader: {
    styles: [
      'Cascader',
      '[]BaseLoading',
      '[]BaseMenuMask',
      '[]BaseSelection',
      '[]BaseSelectMenu',
      '[]Checkbox',
      '[]Radio'
    ]
  },
  Checkbox: {
    styles: [
      'Checkbox'
    ]
  },
  Code: {
    styles: [
      'Code'
    ]
  },
  Collapse: {
    styles: [
      'Collapse',
      '[]Icon'
    ]
  },
  ConfigConsumer: {
    styles: []
  },
  ConfigProvider: {
    styles: []
  },
  Confirm: {
    styles: [
      'Confirm',
      '[]Icon',
      '[]Button'
    ]
  },
  DataTable: {
    styles: [
      'DataTable',
      '[]Empty',
      '[]Icon',
      '[]Pagination',
      '[]Scrollbar',
      '[]Checkbox',
      '[]Radio',
      '[]Divider',
      '[]Button'
    ]
  },
  DatePicker: {
    styles: [
      'DatePicker',
      '[]Button',
      '[]Icon',
      '[]Input',
      '[]TimePicker'
    ]
  },
  Descriptions: {
    styles: [
      'Descriptions'
    ]
  },
  Divider: {
    styles: [
      'Divider'
    ]
  },
  Drawer: {
    styles: [
      'Drawer'
    ]
  },
  Dropdown: {
    styles: [
      'Dropdown',
      '[]Popover',
      '[]BaseSelectMenu',
      '[]Icon'
    ]
  },
  Element: {
    styles: []
  },
  Empty: {
    styles: [
      'Empty',
      '[]Icon'
    ]
  },
  Form: {
    styles: [
      'Form',
      '[]Grid'
    ]
  },
  GradientText: {
    styles: [
      'GradientText'
    ]
  },
  Grid: {
    styles: [
      'Grid'
    ]
  },
  Icon: {
    styles: [
      'Icon'
    ]
  },
  Input: {
    styles: [
      'Input',
      '[]BaseSuffix'
    ]
  },
  InputNumber: {
    styles: [
      'InputNumber',
      '[]Icon'
    ]
  },
  Layout: {
    styles: [
      'Layout',
      '[]Scrollbar'
    ]
  },
  List: {
    styles: [
      'List'
    ]
  },
  LoadingBar: {
    styles: [
      'LoadingBar'
    ]
  },
  Log: {
    styles: [
      'Log',
      '[]Scrollbar',
      '[]BaseLoading'
    ]
  },
  Menu: {
    styles: [
      'Menu',
      '[]Popover',
      '[]Tooltip'
    ]
  },
  Notification: {
    styles: [
      'Notification',
      '[]Icon',
      '[]Scrollbar'
    ]
  },
  Pagination: {
    styles: [
      'Pagination'
    ]
  },
  Popconfirm: {
    styles: [
      'Popconfirm',
      '[]Button',
      '[]Icon',
      '[]Popover'
    ]
  },
  Popover: {
    styles: [
      'Popover'
    ]
  },
  Popselect: {
    styles: [
      'Popselect',
      '[]BaseSelectMenu',
      '[]Popover'
    ]
  },
  Progress: {
    styles: [
      'Progress',
      '[]Icon'
    ]
  },
  Radio: {
    styles: [
      'Radio'
    ]
  },
  Result: {
    styles: [
      'Result',
      '[]Icon'
    ]
  },
  Select: {
    styles: [
      'Select',
      '[]BaseSelection',
      '[]BaseSelectMenu'
    ]
  },
  Slider: {
    styles: [
      'Slider'
    ]
  },
  Spin: {
    styles: [
      'Spin',
      '[]BaseLoading'
    ]
  },
  Statistic: {
    styles: [
      'Statistic'
    ]
  },
  Steps: {
    styles: [
      'Steps',
      '[]Icon'
    ]
  },
  Switch: {
    styles: [
      'Switch'
    ]
  },
  Tabs: {
    styles: [
      'Tabs',
      'Icon'
    ]
  },
  Tag: {
    styles: [
      'Tag'
    ]
  },
  Thing: {
    styles: [
      'Thing'
    ]
  },
  Time: {
    styles: [
      'Time'
    ]
  },
  Timeline: {
    styles: [
      'Timeline'
    ]
  },
  TimePicker: {
    styles: [
      'TimePicker',
      '[]Input',
      '[]Button'
    ]
  },
  Tooltip: {
    styles: [
      'Tooltip',
      '[]Popover'
    ]
  },
  Transfer: {
    styles: [
      'Transfer',
      '[]Checkbox',
      '[]Icon',
      '[]Input',
      '[]Empty',
      '[]Scrollbar',
      '[]BaseTrackingRect',
      '[]Input',
      '~vue-virtual-scroller/dist/vue-virtual-scroller.css'
    ]
  },
  Typography: {
    styles: [
      'Typography'
    ]
  },
  Upload: {
    styles: [
      'Upload',
      '[]Progress',
      '[]Icon',
      '[]Button'
    ]
  }
}

Object.keys(exportedComponents).forEach(component => {
  exportedComponents[component].styles = flattenStyles(exportedComponents[component])
})

const scriptPrefix = {
  esm: 'naive-ui/es/',
  cjs: 'naive-ui/lib/'
}

const stylePrefix = {
  esm: 'naive-ui/es/styles/',
  cjs: 'naive-ui/lib/styles/'
}

const baseStyleImportFile = [
  'base'
]

const styleExtension = {
  esm: '.css',
  cjs: '.css'
}

function createScriptImportStatements (componentNames = [], format = 'esm') {
  return Array.from(
    new Set(componentNames.map(
      componentName => createScriptImportStatement(componentName, format)
    ))
  ).sort()
}

function createScriptImportStatement (componentName, format = 'esm') {
  return `import N${componentName} from '${scriptPrefix[format]}${componentName}'`
}

function createStyleImportStatements (componentNames = [], format = 'esm') {
  return Array.from(
    new Set(
      baseStyleImportFile.concat(
        componentNames
          .map(componentName => exportedComponents[componentName].styles)
          .reduce((styles, componentStyles) => styles.concat(componentStyles), [])
      ).map(
        styleFile => createStyleImportStatement(styleFile, format)
      )
    )
  ).sort()
}

function createStyleImportStatement (styleFile, format) {
  if (styleFile.startsWith('~')) {
    return (
      'import \'' +
      styleFile.slice(1, styleFile.length) +
      '\''
    )
  }
  return `import '${stylePrefix[format]}${styleFile}${styleExtension[format]}'`
}

function createImportStatements (componentNames = [], format = 'esm') {
  return (
    createStyleImportStatements(componentNames, format).join('\n') + '\n\n' +
    createScriptImportStatements(componentNames, format).join('\n') + '\n'
  )
}

function createLocaleImportStatements (locales = ['zhCN', 'enUS'], format = 'ems') {
  return locales.map(locale => `import ${locale} from '${scriptPrefix[format]}locale/${locale}'`).join('\n') + '\n\n'
}

function createInitializeStatements (components = [], locales = ['zhCN', 'enUS'], format = 'esm') {
  return (
    `import create from '${scriptPrefix[format]}create'\n\n` +
    createLocaleImportStatements(locales, format) +
    `const naive = create({\n` +
    `  components: [\n` +
    components.map(component => `    N${component}`).sort().join(',\n') + '\n' +
    `  ],\n` +
    `  locales: [\n` +
    locales.map(locale => `    ${locale}`).join(',\n') + '\n' +
    `  ]\n` +
    `})\n\n` +
    `Vue.install(naive)`
  )
}

function createInstallStatements (components = [], locales = ['zhCN', 'enUS'], format = 'esm') {
  return (
    createImportStatements(components, format) + '\n' +
    createInitializeStatements(components, locales, format)
  ).replace(/\n\n+/g, '\n\n')
}

export {
  createInstallStatements
}
