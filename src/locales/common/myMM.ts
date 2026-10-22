import type { NLocale } from './enUS'

const myMM: NLocale = {
  name: 'my-MM',
  global: {
    undo: 'ပြာန်ဆုတ်',
    redo: 'ပြာန်လုပ်',
    confirm: 'အတညီပြု',
    clear: 'ရှိင်းလိင်း'
  },
  Popconfirm: {
    positiveText: 'အတညီပြု',
    negativeText: 'ပယ်ဖျက်'
  },
  Cascader: {
    placeholder: 'ကြေးဇူပြု၍ ရွေးချယ်ပာ',
    loading: 'တိင်နေသည်',
    loadingRequiredMessage: (label: string): string =>
      `စိစ်စေးမည့်မီ ${label} ၏ အောက်အဆင့်အားလုံးကို တိင်ပာ`
  },
  Time: {
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    weekFormat: 'YYYY-w',
    clear: 'ရှိင်းလိင်း',
    now: 'ယခု',
    confirm: 'အတညီပြု',
    selectTime: 'အချိန်ရွေးပာ',
    selectDate: 'ရက်စွဲရွေးပာ',
    datePlaceholder: 'ရက်စွဲရွေးပာ',
    datetimePlaceholder: 'ရက်စွဲနှင် အချိန်ရွေးပာ',
    monthPlaceholder: 'လ ရွေးပာ',
    yearPlaceholder: 'နှစ် ရွေးပာ',
    quarterPlaceholder: 'သုးလပတ် ရွေးပာ',
    weekPlaceholder: 'အပတ် ရွေးပာ',
    startDatePlaceholder: 'စတိန်ရက်စွဲ',
    endDatePlaceholder: 'ပြီးဆုးရက်စွဲ',
    startDatetimePlaceholder: 'စတိန်ရက်စွဲနှင် အချိန်',
    endDatetimePlaceholder: 'ပြီးဆုးရက်စွဲနှင် အချိန်',
    startMonthPlaceholder: 'စတိန်လ',
    endMonthPlaceholder: 'ပြီးဆုးလ',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ယနေ့'
  },
  DataTable: {
    checkTableAll: 'ဇယားရှိ အားလုံးကို ရွေးပာ',
    uncheckTableAll: 'ဇယားရှိ အားလုံးကို ဖြုတ်ပာ',
    confirm: 'အတညီပြု',
    clear: 'ရှိင်းလိင်း'
  },
  LegacyTransfer: {
    sourceTitle: 'ရိင်းမြိစ်',
    targetTitle: 'ပိစ်မှတ်'
  },
  Transfer: {
    selectAll: 'အားလုံးရွေးပာ',
    unselectAll: 'အားလုံးဖြုတ်ပာ',
    clearAll: 'ရှိင်းလိင်း',
    total: (num: number): string => `စုစုပောင်း ${num} ခု`,
    selected: (num: number): string => `${num} ခု ရွေးထားသည်`
  },
  Empty: {
    description: 'ဒေတာမရှိပာ'
  },
  Select: {
    placeholder: 'ကြေးဇူပြု၍ ရွေးချယ်ပာ'
  },
  TimePicker: {
    placeholder: 'အချိန်ရွေးပာ',
    positiveText: 'ကောင်းပြီ',
    negativeText: 'ပယ်ဖျက်',
    now: 'ယခု',
    clear: 'ရှိင်းလိင်း'
  },
  Pagination: {
    goto: 'သွားရန်',
    selectionSuffix: 'စာမျက်နှာ'
  },
  DynamicTags: {
    add: 'ထည့်ပာ'
  },
  Log: {
    loading: 'တိင်နေသည်'
  },
  Input: {
    placeholder: 'ကြေးဇူပြု၍ ရိုက်ထည့်ပာ'
  },
  InputNumber: {
    placeholder: 'ကြေးဇူပြု၍ ရိုက်ထည့်ပာ'
  },
  DynamicInput: {
    create: 'ဖန်တီးပာ'
  },
  ThemeEditor: {
    title: 'အပြိင်အဆိင် တည်းဖြတ်ကိရိယာ',
    clearAllVars: 'ကိန်းရှင်အားလုံး ရှိင်းလိင်းပာ',
    clearSearch: 'ရှာဖွေမှု ရှိင်းလိင်းပာ',
    filterCompName: 'အစိတ်အပိုင်းအမည် စိစ်ထုတ်ပာ',
    filterVarName: 'ကိန်းရှင်အမည် စိစ်ထုတ်ပာ',
    import: 'တိင်သွိင်းပာ',
    export: 'ထုတ်ယူပာ',
    restore: 'မူလအတိုင်း ပြာန်ထားပာ'
  },
  Image: {
    tipPrevious: 'ယခိန်ပုံ (←)',
    tipNext: 'နောက်ပုံ (→)',
    tipCounterclockwise: 'လက်ဝဲရိစ်',
    tipClockwise: 'လက်ယာရိစ်',
    tipZoomOut: 'ချုံ့ပာ',
    tipZoomIn: 'ချဲ့ပာ',
    tipDownload: 'ဒောင်းလုဒ်',
    tipClose: 'ပိတ်ပာ (Esc)',
    tipOriginalSize: 'မူလအရွယ်အစားသို့ ချဲ့ပာ'
  },
  Heatmap: {
    less: 'နည်း',
    more: 'များ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default myMM
