const frFR = {
  name: 'fr-FR',
  global: {
    undo: 'Annuler',
    redo: 'Refaire'
  },
  Popconfirm: {
    positiveText: 'Confirmer',
    negativeText: 'Annuler'
  },
  Cascader: {
    placeholder: 'Veuillez choisir',
    loading: 'Chargement',
    loadingRequiredMessage: (label: string): string =>
      `Veuillez charger tous les descendants de ${label} avant de le selectionner.`
  },
  Time: {
    dateFormat: 'dd-MM-yyyy',
    dateTimeFormat: 'dd-MM-yyyy hh:mm:ss'
  },
  DatePicker: {
    yearFormat: 'yyyy',
    monthFormat: 'MMM',
    dayFormat: 'eeeeee',
    clear: 'Effacer',
    now: 'Maintenant',
    confirm: 'Confirmer',
    selectTime: "Choisir l'heure",
    selectDate: 'Choisir une date',
    datePlaceholder: 'Choisir une date',
    datetimePlaceholder: "Choisir la date et l'heure",
    startDatePlaceholder: 'Date de début',
    endDatePlaceholder: 'Date de fin',
    startDatetimePlaceholder: "La date et l'heure de début",
    endDatetimePlaceholder: "La date et l'heure de fin",
    monthBeforeYear: true,
    firstDayOfWeek: 6,
    today: "Aujourd'hui"
  },
  DataTable: {
    checkTableAll: 'Tout sélectionner',
    uncheckTableAll: 'Tout désélectionner',
    confirm: 'Confirmer',
    clear: 'Effacer'
  },
  Transfer: {
    sourceTitle: 'Source',
    targetTitle: 'Destination'
  },
  Empty: {
    description: 'Aucune donnée'
  },
  Select: {
    placeholder: 'Veuillez choisir'
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
    placeholder: 'Veuillez saisir'
  },
  InputNumber: {
    placeholder: 'Veuillez saisir'
  },
  DynamicInput: {
    create: 'Créer'
  },
  ThemeEditor: {
    title: 'Éditeur de thème',
    clearAllVars: 'Effacer toutes les variables',
    clearSearch: 'Effacer la recherche',
    filterCompName: 'Filtrer par le nom du composant',
    filterVarName: 'Filtrer par la variable',
    import: 'Importer',
    export: 'Exporter',
    restore: 'Réinitialiser à la valeur par défaut'
  }
}

export type NLocale = typeof frFR
export default frFR
