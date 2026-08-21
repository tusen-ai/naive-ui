import type { NLocale } from './enUS'

const taIN: NLocale = {
  name: 'ta-IN',
  global: {
    undo: 'செயல்தவிர்',
    redo: 'மீண்டும் செய்',
    confirm: 'உறுதிப்படுத்து',
    clear: 'அழி'
  },
  Popconfirm: {
    positiveText: 'உறுதிப்படுத்து',
    negativeText: 'ரத்துசெய்'
  },
  Cascader: {
    placeholder: 'தயவுசெய்து தேர்ந்தெடுக்கவும்',
    loading: 'ஏற்றுகிறது',
    loadingRequiredMessage: (label: string): string =>
      `சரிபார்ப்பதற்கு முன் ${label} இன் அனைத்து வழித்தோன்றல்களையும் ஏற்றவும்.`
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
    clear: 'அழி',
    now: 'இப்போது',
    confirm: 'உறுதிப்படுத்து',
    selectTime: 'நேரத்தைத் தேர்ந்தெடுக்கவும்',
    selectDate: 'தேதியைத் தேர்ந்தெடுக்கவும்',
    datePlaceholder: 'தேதியைத் தேர்ந்தெடுக்கவும்',
    datetimePlaceholder: 'தேதி மற்றும் நேரத்தைத் தேர்ந்தெடுக்கவும்',
    monthPlaceholder: 'மாதத்தைத் தேர்ந்தெடுக்கவும்',
    yearPlaceholder: 'ஆண்டைத் தேர்ந்தெடுக்கவும்',
    quarterPlaceholder: 'காலாண்டைத் தேர்ந்தெடுக்கவும்',
    weekPlaceholder: 'வாரத்தைத் தேர்ந்தெடுக்கவும்',
    startDatePlaceholder: 'தொடக்கத் தேதி',
    endDatePlaceholder: 'முடிவுத் தேதி',
    startDatetimePlaceholder: 'தொடக்கத் தேதி மற்றும் நேரம்',
    endDatetimePlaceholder: 'முடிவுத் தேதி மற்றும் நேரம்',
    startMonthPlaceholder: 'தொடக்க மாதம்',
    endMonthPlaceholder: 'முடிவு மாதம்',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'இன்று'
  },
  DataTable: {
    checkTableAll: 'அட்டவணையில் உள்ள அனைத்தையும் தேர்ந்தெடு',
    uncheckTableAll: 'அட்டவணையில் உள்ள அனைத்துத் தேர்வையும் நீக்கு',
    confirm: 'உறுதிப்படுத்து',
    clear: 'அழி'
  },
  LegacyTransfer: {
    sourceTitle: 'மூலம்',
    targetTitle: 'இலக்கு'
  },
  Transfer: {
    selectAll: 'அனைத்தையும் தேர்ந்தெடு',
    unselectAll: 'அனைத்துத் தேர்வையும் நீக்கு',
    clearAll: 'அழி',
    total: (num: number): string => `மொத்தம் ${num} உருப்படிகள்`,
    selected: (num: number): string => `${num} உருப்படிகள் தேர்ந்தெடுக்கப்பட்டன`
  },
  Empty: {
    description: 'தரவு இல்லை'
  },
  Select: {
    placeholder: 'தயவுசெய்து தேர்ந்தெடுக்கவும்'
  },
  TimePicker: {
    placeholder: 'நேரத்தைத் தேர்ந்தெடுக்கவும்',
    positiveText: 'சரி',
    negativeText: 'ரத்துசெய்',
    now: 'இப்போது',
    clear: 'அழி'
  },
  Pagination: {
    goto: 'செல்',
    selectionSuffix: 'பக்கம்'
  },
  DynamicTags: {
    add: 'சேர்'
  },
  Log: {
    loading: 'ஏற்றுகிறது'
  },
  Input: {
    placeholder: 'தயவுசெய்து உள்ளிடவும்'
  },
  InputNumber: {
    placeholder: 'தயவுசெய்து உள்ளிடவும்'
  },
  DynamicInput: {
    create: 'உருவாக்கு'
  },
  ThemeEditor: {
    title: 'தீம் தொகுப்பான்',
    clearAllVars: 'அனைத்து மாறிகளையும் அழி',
    clearSearch: 'தேடலை அழி',
    filterCompName: 'கூறு பெயரை வடிகட்டு',
    filterVarName: 'மாறி பெயரை வடிகட்டு',
    import: 'இறக்குமதி',
    export: 'ஏற்றுமதி',
    restore: 'இயல்புநிலைக்கு மீட்டமை'
  },
  Image: {
    tipPrevious: 'முந்தைய படம் (←)',
    tipNext: 'அடுத்த படம் (→)',
    tipCounterclockwise: 'கடிகார திசைக்கு எதிராக',
    tipClockwise: 'கடிகார திசையில்',
    tipZoomOut: 'சிறிதாக்கு',
    tipZoomIn: 'பெரிதாக்கு',
    tipDownload: 'பதிவிறக்கு',
    tipClose: 'மூடு (Esc)',
    tipOriginalSize: 'அசல் அளவிற்கு பெரிதாக்கு'
  },
  Heatmap: {
    less: 'குறைவு',
    more: 'அதிகம்',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default taIN
