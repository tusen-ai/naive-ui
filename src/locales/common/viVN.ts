import type { NLocale } from './enUS'

const viVN: NLocale = {
  name: 'vi-VN',
  global: {
    undo: 'Hoàn tác',
    redo: 'Làm lại',
    confirm: 'Xác nhận',
    clear: 'xóa'
  },
  Popconfirm: {
    positiveText: 'Xác nhận',
    negativeText: 'Hủy'
  },
  Cascader: {
    placeholder: 'Vui lòng chọn',
    loading: 'Đang tải',
    loadingRequiredMessage: (label: string): string =>
      `Vui lòng tải tất cả thông tin con của ${label} trước.`
  },
  Time: {
    dateFormat: '',
    dateTimeFormat: 'HH:mm:ss dd-MM-yyyy'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'MM-yyyy',
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'HH:mm:ss dd-MM-yyyy',
    quarterFormat: 'qqq-yyyy',
    clear: 'Xóa',
    now: 'Hôm nay',
    confirm: 'Xác nhận',
    selectTime: 'Chọn giờ',
    selectDate: 'Chọn ngày',
    datePlaceholder: 'Chọn ngày',
    datetimePlaceholder: 'Chọn ngày giờ',
    monthPlaceholder: 'Chọn tháng',
    yearPlaceholder: 'Chọn năm',
    quarterPlaceholder: 'Chọn quý',
    startDatePlaceholder: 'Ngày bắt đầu',
    endDatePlaceholder: 'Ngày kết thúc',
    startDatetimePlaceholder: 'Thời gian bắt đầu',
    endDatetimePlaceholder: 'Thời gian kết thúc',
    startMonthPlaceholder: 'Tháng bắt đầu',
    endMonthPlaceholder: 'Tháng kết thúc',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hôm nay'
  },
  DataTable: {
    checkTableAll: 'Chọn tất cả có trong bảng',
    uncheckTableAll: 'Bỏ chọn tất cả có trong bảng',
    confirm: 'Xác nhận',
    clear: 'Xóa'
  },
  LegacyTransfer: {
    sourceTitle: 'Nguồn',
    targetTitle: 'Đích'
  },
  Transfer: {
    selectAll: 'Chọn tất cả',
    unselectAll: 'Bỏ chọn tất cả',
    clearAll: 'Xoá tất cả',
    total: (num: number): string => `Tổng cộng ${num} mục`,
    selected: (num: number): string => `${num} mục được chọn`
  },
  Empty: {
    description: 'Không có dữ liệu'
  },
  Select: {
    placeholder: 'Vui lòng chọn'
  },
  TimePicker: {
    placeholder: 'Chọn thời gian',
    positiveText: 'OK',
    negativeText: 'Hủy',
    now: 'Hiện tại'
  },
  Pagination: {
    goto: 'Đi đến trang',
    selectionSuffix: 'trang'
  },
  DynamicTags: {
    add: 'Thêm'
  },
  Log: {
    loading: 'Đang tải'
  },
  Input: {
    placeholder: 'Vui lòng nhập'
  },
  InputNumber: {
    placeholder: 'Vui lòng nhập'
  },
  DynamicInput: {
    create: 'Tạo'
  },
  ThemeEditor: {
    title: 'Tùy chỉnh giao diện',
    clearAllVars: 'Xóa tất cả các biến',
    clearSearch: 'Xóa tìm kiếm',
    filterCompName: 'Lọc tên component',
    filterVarName: 'Lọc tên biến',
    import: 'Nhập',
    export: 'Xuất',
    restore: 'Đặt lại mặc định'
  },
  Image: {
    tipPrevious: 'Hình trước (←)',
    tipNext: 'Hình tiếp (→)',
    tipCounterclockwise: 'Counterclockwise',
    tipClockwise: 'Chiều kim đồng hồ',
    tipZoomOut: 'Thu nhỏ',
    tipZoomIn: 'Phóng to',
    tipClose: 'Đóng (Esc)',
    tipOriginalSize: 'Xem kích thước gốc'
  }
}

export default viVN
