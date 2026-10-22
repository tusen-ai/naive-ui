import type { NLocale } from './enUS'

const heIL: NLocale = {
  name: 'he-IL',
  global: {
    undo: 'בטל',
    redo: 'בצע שוב',
    confirm: 'אישור',
    clear: 'נקה'
  },
  Popconfirm: {
    positiveText: 'אישור',
    negativeText: 'ביטול'
  },
  Cascader: {
    placeholder: 'נא לבחור',
    loading: 'טוען',
    loadingRequiredMessage: (label: string): string =>
      `יש לטעון את כל הצאצאים של ${label} לפני הבחירה.`
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
    clear: 'נקה',
    now: 'עכשיו',
    confirm: 'אישור',
    selectTime: 'בחירת שעה',
    selectDate: 'בחירת תאריך',
    datePlaceholder: 'בחירת תאריך',
    datetimePlaceholder: 'בחירת תאריך ושעה',
    monthPlaceholder: 'בחירת חודש',
    yearPlaceholder: 'בחירת שנה',
    quarterPlaceholder: 'בחירת רבעון',
    weekPlaceholder: 'בחירת שבוע',
    startDatePlaceholder: 'תאריך התחלה',
    endDatePlaceholder: 'תאריך סיום',
    startDatetimePlaceholder: 'תאריך ושעת התחלה',
    endDatetimePlaceholder: 'תאריך ושעת סיום',
    startMonthPlaceholder: 'חודש התחלה',
    endMonthPlaceholder: 'חודש סיום',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'היום'
  },
  DataTable: {
    checkTableAll: 'בחר הכול בטבלה',
    uncheckTableAll: 'בטל בחירה בטבלה',
    confirm: 'אישור',
    clear: 'נקה'
  },
  LegacyTransfer: {
    sourceTitle: 'מקור',
    targetTitle: 'יעד'
  },
  Transfer: {
    selectAll: 'בחר הכול',
    unselectAll: 'בטל בחירה',
    clearAll: 'נקה',
    total: (num: number): string => `סה״כ ${num} פריטים`,
    selected: (num: number): string => `נבחרו ${num} פריטים`
  },
  Empty: {
    description: 'אין נתונים'
  },
  Select: {
    placeholder: 'נא לבחור'
  },
  TimePicker: {
    placeholder: 'בחירת שעה',
    positiveText: 'אישור',
    negativeText: 'ביטול',
    now: 'עכשיו',
    clear: 'נקה'
  },
  Pagination: {
    goto: 'עבור אל',
    selectionSuffix: 'עמוד'
  },
  DynamicTags: {
    add: 'הוסף'
  },
  Log: {
    loading: 'טוען'
  },
  Input: {
    placeholder: 'נא להזין'
  },
  InputNumber: {
    placeholder: 'נא להזין'
  },
  DynamicInput: {
    create: 'צור'
  },
  ThemeEditor: {
    title: 'עורך ערכת נושא',
    clearAllVars: 'נקה את כל המשתנים',
    clearSearch: 'נקה חיפוש',
    filterCompName: 'סינון שם רכיב',
    filterVarName: 'סינון שם משתנה',
    import: 'ייבוא',
    export: 'ייצוא',
    restore: 'איפוס לברירת מחדל'
  },
  Image: {
    tipPrevious: 'תמונה קודמת (←)',
    tipNext: 'תמונה הבאה (→)',
    tipCounterclockwise: 'נגד כיוון השעון',
    tipClockwise: 'עם כיוון השעון',
    tipZoomOut: 'הקטן',
    tipZoomIn: 'הגדל',
    tipDownload: 'הורדה',
    tipClose: 'סגור (Esc)',
    tipOriginalSize: 'זום לגודל המקורי'
  },
  Heatmap: {
    less: 'פחות',
    more: 'יותר',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default heIL
