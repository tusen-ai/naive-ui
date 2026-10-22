import type { NLocale } from './enUS'

const loLA: NLocale = {
  name: 'lo-LA',
  global: {
    undo: 'ຍົກເລີກການເຮັດ',
    redo: 'ເຮັດຊ້ຳ',
    confirm: 'ຢືນຢັນ',
    clear: 'ລ້າງ'
  },
  Popconfirm: {
    positiveText: 'ຢືນຢັນ',
    negativeText: 'ຍົກເລີກ'
  },
  Cascader: {
    placeholder: 'ກະລຸນາເລືອກ',
    loading: 'ກຳລັງໂຫຼດ',
    loadingRequiredMessage: (label: string): string =>
      `ກະລຸນາໂຫຼດລູກຫຼານທັງໝົດຂອງ ${label} ກ່ອນທີ່ຈະເລືອກ`
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
    clear: 'ລ້າງ',
    now: 'ຕອນນີ້',
    confirm: 'ຢືນຢັນ',
    selectTime: 'ເລືອກເວລາ',
    selectDate: 'ເລືອກວັນທີ',
    datePlaceholder: 'ເລືອກວັນທີ',
    datetimePlaceholder: 'ເລືອກວັນທີ ແລະ ເວລາ',
    monthPlaceholder: 'ເລືອກເດືອນ',
    yearPlaceholder: 'ເລືອກປີ',
    quarterPlaceholder: 'ເລືອກໄຕມາດ',
    weekPlaceholder: 'ເລືອກອາທິດ',
    startDatePlaceholder: 'ວັນທີເລີ່ມຕົ້ນ',
    endDatePlaceholder: 'ວັນທີສິ້ນສຸດ',
    startDatetimePlaceholder: 'ວັນທີ ແລະ ເວລາເລີ່ມຕົ້ນ',
    endDatetimePlaceholder: 'ວັນທີ ແລະ ເວລາສິ້ນສຸດ',
    startMonthPlaceholder: 'ເດືອນເລີ່ມຕົ້ນ',
    endMonthPlaceholder: 'ເດືອນສິ້ນສຸດ',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'ມື້ນີ້'
  },
  DataTable: {
    checkTableAll: 'ເລືອກທັງໝົດໃນຕາຕະລາງ',
    uncheckTableAll: 'ຍົກເລີກການເລືອກທັງໝົດໃນຕາຕະລາງ',
    confirm: 'ຢືນຢັນ',
    clear: 'ລ້າງ'
  },
  LegacyTransfer: {
    sourceTitle: 'ແຫຼ່ງຂໍ້ມູນ',
    targetTitle: 'ເປົ້າໝາຍ'
  },
  Transfer: {
    selectAll: 'ເລືອກທັງໝົດ',
    unselectAll: 'ຍົກເລີກການເລືອກທັງໝົດ',
    clearAll: 'ລ້າງ',
    total: (num: number): string => `ທັງໝົດ ${num} ລາຍການ`,
    selected: (num: number): string => `ເລືອກແລ້ວ ${num} ລາຍການ`
  },
  Empty: {
    description: 'ບໍ່ມີຂໍ້ມູນ'
  },
  Select: {
    placeholder: 'ກະລຸນາເລືອກ'
  },
  TimePicker: {
    placeholder: 'ເລືອກເວລາ',
    positiveText: 'ຕົກລົງ',
    negativeText: 'ຍົກເລີກ',
    now: 'ຕອນນີ້',
    clear: 'ລ້າງ'
  },
  Pagination: {
    goto: 'ໄປຫາ',
    selectionSuffix: 'ໜ້າ'
  },
  DynamicTags: {
    add: 'ເພີ່ມ'
  },
  Log: {
    loading: 'ກຳລັງໂຫຼດ'
  },
  Input: {
    placeholder: 'ກະລຸນາປ້ອນ'
  },
  InputNumber: {
    placeholder: 'ກະລຸນາປ້ອນ'
  },
  DynamicInput: {
    create: 'ສ້າງ'
  },
  ThemeEditor: {
    title: 'ຕົວແກ້ໄຂຮູບແບບ',
    clearAllVars: 'ລ້າງຕົວແປທັງໝົດ',
    clearSearch: 'ລ້າງການຄົ້ນຫາ',
    filterCompName: 'ກັ່ນຕອງຊື່ສ່ວນປະກອບ',
    filterVarName: 'ກັ່ນຕອງຊື່ຕົວແປ',
    import: 'ນຳເຂົ້າ',
    export: 'ສົ່ງອອກ',
    restore: 'ກັບຄືນສູ່ຄ່າເລີ່ມຕົ້ນ'
  },
  Image: {
    tipPrevious: 'ຮູບກ່ອນໜ້າ (←)',
    tipNext: 'ຮູບຕໍ່ໄປ (→)',
    tipCounterclockwise: 'ທວນເຂັມໂມງ',
    tipClockwise: 'ຕາມເຂັມໂມງ',
    tipZoomOut: 'ຊູມອອກ',
    tipZoomIn: 'ຊູມເຂົ້າ',
    tipDownload: 'ດາວໂຫຼດ',
    tipClose: 'ປິດ (Esc)',
    tipOriginalSize: 'ຊູມເປັນຂະໜາດຕົ້ນສະບັບ'
  },
  Heatmap: {
    less: 'ນ້ອຍ',
    more: 'ຫຼາຍ',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default loLA
