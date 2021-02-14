// rubbish code here

const appendCounts = (item) => {
  if (!item.children) {
    item.count = 1
    return item
  }
  if (item.children) {
    item.children.forEach(appendCounts)
    item.count = item.children.reduce((sum, item) => sum + item.count, 0)
    if (item.type === 'group') {
      item.en += ` (${item.count})`
      item.zh += ` (${item.count})`
    }
    return item
  }
}

const createDeprecatedDemos = (item, mode) => {
  if (__DEV__ && mode === 'debug') {
    return [item]
  } else return []
}

const createDebugDemos = (item, mode) => {
  if (__DEV__ && mode === 'debug') {
    return [item]
  } else return []
}

function createItems (lang, theme, prefix, items) {
  const isZh = lang === 'zh-CN'
  const langKey = isZh ? 'zh' : 'en'
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem[langKey],
      extra: rawItem.enSuffix && isZh ? rawItem.en : undefined,
      path: rawItem.path
        ? `/${lang}/${theme}` + prefix + rawItem.path
        : undefined
    }
    if (rawItem.children) {
      item.children = createItems(lang, theme, prefix, rawItem.children)
    }
    return item
  })
}

export function createDocumentationMenuOptions ({ lang, theme, mode }) {
  return createItems(lang, theme, '/docs', [
    {
      en: 'Naive UI',
      zh: 'Naive UI',
      path: '/intro'
    },
    {
      en: 'Get Started',
      zh: '起步',
      path: '/start'
    },
    {
      en: 'Change Log',
      zh: '变更日志',
      path: '/changelog'
    },
    {
      en: 'Migrate From V1',
      zh: '从 V1 升级',
      path: '/from-v1'
    },
    {
      en: 'Create Themed Component',
      zh: '创建适配主题的组件',
      path: '/n-theme'
    },
    {
      en: 'Experimental Features',
      zh: '试验性特性',
      path: '/experimental-features'
    }
  ])
}

