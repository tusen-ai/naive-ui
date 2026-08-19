import type { NLocale } from './enUS'

const guIN: NLocale = {
  name: 'gu-IN',
  global: {
    undo: 'પૂર્વવત કરો',
    redo: 'ફરીથી કરો',
    confirm: 'પુષ્ટિ કરો',
    clear: 'સાફ કરો'
  },
  Popconfirm: {
    positiveText: 'પુષ્ટિ કરો',
    negativeText: 'રદ કરો'
  },
  Cascader: {
    placeholder: 'કૃપા કરીને પસંદ કરો',
    loading: 'લોડ થઈ રહ્યું છે',
    loadingRequiredMessage: (label: string): string =>
      `કૃપા કરીને તપાસતા પહેલાં ${label}ના બધા વંશજો લોડ કરો.`
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
    clear: 'સાફ કરો',
    now: 'હમણાં',
    confirm: 'પુષ્ટિ કરો',
    selectTime: 'સમય પસંદ કરો',
    selectDate: 'તારીખ પસંદ કરો',
    datePlaceholder: 'તારીખ પસંદ કરો',
    datetimePlaceholder: 'તારીખ અને સમય પસંદ કરો',
    monthPlaceholder: 'મહિનો પસંદ કરો',
    yearPlaceholder: 'વર્ષ પસંદ કરો',
    quarterPlaceholder: 'ત્રિમાસિક પસંદ કરો',
    weekPlaceholder: 'અઠવાડિયું પસંદ કરો',
    startDatePlaceholder: 'પ્રારંભ તારીખ',
    endDatePlaceholder: 'સમાપ્તિ તારીખ',
    startDatetimePlaceholder: 'પ્રારંભ તારીખ અને સમય',
    endDatetimePlaceholder: 'સમાપ્તિ તારીખ અને સમય',
    startMonthPlaceholder: 'પ્રારંભ મહિનો',
    endMonthPlaceholder: 'સમાપ્તિ મહિનો',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'આજે'
  },
  DataTable: {
    checkTableAll: 'કોષ્ટકમાં બધું પસંદ કરો',
    uncheckTableAll: 'કોષ્ટકમાં બધી પસંદગી દૂર કરો',
    confirm: 'પુષ્ટિ કરો',
    clear: 'સાફ કરો'
  },
  LegacyTransfer: {
    sourceTitle: 'સ્ત્રોત',
    targetTitle: 'લક્ષ્ય'
  },
  Transfer: {
    selectAll: 'બધું પસંદ કરો',
    unselectAll: 'બધી પસંદગી દૂર કરો',
    clearAll: 'સાફ કરો',
    total: (num: number): string => `કુલ ${num} આઇટમ`,
    selected: (num: number): string => `${num} આઇટમ પસંદ થયેલ`
  },
  Empty: {
    description: 'કોઈ ડેટા નથી'
  },
  Select: {
    placeholder: 'કૃપા કરીને પસંદ કરો'
  },
  TimePicker: {
    placeholder: 'સમય પસંદ કરો',
    positiveText: 'ઠીક છે',
    negativeText: 'રદ કરો',
    now: 'હમણાં',
    clear: 'સાફ કરો'
  },
  Pagination: {
    goto: 'જાઓ',
    selectionSuffix: 'પૃષ્ઠ'
  },
  DynamicTags: {
    add: 'ઉમેરો'
  },
  Log: {
    loading: 'લોડ થઈ રહ્યું છે'
  },
  Input: {
    placeholder: 'કૃપા કરીને દાખલ કરો'
  },
  InputNumber: {
    placeholder: 'કૃપા કરીને દાખલ કરો'
  },
  DynamicInput: {
    create: 'બનાવો'
  },
  ThemeEditor: {
    title: 'થીમ સંપાદક',
    clearAllVars: 'બધા ચલ સાફ કરો',
    clearSearch: 'શોધ સાફ કરો',
    filterCompName: 'ઘટકનું નામ ફિલ્ટર કરો',
    filterVarName: 'ચલનું નામ ફિલ્ટર કરો',
    import: 'આયાત',
    export: 'નિકાસ',
    restore: 'ડિફોલ્ટ પર પુનઃસેટ કરો'
  },
  Image: {
    tipPrevious: 'પાછલી તસવીર (←)',
    tipNext: 'આગલી તસવીર (→)',
    tipCounterclockwise: 'ઘડિયાળની વિરુદ્ધ દિશામાં',
    tipClockwise: 'ઘડિયાળની દિશામાં',
    tipZoomOut: 'નાનું કરો',
    tipZoomIn: 'મોટું કરો',
    tipDownload: 'ડાઉનલોડ',
    tipClose: 'બંધ કરો (Esc)',
    tipOriginalSize: 'મૂળ કદ પર ઝૂમ કરો'
  },
  Heatmap: {
    less: 'ઓછું',
    more: 'વધુ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default guIN
