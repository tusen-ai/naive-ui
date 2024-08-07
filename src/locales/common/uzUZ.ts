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
      `${label} ning barcha farzand elementlarini yuklang, keyin ularga to'liq ruxsat bering`
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
    quarterPlaceholder: 'Chet tanlash',
    weekPlaceholder: 'Hafta tanlash',
    startDatePlaceholder: 'Boshlang`ich sana',
    endDatePlaceholder: 'Tugash sanasi',
    startDatetimePlaceholder: 'Boshlang`ich sana va vaqti',
    endDatetimePlaceholder: 'Tugash sanasi va vaqti',
    startMonthPlaceholder: 'Boshlang`ich oy',
    endMonthPlaceholder: 'Oxirgi oy',
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
    targetTitle: 'Mansub'
  },
  Transfer: {
    selectAll: 'Barchasini tanlash',
    unselectAll: 'Barchasini bekor qilish',
    clearAll: 'Tozalash',
    total: (num: number): string => `Jami ${num} ta`,
    selected: (num: number): string => `Tanlandi ${num} ta`
  },
  Empty: {
    description: 'Ma`lumotlar yo`q'
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
    goto: 'O`tish',
    selectionSuffix: 'sahifa'
  },
  DynamicTags: {
    add: 'Qo`shish'
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
    filterCompName: 'Komponent nomi bo`yicha filtr',
    filterVarName: 'O`zgaruvchi nomlarini filtrlash',
    import: 'Import qilish',
    export: 'Eksport qilish',
    restore: 'Qayta tiklash'
  },
  Image: {
    tipPrevious: 'Oldingi rasm (←)',
    tipNext: 'Keyingi rasm (→)',
    tipCounterclockwise: 'Soat yonida',
    tipClockwise: 'Soat bo`yicha',
    tipZoomOut: 'Yaqinlash',
    tipZoomIn: 'Uzoq qilish',
    tipDownload: 'Yuklab olish',
    tipClose: 'Yopish (Esc)',
    tipOriginalSize: 'Asl o`lchamga qaytish'
  }
}

export default uzUZ
