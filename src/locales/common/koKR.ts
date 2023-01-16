import type { NLocale } from './enUS'

const koKR: NLocale = {
  name: 'ko-KR',
  global: {
    undo: '실행 취소',
    redo: '다시 실행',
    confirm: '확인',
    clear: '지우기'
  },
  Popconfirm: {
    positiveText: '확인',
    negativeText: '취소'
  },
  Cascader: {
    placeholder: '선택해 주세요',
    loading: '불러오는 중',
    loadingRequiredMessage: (label: string): string =>
      `${label}의 모든 하위 항목을 불러온 뒤에 선택할 수 있습니다.`
  },
  Time: {
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy년',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    yearTypeFormat: 'yyyy',
    monthTypeFormat: 'yyyy-MM',
    dateFormat: 'yyyy-MM-dd',
    dateTimeFormat: 'yyyy-MM-dd HH:mm:ss',
    quarterFormat: 'yyyy-qqq',
    clear: '지우기',
    now: '현재',
    confirm: '확인',
    selectTime: '시간 선택',
    selectDate: '날짜 선택',
    datePlaceholder: '날짜 선택',
    datetimePlaceholder: '날짜 및 시간 선택',
    monthPlaceholder: '월 선택',
    yearPlaceholder: '년 선택',
    quarterPlaceholder: '분기 선택',
    startDatePlaceholder: '시작 날짜',
    endDatePlaceholder: '종료 날짜',
    startDatetimePlaceholder: '시작 날짜 및 시간',
    endDatetimePlaceholder: '종료 날짜 및 시간',
    // FIXME: translation needed
    startMonthPlaceholder: '시작 월',
    endMonthPlaceholder: '종료 월',
    monthBeforeYear: false,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: '오늘'
  },
  DataTable: {
    checkTableAll: '모두 선택',
    uncheckTableAll: '모두 선택 해제',
    confirm: '확인',
    clear: '지우기'
  },
  LegacyTransfer: {
    sourceTitle: '원본',
    targetTitle: '타깃'
  },
  // TODO: translation
  Transfer: {
    selectAll: '전체 선택',
    unselectAll: '전체 해제',
    clearAll: '전체 삭제',
    total: (num: number): string => `총 ${num} 개`,
    selected: (num: number): string => `${num} 개 선택`
  },
  Empty: {
    description: '데이터 없음'
  },
  Select: {
    placeholder: '선택해 주세요'
  },
  TimePicker: {
    placeholder: '시간 선택',
    positiveText: '확인',
    negativeText: '취소',
    now: '현재 시간'
  },
  Pagination: {
    goto: '이동',
    selectionSuffix: '페이지'
  },
  DynamicTags: {
    add: '추가'
  },
  Log: {
    loading: '불러오는 중'
  },
  Input: {
    placeholder: '입력해 주세요'
  },
  InputNumber: {
    placeholder: '입력해 주세요'
  },
  DynamicInput: {
    create: '추가'
  },
  ThemeEditor: {
    title: '테마 편집기',
    clearAllVars: '모든 변수 지우기',
    clearSearch: '검색 지우기',
    filterCompName: '구성 요소 이름 필터',
    filterVarName: '변수 이름 필터',
    import: '가져오기',
    export: '내보내기',
    restore: '기본으로 재설정'
  },
  Image: {
    tipPrevious: '이전 (←)',
    tipNext: '다음 (→)',
    tipCounterclockwise: '시계 반대 방향으로 회전',
    tipClockwise: '시계 방향으로 회전',
    tipZoomOut: '축소',
    tipZoomIn: '확대',
    tipClose: '닫기 (Esc)',
    // TODO: translation
    tipOriginalSize: '원본 크기로 확대'
  }
}

export default koKR
