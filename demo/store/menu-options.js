// rubbish code here

import { h } from 'vue'
import { RouterLink } from 'vue-router'

export const renderMenuLabel = (option) => {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label
  }
  return h(
    RouterLink,
    {
      to: option.path
    },
    { default: () => option.label }
  )
}

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

function createItems (lang, theme, prefix, items) {
  const isZh = lang === 'zh-CN'
  const langKey = isZh ? 'zh' : 'en'
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem[langKey] || rawItem.en,
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
      en: 'Introduction',
      zh: '介绍',
      type: 'group',
      children: [
        {
          en: 'Naive UI',
          zh: 'Naive UI',
          path: '/introduction'
        }
      ]
    },
    {
      en: 'Getting Started',
      zh: '快速上手',
      type: 'group',
      children: [
        {
          en: 'Installation',
          zh: '安装',
          path: '/installation'
        },
        {
          en: 'Usage in SFC',
          zh: '在 SFC 中使用',
          path: '/usage-sfc'
        },
        {
          en: 'Using UMD',
          zh: '使用 UMD',
          path: '/umd'
        },
        {
          en: 'Configuring Fonts',
          zh: '配置字体',
          path: '/fonts'
        },
        {
          en: 'Import on Demand',
          zh: '按需引入',
          path: '/import-on-demand'
        },
        {
          en: 'Supported Platforms',
          zh: '支持的平台',
          path: '/supported-platforms'
        },
        {
          en: 'Common Issues',
          zh: '常见问题',
          path: '/common-issues'
        },
        {
          en: 'Controlled & Uncontrolled',
          zh: '受控与非受控',
          path: '/controlled-uncontrolled'
        }
      ]
    },
    {
      en: 'Guides',
      zh: '指南',
      type: 'group',
      children: [
        {
          en: 'JSX & TSX',
          zh: 'JSX & TSX',
          path: '/jsx'
        },
        {
          en: 'Server-Sider Rendering',
          zh: '服务端渲染 SSR',
          path: '/ssr'
        },
        {
          en: 'Customizing Theme',
          zh: '调整主题',
          path: '/customize-theme'
        },
        {
          en: 'Internationalization',
          zh: '国际化',
          path: '/i18n'
        },
        {
          en: 'Create Themed Component',
          zh: '创建适配主题的组件',
          path: '/theme'
        },
        {
          en: 'Potential Style Conflict',
          zh: '潜在的样式冲突',
          path: '/style-conflict'
        },
        {
          en: 'Third-Party Libraries',
          zh: '社区精选资源',
          path: '/community'
        }
      ]
    },
    {
      en: 'Version',
      zh: '版本',
      type: 'group',
      children: [
        {
          en: 'Change Log',
          zh: '变更日志',
          path: '/changelog'
        }
      ]
    }
  ])
}

