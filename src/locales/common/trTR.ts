import type { NLocale } from './enUS'

const trTR: NLocale = {
  name: 'tr-TR',
  global: {
    undo: 'Geri Al',
    redo: 'Yinele',
    confirm: 'Onayla',
    clear: 'Temizle'
  },
  Popconfirm: {
    positiveText: 'Onayla',
    negativeText: 'İptal'
  },
  Cascader: {
    placeholder: 'Lütfen Seçin',
    loading: 'Yükleniyor',
    loadingRequiredMessage: (label: string): string =>
      `Lütfen işaretlemeden önce ${label} için tüm alt öğeleri yükleyin.`
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
    clear: 'Temizle',
    now: 'Şimdi',
    confirm: 'Onayla',
    selectTime: 'Saat Seçin',
    selectDate: 'Tarih Seçin',
    datePlaceholder: 'Tarih Seçin',
    datetimePlaceholder: 'Tarih ve Saat Seçin',
    monthPlaceholder: 'Ay Seçin',
    yearPlaceholder: 'Yıl Seçin',
    quarterPlaceholder: 'Çeyrek Seçin',
    weekPlaceholder: 'Hafta Seçin',
    startDatePlaceholder: 'Başlangıç Tarihi',
    endDatePlaceholder: 'Bitiş Tarihi',
    startDatetimePlaceholder: 'Başlangıç Tarihi ve Saati',
    endDatetimePlaceholder: 'Bitiş Tarihi ve Saati',
    startMonthPlaceholder: 'Başlangıç Ayı',
    endMonthPlaceholder: 'Bitiş Ayı',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Bugün'
  },
  DataTable: {
    checkTableAll: 'Tablodaki tümünü seç',
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
    unselectAll: 'Tüm Seçimleri Kaldır',
    clearAll: 'Temizle',
    total: (num: number): string => `Toplam ${num} öğe`,
    selected: (num: number): string => `${num} öğe seçili`
  },
  Empty: {
    description: 'Veri Yok'
  },
  Select: {
    placeholder: 'Lütfen Seçin'
  },
  TimePicker: {
    placeholder: 'Saat Seçin',
    positiveText: 'Tamam',
    negativeText: 'İptal',
    now: 'Şimdi',
    clear: 'Temizle'
  },
  Pagination: {
    goto: 'Git',
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
    import: 'İçe Aktar',
    export: 'Dışa Aktar',
    restore: 'Varsayılana Sıfırla'
  },
  Image: {
    tipPrevious: 'Önceki resim (←)',
    tipNext: 'Sonraki resim (→)',
    tipCounterclockwise: 'Saat yönünün tersine döndür',
    tipClockwise: 'Saat yönünde döndür',
    tipZoomOut: 'Uzaklaştır',
    tipZoomIn: 'Yakınlaştır',
    tipDownload: 'İndir',
    tipClose: 'Kapat (Esc)',
    // TODO: translation
    tipOriginalSize: 'Orijinal boyuta yakınlaştır'
  },
  Heatmap: {
    less: 'Az',
    more: 'Çok',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default trTR