export function createComponentMenuOptions ({ lang, theme, mode }) {
  return createItems(lang, theme, '/components', [
    appendCounts({
      zh: '配置组件',
      en: 'Config Components',
      type: 'group',
      children: [
        {
          en: 'Config Provider',
          zh: '配置提供者',
          enSuffix: true,
          path: '/n-config-provider'
        },
        {
          en: 'Element',
          zh: '元素',
          enSuffix: true,
          path: '/n-element'
        }
      ]
    }),
    appendCounts({
      zh: '布局组件',
      en: 'Layout Components',
      type: 'group',
      children: [
        {
          en: 'Layout',
          zh: '布局',
          enSuffix: true,
          path: '/n-layout'
        },
        {
          en: 'Grid',
          zh: '栅格',
          enSuffix: true,
          path: '/n-grid'
        },
        {
          en: 'Space',
          zh: '间距',
          enSuffix: true,
          path: '/n-space'
        }
      ]
    }),
    appendCounts({
      zh: '通用组件',
      en: 'Common Components',
      type: 'group',
      children: [
        {
          en: 'Avatar',
          zh: '头像',
          enSuffix: true,
          path: '/n-avatar'
        },
        {
          en: 'Button',
          zh: '按钮',
          enSuffix: true,
          path: '/n-button'
        },
        {
          en: 'Card',
          zh: '卡片',
          enSuffix: true,
          path: '/n-card'
        },
        {
          en: 'Collapse',
          zh: '折叠面板',
          enSuffix: true,
          path: '/n-collapse'
        },
        {
          en: 'Divider',
          zh: '分割线',
          enSuffix: true,
          path: '/n-divider'
        },
        {
          en: 'Dropdown',
          zh: '下拉菜单',
          enSuffix: true,
          path: '/n-dropdown'
        },
        {
          en: 'Gradient Text',
          zh: '渐变文字',
          enSuffix: true,
          path: '/n-gradient-text'
        },
        {
          en: 'Icon',
          zh: '图标',
          enSuffix: true,
          path: '/n-icon'
        },
        {
          en: 'Tag',
          zh: '标签',
          enSuffix: true,
          path: '/n-tag'
        },
        {
          en: 'Typography',
          zh: '排印',
          enSuffix: true,
          path: '/n-typography'
        }
      ]
    }),
    appendCounts({
      zh: '数据录入组件',
      en: 'Data Input Components',
      type: 'group',
      children: [
        {
          en: 'Auto Complete',
          zh: '自动填充',
          enSuffix: true,
          path: '/n-auto-complete'
        },
        {
          en: 'Cascader',
          zh: '级联选择',
          enSuffix: true,
          path: '/n-cascader'
        },
        {
          en: 'Checkbox',
          zh: '复选框',
          enSuffix: true,
          path: '/n-checkbox'
        },
        {
          en: 'Date Picker',
          zh: '日期选择器',
          enSuffix: true,
          path: '/n-date-picker'
        },
        {
          en: 'Dynamic Input',
          zh: '动态录入',
          enSuffix: true,
          path: '/n-dynamic-input'
        },
        {
          en: 'Dynamic Tags',
          zh: '动态标签',
          enSuffix: true,
          path: '/n-dynamic-tags'
        },
        {
          en: 'Form',
          zh: '表单',
          enSuffix: true,
          path: '/n-form'
        },
        {
          en: 'Input',
          zh: '文本输入',
          enSuffix: true,
          path: '/n-input'
        },
        {
          en: 'Input Number',
          zh: '数字输入',
          enSuffix: true,
          path: '/n-input-number'
        },
        {
          en: 'Radio',
          zh: '单选',
          enSuffix: true,
          path: '/n-radio'
        },
        {
          en: 'Rate',
          zh: '评分',
          enSuffix: true,
          path: '/n-rate'
        },
        {
          en: 'Select',
          zh: '选择器',
          enSuffix: true,
          path: '/n-select'
        },
        {
          en: 'Slider',
          zh: '滑动选择',
          enSuffix: true,
          path: '/n-slider'
        },
        {
          en: 'Switch',
          zh: '开关',
          enSuffix: true,
          path: '/n-switch'
        },
        {
          en: 'Time Picker',
          zh: '时间选择器',
          enSuffix: true,
          path: '/n-time-picker'
        },
        {
          en: 'Transfer',
          zh: '穿梭框',
          enSuffix: true,
          path: '/n-transfer'
        },
        {
          en: 'Upload',
          zh: '上传',
          enSuffix: true,
          path: '/n-upload'
        }
      ]
    }),
    appendCounts({
      zh: '数据展示组件',
      en: 'Data Display Components',
      type: 'group',
      children: [
        {
          en: 'Code',
          zh: '代码',
          enSuffix: true,
          path: '/n-code'
        },
        {
          en: 'Data Table',
          zh: '数据表格',
          enSuffix: true,
          path: '/n-data-table'
        },
        {
          en: 'Descriptions',
          zh: '描述',
          enSuffix: true,
          path: '/n-descriptions'
        },
        {
          en: 'Empty',
          zh: '无内容',
          enSuffix: true,
          path: '/n-empty'
        },
        {
          en: 'List',
          zh: '列表',
          enSuffix: true,
          path: '/n-list'
        },
        {
          en: 'Log',
          zh: '日志',
          enSuffix: true,
          path: '/n-log'
        },
        {
          en: 'Statistic',
          zh: '统计数据',
          enSuffix: true,
          path: '/n-statistic'
        },
        {
          en: 'Table',
          zh: '表格',
          enSuffix: true,
          path: '/n-table'
        },
        {
          en: 'Thing',
          zh: '东西',
          enSuffix: true,
          path: '/n-thing'
        },
        {
          en: 'Time',
          zh: '时间',
          enSuffix: true,
          path: '/n-time'
        },
        {
          en: 'Timeline',
          zh: '时间线',
          enSuffix: true,
          path: '/n-timeline'
        },
        {
          en: 'Tree',
          zh: '树',
          enSuffix: true,
          path: '/n-tree'
        }
      ]
    }),
    appendCounts({
      zh: '导航组件',
      en: 'Navigation Components',
      type: 'group',
      children: [
        {
          en: 'Affix',
          zh: '固钉',
          enSuffix: true,
          path: '/n-affix'
        },
        {
          en: 'Anchor',
          zh: '侧边导航',
          enSuffix: true,
          path: '/n-anchor'
        },
        {
          en: 'Back Top',
          zh: '回到顶部',
          enSuffix: true,
          path: '/n-back-top'
        },
        {
          en: 'Breadcrumb',
          zh: '面包屑',
          enSuffix: true,
          path: '/n-breadcrumb'
        },
        {
          en: 'Loading Bar',
          zh: '加载条',
          enSuffix: true,
          path: '/n-loading-bar'
        },
        {
          en: 'Menu',
          zh: '菜单',
          enSuffix: true,
          path: '/n-menu'
        },
        {
          en: 'Pagination',
          zh: '分页',
          enSuffix: true,
          path: '/n-pagination'
        },
        {
          en: 'Steps',
          zh: '步骤',
          enSuffix: true,
          path: '/n-steps'
        },
        {
          en: 'Tabs',
          zh: '标签页',
          enSuffix: true,
          path: '/n-tabs'
        }
      ]
    }),
    appendCounts({
      zh: '反馈组件',
      en: 'Feedback Components',
      type: 'group',
      children: [
        {
          en: 'Alert',
          zh: '警告信息',
          enSuffix: true,
          path: '/n-alert'
        },
        {
          en: 'Badge',
          zh: '标记',
          enSuffix: true,
          path: '/n-badge'
        },
        {
          en: 'Dialog',
          zh: '对话框',
          enSuffix: true,
          path: '/n-dialog'
        },
        {
          en: 'Drawer',
          zh: '抽屉',
          enSuffix: true,
          path: '/n-drawer'
        },
        {
          en: 'Message',
          zh: '信息',
          enSuffix: true,
          path: '/n-message'
        },
        {
          en: 'Modal',
          zh: '模态框',
          enSuffix: true,
          path: '/n-modal'
        },
        {
          en: 'Notification',
          zh: '通知',
          enSuffix: true,
          path: '/n-notification'
        },
        {
          en: 'Popconfirm',
          zh: '弹出确认',
          enSuffix: true,
          path: '/n-popconfirm'
        },
        {
          en: 'Popover',
          zh: '弹出信息',
          enSuffix: true,
          path: '/n-popover'
        },
        {
          en: 'Popselect',
          zh: '弹出选择',
          enSuffix: true,
          path: '/n-popselect'
        },
        {
          en: 'Progress',
          zh: '进度',
          enSuffix: true,
          path: '/n-progress'
        },
        {
          en: 'Result',
          zh: '结果页',
          enSuffix: true,
          path: '/n-result'
        },
        {
          en: 'Spin',
          zh: '加载',
          enSuffix: true,
          path: '/n-spin'
        },
        {
          en: 'Tooltip',
          zh: '弹出提示',
          enSuffix: true,
          path: '/n-tooltip'
        }
      ]
    }),
    ...createDeprecatedDemos(
      {
        en: 'Deprecated',
        children: [
          {
            en: 'Nimbus Service Layout',
            path: '/n-nimbus-service-layout'
          }
        ]
      },
      mode
    ),
    ...createDebugDemos(
      {
        en: 'Debug',
        children: [
          {
            en: 'SuffixDebug',
            path: '/n-base-suffix-debug'
          },
          {
            en: 'PopoverDebug',
            path: '/n-popover-debug'
          },
          {
            en: 'RouterDebug',
            path: '/n-router-debug'
          },
          {
            en: 'ModalDebug',
            path: '/n-modal-debug'
          },
          {
            en: 'ScrollbarDebug',
            path: '/n-scrollbar-debug'
          },
          {
            en: 'ScrollbarDebug2',
            path: '/n-scrollbar-debug2'
          },
          {
            en: 'DatePickerDebug',
            path: '/n-date-picker-debug'
          },
          {
            en: 'BackTopDebug',
            path: '/n-back-top-debug'
          },
          {
            en: 'CascaderDebug',
            path: '/n-cascader-debug'
          },
          {
            en: 'VerticalAlignDebug',
            path: '/n-vertical-align-debug'
          },
          {
            en: 'IconTransitionDebug',
            path: '/n-icon-transition-debug'
          },
          {
            en: 'SelectDebug',
            path: '/n-select-debug'
          }
        ]
      },
      mode
    )
  ])
}
