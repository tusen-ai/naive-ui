import { zhCN } from 'date-fns/locale'

export default {
  _name: 'zh-CN',
  _dateFns: zhCN,
  Popconfirm: {
    positiveText: '确认',
    negativeText: '取消'
  },
  Cascader: {
    placeholder: '请选择',
    loading: '加载中',
    loadingRequiredMessage: (label) => `加载全部 ${label} 的子节点后才可选中`
  },
  DatePicker: {
    Jan: '一月',
    Feb: '二月',
    Mar: '三月',
    Apr: '四月',
    May: '五月',
    Jun: '六月',
    Jul: '七月',
    Aug: '八月',
    Sep: '九月',
    Oct: '十月',
    Nov: '十一月',
    Dec: '十二月',
    Sun: '日',
    Mon: '一',
    Tue: '二',
    Wed: '三',
    Thu: '四',
    Fri: '五',
    Sat: '六',
    separator: '至',
    clear: '清除',
    now: '此刻',
    confirm: '确认',
    selectTime: '选择时间',
    selectDate: '选择日期',
    datePlaceholder: '选择日期',
    datetimePlaceholder: '选择日期时间',
    startDatePlaceholder: '开始日期',
    endDatePlaceholder: '结束日期',
    startDatetimePlaceholder: '开始日期时间',
    endDatetimePlaceholder: '结束日期时间'
  },
  DataTable: {
    confirm: '确认',
    clear: '重置'
  },
  Transfer: {
    sourceTitle: '源项',
    targetTitle: '目标项'
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
  }
}
