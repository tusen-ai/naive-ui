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

function renderTitle (main, meta) {
  return h => {
    return h('n-config-consumer', {
      props: {
        transparent: true
      },
      scopedSlots: {
        default: ({ styleScheme }) => {
          return h('span', {
          }, [ main, ' ', h('span', {
            style: {
              marginLeft: '6px',
              color: styleScheme.tertiaryTextColor,
              fontWeight: '400',
              transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
            }
          }, [ meta ])])
        }
      }
    })
  }
}

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
            title: renderTitle('配置提供者', 'Config Provider'),
            path: `/${instance.lang}/${instance.theme}` + '/n-config-provider'
          },
          {
            name: 'Config Consumer',
            title: renderTitle('配置消费者 ', 'Config Consumer'),
            path: `/${instance.lang}/${instance.theme}` + '/n-config-consumer'
          },
          {
            name: 'Element',
            title: renderTitle('元素', 'Element'),
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
            title: renderTitle('布局', 'Layout'),
            path: `/${instance.lang}/${instance.theme}` + '/n-layout'
          },
          {
            name: 'Grid',
            title: renderTitle('栅格', 'Grid'),
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
            title: renderTitle('头像', 'Avatar'),
            path: `/${instance.lang}/${instance.theme}` + '/n-avatar'
          },
          {
            name: 'Button',
            title: renderTitle('按钮', 'Button'),
            path: `/${instance.lang}/${instance.theme}` + '/n-button'
          },
          {
            name: 'Card',
            title: renderTitle('卡片', 'Card'),
            path: `/${instance.lang}/${instance.theme}` + '/n-card'
          },
          {
            name: 'Collapse',
            title: renderTitle('折叠面板', 'Collapse'),
            path: `/${instance.lang}/${instance.theme}` + '/n-collapse'
          },
          {
            name: 'Divider',
            title: renderTitle('分割线', 'Divider'),
            path: `/${instance.lang}/${instance.theme}` + '/n-divider'
          },
          {
            name: 'Dropdown',
            title: renderTitle('下拉菜单', 'Dropdown'),
            path: `/${instance.lang}/${instance.theme}` + '/n-dropdown'
          },
          {
            name: 'Gradient Text',
            title: renderTitle('渐变文字', 'Gradient Text'),
            path: `/${instance.lang}/${instance.theme}` + '/n-gradient-text'
          },
          {
            name: 'Icon',
            title: renderTitle('图标', 'Icon'),
            path: `/${instance.lang}/${instance.theme}` + '/n-icon'
          },
          {
            name: 'Tag',
            title: renderTitle('标签', 'Tag'),
            path: `/${instance.lang}/${instance.theme}` + '/n-tag'
          },
          {
            name: 'Typography',
            title: renderTitle('排版', 'Typography'),
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
            title: renderTitle('自动填充', 'Auto Complete'),
            path: `/${instance.lang}/${instance.theme}` + '/n-auto-complete'
          },
          {
            name: 'Cascader',
            title: renderTitle('级联选择', 'Cascader'),
            path: `/${instance.lang}/${instance.theme}` + '/n-cascader'
          },
          {
            name: 'Checkbox',
            title: renderTitle('复选框', 'Checkbox'),
            path: `/${instance.lang}/${instance.theme}` + '/n-checkbox'
          },
          {
            name: 'Custom Input (in progress)',
            title: renderTitle('自定义输入', 'Custom Input'),
            path: `/${instance.lang}/${instance.theme}` + '/n-custom-input'
          },
          {
            name: 'Date Picker',
            title: renderTitle('日期选择器', 'Date Picker'),
            path: `/${instance.lang}/${instance.theme}` + '/n-date-picker'
          },
          {
            name: 'Form',
            title: renderTitle('表单', 'Form'),
            path: `/${instance.lang}/${instance.theme}` + '/n-form'
          },
          {
            name: 'Input',
            title: renderTitle('文本输入', 'Input'),
            path: `/${instance.lang}/${instance.theme}` + '/n-input'
          },
          {
            name: 'Input Number',
            title: renderTitle('数字输入', 'Input Number'),
            path: `/${instance.lang}/${instance.theme}` + '/n-input-number'
          },
          {
            name: 'Radio',
            title: renderTitle('单选', 'Radio'),
            path: `/${instance.lang}/${instance.theme}` + '/n-radio'
          },
          {
            name: 'Select',
            title: renderTitle('选择器', 'Select'),
            path: `/${instance.lang}/${instance.theme}` + '/n-select'
          },
          {
            name: 'Slider',
            title: renderTitle('滑动选择', 'Slider'),
            path: `/${instance.lang}/${instance.theme}` + '/n-slider'
          },
          {
            name: 'Switch',
            title: renderTitle('开关', 'Switch'),
            path: `/${instance.lang}/${instance.theme}` + '/n-switch'
          },
          {
            name: 'Time Picker',
            title: renderTitle('时间选择器', 'Time Picker'),
            path: `/${instance.lang}/${instance.theme}` + '/n-time-picker'
          },
          {
            name: 'Transfer',
            title: renderTitle('穿梭框', 'Transfer'),
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
            title: renderTitle('代码', 'Code'),
            path: `/${instance.lang}/${instance.theme}` + '/n-code'
          },
          {
            name: 'Data Table',
            title: renderTitle('数据表格', 'Data Table'),
            path: `/${instance.lang}/${instance.theme}` + '/n-data-table'
          },
          {
            name: 'Descriptions',
            title: renderTitle('描述', 'Descriptions'),
            path: `/${instance.lang}/${instance.theme}` + '/n-descriptions'
          },
          {
            name: 'Empty',
            title: renderTitle('无内容', 'Empty'),
            path: `/${instance.lang}/${instance.theme}` + '/n-empty'
          },
          {
            name: 'List',
            title: renderTitle('列表', 'List'),
            path: `/${instance.lang}/${instance.theme}` + '/n-list'
          },
          {
            name: 'Log',
            title: renderTitle('日志', 'Log'),
            path: `/${instance.lang}/${instance.theme}` + '/n-log'
          },
          {
            name: 'Statistic',
            title: renderTitle('统计数据', 'Statistic'),
            path: `/${instance.lang}/${instance.theme}` + '/n-statistic'
          },
          {
            name: 'Thing',
            title: renderTitle('东西', 'Thing'),
            path: `/${instance.lang}/${instance.theme}` + '/n-thing'
          },
          {
            name: 'Time',
            title: renderTitle('事件', 'Time'),
            path: `/${instance.lang}/${instance.theme}` + '/n-time'
          },
          {
            name: 'Timeline',
            title: renderTitle('时间线', 'Timeline'),
            path: `/${instance.lang}/${instance.theme}` + '/n-timeline'
          },
          {
            name: 'Tree (in progress)',
            title: renderTitle('树', 'Tree'),
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
            title: renderTitle('固钉', 'Affix'),
            path: `/${instance.lang}/${instance.theme}` + '/n-affix'
          },
          {
            name: 'Anchor',
            title: renderTitle('侧边导航', 'Anchor'),
            path: `/${instance.lang}/${instance.theme}` + '/n-anchor'
          },
          {
            name: 'Back Top',
            title: renderTitle('回到顶部', 'Back Top'),
            path: `/${instance.lang}/${instance.theme}` + '/n-back-top'
          },
          {
            name: 'Breadcrumb',
            title: renderTitle('面包屑', 'Breadcrumb'),
            path: `/${instance.lang}/${instance.theme}` + '/n-breadcrumb'
          },
          {
            name: 'Loading Bar',
            title: renderTitle('加载条', 'Loading Bar'),
            path: `/${instance.lang}/${instance.theme}` + '/n-loading-bar'
          },
          {
            name: 'Menu',
            title: renderTitle('菜单', 'Menu'),
            path: `/${instance.lang}/${instance.theme}` + '/n-menu'
          },
          {
            name: 'Pagination',
            title: renderTitle('分页', 'Pagination'),
            path: `/${instance.lang}/${instance.theme}` + '/n-pagination'
          },
          {
            name: 'Steps',
            title: renderTitle('步骤', 'Steps'),
            path: `/${instance.lang}/${instance.theme}` + '/n-steps'
          },
          {
            name: 'Tabs',
            title: renderTitle('标签页', 'Tabs'),
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
            title: renderTitle('警告信息', 'Alerts'),
            path: `/${instance.lang}/${instance.theme}` + '/n-alert'
          },
          {
            name: 'Badge',
            title: renderTitle('标记', 'Badge'),
            path: `/${instance.lang}/${instance.theme}` + '/n-badge'
          },
          {
            name: 'Confirm',
            title: renderTitle('确认', 'Confirm'),
            path: `/${instance.lang}/${instance.theme}` + '/n-confirm'
          },
          {
            name: 'Drawer',
            title: renderTitle('抽屉', 'Drawer'),
            path: `/${instance.lang}/${instance.theme}` + '/n-drawer'
          },
          {
            name: 'Message',
            title: renderTitle('信息', 'Message'),
            path: `/${instance.lang}/${instance.theme}` + '/n-message'
          },
          {
            name: 'Modal',
            title: renderTitle('模态框', 'Modal'),
            path: `/${instance.lang}/${instance.theme}` + '/n-modal'
          },
          {
            name: 'Notification',
            title: renderTitle('通知', 'Notification'),
            path: `/${instance.lang}/${instance.theme}` + '/n-notification'
          },
          {
            name: 'Popover',
            title: renderTitle('弹出信息', 'Popover'),
            path: `/${instance.lang}/${instance.theme}` + '/n-popover'
          },
          {
            name: 'Popconfirm',
            title: renderTitle('弹出确认', 'Popconfirm'),
            path: `/${instance.lang}/${instance.theme}` + '/n-popconfirm'
          },
          {
            name: 'Popselect',
            title: renderTitle('弹出选择', 'Popconfirm'),
            path: `/${instance.lang}/${instance.theme}` + '/n-popselect'
          },
          {
            name: 'Progress',
            title: renderTitle('进度', 'Progress'),
            path: `/${instance.lang}/${instance.theme}` + '/n-progress'
          },
          {
            name: 'Result',
            title: renderTitle('结果页', 'Result'),
            path: `/${instance.lang}/${instance.theme}` + '/n-result'
          },
          {
            name: 'Spin',
            title: renderTitle('加载', 'Spin'),
            path: `/${instance.lang}/${instance.theme}` + '/n-spin'
          },
          {
            name: 'Tooltip',
            title: renderTitle('弹出提示', 'Tooltip'),
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
      //       path: `/${instance.lang}/${instance.theme}` + '/n-cancel-mark-debug'
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
            name: 'CancelMarkDebug',
            path: `/${instance.lang}/${instance.theme}` + '/n-cancel-mark-debug'
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
