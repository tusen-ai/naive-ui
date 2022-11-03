import type { NLocale } from './enUS'

const jaJP: NLocale = {
  name: 'ja-JP',
  global: {
    undo: '元に戻す',
    redo: 'やり直す',
    confirm: 'OK',
    clear: 'クリア'
  },
  Popconfirm: {
    positiveText: 'OK',
    negativeText: 'キャンセル'
  },
  Cascader: {
    placeholder: '選択してください',
    loading: 'ロード中',
    loadingRequiredMessage: (label: string): string =>
      `すべての ${label} サブノードをロードしてから選択できます。`
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
    clear: 'クリア',
    now: '現在',
    confirm: 'OK',
    selectTime: '時間を選択',
    selectDate: '日付を選択',
    datePlaceholder: '日付を選択',
    datetimePlaceholder: '選択',
    monthPlaceholder: '月を選択',
    yearPlaceholder: '年を選択',
    quarterPlaceholder: '四半期を選択',
    startDatePlaceholder: '開始日',
    endDatePlaceholder: '終了日',
    startDatetimePlaceholder: '開始時間',
    endDatetimePlaceholder: '終了時間',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: false,
    firstDayOfWeek: 0,
    today: '今日'
  },
  DataTable: {
    checkTableAll: '全選択',
    uncheckTableAll: '全選択取消',
    confirm: 'OK',
    clear: 'リセット'
  },
  LegacyTransfer: {
    sourceTitle: '元',
    targetTitle: '先'
  },
  // TODO: translation
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (num: number): string => `Total ${num} items`,
    selected: (num: number): string => `${num} items selected`
  },
  Empty: {
    description: 'データなし'
  },
  Select: {
    placeholder: '選択してください'
  },
  TimePicker: {
    placeholder: '選択してください',
    positiveText: 'OK',
    negativeText: 'キャンセル',
    now: '現在'
  },
  Pagination: {
    goto: 'ページジャンプ',
    selectionSuffix: 'ページ'
  },
  DynamicTags: {
    add: '追加'
  },
  Log: {
    loading: 'ロード中'
  },
  Input: {
    placeholder: '入力してください'
  },
  InputNumber: {
    placeholder: '入力してください'
  },
  DynamicInput: {
    create: '追加'
  },
  ThemeEditor: {
    title: 'テーマエディタ',
    clearAllVars: '全件変数クリア',
    clearSearch: '検索クリア',
    filterCompName: 'コンポネント名をフィルタ',
    filterVarName: '変数をフィルタ',
    import: 'インポート',
    export: 'エクスポート',
    restore: 'デフォルト'
  },
  Image: {
    tipPrevious: '前の画像 (←)',
    tipNext: '次の画像 (→)',
    tipCounterclockwise: '左に回転',
    tipClockwise: '右に回転',
    tipZoomOut: '縮小',
    tipZoomIn: '拡大',
    tipClose: '閉じる (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default jaJP
