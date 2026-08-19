import type { NLocale } from './enUS'

const urPK: NLocale = {
  name: 'ur-PK',
  global: {
    undo: 'کالعدم',
    redo: 'دوبارہ کریں',
    confirm: 'تصدیق',
    clear: 'صاف کریں'
  },
  Popconfirm: {
    positiveText: 'تصدیق',
    negativeText: 'منسوخ'
  },
  Cascader: {
    placeholder: 'براہ کرم منتخب کریں',
    loading: 'لوڈ ہو رہا ہے',
    loadingRequiredMessage: (label: string): string =>
      `براہ کرم نشان زد کرنے سے پہلے ${label} کی تمام ذیلی شاخیں لوڈ کریں۔`
  },
  Time: {
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'صاف کریں',
    now: 'ابھی',
    confirm: 'تصدیق',
    selectTime: 'وقت منتخب کریں',
    selectDate: 'تاریخ منتخب کریں',
    datePlaceholder: 'تاریخ منتخب کریں',
    datetimePlaceholder: 'تاریخ اور وقت منتخب کریں',
    monthPlaceholder: 'مہینہ منتخب کریں',
    yearPlaceholder: 'سال منتخب کریں',
    quarterPlaceholder: 'سہ ماہی منتخب کریں',
    weekPlaceholder: 'ہفتہ منتخب کریں',
    startDatePlaceholder: 'شروع کی تاریخ',
    endDatePlaceholder: 'اختتام کی تاریخ',
    startDatetimePlaceholder: 'شروع کی تاریخ اور وقت',
    endDatetimePlaceholder: 'اختتام کی تاریخ اور وقت',
    startMonthPlaceholder: 'شروع کا مہینہ',
    endMonthPlaceholder: 'اختتام کا مہینہ',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'آج'
  },
  DataTable: {
    checkTableAll: 'جدول میں سب منتخب کریں',
    uncheckTableAll: 'جدول میں سب غیر منتخب کریں',
    confirm: 'تصدیق',
    clear: 'صاف کریں'
  },
  LegacyTransfer: {
    sourceTitle: 'ماخذ',
    targetTitle: 'ہدف'
  },
  Transfer: {
    selectAll: 'سب منتخب کریں',
    unselectAll: 'سب غیر منتخب کریں',
    clearAll: 'صاف کریں',
    total: (num: number): string => `کل ${num} آئٹمز`,
    selected: (num: number): string => `${num} آئٹمز منتخب`
  },
  Empty: {
    description: 'کوئی ڈیٹا نہیں'
  },
  Select: {
    placeholder: 'براہ کرم منتخب کریں'
  },
  TimePicker: {
    placeholder: 'وقت منتخب کریں',
    positiveText: 'ٹھیک ہے',
    negativeText: 'منسوخ',
    now: 'ابھی',
    clear: 'صاف کریں'
  },
  Pagination: {
    goto: 'جائیں',
    selectionSuffix: 'صفحہ'
  },
  DynamicTags: {
    add: 'شامل کریں'
  },
  Log: {
    loading: 'لوڈ ہو رہا ہے'
  },
  Input: {
    placeholder: 'براہ کرم درج کریں'
  },
  InputNumber: {
    placeholder: 'براہ کرم درج کریں'
  },
  DynamicInput: {
    create: 'بنائیں'
  },
  ThemeEditor: {
    title: 'تھیم ایڈیٹر',
    clearAllVars: 'تمام متغیرات صاف کریں',
    clearSearch: 'تلاش صاف کریں',
    filterCompName: 'جزو کا نام فلٹر کریں',
    filterVarName: 'متغیر کا نام فلٹر کریں',
    import: 'درآمد',
    export: 'برآمد',
    restore: 'طے شدہ پر بحال کریں'
  },
  Image: {
    tipPrevious: 'پچھلی تصویر (←)',
    tipNext: 'اگلی تصویر (→)',
    tipCounterclockwise: 'گھڑی کی مخالف سمت',
    tipClockwise: 'گھڑی کی سمت',
    tipZoomOut: 'چھوٹا کریں',
    tipZoomIn: 'بڑا کریں',
    tipDownload: 'ڈاؤن لوڈ',
    tipClose: 'بند کریں (Esc)',
    tipOriginalSize: 'اصل سائز پر زوم کریں'
  },
  Heatmap: {
    less: 'کم',
    more: 'زیادہ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default urPK
