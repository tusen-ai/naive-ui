const appendCounts = item => {
  if (!item.childItems) {
    item.count = 1
    return item
  }
  if (item.childItems) {
    item.childItems.forEach(appendCounts)
    item.count = item.childItems.reduce((sum, item) => sum + item.count, 0)
    if (!item.group) {
      item.title = h => {
        return h('n-config-consumer', {
          props: {
            transparent: true
          },
          scopedSlots: {
            default: ({ styleScheme }) => {
              return h('span', {

              }, [ item.name, h('span', {
                style: {
                  color: styleScheme.tertiaryTextColor,
                  fontWeight: '400',
                  transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
                }
              }, [ ' (', item.count, ')' ])])
            }
          }
        })
      }
    } else {
      item.name += ` (${item.count})`
    }
    return item
  }
}

// function renderTitle (main, meta) {
//   return h => {
//     return h('n-config-consumer', {
//       props: {
//         transparent: true
//       },
//       scopedSlots: {
//         default: ({ styleScheme }) => {
//           return h('span', {
//           }, [ main, ' ', h('span', {
//             style: {
//               marginLeft: '6px',
//               color: styleScheme.tertiaryTextColor,
//               fontWeight: '400',
//               transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
//             }
//           }, [ meta ])])
//         }
//       }
//     })
//   }
// }

