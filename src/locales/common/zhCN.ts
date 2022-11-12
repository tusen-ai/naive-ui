import type { NLocale } from './enUS'

const zhCN: NLocale = {
  name: 'zh-CN',
  global: {
    undo: '撤销',
    redo: '重做',
    confirm: '确认',
    clear: '清除'
  },
  Popconfirm: {
    positiveText: '确认',
    negativeText: '取消'
  },
  Cascader: {
    placeholder: '请选择',
    loading: '加载中',
    loadingRequiredMessage: (label: string): string =>
      `加载全部 ${label} 的子节点后才可选中`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy年',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: '清除',
    now: '此刻',
    confirm: '确认',
    selectTime: '选择时间',
    selectDate: '选择日期',
    datePlaceholder: '选择日期',
    datetimePlaceholder: '选择日期时间',
    monthPlaceholder: '选择月份',
    yearPlaceholder: '选择年份',
    quarterPlaceholder: '选择季度',
    startDatePlaceholder: '开始日期',
    endDatePlaceholder: '结束日期',
    startDatetimePlaceholder: '开始日期时间',
    endDatetimePlaceholder: '结束日期时间',
    startMonthPlaceholder: '开始月份',
    endMonthPlaceholder: '结束月份',
    monthBeforeYear: false,
    firstDayOfWeek: 0,
    today: '今天'
  },
  DataTable: {
    checkTableAll: '选择全部表格数据',
    uncheckTableAll: '取消选择全部表格数据',
    confirm: '确认',
    clear: '重置'
  },
  LegacyTransfer: {
    sourceTitle: '源项',
    targetTitle: '目标项'
  },
  Transfer: {
    selectAll: '全选',
    clearAll: '清除',
    unselectAll: '取消全选',
    total: (num: number): string => `共 ${num} 项`,
    selected: (num: number): string => `已选 ${num} 项`
  },
  Empty: {
    description: '无数据'
  },
  Select: {
    placeholder: '请选择'
  },
  TimePicker: {
    placeholder: '请选择时间',
    positiveText: '确认',
    negativeText: '取消',
    now: '此刻'
  },
  Pagination: {
    goto: '跳至',
    selectionSuffix: '页'
  },
  DynamicTags: {
    add: '添加'
  },
  Log: {
    loading: '加载中'
  },
  Input: {
    placeholder: '请输入'
  },
  InputNumber: {
    placeholder: '请输入'
  },
  DynamicInput: {
    create: '添加'
  },
  ThemeEditor: {
    title: '主题编辑器',
    clearAllVars: '清除全部变量',
    clearSearch: '清除搜索',
    filterCompName: '过滤组件名',
    filterVarName: '过滤变量名',
    import: '导入',
    export: '导出',
    restore: '恢复默认'
  },
  Image: {
    tipPrevious: '上一张（←）',
    tipNext: '下一张（→）',
    tipCounterclockwise: '向左旋转',
    tipClockwise: '向右旋转',
    tipZoomOut: '缩小',
    tipZoomIn: '放大',
    tipClose: '关闭（Esc）',
    tipOriginalSize: '缩放到原始尺寸'
  }
}

export default zhCN
