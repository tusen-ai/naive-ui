import type { NLocale } from './enUS'

const teIN: NLocale = {
  name: 'te-IN',
  global: {
    undo: 'వెనక్కి తీసుకోండి',
    redo: 'మళ్లీ చేయండಿ',
    confirm: 'నిర్ధారించండి',
    clear: 'క్లియర్ చేయండಿ'
  },
  Popconfirm: {
    positiveText: 'నిర్ధారించండి',
    negativeText: 'రద్దు చేయండಿ'
  },
  Cascader: {
    placeholder: 'దయచేసి ఎంచుకోండಿ',
    loading: 'లోడ్ అవుతోంది',
    loadingRequiredMessage: (label: string): string =>
      `చెక్ చేయడానికి ముందు ${label} యొక్క అన్ని వారసులను లోడ್ చేయండಿ.`
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
    clear: 'క్లియర్ చేయండి',
    now: 'ఇప్పుడు',
    confirm: 'నిర్ధారించండి',
    selectTime: 'సమయాన్ని ఎంచుకోండి',
    selectDate: 'తేదీని ఎంచుకోండి',
    datePlaceholder: 'తేదీని ఎంచుకోండి',
    datetimePlaceholder: 'తేదీ మరియు సమయాన్ని ఎంచుకోండಿ',
    monthPlaceholder: 'నెలను ఎంచుకోండి',
    yearPlaceholder: 'సంవత్సరాన్ని ఎంచుకోండి',
    quarterPlaceholder: 'త్రైమాసికాన్ని ఎంచుకోండಿ',
    weekPlaceholder: 'వారాన్ని ఎంచుకోండಿ',
    startDatePlaceholder: 'ప్రారంభ తేదీ',
    endDatePlaceholder: 'ముగింపు తేదీ',
    startDatetimePlaceholder: 'ప్రారంభ తేదీ మరియు సమయం',
    endDatetimePlaceholder: 'ముగింపు తేదీ మరియు సమయం',
    startMonthPlaceholder: 'ప్రారంభ నెల',
    endMonthPlaceholder: 'ముగింపు నెల',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ఈరోజు'
  },
  DataTable: {
    checkTableAll: 'పట్టికలోని అన్నింటినీ ఎంచుకోండి',
    uncheckTableAll: 'పట్టికలోని అన్ని ఎంపికలను తీసివేయండి',
    confirm: 'నిర్ధారించండి',
    clear: 'క్లియర్ చేయండి'
  },
  LegacyTransfer: {
    sourceTitle: 'మూలం',
    targetTitle: 'లక్ష్యం'
  },
  Transfer: {
    selectAll: 'అన్నీ ఎంచుకోండి',
    unselectAll: 'అన్ని ఎంపికలను తీసివేయండి',
    clearAll: 'క్లియర్ చేయండి',
    total: (num: number): string => `మొత్తం ${num} అంశాలు`,
    selected: (num: number): string => `${num} అంశాలు ఎంచుకోబడ్డాయి`
  },
  Empty: {
    description: 'డేటా లేదు'
  },
  Select: {
    placeholder: 'దయచేసి ఎంచుకోండಿ'
  },
  TimePicker: {
    placeholder: 'సమయాన్ని ఎంచుకోండి',
    positiveText: 'సరే',
    negativeText: 'రద్దు చేయండಿ',
    now: 'ఇప్పుడు',
    clear: 'క్లియర్ చేయండಿ'
  },
  Pagination: {
    goto: 'ఇక్కడికి వెళ్ళండి',
    selectionSuffix: 'పేజీ'
  },
  DynamicTags: {
    add: 'జోడించండి'
  },
  Log: {
    loading: 'లోడ్ అవుతోంది'
  },
  Input: {
    placeholder: 'దయచేసి నమోదు చేయండి'
  },
  InputNumber: {
    placeholder: 'దయచేసి నమోదు చేయండి'
  },
  DynamicInput: {
    create: 'సృష్టించండి'
  },
  ThemeEditor: {
    title: 'థీమ్ ఎడిటర్',
    clearAllVars: 'అన్ని వేరియబుల్స్‌ను క్లియర్ చేయండి',
    clearSearch: 'శోధనను క్లియర్ చేయండి',
    filterCompName: 'కాంపోనెంట్ పేరును ఫిల్టర్ చేయండి',
    filterVarName: 'వేరియబుల్ పేరును ఫిల్టర్ చేయండి',
    import: 'దిగుమతి',
    export: 'ఎగుమతి',
    restore: 'డిఫాల్ట్‌కు రీసెట్ చేయండి'
  },
  Image: {
    tipPrevious: 'మునుపటి చిత్రం (←)',
    tipNext: 'తదుపరి చిత్రం (→)',
    tipCounterclockwise: 'గడియార దిశకు వ్యతిరేకంగా',
    tipClockwise: 'గడియార దిశలో',
    tipZoomOut: 'చిన్నది చేయండి',
    tipZoomIn: 'పెద్దది చేయండి',
    tipDownload: 'డౌన్‌లోడ్',
    tipClose: 'మూసివేయండి (Esc)',
    tipOriginalSize: 'అసలు పరిమాణానికి జూమ్ చేయండి'
  },
  Heatmap: {
    less: 'తక్కువ',
    more: 'ఎక్కువ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default teIN
