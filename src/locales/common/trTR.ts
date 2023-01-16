import type { NLocale } from './enUS'
const trTR: NLocale = {
  name: 'tr-TR',
  global: {
    undo: 'Vazgeç',
    redo: 'Tekrar Dene',
    confirm: 'Kabul Et',
    clear: 'Temizle'
  },
  Popconfirm: {
    positiveText: 'Kabul Et',
    negativeText: 'İptal'
  },
  Cascader: {
    placeholder: 'Lütfen Seçin',
    loading: 'Yükleniyor',
    loadingRequiredMessage: (label: string): string =>
      `Lütfen kontrol etmeden önce tüm ${label}ları yükleyin.`
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
    clear: 'Temizle',
    now: 'Şimdi',
    confirm: 'Onayla',
    selectTime: 'Saat Seçin',
    selectDate: 'Tarih Seçin',
    datePlaceholder: 'Tarih Seç',
    datetimePlaceholder: 'Tarih ve Saat Seçin',
    monthPlaceholder: 'Ay Seçin',
    yearPlaceholder: 'Yıl Seçin',
    quarterPlaceholder: 'Mevsim Seçin',
    startDatePlaceholder: 'Başlangıç Tarihi',
    endDatePlaceholder: 'Bitiş Tarihi',
    startDatetimePlaceholder: 'Başlangıç Tarih ve Saati',
    endDatetimePlaceholder: 'Bitiş Tarihi ve Saati',
    startMonthPlaceholder: 'Başlangıç Ayı',
    endMonthPlaceholder: 'Bitiş Ayı',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Bugün'
  },
  DataTable: {
    checkTableAll: 'Tüm Tabloyu Seç',
    uncheckTableAll: 'Tablodaki tüm seçimleri kaldır',
    confirm: 'Onayla',
    clear: 'Temizle'
  },
  LegacyTransfer: {
    sourceTitle: 'Kaynak',
    targetTitle: 'Hedef'
  },
  Transfer: {
    selectAll: 'Tümünü Seç',
    unselectAll: 'Tüm Seçimi Kaldır',
    clearAll: 'Temizle',
    total: (num: number): string => `Toplam ${num} öğe`,
    selected: (num: number): string => `${num} öğe Seçili`
  },
  Empty: {
    description: 'Veri Yok'
  },
  Select: {
    placeholder: 'Lütfen seçin'
  },
  TimePicker: {
    placeholder: 'Saat Seç',
    positiveText: 'Tamam',
    negativeText: 'İptal',
    now: 'Şimdi'
  },
  Pagination: {
    goto: 'git',
    selectionSuffix: 'sayfa'
  },
  DynamicTags: {
    add: 'Ekle'
  },
  Log: {
    loading: 'Yükleniyor'
  },
  Input: {
    placeholder: 'Lütfen Girin'
  },
  InputNumber: {
    placeholder: 'Lütfen Girin'
  },
  DynamicInput: {
    create: 'Oluştur'
  },
  ThemeEditor: {
    title: 'Tema Editörü',
    clearAllVars: 'Tüm Değişkenleri Temizle',
    clearSearch: 'Aramayı Temizle',
    filterCompName: 'Bileşen Adını Filtrele',
    filterVarName: 'Değişken Adını Filtrele',
    import: 'Ekle',
    export: 'Çıkar',
    restore: 'Varsayılana sıfırla'
  },
  Image: {
    tipPrevious: 'Önceki resim (←)',
    tipNext: 'Sonraki resim (→)',
    tipCounterclockwise: 'saat yönünün tersine',
    tipClockwise: 'saat yönününe',
    tipZoomOut: 'Uzaklaştır',
    tipZoomIn: 'Yakınlaştır',
    tipClose: 'Kapat (Esc)',
    // TODO: translation
    tipOriginalSize: 'Orijinal boyuta yakınlaştır'
  }
}

export default trTR
