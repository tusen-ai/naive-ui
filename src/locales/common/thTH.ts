import type { NLocale } from './enUS'

const thTH: NLocale = {
  name: 'thTH',
  global: {
    undo: 'เลิกทำ',
    redo: 'ทำซ้ำ',
    confirm: 'ยืนยัน',
    clear: 'ล้าง'
  },
  Popconfirm: {
    positiveText: 'ยืนยัน',
    negativeText: 'ยกเลิก'
  },
  Cascader: {
    placeholder: 'กรุณาเลือก',
    loading: 'กำลังโหลด',
    loadingRequiredMessage: (label: string): string =>
      `Please load all ${label}'s descendants before checking it.`
  },
  Time: {
    dateFormat: 'dd-MMMM-yyyy',
    dateTimeFormat: 'dd-MMMM-yyyy HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'dd/MMMM/yyyy',
    dateTimeFormat: 'dd/MMMM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: 'ล้าง',
    now: 'วันนี้',
    confirm: 'ยืนยัน',
    selectTime: 'เวลา',
    selectDate: 'วันที่',
    datePlaceholder: 'วันที่',
    datetimePlaceholder: 'เวลา-วันที่',
    monthPlaceholder: 'เดือน',
    yearPlaceholder: 'ปี',
    quarterPlaceholder: 'ไตรมาส',
    startDatePlaceholder: 'วันที่เริ่มต้น',
    endDatePlaceholder: 'วันที่สิ้นสุด',
    startDatetimePlaceholder: 'วันที่เริ่มต้นและสิ้นสุด',
    endDatetimePlaceholder: 'วันที่สิ้นสุดและเวลา',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'วันนี้'
  },
  DataTable: {
    checkTableAll: 'เลือกทั้งหมด',
    uncheckTableAll: 'ไม่เลือกทั้งหมด',
    confirm: 'ยืนยัน',
    clear: 'ล้างข้อมูล'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Target'
  },
  // TODO: translation
  Transfer: {
    selectAll: 'Select all',
    unselectAll: 'Unselect all',
    clearAll: 'Clear',
    total: (num: number): string => `Total ${num} items`,
    selected: (num: number): string => `${num} items selected`
  },
  Empty: {
    description: 'ไม่มีข้อมูล'
  },
  Select: {
    placeholder: 'กรุณาเลือก'
  },
  TimePicker: {
    placeholder: 'เวลา',
    positiveText: 'ตกลง',
    negativeText: 'ยกเลิก',
    now: 'วันนี้'
  },
  Pagination: {
    goto: 'ไปยัง',
    selectionSuffix: 'หน้า'
  },
  DynamicTags: {
    add: 'เพิ่ม'
  },
  Log: {
    loading: 'กำลังโหลด'
  },
  Input: {
    placeholder: 'กรุณากรอก'
  },
  InputNumber: {
    placeholder: 'กรุณากรอก'
  },
  DynamicInput: {
    create: 'สร้าง'
  },
  ThemeEditor: {
    title: 'แก้ไขธีม',
    clearAllVars: 'ล้างข้อมูลตัวแปร',
    clearSearch: 'ล้างข้อมูลค้นหา',
    filterCompName: 'กรองโดยชื่อ Component',
    filterVarName: 'กรองโดยชื่อตัวแปร',
    import: 'นำเข้า',
    export: 'ส่งออก',
    restore: 'รีเซ็ต'
  },
  // TODO: translation
  Image: {
    tipPrevious: 'ก่อนหน้า (←)',
    tipNext: 'ถัดไป (→)',
    tipCounterclockwise: 'หมุน (↺)',
    tipClockwise: 'หมุน (↻)',
    tipZoomOut: 'ซูมออก',
    tipZoomIn: 'ซูมเข้า',
    tipClose: 'ปิด (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default thTH
