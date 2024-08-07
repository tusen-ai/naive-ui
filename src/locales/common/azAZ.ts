import type { NLocale } from './enUS'

const azAZ: NLocale = {
  name: 'az-AZ',
  global: {
    undo: 'Geri al',
    redo: 'Təkrar et',
    confirm: 'Təsdiqlə',
    clear: 'Təmizlə'
  },
  Popconfirm: {
    positiveText: 'Təsdiqlə',
    negativeText: 'İmtina et'
  },
  Cascader: {
    placeholder: 'Zəhmət olmasa, seçin',
    loading: 'Yüklənir',
    loadingRequiredMessage: label =>
      `Zəhmət olmasa, yoxlamadan əvvəl bütün ${label}ləri yükləyin.`
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
    dateFormat: 'dd MMMM yyyy',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'Təmizlə',
    now: 'İndi',
    confirm: 'Təsdiqlə',
    selectTime: 'Vaxtı seçin',
    selectDate: 'Tarixi seçin',
    datePlaceholder: 'Tarixi seç',
    datetimePlaceholder: 'Tarix və vaxtı seçin',
    monthPlaceholder: 'Ayi seçin',
    yearPlaceholder: 'İli seçin',
    quarterPlaceholder: 'Rübu seçin',
    weekPlaceholder: 'Həftəni seçin',
    startDatePlaceholder: 'Başlanğıc tarixi',
    endDatePlaceholder: 'Son tarix',
    startDatetimePlaceholder: 'Başlanğıc tarixi və vaxtı',
    endDatetimePlaceholder: 'Bitiş tarixi və vaxtı',
    startMonthPlaceholder: 'Başlanğıc ayı',
    endMonthPlaceholder: 'Son ay',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Bu gün'
  },
  DataTable: {
    checkTableAll: 'Bütün cədvəli seç',
    uncheckTableAll: 'Cədvəldəki bütün seçimləri ləğv et',
    confirm: 'Təsdiqlə',
    clear: 'Təmizlə'
  },
  LegacyTransfer: {
    sourceTitle: 'Mənbə',
    targetTitle: 'Hədəf'
  },
  Transfer: {
    selectAll: 'Hamısını seç',
    unselectAll: 'Hamısını ləğv et',
    clearAll: 'Təmizlə',
    total: num => `Cəmi ${num} maddə`,
    selected: num => `${num} maddə seçildi`
  },
  Empty: {
    description: 'Məlumat yoxdur'
  },
  Select: {
    placeholder: 'Zəhmət olmasa, seçin'
  },
  TimePicker: {
    placeholder: 'Vaxtı seçin',
    positiveText: 'Təsdiqlə',
    negativeText: 'İmtina et',
    now: 'İndi',
    clear: 'Təmizlə'
  },
  Pagination: {
    goto: 'Get',
    selectionSuffix: 'səhifə'
  },
  DynamicTags: {
    add: 'Əlavə et'
  },
  Log: {
    loading: 'Yüklənir'
  },
  Input: {
    placeholder: 'Zəhmət olmasa, daxil edin'
  },
  InputNumber: {
    placeholder: 'Zəhmət olmasa, daxil edin'
  },
  DynamicInput: {
    create: 'Yarat'
  },
  ThemeEditor: {
    title: 'Tema redaktoru',
    clearAllVars: 'Bütün dəyişənləri təmizlə',
    clearSearch: 'Axtarışı təmizlə',
    filterCompName: 'Komponent adını filtrlə',
    filterVarName: 'Dəyişən adını filtrlə',
    import: 'İdxal et',
    export: 'İxrac et',
    restore: 'Varsayılanı bərpa et'
  },
  Image: {
    tipPrevious: 'Əvvəlki şəkil (←)',
    tipNext: 'Növbəti şəkil (→)',
    tipCounterclockwise: 'Saat əqrəbinin əksinə',
    tipClockwise: 'Saat əqrəbinin istiqamətində',
    tipZoomOut: 'Uzaqlaşdır',
    tipZoomIn: 'Yaxınlaşdır',
    tipDownload: 'Yüklə',
    tipClose: 'Bağla (Esc)',
    tipOriginalSize: 'Orijinal ölçüyə yaxınlaşdır'
  }
}

export default azAZ
