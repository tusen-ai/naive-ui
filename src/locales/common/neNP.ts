import type { NLocale } from './enUS'

const neNP: NLocale = {
  name: 'ne-NP',
  global: {
    undo: 'पूर्वावस्थामा फर्काउनुहोस्',
    redo: 'दोहोर्याउनुहोस्',
    confirm: 'पुष्टि गर्नुहोस्',
    clear: 'खाली गर्नुहोस्'
  },
  Popconfirm: {
    positiveText: 'पुष्टि गर्नुहोस्',
    negativeText: 'रद्द गर्नुहोस्'
  },
  Cascader: {
    placeholder: 'कृपया चयन गर्नुहोस्',
    loading: 'लोड हुँदैछ',
    loadingRequiredMessage: (label: string): string =>
      `कृपया जाँच्नुअघि ${label} का सबै वंशजहरू लोड गर्नुहोस्।`
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
    clear: 'खाली गर्नुहोस्',
    now: 'अहिले',
    confirm: 'पुष्टि गर्नुहोस्',
    selectTime: 'समय चयन गर्नुहोस्',
    selectDate: 'मिति चयन गर्नुहोस्',
    datePlaceholder: 'मिति चयन गर्नुहोस्',
    datetimePlaceholder: 'मिति र समय चयन गर्नुहोस्',
    monthPlaceholder: 'महिना चयन गर्नुहोस्',
    yearPlaceholder: 'वर्ष चयन गर्नुहोस्',
    quarterPlaceholder: 'त्रैमासिक चयन गर्नुहोस्',
    weekPlaceholder: 'हप्ता चयन गर्नुहोस्',
    startDatePlaceholder: 'सुरु मिति',
    endDatePlaceholder: 'अन्त्य मिति',
    startDatetimePlaceholder: 'सुरु मिति र समय',
    endDatetimePlaceholder: 'अन्त्य मिति र समय',
    startMonthPlaceholder: 'सुरु महिना',
    endMonthPlaceholder: 'अन्त्य महिना',
    monthBeforeYear: false,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'आज'
  },
  DataTable: {
    checkTableAll: 'तालिकामा सबै चयन गर्नुहोस्',
    uncheckTableAll: 'तालिकामा सबै चयन हटाउनुहोस्',
    confirm: 'पुष्टि गर्नुहोस्',
    clear: 'खाली गर्नुहोस्'
  },
  LegacyTransfer: {
    sourceTitle: 'स्रोत',
    targetTitle: 'लक्ष्य'
  },
  Transfer: {
    selectAll: 'सबै चयन गर्नुहोस्',
    unselectAll: 'सबै चयन हटाउनुहोस्',
    clearAll: 'खाली गर्नुहोस्',
    total: (num: number): string => `जम्मा ${num} वस्तुहरू`,
    selected: (num: number): string => `${num} वस्तु चयन गरियो`
  },
  Empty: {
    description: 'कुनै डेटा छैन'
  },
  Select: {
    placeholder: 'कृपया चयन गर्नुहोस्'
  },
  TimePicker: {
    placeholder: 'समय चयन गर्नुहोस्',
    positiveText: 'ठिक छ',
    negativeText: 'रद्द गर्नुहोस्',
    now: 'अहिले',
    clear: 'खाली गर्नुहोस्'
  },
  Pagination: {
    goto: 'जानुहोस्',
    selectionSuffix: 'पृष्ठ'
  },
  DynamicTags: {
    add: 'थप्नुहोस्'
  },
  Log: {
    loading: 'लोड हुँदैछ'
  },
  Input: {
    placeholder: 'कृपया प्रविष्ट गर्नुहोस्'
  },
  InputNumber: {
    placeholder: 'कृपया प्रविष्ट गर्नुहोस्'
  },
  DynamicInput: {
    create: 'सिर्जना गर्नुहोस्'
  },
  ThemeEditor: {
    title: 'थिम सम्पादक',
    clearAllVars: 'सबै चर खाली गर्नुहोस्',
    clearSearch: 'खोज खाली गर्नुहोस्',
    filterCompName: 'कम्पोनेन्ट नाम फिल्टर गर्नुहोस्',
    filterVarName: 'चर नाम फिल्टर गर्नुहोस्',
    import: 'आयात',
    export: 'निर्यात',
    restore: 'पूर्वनिर्धारितमा रिसेट गर्नुहोस्'
  },
  Image: {
    tipPrevious: 'अघिल्लो तस्बिर (←)',
    tipNext: 'अर्को तस्बिर (→)',
    tipCounterclockwise: 'घडीको विपरीत दिशा',
    tipClockwise: 'घडीको दिशा',
    tipZoomOut: 'सानो पार्नुहोस्',
    tipZoomIn: 'ठूलो पार्नुहोस्',
    tipDownload: 'डाउनलोड',
    tipClose: 'बन्द गर्नुहोस् (Esc)',
    tipOriginalSize: 'मूल आकारमा जुम गर्नुहोस्'
  },
  Heatmap: {
    less: 'कम',
    more: 'बढी',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default neNP