export function createComponentMenuOptions ({ lang, theme, mode }) {
  return createItems(lang, theme, '/components', [
    appendCounts({
      zh: '通用组件',
      en: 'Common Components',
      type: 'group',
      children: [
        {
          en: 'Avatar',
          zh: '头像',
          enSuffix: true,
          path: '/avatar'
        },
        {
          en: 'Button',
          zh: '按钮',
          enSuffix: true,
          path: '/button'
        },
        {
          en: 'Card',
          zh: '卡片',
          enSuffix: true,
          path: '/card'
        },
        {
          en: 'Carousel',
          zh: '轮播图',
          enSuffix: true,
          path: '/carousel'
        },
        {
          en: 'Collapse',
          zh: '折叠面板',
          enSuffix: true,
          path: '/collapse'
        },
        {
          en: 'Divider',
          zh: '分割线',
          enSuffix: true,
          path: '/divider'
        },
        {
          en: 'Dropdown',
          zh: '下拉菜单',
          enSuffix: true,
          path: '/dropdown'
        },
        {
          en: 'Ellipsis',
          zh: '文本省略',
          enSuffix: true,
          path: '/ellipsis'
        },
        {
          en: 'Gradient Text',
          zh: '渐变文字',
          enSuffix: true,
          path: '/gradient-text'
        },
        {
          en: 'Icon',
          zh: '图标',
          enSuffix: true,
          path: '/icon'
        },
        {
          en: 'PageHeader',
          zh: '页头',
          enSuffix: true,
          path: '/page-header'
        },
        {
          en: 'Tag',
          zh: '标签',
          enSuffix: true,
          path: '/tag'
        },
        {
          en: 'Typography',
          zh: '排印',
          enSuffix: true,
          path: '/typography'
        },
        {
          en: 'Watermark',
          zh: '水印',
          enSuffix: true,
          path: '/watermark'
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
          path: '/auto-complete'
        },
        {
          en: 'Cascader',
          zh: '级联选择',
          enSuffix: true,
          path: '/cascader'
        },
        {
          en: 'Color Picker',
          zh: '颜色选择器',
          enSuffix: true,
          path: '/color-picker'
        },
        {
          en: 'Checkbox',
          zh: '复选框',
          enSuffix: true,
          path: '/checkbox'
        },
        {
          en: 'Date Picker',
          zh: '日期选择器',
          enSuffix: true,
          path: '/date-picker'
        },
        {
          en: 'Dynamic Input',
          zh: '动态录入',
          enSuffix: true,
          path: '/dynamic-input'
        },
        {
          en: 'Dynamic Tags',
          zh: '动态标签',
          enSuffix: true,
          path: '/dynamic-tags'
        },
        {
          en: 'Form',
          zh: '表单',
          enSuffix: true,
          path: '/form'
        },
        {
          en: 'Input',
          zh: '文本输入',
          enSuffix: true,
          path: '/input'
        },
        {
          en: 'Input Number',
          zh: '数字输入',
          enSuffix: true,
          path: '/input-number'
        },
        {
          en: 'Mention',
          zh: '提及',
          enSuffix: true,
          path: '/mention'
        },
        {
          en: 'Radio',
          zh: '单选',
          enSuffix: true,
          path: '/radio'
        },
        {
          en: 'Rate',
          zh: '评分',
          enSuffix: true,
          path: '/rate'
        },
        {
          en: 'Select',
          zh: '选择器',
          enSuffix: true,
          path: '/select'
        },
        {
          en: 'Slider',
          zh: '滑动选择',
          enSuffix: true,
          path: '/slider'
        },
        {
          en: 'Switch',
          zh: '开关',
          enSuffix: true,
          path: '/switch'
        },
        {
          en: 'Time Picker',
          zh: '时间选择器',
          enSuffix: true,
          path: '/time-picker'
        },
        {
          en: 'Transfer',
          zh: '穿梭框',
          enSuffix: true,
          path: '/transfer'
        },
        {
          en: 'Tree Select',
          zh: '树型选择',
          enSuffix: true,
          path: '/tree-select'
        },
        {
          en: 'Upload',
          zh: '上传',
          enSuffix: true,
          path: '/upload'
        }
      ]
    }),
    appendCounts({
      zh: '数据展示组件',
      en: 'Data Display Components',
      type: 'group',
      children: [
        {
          en: 'Calendar',
          zh: '日历',
          enSuffix: true,
          path: '/calendar'
        },
        {
          en: 'Countdown',
          zh: '倒计时',
          enSuffix: true,
          path: '/countdown'
        },
        {
          en: 'Code',
          zh: '代码',
          enSuffix: true,
          path: '/code'
        },
        {
          en: 'Data Table',
          zh: '数据表格',
          enSuffix: true,
          path: '/data-table'
        },
        {
          en: 'Descriptions',
          zh: '描述',
          enSuffix: true,
          path: '/descriptions'
        },
        {
          en: 'Empty',
          zh: '无内容',
          enSuffix: true,
          path: '/empty'
        },
        {
          en: 'Equation',
          zh: '公式',
          enSuffix: true,
          path: '/equation'
        },
        {
          en: 'Image',
          zh: '图像',
          enSuffix: true,
          path: '/image'
        },
        {
          en: 'List',
          zh: '列表',
          enSuffix: true,
          path: '/list'
        },
        {
          en: 'Log',
          zh: '日志',
          enSuffix: true,
          path: '/log'
        },
        {
          en: 'Number Animation',
          zh: '数值动画',
          enSuffix: true,
          path: '/number-animation'
        },
        {
          en: 'Statistic',
          zh: '统计数据',
          enSuffix: true,
          path: '/statistic'
        },
        {
          en: 'Table',
          zh: '表格',
          enSuffix: true,
          path: '/table'
        },
        {
          en: 'Thing',
          zh: '东西',
          enSuffix: true,
          path: '/thing'
        },
        {
          en: 'Time',
          zh: '时间',
          enSuffix: true,
          path: '/time'
        },
        {
          en: 'Timeline',
          zh: '时间线',
          enSuffix: true,
          path: '/timeline'
        },
        {
          en: 'Tree',
          zh: '树',
          enSuffix: true,
          path: '/tree'
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
          path: '/affix'
        },
        {
          en: 'Anchor',
          zh: '侧边导航',
          enSuffix: true,
          path: '/anchor'
        },
        {
          en: 'Back Top',
          zh: '回到顶部',
          enSuffix: true,
          path: '/back-top'
        },
        {
          en: 'Breadcrumb',
          zh: '面包屑',
          enSuffix: true,
          path: '/breadcrumb'
        },
        {
          en: 'Loading Bar',
          zh: '加载条',
          enSuffix: true,
          path: '/loading-bar'
        },
        {
          en: 'Menu',
          zh: '菜单',
          enSuffix: true,
          path: '/menu'
        },
        {
          en: 'Pagination',
          zh: '分页',
          enSuffix: true,
          path: '/pagination'
        },
        {
          en: 'Steps',
          zh: '步骤',
          enSuffix: true,
          path: '/steps'
        },
        {
          en: 'Tabs',
          zh: '标签页',
          enSuffix: true,
          path: '/tabs'
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
          path: '/alert'
        },
        {
          en: 'Badge',
          zh: '标记',
          enSuffix: true,
          path: '/badge'
        },
        {
          en: 'Dialog',
          zh: '对话框',
          enSuffix: true,
          path: '/dialog'
        },
        {
          en: 'Drawer',
          zh: '抽屉',
          enSuffix: true,
          path: '/drawer'
        },
        {
          en: 'Message',
          zh: '信息',
          enSuffix: true,
          path: '/message'
        },
        {
          en: 'Modal',
          zh: '模态框',
          enSuffix: true,
          path: '/modal'
        },
        {
          en: 'Notification',
          zh: '通知',
          enSuffix: true,
          path: '/notification'
        },
        {
          en: 'Popconfirm',
          zh: '弹出确认',
          enSuffix: true,
          path: '/popconfirm'
        },
        {
          en: 'Popover',
          zh: '弹出信息',
          enSuffix: true,
          path: '/popover'
        },
        {
          en: 'Popselect',
          zh: '弹出选择',
          enSuffix: true,
          path: '/popselect'
        },
        {
          en: 'Progress',
          zh: '进度',
          enSuffix: true,
          path: '/progress'
        },
        {
          en: 'Result',
          zh: '结果页',
          enSuffix: true,
          path: '/result'
        },
        {
          en: 'Skeleton',
          zh: '骨架屏',
          enSuffix: true,
          path: '/skeleton'
        },
        {
          en: 'Spin',
          zh: '加载',
          enSuffix: true,
          path: '/spin'
        },
        {
          en: 'Tooltip',
          zh: '弹出提示',
          enSuffix: true,
          path: '/tooltip'
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
          path: '/layout'
        },
        {
          en: 'Legacy Grid',
          zh: '旧版栅格',
          enSuffix: true,
          path: '/legacy-grid'
        },
        {
          en: 'Grid',
          zh: '栅格',
          enSuffix: true,
          path: '/grid'
        },
        {
          en: 'Space',
          zh: '间距',
          enSuffix: true,
          path: '/space'
        }
      ]
    }),
    appendCounts({
      zh: '工具组件',
      en: 'Utility Components',
      type: 'group',
      children: [
        {
          en: 'Collapse Transition',
          zh: '折叠渐变',
          enSuffix: true,
          path: '/collapse-transition'
        },
        {
          en: 'Discrete API',
          zh: '独立 API',
          enSuffix: true,
          path: '/discrete'
        },
        {
          en: 'Scrollbar',
          zh: '滚动条',
          enSuffix: true,
          path: '/scrollbar'
        }
      ]
    }),
    appendCounts({
      zh: '配置组件',
      en: 'Config Components',
      type: 'group',
      children: [
        {
          en: 'Config Provider',
          zh: '全局化配置',
          enSuffix: true,
          path: '/config-provider'
        },
        {
          en: 'Element',
          zh: '元素',
          enSuffix: true,
          path: '/element'
        },
        {
          en: 'Global Style',
          zh: '全局样式',
          enSuffix: true,
          path: '/global-style'
        }
      ]
    }),
    appendCounts({
      zh: '废弃的组件',
      en: 'Deprecated Components',
      type: 'group',
      children: [
        {
          en: 'Legacy Transfer',
          zh: '旧版穿梭框',
          enSuffix: true,
          path: '/legacy-transfer'
        }
      ]
    })
  ])
}
