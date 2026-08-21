import type { NLocale } from './enUS'

const knIN: NLocale = {
  name: 'kn-IN',
  global: {
    undo: 'ಹಿಂಪಡೆಯಿರಿ',
    redo: 'ಮತ್ತೆ ಮಾಡಿ',
    confirm: 'ದೃಢೀಕರಿಸಿ',
    clear: 'ತೆರವುಗೊಳಿಸಿ'
  },
  Popconfirm: {
    positiveText: 'ದೃಢೀಕರಿಸಿ',
    negativeText: 'ರದ್ದುಪಡಿಸಿ'
  },
  Cascader: {
    placeholder: 'ದಯವಿಟ್ಟು ಆಯ್ಕೆಮಾಡಿ',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ',
    loadingRequiredMessage: (label: string): string =>
      `ಪರಿಶೀಲಿಸುವ ಮೊದಲು ${label} ನ ಎಲ್ಲಾ ವಂಶಜರನ್ನು ಲೋಡ್ ಮಾಡಿ.`
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
    clear: 'ತೆರವುಗೊಳಿಸಿ',
    now: 'ಈಗ',
    confirm: 'ದೃಢೀಕರಿಸಿ',
    selectTime: 'ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectDate: 'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    datePlaceholder: 'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    datetimePlaceholder: 'ದಿನಾಂಕ ಮತ್ತು ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    monthPlaceholder: 'ತಿಂಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    yearPlaceholder: 'ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    quarterPlaceholder: 'ತ್ರೈಮಾಸಿಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    weekPlaceholder: 'ವಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    startDatePlaceholder: 'ಪ್ರಾರಂಭ ದಿನಾಂಕ',
    endDatePlaceholder: 'ಅಂತಿಮ ದಿನಾಂಕ',
    startDatetimePlaceholder: 'ಪ್ರಾರಂಭ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ',
    endDatetimePlaceholder: 'ಅಂತಿಮ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ',
    startMonthPlaceholder: 'ಪ್ರಾರಂಭ ತಿಂಗಳು',
    endMonthPlaceholder: 'ಅಂತಿಮ ತಿಂಗಳು',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ಇಂದು'
  },
  DataTable: {
    checkTableAll: 'ಕೋಷ್ಟಕದಲ್ಲಿರುವ ಎಲ್ಲವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    uncheckTableAll: 'ಕೋಷ್ಟಕದಲ್ಲಿರುವ ಎಲ್ಲ ಆಯ್ಕೆಯನ್ನು ತೆಗೆಯಿರಿ',
    confirm: 'ದೃಢೀಕರಿಸಿ',
    clear: 'ತೆರವುಗೊಳಿಸಿ'
  },
  LegacyTransfer: {
    sourceTitle: 'ಮೂಲ',
    targetTitle: 'ಗುರಿ'
  },
  Transfer: {
    selectAll: 'ಎಲ್ಲವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    unselectAll: 'ಎಲ್ಲ ಆಯ್ಕೆಯನ್ನು ತೆಗೆಯಿರಿ',
    clearAll: 'ತೆರವುಗೊಳಿಸಿ',
    total: (num: number): string => `ಒಟ್ಟು ${num} ಐಟಂಗಳು`,
    selected: (num: number): string => `${num} ಐಟಂಗಳು ಆಯ್ಕೆಯಾಗಿವೆ`
  },
  Empty: {
    description: 'ಡೇಟಾ ಇಲ್ಲ'
  },
  Select: {
    placeholder: 'ದಯವಿಟ್ಟು ಆಯ್ಕೆಮಾಡಿ'
  },
  TimePicker: {
    placeholder: 'ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    positiveText: 'ಸರಿ',
    negativeText: 'ರದ್ದುಪಡಿಸಿ',
    now: 'ಈಗ',
    clear: 'ತೆರವುಗೊಳಿಸಿ'
  },
  Pagination: {
    goto: 'ಇಲ್ಲಿಗೆ ಹೋಗಿ',
    selectionSuffix: 'ಪುಟ'
  },
  DynamicTags: {
    add: 'ಸೇರಿಸಿ'
  },
  Log: {
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ'
  },
  Input: {
    placeholder: 'ದಯವಿಟ್ಟು ನಮೂದಿಸಿ'
  },
  InputNumber: {
    placeholder: 'ದಯವಿಟ್ಟು ನಮೂದಿಸಿ'
  },
  DynamicInput: {
    create: 'ರಚಿಸಿ'
  },
  ThemeEditor: {
    title: 'ಥೀಮ್ ಸಂಪಾದಕ',
    clearAllVars: 'ಎಲ್ಲಾ ವೇರಿಯಬಲ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    clearSearch: 'ಹುಡುಕಾಟವನ್ನು ತೆರವುಗೊಳಿಸಿ',
    filterCompName: 'ಘಟಕದ ಹೆಸರನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ',
    filterVarName: 'ವೇರಿಯಬಲ್ ಹೆಸರನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ',
    import: 'ಆಮದು',
    export: 'ರಫ್ತು',
    restore: 'ಡೀಫಾಲ್ಟ್‌ಗೆ ಮರುಹೊಂದಿಸಿ'
  },
  Image: {
    tipPrevious: 'ಹಿಂದಿನ ಚಿತ್ರ (←)',
    tipNext: 'ಮುಂದಿನ ಚಿತ್ರ (→)',
    tipCounterclockwise: 'ಎದುರು ಗಡಿಯಾರ ದಿಕ್ಕು',
    tipClockwise: 'ಗಡಿಯಾರ ದಿಕ್ಕು',
    tipZoomOut: 'ಕುಗ್ಗಿಸಿ',
    tipZoomIn: 'ಹಿಗ್ಗಿಸಿ',
    tipDownload: 'ಡೌನ್‌ಲೋಡ್',
    tipClose: 'ಮುಚ್ಚಿ (Esc)',
    tipOriginalSize: 'ಮೂಲ ಗಾತ್ರಕ್ಕೆ ಝೂಮ್ ಮಾಡಿ'
  },
  Heatmap: {
    less: 'ಕಡಿಮೆ',
    more: 'ಹೆಚ್ಚು',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default knIN
