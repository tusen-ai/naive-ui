import type { NLocale } from './enUS'

const idID: NLocale = {
  name: 'id-ID',
  global: {
    undo: 'Membatalkan',
    redo: 'Mem-perbarui',
    confirm: 'Setuju',
    clear: 'Bersihkan'
  },
  Popconfirm: {
    positiveText: 'Setuju',
    negativeText: 'Batalkan'
  },
  Cascader: {
    placeholder: 'Mohon Pilih',
    loading: 'Memuat',
    loadingRequiredMessage: (label: string): string =>
      `Mohon muat semua ${label} sebelum memeriksa.`
  },
  Time: {
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'Bersihkan',
    now: 'Sekarang',
    confirm: 'Setuju',
    selectTime: 'Pilih Waktu',
    selectDate: 'Pilih Tanggal',
    datePlaceholder: 'Pilih Tanggal',
    datetimePlaceholder: 'Pilih Tanggal dan Waktu',
    monthPlaceholder: 'Pilih Bulan',
    // FIXME: translation needed
    yearPlaceholder: 'Pilih tahun',
    quarterPlaceholder: 'Pilih perempat tahun',
    startDatePlaceholder: 'Tanggal Mulai',
    endDatePlaceholder: 'Tanggal Selesai',
    startDatetimePlaceholder: 'Tanggal dan Waktu Mulai',
    endDatetimePlaceholder: 'Tanggal dan Waktu Selesai',
    // FIXME: translation needed
    startMonthPlaceholder: 'Awal bulan',
    endMonthPlaceholder: 'Akhir bulan',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hari ini'
  },
  DataTable: {
    checkTableAll: 'Pilih semua pada tabel',
    uncheckTableAll: 'Batalkan pilihan semua',
    confirm: 'Setuju',
    clear: 'Bersihkan'
  },
  LegacyTransfer: {
    sourceTitle: 'Sumber',
    targetTitle: 'Tujuan'
  },
  // TODO: translation
  Transfer: {
    selectAll: 'Pilih semua',
    unselectAll: 'Batalkan pilihan',
    clearAll: 'Bersihkan',
    total: (num: number): string => `Total ${num} item`,
    selected: (num: number): string => `${num} item dipilih`
  },
  Empty: {
    description: 'Tidak ada data'
  },
  Select: {
    placeholder: 'Mohon Pilih'
  },
  TimePicker: {
    placeholder: 'Pilih Waktu',
    positiveText: 'OK',
    negativeText: 'Batalkan',
    now: 'Sekarang'
  },
  Pagination: {
    goto: 'Ke',
    selectionSuffix: 'halaman'
  },
  DynamicTags: {
    add: 'Tambah'
  },
  Log: {
    loading: 'Memuat'
  },
  Input: {
    placeholder: 'Mohon isi'
  },
  InputNumber: {
    placeholder: 'Mohon isi'
  },
  DynamicInput: {
    create: 'Buat baru'
  },
  ThemeEditor: {
    title: 'Pengaturan Tema',
    clearAllVars: 'Bersihkan semua variabel',
    clearSearch: 'Bersihkan pencarian',
    filterCompName: 'Saring nama komponen',
    filterVarName: 'Saring nama variabel',
    import: 'Impor',
    export: 'Ekspor',
    restore: 'Setel ulang ke awal'
  },
  Image: {
    tipPrevious: 'Gambar sebelumnya (←)',
    tipNext: 'Gambar berikutnya (→)',
    tipCounterclockwise: 'Berlawanan arah jarum jam',
    tipClockwise: 'Searah jarum jam',
    tipZoomOut: 'Zoom out',
    tipZoomIn: 'Zoom in',
    tipClose: 'Tutup (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom ke ukuran asli'
  }
}

export default idID
