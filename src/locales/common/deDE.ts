import type { NLocale } from './enUS'

const deDE: NLocale = {
  name: 'de-DE',
  global: {
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    confirm: 'Bestätigen'
  },
  Popconfirm: {
    positiveText: 'Bestätigen',
    negativeText: 'Abbrechen'
  },
  Cascader: {
    placeholder: 'Bitte auswählen',
    loading: 'Wird geladen',
    loadingRequiredMessage: (label: string): string =>
      `Bitte laden Sie alle Unterpunkte von ${label}, bevor Sie es auswählen.`
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
    clear: 'Löschen',
    now: 'Jetzt',
    confirm: 'Bestätigen',
    selectTime: 'Uhrzeit auswählen',
    selectDate: 'Datum auswählen',
    datePlaceholder: 'Datum auswählen',
    datetimePlaceholder: 'Datum und Uhrzeit auswählen',
    monthPlaceholder: 'Monat auswählen',
    // FIXME: translation needed
    yearPlaceholder: 'Select Year',
    quarterPlaceholder: 'Select Quarter',
    startDatePlaceholder: 'Anfangsdatum',
    endDatePlaceholder: 'Enddatum',
    startDatetimePlaceholder: 'Anfangsdatum und Uhrzeit',
    endDatetimePlaceholder: 'Enddatum und Uhrzeit',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Heute'
  },
  DataTable: {
    checkTableAll: 'Alles auswählen',
    uncheckTableAll: 'Auswahl aufheben',
    confirm: 'Bestätigen',
    clear: 'Löschen'
  },
  Transfer: {
    sourceTitle: 'Quelle',
    targetTitle: 'Ziel'
  },
  Empty: {
    description: 'Keine Daten'
  },
  Select: {
    placeholder: 'Bitte auswählen'
  },
  TimePicker: {
    placeholder: 'Uhrzeit auswählen',
    positiveText: 'OK',
    negativeText: 'Abbrechen',
    now: 'Jetzt'
  },
  Pagination: {
    goto: 'Gehe zu',
    selectionSuffix: 'Seite'
  },
  DynamicTags: {
    add: 'Hinzufügen'
  },
  Log: {
    loading: 'Wird geladen'
  },
  Input: {
    placeholder: 'Bitte ausfüllen'
  },
  InputNumber: {
    placeholder: 'Bitte ausfüllen'
  },
  DynamicInput: {
    create: 'Erstellen'
  },
  ThemeEditor: {
    title: 'Theme Editor',
    clearAllVars: 'Alle Variablen löschen',
    clearSearch: 'Suche löschen',
    filterCompName: 'Filter Komponentenname',
    filterVarName: 'Filter Variablenname',
    import: 'Importieren',
    export: 'Exportieren',
    restore: 'Auf Standard zurücksetzen'
  }
}

export default deDE
