import type { NLocale } from './enUS'

const msMY: NLocale = {
  name: 'ms-MY',
  global: {
    undo: 'Buat asal',
    redo: 'Buat semula',
    confirm: 'Sahkan',
    clear: 'Kosongkan'
  },
  Popconfirm: {
    positiveText: 'Sahkan',
    negativeText: 'Batal'
  },
  Cascader: {
    placeholder: 'Sila pilih',
    loading: 'Memuatkan',
    loadingRequiredMessage: (label: string): string =>
      `Sila muatkan semua turunan ${label} sebelum menandainya.`
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
    clear: 'Kosongkan',
    now: 'Sekarang',
    confirm: 'Sahkan',
    selectTime: 'Pilih masa',
    selectDate: 'Pilih tarikh',
    datePlaceholder: 'Pilih tarikh',
    datetimePlaceholder: 'Pilih tarikh dan masa',
    monthPlaceholder: 'Pilih bulan',
    yearPlaceholder: 'Pilih tahun',
    quarterPlaceholder: 'Pilih suku tahun',
    weekPlaceholder: 'Pilih minggu',
    startDatePlaceholder: 'Tarikh mula',
    endDatePlaceholder: 'Tarikh tamat',
    startDatetimePlaceholder: 'Tarikh dan masa mula',
    endDatetimePlaceholder: 'Tarikh dan masa tamat',
    startMonthPlaceholder: 'Bulan mula',
    endMonthPlaceholder: 'Bulan tamat',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hari ini'
  },
  DataTable: {
    checkTableAll: 'Pilih semua dalam jadual',
    uncheckTableAll: 'Nyahpilih semua dalam jadual',
    confirm: 'Sahkan',
    clear: 'Kosongkan'
  },
  LegacyTransfer: {
    sourceTitle: 'Sumber',
    targetTitle: 'Sasaran'
  },
  Transfer: {
    selectAll: 'Pilih semua',
    unselectAll: 'Nyahpilih semua',
    clearAll: 'Kosongkan',
    total: (num: number): string => `Jumlah ${num} item`,
    selected: (num: number): string => `${num} item dipilih`
  },
  Empty: {
    description: 'Tiada data'
  },
  Select: {
    placeholder: 'Sila pilih'
  },
  TimePicker: {
    placeholder: 'Pilih masa',
    positiveText: 'OK',
    negativeText: 'Batal',
    now: 'Sekarang',
    clear: 'Kosongkan'
  },
  Pagination: {
    goto: 'Pergi ke',
    selectionSuffix: 'halaman'
  },
  DynamicTags: {
    add: 'Tambah'
  },
  Log: {
    loading: 'Memuatkan'
  },
  Input: {
    placeholder: 'Sila masukkan'
  },
  InputNumber: {
    placeholder: 'Sila masukkan'
  },
  DynamicInput: {
    create: 'Cipta'
  },
  ThemeEditor: {
    title: 'Editor tema',
    clearAllVars: 'Kosongkan semua pemboleh ubah',
    clearSearch: 'Kosongkan carian',
    filterCompName: 'Tapis nama komponen',
    filterVarName: 'Tapis nama pemboleh ubah',
    import: 'Import',
    export: 'Eksport',
    restore: 'Set semula kepada lalai'
  },
  Image: {
    tipPrevious: 'Gambar sebelumnya (←)',
    tipNext: 'Gambar seterusnya (→)',
    tipCounterclockwise: 'Lawan jam',
    tipClockwise: 'Mengikut jam',
    tipZoomOut: 'Zum keluar',
    tipZoomIn: 'Zum masuk',
    tipDownload: 'Muat turun',
    tipClose: 'Tutup (Esc)',
    tipOriginalSize: 'Zum ke saiz asal'
  },
  Heatmap: {
    less: 'kurang',
    more: 'lebih',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default msMY
