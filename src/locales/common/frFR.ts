import type { NLocale } from './enUS'

const frFR: NLocale = {
  name: 'fr-FR',
  global: {
    undo: 'Défaire',
    redo: 'Refaire',
    confirm: 'Confirmer',
    clear: 'Effacer'
  },
  Popconfirm: {
    positiveText: 'Confirmer',
    negativeText: 'Annuler'
  },
  Cascader: {
    placeholder: 'Sélectionner',
    loading: 'Chargement',
    loadingRequiredMessage: (label: string): string =>
      `Charger tous les enfants de ${label} avant de le sélectionner`
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
    quarterFormat: 'qqq yyyy',
    clear: 'Effacer',
    now: 'Maintenant',
    confirm: 'Confirmer',
    selectTime: "Sélectionner l'heure",
    selectDate: 'Sélectionner la date',
    datePlaceholder: 'Sélectionner la date',
    datetimePlaceholder: "Sélectionner la date et l'heure",
    monthPlaceholder: 'Sélectionner le mois',
    yearPlaceholder: "Sélectionner l'année",
    quarterPlaceholder: 'Sélectionner le trimestre',
    startDatePlaceholder: 'Date de début',
    endDatePlaceholder: 'Date de fin',
    startDatetimePlaceholder: 'Date et heure de début',
    endDatetimePlaceholder: 'Date et heure de fin',
    startMonthPlaceholder: 'Mois de début',
    endMonthPlaceholder: 'Mois de fin',
    monthBeforeYear: true,
    firstDayOfWeek: 1,
    today: "Aujourd'hui"
  },
  DataTable: {
    checkTableAll: 'Sélectionner tout',
    uncheckTableAll: 'Désélectionner tout',
    confirm: 'Confirmer',
    clear: 'Effacer'
  },
  LegacyTransfer: {
    sourceTitle: 'Source',
    targetTitle: 'Cible'
  },
  Transfer: {
    selectAll: 'Sélectionner tout',
    unselectAll: 'Désélectionner tout',
    clearAll: 'Effacer',
    total: (num: number): string => `Total ${num} éléments`,
    selected: (num: number): string => `${num} éléments sélectionnés`
  },
  Empty: {
    description: 'Aucune donnée'
  },
  Select: {
    placeholder: 'Sélectionner'
  },
  TimePicker: {
    placeholder: "Sélectionner l'heure",
    positiveText: 'OK',
    negativeText: 'Annuler',
    now: 'Maintenant'
  },
  Pagination: {
    goto: 'Aller à',
    selectionSuffix: 'page'
  },
  DynamicTags: {
    add: 'Ajouter'
  },
  Log: {
    loading: 'Chargement'
  },
  Input: {
    placeholder: 'Saisir'
  },
  InputNumber: {
    placeholder: 'Saisir'
  },
  DynamicInput: {
    create: 'Créer'
  },
  ThemeEditor: {
    title: 'Éditeur de thème',
    clearAllVars: 'Effacer toutes les variables',
    clearSearch: 'Effacer la recherche',
    filterCompName: 'Filtrer par nom de composant',
    filterVarName: 'Filtrer par nom de variable',
    import: 'Importer',
    export: 'Exporter',
    restore: 'Réinitialiser'
  },
  Image: {
    tipPrevious: 'Image précédente (←)',
    tipNext: 'Image suivante (→)',
    tipCounterclockwise: 'Sens antihoraire',
    tipClockwise: 'Sens horaire',
    tipZoomOut: 'Dézoomer',
    tipZoomIn: 'Zoomer',
    tipClose: 'Fermer (Échap.)',
    tipOriginalSize: 'Zoom à la taille originale'
  }
}

export default frFR
