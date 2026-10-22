import type { NLocale } from './enUS'

const mnMN: NLocale = {
  name: 'mn-MN',
  global: {
    undo: 'Буцаах',
    redo: 'Дахин хийх',
    confirm: 'Батлах',
    clear: 'Цэвэрлэх'
  },
  Popconfirm: {
    positiveText: 'Батлах',
    negativeText: 'Цуцлах'
  },
  Cascader: {
    placeholder: 'Сонгоно уу',
    loading: 'Ачаалж байна',
    loadingRequiredMessage: (label: string): string =>
      `${label}-н бүх дэд зүйлийг сонгохоосоо өмнө ачаална уу.`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Цэвэрлэх',
    now: 'Одоо',
    confirm: 'Батлах',
    selectTime: 'Цаг сонгох',
    selectDate: 'Огноо сонгох',
    datePlaceholder: 'Огноо сонгох',
    datetimePlaceholder: 'Огноо ба цаг сонгох',
    monthPlaceholder: 'Сар сонгох',
    yearPlaceholder: 'Жил сонгох',
    quarterPlaceholder: 'Улирал сонгох',
    weekPlaceholder: 'Долоо хоног сонгох',
    startDatePlaceholder: 'Эхлэх огноо',
    endDatePlaceholder: 'Дуусах огноо',
    startDatetimePlaceholder: 'Эхлэх огноо ба цаг',
    endDatetimePlaceholder: 'Дуусах огноо ба цаг',
    startMonthPlaceholder: 'Эхлэх сар',
    endMonthPlaceholder: 'Дуусах сар',
    monthBeforeYear: false,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Өнөөдөр'
  },
  DataTable: {
    checkTableAll: 'Хүснэгтийн бүгдийг сонгох',
    uncheckTableAll: 'Хүснэгтийн сонголтыг цэвэрлэх',
    confirm: 'Батлах',
    clear: 'Цэвэрлэх'
  },
  LegacyTransfer: {
    sourceTitle: 'Эх сурвалж',
    targetTitle: 'Очих газар'
  },
  Transfer: {
    selectAll: 'Бүгдийг сонгох',
    unselectAll: 'Сонголтыг цэвэрлэх',
    clearAll: 'Цэвэрлэх',
    total: (num: number): string => `Нийт ${num} зүйл`,
    selected: (num: number): string => `${num} зүйл сонгосон`
  },
  Empty: {
    description: 'Өгөгдөл байхгүй'
  },
  Select: {
    placeholder: 'Сонгоно уу'
  },
  TimePicker: {
    placeholder: 'Цаг сонгох',
    positiveText: 'ОК',
    negativeText: 'Цуцлах',
    now: 'Одоо',
    clear: 'Цэвэрлэх'
  },
  Pagination: {
    goto: 'Очих',
    selectionSuffix: 'хуудас'
  },
  DynamicTags: {
    add: 'Нэмэх'
  },
  Log: {
    loading: 'Ачаалж байна'
  },
  Input: {
    placeholder: 'Оруулна уу'
  },
  InputNumber: {
    placeholder: 'Оруулна уу'
  },
  DynamicInput: {
    create: 'Үүсгэх'
  },
  ThemeEditor: {
    title: 'Загвар засварлагч',
    clearAllVars: 'Бүх хувьсагчийг цэвэрлэх',
    clearSearch: 'Хайлтыг цэвэрлэх',
    filterCompName: 'Компонентын нэрээр шүүх',
    filterVarName: 'Хувьсагчийн нэрээр шүүх',
    import: 'Импортлох',
    export: 'Экспортлох',
    restore: 'Анхдагч руу сэргээх'
  },
  Image: {
    tipPrevious: 'Өмнөх зураг (←)',
    tipNext: 'Дараагийн зураг (→)',
    tipCounterclockwise: 'Цагийн зүүний эсрэг',
    tipClockwise: 'Цагийн зүүний дагуу',
    tipZoomOut: 'Жижигрүүлэх',
    tipZoomIn: 'Томруулах',
    tipDownload: 'Татах',
    tipClose: 'Хаах (Esc)',
    tipOriginalSize: 'Жинхэнэ хэмжээнд томруулах'
  },
  Heatmap: {
    less: 'бага',
    more: 'их',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default mnMN
