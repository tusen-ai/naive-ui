import type { NLocale } from './enUS'

const uzUZ: NLocale = {
  name: 'uz-UZ',
  global: {
    undo: 'Bekor qilish',
    redo: 'Qaytadan amalga oshirish',
    confirm: 'Tasdiqlash',
    clear: 'Tozalash'
  },
  Popconfirm: {
    positiveText: 'Tasdiqlash',
    negativeText: 'Bekor qilish'
  },
  Cascader: {
    placeholder: 'Tanlash',
    loading: 'Yuklanmoqda',
    loadingRequiredMessage: (label: string): string =>
      `${label} elementini belgilashdan oldin uning barcha ichki elementlarini yuklang.`
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
    clear: 'Tozalash',
    now: 'Hozir',
    confirm: 'Tasdiqlash',
    selectTime: 'Vaqtni tanlash',
    selectDate: 'Sana tanlash',
    datePlaceholder: 'Sana tanlash',
    datetimePlaceholder: 'Sana va vaqtni tanlash',
    monthPlaceholder: 'Oy tanlash',
    yearPlaceholder: 'Yil tanlash',
    quarterPlaceholder: 'Chorak tanlash',
    weekPlaceholder: 'Hafta tanlash',
    startDatePlaceholder: 'Boshlangʻich sana',
    endDatePlaceholder: 'Tugash sanasi',
    startDatetimePlaceholder: 'Boshlangʻich sana va vaqti',
    endDatetimePlaceholder: 'Tugash sanasi va vaqti',
    startMonthPlaceholder: 'Boshlangʻich oy',
    endMonthPlaceholder: 'Tugash oyi',
    monthBeforeYear: true,
    firstDayOfWeek: 1 as 0 | 1 | 2 | 3 | 4 | 5 | 6, // in Uzbekistan monday
    today: 'Bugun'
  },
  DataTable: {
    checkTableAll: 'Jadvaldagi barchasini tanlash',
    uncheckTableAll: 'Jadvaldagi barchasini bekor qilish',
    confirm: 'Tasdiqlash',
    clear: 'Tozalash'
  },
  LegacyTransfer: {
    sourceTitle: 'Manba',
    targetTitle: 'Maqsad'
  },
  Transfer: {
    selectAll: 'Barchasini tanlash',
    unselectAll: 'Barchasini bekor qilish',
    clearAll: 'Tozalash',
    total: (num: number): string => `Jami ${num} ta`,
    selected: (num: number): string => `${num} ta tanlandi`
  },
  Empty: {
    description: 'Maʼlumotlar yoʻq'
  },
  Select: {
    placeholder: 'Tanlash'
  },
  TimePicker: {
    placeholder: 'Vaqtni tanlash',
    positiveText: 'OK',
    negativeText: 'Bekor qilish',
    now: 'Hozir',
    clear: 'Tozalash'
  },
  Pagination: {
    goto: 'Oʻtish',
    selectionSuffix: 'sahifa'
  },
  DynamicTags: {
    add: 'Qoʻshish'
  },
  Log: {
    loading: 'Yuklanmoqda'
  },
  Input: {
    placeholder: 'Kiriting'
  },
  InputNumber: {
    placeholder: 'Kiriting'
  },
  DynamicInput: {
    create: 'Yaratish'
  },
  ThemeEditor: {
    title: 'Mavzu muharriri',
    clearAllVars: 'Barchasini tozalash',
    clearSearch: 'Qidiruvni tozalash',
    filterCompName: 'Komponent nomi boʻyicha filtrlash',
    filterVarName: 'Oʻzgaruvchi nomlarini filtrlash',
    import: 'Import qilish',
    export: 'Eksport qilish',
    restore: 'Qayta tiklash'
  },
  Image: {
    tipPrevious: 'Oldingi rasm (←)',
    tipNext: 'Keyingi rasm (→)',
    tipCounterclockwise: 'Soat miliga teskari burish',
    tipClockwise: 'Soat mili boʻyicha burish',
    tipZoomOut: 'Kichiklashtirish',
    tipZoomIn: 'Kattalashtirish',
    tipDownload: 'Yuklab olish',
    tipClose: 'Yopish (Esc)',
    tipOriginalSize: 'Asl oʻlchamga qaytish'
  },
  Heatmap: {
    less: 'Kamroq',
    more: 'Koʻproq',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default uzUZ
