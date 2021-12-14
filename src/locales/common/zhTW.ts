import type { NLocale } from './enUS'

const zhTW: NLocale = {
  name: 'zh-TW',
  global: {
    undo: '撤銷',
    redo: '重做',
    confirm: '確認'
  },
  Popconfirm: {
    positiveText: '確認',
    negativeText: '取消'
  },
  Cascader: {
    placeholder: '請選擇',
    loading: '載入中',
    loadingRequiredMessage: (label: string): string =>
      `載入全部 ${label} 的子節點後才可選中`
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
    confirm: '確認',
    selectTime: '選擇時間',
    selectDate: '選擇日期',
    datePlaceholder: '選擇日期',
    datetimePlaceholder: '選擇日期時間',
    monthPlaceholder: '選擇月份',
    yearPlaceholder: '選擇年份',
    quarterPlaceholder: '選擇季度',
    startDatePlaceholder: '開始日期',
    endDatePlaceholder: '結束日期',
    startDatetimePlaceholder: '開始日期時間',
    endDatetimePlaceholder: '結束日期時間',
    monthBeforeYear: false,
    firstDayOfWeek: 0,
    today: '今天'
  },
  DataTable: {
    checkTableAll: '選擇全部表格資料',
    uncheckTableAll: '取消選擇全部表格資料',
    confirm: '確認',
    clear: '重置'
  },
  Transfer: {
    sourceTitle: '源項',
    targetTitle: '目標項'
  },
  Empty: {
    description: '無數據'
  },
  Select: {
    placeholder: '請選擇'
  },
  TimePicker: {
    placeholder: '請選擇時間',
    positiveText: '確認',
    negativeText: '取消',
    now: '此刻'
  },
  Pagination: {
    goto: '跳至',
    selectionSuffix: '頁'
  },
  DynamicTags: {
    add: '添加'
  },
  Log: {
    loading: '載入中'
  },
  Input: {
    placeholder: '請輸入'
  },
  InputNumber: {
    placeholder: '請輸入'
  },
  DynamicInput: {
    create: '添加'
  },
  ThemeEditor: {
    title: '主題編輯器',
    clearAllVars: '清除全部變數',
    clearSearch: '清除搜索',
    filterCompName: '過濾組件名',
    filterVarName: '過濾變數名',
    import: '導入',
    export: '匯出',
    restore: '恢復默認'
  }
}

export default zhTW
