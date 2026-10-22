import type { NLocale } from './enUS'

const bnBD: NLocale = {
  name: 'bn-BD',
  global: {
    undo: 'পূর্বাবস্থায় ফিরুন',
    redo: 'আবার করুন',
    confirm: 'নিশ্চিত করুন',
    clear: 'মুছুন'
  },
  Popconfirm: {
    positiveText: 'নিশ্চিত করুন',
    negativeText: 'বাতিল'
  },
  Cascader: {
    placeholder: 'অনুগ্রহ করে নির্বাচন করুন',
    loading: 'লোড হচ্ছে',
    loadingRequiredMessage: (label: string): string =>
      `নির্বাচনের আগে ${label}-এর সব অন্তর্ভুক্ত আইটেম লোড করুন।`
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
    clear: 'মুছুন',
    now: 'এখন',
    confirm: 'নিশ্চিত করুন',
    selectTime: 'সময় নির্বাচন করুন',
    selectDate: 'তারিখ নির্বাচন করুন',
    datePlaceholder: 'তারিখ নির্বাচন করুন',
    datetimePlaceholder: 'তারিখ ও সময় নির্বাচন করুন',
    monthPlaceholder: 'মাস নির্বাচন করুন',
    yearPlaceholder: 'বছর নির্বাচন করুন',
    quarterPlaceholder: 'ত্রৈমাসিক নির্বাচন করুন',
    weekPlaceholder: 'সপ্তাহ নির্বাচন করুন',
    startDatePlaceholder: 'শুরুর তারিখ',
    endDatePlaceholder: 'শেষ তারিখ',
    startDatetimePlaceholder: 'শুরুর তারিখ ও সময়',
    endDatetimePlaceholder: 'শেষ তারিখ ও সময়',
    startMonthPlaceholder: 'শুরুর মাস',
    endMonthPlaceholder: 'শেষ মাস',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'আজ'
  },
  DataTable: {
    checkTableAll: 'সারণির সব নির্বাচন করুন',
    uncheckTableAll: 'সারণির সব নির্বাচন তুলে দিন',
    confirm: 'নিশ্চিত করুন',
    clear: 'মুছুন'
  },
  LegacyTransfer: {
    sourceTitle: 'উৎস',
    targetTitle: 'গন্তব্য'
  },
  Transfer: {
    selectAll: 'সব নির্বাচন করুন',
    unselectAll: 'সব নির্বাচন তুলে দিন',
    clearAll: 'মুছুন',
    total: (num: number): string => `মোট ${num}টি আইটেম`,
    selected: (num: number): string => `${num}টি আইটেম নির্বাচিত`
  },
  Empty: {
    description: 'কোনো তথ্য নেই'
  },
  Select: {
    placeholder: 'অনুগ্রহ করে নির্বাচন করুন'
  },
  TimePicker: {
    placeholder: 'সময় নির্বাচন করুন',
    positiveText: 'ঠিক আছে',
    negativeText: 'বাতিল',
    now: 'এখন',
    clear: 'মুছুন'
  },
  Pagination: {
    goto: 'যান',
    selectionSuffix: 'পৃষ্ঠা'
  },
  DynamicTags: {
    add: 'যোগ করুন'
  },
  Log: {
    loading: 'লোড হচ্ছে'
  },
  Input: {
    placeholder: 'অনুগ্রহ করে লিখুন'
  },
  InputNumber: {
    placeholder: 'অনুগ্রহ করে লিখুন'
  },
  DynamicInput: {
    create: 'তৈরি করুন'
  },
  ThemeEditor: {
    title: 'থিম সম্পাদক',
    clearAllVars: 'সব ভেরিয়েবল মুছুন',
    clearSearch: 'অনুসন্ধান মুছুন',
    filterCompName: 'কম্পোনেন্টের নাম ফিল্টার',
    filterVarName: 'ভেরিয়েবলের নাম ফিল্টার',
    import: 'আমদানি',
    export: 'রপ্তানি',
    restore: 'ডিফল্টে ফিরুন'
  },
  Image: {
    tipPrevious: 'আগের ছবি (←)',
    tipNext: 'পরের ছবি (→)',
    tipCounterclockwise: 'বাম দিকে ঘোরান',
    tipClockwise: 'ডান দিকে ঘোরান',
    tipZoomOut: 'ছোট করুন',
    tipZoomIn: 'বড় করুন',
    tipDownload: 'ডাউনলোড',
    tipClose: 'বন্ধ (Esc)',
    tipOriginalSize: 'মূল আকারে জুম করুন'
  },
  Heatmap: {
    less: 'কম',
    more: 'বেশি',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default bnBD
