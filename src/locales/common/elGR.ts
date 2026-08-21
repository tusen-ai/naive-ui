import type { NLocale } from './enUS'

const elGR: NLocale = {
  name: 'el-GR',
  global: {
    undo: 'Αναίρεση',
    redo: 'Επανάληψη',
    confirm: 'Επιβεβαίωση',
    clear: 'Καθαρισμός'
  },
  Popconfirm: {
    positiveText: 'Επιβεβαίωση',
    negativeText: 'Ακύρωση'
  },
  Cascader: {
    placeholder: 'Παρακαλώ επιλέξτε',
    loading: 'Φόρτωση',
    loadingRequiredMessage: (label: string): string =>
      `Φορτώστε όλους τους απογόνους του ${label} πριν τον επιλέξετε.`
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
    clear: 'Καθαρισμός',
    now: 'Τώρα',
    confirm: 'Επιβεβαίωση',
    selectTime: 'Επιλογή ώρας',
    selectDate: 'Επιλογή ημερομηνίας',
    datePlaceholder: 'Επιλογή ημερομηνίας',
    datetimePlaceholder: 'Επιλογή ημερομηνίας και ώρας',
    monthPlaceholder: 'Επιλογή μήνα',
    yearPlaceholder: 'Επιλογή έτους',
    quarterPlaceholder: 'Επιλογή τριμήνου',
    weekPlaceholder: 'Επιλογή εβδομάδας',
    startDatePlaceholder: 'Ημερομηνία έναρξης',
    endDatePlaceholder: 'Ημερομηνία λήξης',
    startDatetimePlaceholder: 'Ημερομηνία και ώρα έναρξης',
    endDatetimePlaceholder: 'Ημερομηνία και ώρα λήξης',
    startMonthPlaceholder: 'Μήνας έναρξης',
    endMonthPlaceholder: 'Μήνας λήξης',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Σήμερα'
  },
  DataTable: {
    checkTableAll: 'Επιλογή όλων στον πίνακα',
    uncheckTableAll: 'Αποεπιλογή όλων στον πίνακα',
    confirm: 'Επιβεβαίωση',
    clear: 'Καθαρισμός'
  },
  LegacyTransfer: {
    sourceTitle: 'Πηγή',
    targetTitle: 'Προορισμός'
  },
  Transfer: {
    selectAll: 'Επιλογή όλων',
    unselectAll: 'Αποεπιλογή όλων',
    clearAll: 'Καθαρισμός',
    total: (num: number): string => `Σύνολο ${num} στοιχείων`,
    selected: (num: number): string => `Επιλέχθηκαν ${num} στοιχεία`
  },
  Empty: {
    description: 'Δεν υπάρχουν δεδομένα'
  },
  Select: {
    placeholder: 'Παρακαλώ επιλέξτε'
  },
  TimePicker: {
    placeholder: 'Επιλογή ώρας',
    positiveText: 'OK',
    negativeText: 'Ακύρωση',
    now: 'Τώρα',
    clear: 'Καθαρισμός'
  },
  Pagination: {
    goto: 'Μετάβαση σε',
    selectionSuffix: 'σελίδα'
  },
  DynamicTags: {
    add: 'Προσθήκη'
  },
  Log: {
    loading: 'Φόρτωση'
  },
  Input: {
    placeholder: 'Παρακαλώ εισαγάγετε'
  },
  InputNumber: {
    placeholder: 'Παρακαλώ εισαγάγετε'
  },
  DynamicInput: {
    create: 'Δημιουργία'
  },
  ThemeEditor: {
    title: 'Επεξεργαστής θέματος',
    clearAllVars: 'Καθαρισμός όλων των μεταβλητών',
    clearSearch: 'Καθαρισμός αναζήτησης',
    filterCompName: 'Φίλτρο ονόματος στοιχείου',
    filterVarName: 'Φίλτρο ονόματος μεταβλητής',
    import: 'Εισαγωγή',
    export: 'Εξαγωγή',
    restore: 'Επαναφορά προεπιλογών'
  },
  Image: {
    tipPrevious: 'Προηγούμενη εικόνα (←)',
    tipNext: 'Επόμενη εικόνα (→)',
    tipCounterclockwise: 'Αντίστροφα των δεικτών',
    tipClockwise: 'Με τους δείκτες του ρολογιού',
    tipZoomOut: 'Σμίκρυνση',
    tipZoomIn: 'Μεγέθυνση',
    tipDownload: 'Λήψη',
    tipClose: 'Κλείσιμο (Esc)',
    tipOriginalSize: 'Ζουμ στο αρχικό μέγεθος'
  },
  Heatmap: {
    less: 'λιγότερο',
    more: 'περισσότερο',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default elGR
