import type { NLocale } from './enUS'

const faIR: NLocale = {
  name: 'fa-IR',
  global: {
    undo: 'لغو انجام شده',
    redo: 'انجام دوباره',
    confirm: 'تأیید',
    clear: 'پاک کردن'
  },
  Popconfirm: {
    positiveText: 'تأیید',
    negativeText: 'لغو'
  },
  Cascader: {
    placeholder: 'لطفا انتخاب کنید',
    loading: 'بارگذاری',
    loadingRequiredMessage: (label: string): string =>
      `پس از بارگیری کامل زیرمجموعه های ${label} می توانید انتخاب کنید `
  },
  Time: {
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd، H:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy سال',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM/yyyy',
    dateFormat: 'yyyy/MM/dd',
    dateTimeFormat: 'yyyy/MM/dd HH:mm:ss',
    quarterFormat: 'سه ماهه yyyy',
    weekFormat: 'yyyy-w',
    clear: 'پاک کردن',
    now: 'اکنون',
    confirm: 'تأیید',
    selectTime: 'انتخاب زمان',
    selectDate: 'انتخاب تاریخ',
    datePlaceholder: 'انتخاب تاریخ',
    datetimePlaceholder: 'انتخاب تاریخ و زمان',
    monthPlaceholder: 'انتخاب ماه',
    yearPlaceholder: 'انتخاب سال',
    quarterPlaceholder: 'انتخاب سه‌ماهه',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'تاریخ شروع',
    endDatePlaceholder: 'تاریخ پایان',
    startDatetimePlaceholder: 'زمان شروع',
    endDatetimePlaceholder: 'زمان پایان',
    startMonthPlaceholder: 'ماه شروع',
    endMonthPlaceholder: 'ماه پایان',
    monthBeforeYear: false,
    firstDayOfWeek: 6,
    today: 'امروز'
  },
  DataTable: {
    checkTableAll: 'انتخاب همه داده‌های جدول',
    uncheckTableAll: 'عدم انتخاب همه داده‌های جدول',
    confirm: 'تأیید',
    clear: 'تنظیم مجدد'
  },
  LegacyTransfer: {
    sourceTitle: 'آیتم منبع',
    targetTitle: 'آیتم مقصد'
  },
  Transfer: {
    selectAll: 'انتخاب همه',
    clearAll: 'حذف همه',
    unselectAll: 'عدم انتخاب همه',
    total: (num: number): string => `کل ${num} مورد`,
    selected: (num: number): string => `انتخاب شده ${num} مورد`
  },
  Empty: {
    description: 'اطلاعاتی وجود ندارد'
  },
  Select: {
    placeholder: 'لطفاً انتخاب کنید'
  },
  TimePicker: {
    placeholder: 'لطفاً زمان مورد نظر را انتخاب کنید',
    positiveText: 'تأیید',
    negativeText: 'لغو',
    now: 'همین الان',
    clear: 'پاک کردن'
  },
  Pagination: {
    goto: 'رفتن به صفحه',
    selectionSuffix: 'صفحه'
  },
  DynamicTags: {
    add: 'افزودن'
  },
  Log: {
    loading: 'در حال بارگذاری'
  },
  Input: {
    placeholder: 'لطفاً وارد کنید'
  },
  InputNumber: {
    placeholder: 'لطفاً وارد کنید'
  },
  DynamicInput: {
    create: 'افزودن'
  },
  ThemeEditor: {
    title: 'ویرایشگر پوسته',
    clearAllVars: 'پاک کردن همه متغیرها',
    clearSearch: 'پاک کردن جستجو',
    filterCompName: 'فیلتر نام کامپوننت',
    filterVarName: 'فیلتر نام متغیر',
    import: 'ورود',
    export: 'خروج',
    restore: 'بازگردانی به حالت پیش‌فرض'
  },
  Image: {
    tipPrevious: 'تصویر قبلی (←)',
    tipNext: 'تصویر بعدی (→)',
    tipCounterclockwise: 'چرخش به سمت چپ',
    tipClockwise: 'چرخش به سمت راست',
    tipZoomOut: 'کوچک نمایی تصویر',
    tipZoomIn: 'بزرگ نمایی تصویر',
    tipDownload: 'بارگیری',
    tipClose: 'بستن (Esc)',
    tipOriginalSize: 'اندازه اصلی تصویر'
  }
}

export default faIR