export default function (locale, instance) {
  if (locale === 'zh-CN') {
    return [
      {
        name: 'Naive UI',
        path: `/${instance.lang}/${instance.theme}` + '/intro'
      },
      {
        name: 'Getting Started',
        title: '起步',
        path: `/${instance.lang}/${instance.theme}` + '/start'
      },
      // {
      //   name: 'Develop Guidelines',
      //   path: `/${instance.lang}/${instance.theme}` + '/dev-guildlines'
      // },
      {
        name: 'Create Themed Component',
        title: '创建适配主题的组件',
        path: `/${instance.lang}/${instance.theme}` + '/n-theme'
      },
      appendCounts({
        name: '配置组件',
        group: true,
        childItems: [
          {
            name: 'Config Provider',
            title: '配置提供者',
            titleExtra: 'Config Provider',
            path: `/${instance.lang}/${instance.theme}` + '/n-config-provider'
          },
          {
            name: 'Config Consumer',
            title: '配置消费者 ',
            titleExtra: 'Config Consumer',
            path: `/${instance.lang}/${instance.theme}` + '/n-config-consumer'
          },
          {
            name: 'Element',
            title: '元素',
            titleExtra: 'Element',
            path: `/${instance.lang}/${instance.theme}` + '/n-element'
          }
        ]
      }),
      appendCounts({
        name: '布局组件',
        group: true,
        childItems: [
          {
            name: 'Layout',
            title: '布局',
            titleExtra: 'Layout',
            path: `/${instance.lang}/${instance.theme}` + '/n-layout'
          },
          {
            name: 'Grid',
            title: '栅格',
            titleExtra: 'Grid',
            path: `/${instance.lang}/${instance.theme}` + '/n-grid'
          }
        ]
      }),
      appendCounts({
        name: '通用组件',
        group: true,
        childItems: [
          {
            name: 'Avatar',
            title: '头像',
            titleExtra: 'Avatar',
            path: `/${instance.lang}/${instance.theme}` + '/n-avatar'
          },
          {
            name: 'Button',
            title: '按钮',
            titleExtra: 'Button',
            path: `/${instance.lang}/${instance.theme}` + '/n-button'
          },
          {
            name: 'Card',
            title: '卡片',
            titleExtra: 'Card',
            path: `/${instance.lang}/${instance.theme}` + '/n-card'
          },
          {
            name: 'Collapse',
            title: '折叠面板',
            titleExtra: 'Collapse',
            path: `/${instance.lang}/${instance.theme}` + '/n-collapse'
          },
          {
            name: 'Divider',
            title: '分割线',
            titleExtra: 'Divider',
            path: `/${instance.lang}/${instance.theme}` + '/n-divider'
          },
          {
            name: 'Dropdown',
            title: '下拉菜单',
            titleExtra: 'Dropdown',
            path: `/${instance.lang}/${instance.theme}` + '/n-dropdown'
          },
          {
            name: 'Gradient Text',
            title: '渐变文字',
            titleExtra: 'Gradient Text',
            path: `/${instance.lang}/${instance.theme}` + '/n-gradient-text'
          },
          {
            name: 'Icon',
            title: '图标',
            titleExtra: 'Icon',
            path: `/${instance.lang}/${instance.theme}` + '/n-icon'
          },
          {
            name: 'Tag',
            title: '标签',
            titleExtra: 'Tag',
            path: `/${instance.lang}/${instance.theme}` + '/n-tag'
          },
          {
            name: 'Typography',
            title: '排版',
            titleExtra: 'Typography',
            path: `/${instance.lang}/${instance.theme}` + '/n-typography'
          }
        ]
      }),
      appendCounts({
        name: '数据录入组件',
        group: true,
        childItems: [
          {
            name: 'Auto Complete',
            title: '自动填充',
            titleExtra: 'Auto Complete',
            path: `/${instance.lang}/${instance.theme}` + '/n-auto-complete'
          },
          {
            name: 'Cascader',
            title: '级联选择',
            titleExtra: 'Cascader',
            path: `/${instance.lang}/${instance.theme}` + '/n-cascader'
          },
          {
            name: 'Checkbox',
            title: '复选框',
            titleExtra: 'Checkbox',
            path: `/${instance.lang}/${instance.theme}` + '/n-checkbox'
          },
          {
            name: 'Custom Input (in progress)',
            title: '自定义输入',
            titleExtra: 'Custom Input',
            path: `/${instance.lang}/${instance.theme}` + '/n-custom-input'
          },
          {
            name: 'Date Picker',
            title: '日期选择器',
            titleExtra: 'Date Picker',
            path: `/${instance.lang}/${instance.theme}` + '/n-date-picker'
          },
          {
            name: 'Form',
            title: '表单',
            titleExtra: 'Form',
            path: `/${instance.lang}/${instance.theme}` + '/n-form'
          },
          {
            name: 'Input',
            title: '文本输入',
            titleExtra: 'Input',
            path: `/${instance.lang}/${instance.theme}` + '/n-input'
          },
          {
            name: 'Input Number',
            title: '数字输入',
            titleExtra: 'Input Number',
            path: `/${instance.lang}/${instance.theme}` + '/n-input-number'
          },
          {
            name: 'Radio',
            title: '单选',
            titleExtra: 'Radio',
            path: `/${instance.lang}/${instance.theme}` + '/n-radio'
          },
          {
            name: 'Select',
            title: '选择器',
            titleExtra: 'Select',
            path: `/${instance.lang}/${instance.theme}` + '/n-select'
          },
          {
            name: 'Slider',
            title: '滑动选择',
            titleExtra: 'Slider',
            path: `/${instance.lang}/${instance.theme}` + '/n-slider'
          },
          {
            name: 'Switch',
            title: '开关',
            titleExtra: 'Switch',
            path: `/${instance.lang}/${instance.theme}` + '/n-switch'
          },
          {
            name: 'Time Picker',
            title: '时间选择器',
            titleExtra: 'Time Picker',
            path: `/${instance.lang}/${instance.theme}` + '/n-time-picker'
          },
          {
            name: 'Transfer',
            title: '穿梭框',
            titleExtra: 'Transfer',
            path: `/${instance.lang}/${instance.theme}` + '/n-transfer'
          }
        ]
      }),
      appendCounts({
        name: '数据展示组件',
        group: true,
        childItems: [
          {
            name: 'Code',
            title: '代码',
            titleExtra: 'Code',
            path: `/${instance.lang}/${instance.theme}` + '/n-code'
          },
          {
            name: 'Data Table',
            title: '数据表格',
            titleExtra: 'Data Table',
            path: `/${instance.lang}/${instance.theme}` + '/n-data-table'
          },
          {
            name: 'Descriptions',
            title: '描述',
            titleExtra: 'Descriptions',
            path: `/${instance.lang}/${instance.theme}` + '/n-descriptions'
          },
          {
            name: 'Empty',
            title: '无内容',
            titleExtra: 'Empty',
            path: `/${instance.lang}/${instance.theme}` + '/n-empty'
          },
          {
            name: 'List',
            title: '列表',
            titleExtra: 'List',
            path: `/${instance.lang}/${instance.theme}` + '/n-list'
          },
          {
            name: 'Log',
            title: '日志',
            titleExtra: 'Log',
            path: `/${instance.lang}/${instance.theme}` + '/n-log'
          },
          {
            name: 'Statistic',
            title: '统计数据',
            titleExtra: 'Statistic',
            path: `/${instance.lang}/${instance.theme}` + '/n-statistic'
          },
          {
            name: 'Thing',
            title: '东西',
            titleExtra: 'Thing',
            path: `/${instance.lang}/${instance.theme}` + '/n-thing'
          },
          {
            name: 'Time',
            title: '事件',
            titleExtra: 'Time',
            path: `/${instance.lang}/${instance.theme}` + '/n-time'
          },
          {
            name: 'Timeline',
            title: '时间线',
            titleExtra: 'Timeline',
            path: `/${instance.lang}/${instance.theme}` + '/n-timeline'
          },
          {
            name: 'Tree (in progress)',
            title: '树',
            titleExtra: 'Tree',
            path: `/${instance.lang}/${instance.theme}` + '/n-tree'
          }
        ]
      }),
      appendCounts({
        name: '导航组件',
        group: true,
        childItems: [
          {
            name: 'Affix',
            title: '固钉',
            titleExtra: 'Affix',
            path: `/${instance.lang}/${instance.theme}` + '/n-affix'
          },
          {
            name: 'Anchor',
            title: '侧边导航',
            titleExtra: 'Anchor',
            path: `/${instance.lang}/${instance.theme}` + '/n-anchor'
          },
          {
            name: 'Back Top',
            title: '回到顶部',
            titleExtra: 'Back Top',
            path: `/${instance.lang}/${instance.theme}` + '/n-back-top'
          },
          {
            name: 'Breadcrumb',
            title: '面包屑',
            titleExtra: 'Breadcrumb',
            path: `/${instance.lang}/${instance.theme}` + '/n-breadcrumb'
          },
          {
            name: 'Loading Bar',
            title: '加载条',
            titleExtra: 'Loading Bar',
            path: `/${instance.lang}/${instance.theme}` + '/n-loading-bar'
          },
          {
            name: 'Menu',
            title: '菜单',
            titleExtra: 'Menu',
            path: `/${instance.lang}/${instance.theme}` + '/n-menu'
          },
          {
            name: 'Pagination',
            title: '分页',
            titleExtra: 'Pagination',
            path: `/${instance.lang}/${instance.theme}` + '/n-pagination'
          },
          {
            name: 'Steps',
            title: '步骤',
            titleExtra: 'Steps',
            path: `/${instance.lang}/${instance.theme}` + '/n-steps'
          },
          {
            name: 'Tabs',
            title: '标签页',
            titleExtra: 'Tabs',
            path: `/${instance.lang}/${instance.theme}` + '/n-tabs'
          }
        ]
      }),
      appendCounts({
        name: '反馈组件',
        group: true,
        childItems: [
          {
            name: 'Alert',
            title: '警告信息',
            titleExtra: 'Alerts',
            path: `/${instance.lang}/${instance.theme}` + '/n-alert'
          },
          {
            name: 'Badge',
            title: '标记',
            titleExtra: 'Badge',
            path: `/${instance.lang}/${instance.theme}` + '/n-badge'
          },
          {
            name: 'Confirm',
            title: '确认',
            titleExtra: 'Confirm',
            path: `/${instance.lang}/${instance.theme}` + '/n-confirm'
          },
          {
            name: 'Drawer',
            title: '抽屉',
            titleExtra: 'Drawer',
            path: `/${instance.lang}/${instance.theme}` + '/n-drawer'
          },
          {
            name: 'Message',
            title: '信息',
            titleExtra: 'Message',
            path: `/${instance.lang}/${instance.theme}` + '/n-message'
          },
          {
            name: 'Modal',
            title: '模态框',
            titleExtra: 'Modal',
            path: `/${instance.lang}/${instance.theme}` + '/n-modal'
          },
          {
            name: 'Notification',
            title: '通知',
            titleExtra: 'Notification',
            path: `/${instance.lang}/${instance.theme}` + '/n-notification'
          },
          {
            name: 'Popover',
            title: '弹出信息',
            titleExtra: 'Popover',
            path: `/${instance.lang}/${instance.theme}` + '/n-popover'
          },
          {
            name: 'Popconfirm',
            title: '弹出确认',
            titleExtra: 'Popconfirm',
            path: `/${instance.lang}/${instance.theme}` + '/n-popconfirm'
          },
          {
            name: 'Popselect',
            title: '弹出选择',
            titleExtra: 'Popconfirm',
            path: `/${instance.lang}/${instance.theme}` + '/n-popselect'
          },
          {
            name: 'Progress',
            title: '进度',
            titleExtra: 'Progress',
            path: `/${instance.lang}/${instance.theme}` + '/n-progress'
          },
          {
            name: 'Result',
            title: '结果页',
            titleExtra: 'Result',
            path: `/${instance.lang}/${instance.theme}` + '/n-result'
          },
          {
            name: 'Spin',
            title: '加载',
            titleExtra: 'Spin',
            path: `/${instance.lang}/${instance.theme}` + '/n-spin'
          },
          {
            name: 'Tooltip',
            title: '弹出提示',
            titleExtra: 'Tooltip',
            path: `/${instance.lang}/${instance.theme}` + '/n-tooltip'
          }
        ]
      })
      // {
      //   name: '废弃的',
      //   path: `/${instance.lang}/${instance.theme}` + '/',
      //   childItems: [
      //     {
      //       name: '服务布局',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-nimbus-service-layout'
      //     }
      //   ]
      // },
      // {
      //   name: 'Debug',
      //   childItems: [
      //     {
      //       name: 'CancelMarkDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-base-suffix-debug'
      //     },
      //     {
      //       name: 'PopoverDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-popover-debug'
      //     },
      //     {
      //       name: 'RouterDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-router-debug'
      //     },
      //     {
      //       name: 'ModalDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-modal-debug'
      //     },
      //     {
      //       name: 'ScrollbarDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-scrollbar-debug'
      //     },
      //     {
      //       name: 'ScrollbarDebug2',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-scrollbar-debug2'
      //     },
      //     {
      //       name: 'DatePickerDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-date-picker-debug'
      //     },
      //     {
      //       name: 'BackTopDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-back-top-debug'
      //     },
      //     {
      //       name: 'CascaderDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-cascader-debug'
      //     },
      //     {
      //       name: 'VerticalAlignDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-vertical-align-debug'
      //     },
      //     {
      //       name: 'IconTransitionDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-icon-transition-debug'
      //     },
      //     {
      //       name: 'SelectDebug',
      //       path: `/${instance.lang}/${instance.theme}` + '/n-select-debug'
      //     }
      //   ]
      // }
    ]
  } else {
    return [
      {
        name: 'Naive UI',
        path: `/${instance.lang}/${instance.theme}` + '/intro'
      },
      {
        name: 'Getting Started',
        path: `/${instance.lang}/${instance.theme}` + '/start'
      },
      // {
      //   name: 'Develop Guidelines',
      //   path: `/${instance.lang}/${instance.theme}` + '/dev-guildlines'
      // },
      {
        name: 'Create Themed Component',
        path: `/${instance.lang}/${instance.theme}` + '/n-theme'
      },
      appendCounts({
        name: 'Config Components',
        group: true,
        childItems: [
          {
            name: 'Config Provider',
            path: `/${instance.lang}/${instance.theme}` + '/n-config-provider'
          },
          {
            name: 'Config Consumer',
            path: `/${instance.lang}/${instance.theme}` + '/n-config-consumer'
          },
          {
            name: 'Element',
            path: `/${instance.lang}/${instance.theme}` + '/n-element'
          }
        ]
      }),
      appendCounts({
        name: 'Layout Components',
        group: true,
        childItems: [
          {
            name: 'Layout',
            path: `/${instance.lang}/${instance.theme}` + '/n-layout'
          },
          {
            name: 'Grid',
            path: `/${instance.lang}/${instance.theme}` + '/n-grid'
          }
        ]
      }),
      appendCounts({
        name: 'Common Components',
        group: true,
        childItems: [
          {
            name: 'Avatar',
            path: `/${instance.lang}/${instance.theme}` + '/n-avatar'
          },
          {
            name: 'Button',
            path: `/${instance.lang}/${instance.theme}` + '/n-button'
          },
          {
            name: 'Card',
            path: `/${instance.lang}/${instance.theme}` + '/n-card'
          },
          {
            name: 'Collapse',
            path: `/${instance.lang}/${instance.theme}` + '/n-collapse'
          },
          {
            name: 'Divider',
            path: `/${instance.lang}/${instance.theme}` + '/n-divider'
          },
          {
            name: 'Dropdown',
            path: `/${instance.lang}/${instance.theme}` + '/n-dropdown'
          },
          {
            name: 'Gradient Text',
            path: `/${instance.lang}/${instance.theme}` + '/n-gradient-text'
          },
          {
            name: 'Icon',
            path: `/${instance.lang}/${instance.theme}` + '/n-icon'
          },
          {
            name: 'Tag',
            path: `/${instance.lang}/${instance.theme}` + '/n-tag'
          },
          {
            name: 'Typography',
            path: `/${instance.lang}/${instance.theme}` + '/n-typography'
          }
        ]
      }),
      appendCounts({
        name: 'Data Input Components',
        group: true,
        childItems: [
          {
            name: 'Auto Complete',
            path: `/${instance.lang}/${instance.theme}` + '/n-auto-complete'
          },
          {
            name: 'Cascader',
            path: `/${instance.lang}/${instance.theme}` + '/n-cascader'
          },
          {
            name: 'Checkbox',
            path: `/${instance.lang}/${instance.theme}` + '/n-checkbox'
          },
          {
            name: 'Custom Input (in progress)',
            path: `/${instance.lang}/${instance.theme}` + '/n-custom-input'
          },
          {
            name: 'Date Picker',
            path: `/${instance.lang}/${instance.theme}` + '/n-date-picker'
          },
          {
            name: 'Form',
            path: `/${instance.lang}/${instance.theme}` + '/n-form'
          },
          {
            name: 'Input',
            path: `/${instance.lang}/${instance.theme}` + '/n-input'
          },
          {
            name: 'Input Number',
            path: `/${instance.lang}/${instance.theme}` + '/n-input-number'
          },
          {
            name: 'Radio',
            path: `/${instance.lang}/${instance.theme}` + '/n-radio'
          },
          {
            name: 'Select',
            path: `/${instance.lang}/${instance.theme}` + '/n-select'
          },
          {
            name: 'Slider',
            path: `/${instance.lang}/${instance.theme}` + '/n-slider'
          },
          {
            name: 'Switch',
            path: `/${instance.lang}/${instance.theme}` + '/n-switch'
          },
          {
            name: 'Time Picker',
            path: `/${instance.lang}/${instance.theme}` + '/n-time-picker'
          },
          {
            name: 'Transfer',
            path: `/${instance.lang}/${instance.theme}` + '/n-transfer'
          }
        ]
      }),
      appendCounts({
        name: 'Data Display Components',
        group: true,
        childItems: [
          {
            name: 'Code',
            path: `/${instance.lang}/${instance.theme}` + '/n-code'
          },
          {
            name: 'Data Table',
            path: `/${instance.lang}/${instance.theme}` + '/n-data-table'
          },
          {
            name: 'Descriptions',
            path: `/${instance.lang}/${instance.theme}` + '/n-descriptions'
          },
          {
            name: 'Empty',
            path: `/${instance.lang}/${instance.theme}` + '/n-empty'
          },
          {
            name: 'List',
            path: `/${instance.lang}/${instance.theme}` + '/n-list'
          },
          {
            name: 'Log',
            path: `/${instance.lang}/${instance.theme}` + '/n-log'
          },
          {
            name: 'Statistic',
            path: `/${instance.lang}/${instance.theme}` + '/n-statistic'
          },
          {
            name: 'Thing',
            path: `/${instance.lang}/${instance.theme}` + '/n-thing'
          },
          {
            name: 'Time',
            path: `/${instance.lang}/${instance.theme}` + '/n-time'
          },
          {
            name: 'Timeline',
            path: `/${instance.lang}/${instance.theme}` + '/n-timeline'
          },
          {
            name: 'Tree (in progress)',
            path: `/${instance.lang}/${instance.theme}` + '/n-tree'
          }
        ]
      }),
      appendCounts({
        name: 'Navigation Components',
        group: true,
        childItems: [
          {
            name: 'Affix',
            path: `/${instance.lang}/${instance.theme}` + '/n-affix'
          },
          {
            name: 'Anchor',
            path: `/${instance.lang}/${instance.theme}` + '/n-anchor'
          },
          {
            name: 'Back Top',
            path: `/${instance.lang}/${instance.theme}` + '/n-back-top'
          },
          {
            name: 'Breadcrumb',
            path: `/${instance.lang}/${instance.theme}` + '/n-breadcrumb'
          },
          {
            name: 'Loading Bar',
            path: `/${instance.lang}/${instance.theme}` + '/n-loading-bar'
          },
          {
            name: 'Menu',
            path: `/${instance.lang}/${instance.theme}` + '/n-menu'
          },
          {
            name: 'Pagination',
            path: `/${instance.lang}/${instance.theme}` + '/n-pagination'
          },
          {
            name: 'Steps',
            path: `/${instance.lang}/${instance.theme}` + '/n-steps'
          },
          {
            name: 'Tabs',
            path: `/${instance.lang}/${instance.theme}` + '/n-tabs'
          }
        ]
      }),
      appendCounts({
        name: 'Feedback Components',
        group: true,
        childItems: [
          {
            name: 'Alert',
            path: `/${instance.lang}/${instance.theme}` + '/n-alert'
          },
          {
            name: 'Badge',
            path: `/${instance.lang}/${instance.theme}` + '/n-badge'
          },
          {
            name: 'Confirm',
            path: `/${instance.lang}/${instance.theme}` + '/n-confirm'
          },
          {
            name: 'Drawer',
            path: `/${instance.lang}/${instance.theme}` + '/n-drawer'
          },
          {
            name: 'Message',
            path: `/${instance.lang}/${instance.theme}` + '/n-message'
          },
          {
            name: 'Modal',
            path: `/${instance.lang}/${instance.theme}` + '/n-modal'
          },
          {
            name: 'Notification',
            path: `/${instance.lang}/${instance.theme}` + '/n-notification'
          },
          {
            name: 'Popover',
            path: `/${instance.lang}/${instance.theme}` + '/n-popover'
          },
          {
            name: 'Popconfirm',
            path: `/${instance.lang}/${instance.theme}` + '/n-popconfirm'
          },
          {
            name: 'Popselect',
            path: `/${instance.lang}/${instance.theme}` + '/n-popselect'
          },
          {
            name: 'Progress',
            path: `/${instance.lang}/${instance.theme}` + '/n-progress'
          },
          {
            name: 'Result',
            path: `/${instance.lang}/${instance.theme}` + '/n-result'
          },
          {
            name: 'Spin',
            path: `/${instance.lang}/${instance.theme}` + '/n-spin'
          },
          {
            name: 'Tooltip',
            path: `/${instance.lang}/${instance.theme}` + '/n-tooltip'
          }
        ]
      }),
      {
        name: 'Deprecated',
        path: `/${instance.lang}/${instance.theme}` + '/',
        childItems: [
          {
            name: 'Nimbus Service Layout',
            path: `/${instance.lang}/${instance.theme}` + '/n-nimbus-service-layout'
          }
        ]
      },
      {
        name: 'Debug',
        childItems: [
          {
            name: 'SuffixDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-base-suffix-debug'
          },
          {
            name: 'PopoverDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-popover-debug'
          },
          {
            name: 'RouterDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-router-debug'
          },
          {
            name: 'ModalDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-modal-debug'
          },
          {
            name: 'ScrollbarDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-scrollbar-debug'
          },
          {
            name: 'ScrollbarDebug2',
            path: `/${instance.lang}/${instance.theme}` + '/n-scrollbar-debug2'
          },
          {
            name: 'DatePickerDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-date-picker-debug'
          },
          {
            name: 'BackTopDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-back-top-debug'
          },
          {
            name: 'CascaderDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-cascader-debug'
          },
          {
            name: 'VerticalAlignDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-vertical-align-debug'
          },
          {
            name: 'IconTransitionDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-icon-transition-debug'
          },
          {
            name: 'SelectDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-select-debug'
          }
        ]
      }
    ]
  }
}
