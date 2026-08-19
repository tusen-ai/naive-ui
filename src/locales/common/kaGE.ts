import type { NLocale } from './enUS'

const kaGE: NLocale = {
  name: 'ka-GE',
  global: {
    undo: 'გაუქმება',
    redo: 'გამეორება',
    confirm: 'დადასტურება',
    clear: 'გასუფთავება'
  },
  Popconfirm: {
    positiveText: 'დადასტურება',
    negativeText: 'გაუქმება'
  },
  Cascader: {
    placeholder: 'გთხოვთ აირჩიოთ',
    loading: 'იტვირთება',
    loadingRequiredMessage: (label: string): string =>
      `არჩევამდე ჩატვირთეთ ${label}-ის ყველა შთამომავალი.`
  },
  Time: {
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM.yyyy',
    dateFormat: 'dd.MM.yyyy',
    dateTimeFormat: 'dd.MM.yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'გასუფთავება',
    now: 'ახლა',
    confirm: 'დადასტურება',
    selectTime: 'აირჩიეთ დრო',
    selectDate: 'აირჩიეთ თარიღი',
    datePlaceholder: 'აირჩიეთ თარიღი',
    datetimePlaceholder: 'აირჩიეთ თარიღი და დრო',
    monthPlaceholder: 'აირჩიეთ თვე',
    yearPlaceholder: 'აირჩიეთ წელი',
    quarterPlaceholder: 'აირჩიეთ კვარტალი',
    weekPlaceholder: 'აირჩიეთ კვირა',
    startDatePlaceholder: 'დაწყების თარიღი',
    endDatePlaceholder: 'დამთავრების თარიღი',
    startDatetimePlaceholder: 'დაწყების თარიღი და დრო',
    endDatetimePlaceholder: 'დამთავრების თარიღი და დრო',
    startMonthPlaceholder: 'დაწყების თვე',
    endMonthPlaceholder: 'დამთავრების თვე',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'დღეს'
  },
  DataTable: {
    checkTableAll: 'ცხრილში ყველას არჩევა',
    uncheckTableAll: 'ცხრილში არჩევის მოხსნა',
    confirm: 'დადასტურება',
    clear: 'გასუფთავება'
  },
  LegacyTransfer: {
    sourceTitle: 'წყარო',
    targetTitle: 'დანიშნულება'
  },
  Transfer: {
    selectAll: 'ყველას არჩევა',
    unselectAll: 'არჩევის მოხსნა',
    clearAll: 'გასუფთავება',
    total: (num: number): string => `სულ ${num} ელემენტი`,
    selected: (num: number): string => `არჩეულია ${num} ელემენტი`
  },
  Empty: {
    description: 'მონაცემები არ არის'
  },
  Select: {
    placeholder: 'გთხოვთ აირჩიოთ'
  },
  TimePicker: {
    placeholder: 'აირჩიეთ დრო',
    positiveText: 'კარგი',
    negativeText: 'გაუქმება',
    now: 'ახლა',
    clear: 'გასუფთავება'
  },
  Pagination: {
    goto: 'გადასვლა',
    selectionSuffix: 'გვერდი'
  },
  DynamicTags: {
    add: 'დამატება'
  },
  Log: {
    loading: 'იტვირთება'
  },
  Input: {
    placeholder: 'გთხოვთ შეიყვანოთ'
  },
  InputNumber: {
    placeholder: 'გთხოვთ შეიყვანოთ'
  },
  DynamicInput: {
    create: 'შექმნა'
  },
  ThemeEditor: {
    title: 'თემის რედაქტორი',
    clearAllVars: 'ყველა ცვლადის გასუფთავება',
    clearSearch: 'ძიების გასუფთავება',
    filterCompName: 'კომპონენტის სახელის გაფილტვრა',
    filterVarName: 'ცვლადის სახელის გაფილტვრა',
    import: 'იმპორტი',
    export: 'ექსპორტი',
    restore: 'ნაგულისხმევზე დაბრუნება'
  },
  Image: {
    tipPrevious: 'წინა სურათი (←)',
    tipNext: 'შემდეგი სურათი (→)',
    tipCounterclockwise: 'საათის ისრის საწინააღმდეგოდ',
    tipClockwise: 'საათის ისრის მიმართულებით',
    tipZoomOut: 'დაპატარავება',
    tipZoomIn: 'გადიდება',
    tipDownload: 'ჩამოტვირთვა',
    tipClose: 'დახურვა (Esc)',
    tipOriginalSize: 'ორიგინალ ზომამდე გადიდება'
  },
  Heatmap: {
    less: 'ნაკლები',
    more: 'მეტი',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default kaGE
