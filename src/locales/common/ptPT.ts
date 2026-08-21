import type { NLocale } from './enUS'

const ptPT: NLocale = {
  name: 'pt-PT',
  global: {
    undo: 'Anular',
    redo: 'Refazer',
    confirm: 'Confirmar',
    clear: 'Limpar'
  },
  Popconfirm: {
    positiveText: 'Confirmar',
    negativeText: 'Cancelar'
  },
  Cascader: {
    placeholder: 'Selecione',
    loading: 'A carregar',
    loadingRequiredMessage: (label: string): string =>
      `Carregue todos os descendentes de ${label} antes de o selecionar.`
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
    clear: 'Limpar',
    now: 'Agora',
    confirm: 'Confirmar',
    selectTime: 'Selecionar hora',
    selectDate: 'Selecionar data',
    datePlaceholder: 'Selecionar data',
    datetimePlaceholder: 'Selecionar data e hora',
    monthPlaceholder: 'Selecionar mês',
    yearPlaceholder: 'Selecionar ano',
    quarterPlaceholder: 'Selecionar trimestre',
    weekPlaceholder: 'Selecionar semana',
    startDatePlaceholder: 'Data de início',
    endDatePlaceholder: 'Data de fim',
    startDatetimePlaceholder: 'Data e hora de início',
    endDatetimePlaceholder: 'Data e hora de fim',
    startMonthPlaceholder: 'Mês de início',
    endMonthPlaceholder: 'Mês de fim',
    monthBeforeYear: true,
    firstDayOfWeek: 0 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hoje'
  },
  DataTable: {
    checkTableAll: 'Selecionar tudo na tabela',
    uncheckTableAll: 'Desmarcar tudo na tabela',
    confirm: 'Confirmar',
    clear: 'Limpar'
  },
  LegacyTransfer: {
    sourceTitle: 'Origem',
    targetTitle: 'Destino'
  },
  Transfer: {
    selectAll: 'Selecionar tudo',
    unselectAll: 'Desmarcar tudo',
    clearAll: 'Limpar',
    total: (num: number): string => `Total de ${num} itens`,
    selected: (num: number): string => `${num} itens selecionados`
  },
  Empty: {
    description: 'Sem dados'
  },
  Select: {
    placeholder: 'Selecione'
  },
  TimePicker: {
    placeholder: 'Selecionar hora',
    positiveText: 'OK',
    negativeText: 'Cancelar',
    now: 'Agora',
    clear: 'Limpar'
  },
  Pagination: {
    goto: 'Ir para',
    selectionSuffix: 'página'
  },
  DynamicTags: {
    add: 'Adicionar'
  },
  Log: {
    loading: 'A carregar'
  },
  Input: {
    placeholder: 'Introduza'
  },
  InputNumber: {
    placeholder: 'Introduza'
  },
  DynamicInput: {
    create: 'Criar'
  },
  ThemeEditor: {
    title: 'Editor de tema',
    clearAllVars: 'Limpar todas as variáveis',
    clearSearch: 'Limpar pesquisa',
    filterCompName: 'Filtrar nome do componente',
    filterVarName: 'Filtrar nome da variável',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Repor predefinições'
  },
  Image: {
    tipPrevious: 'Imagem anterior (←)',
    tipNext: 'Imagem seguinte (→)',
    tipCounterclockwise: 'Sentido anti-horário',
    tipClockwise: 'Sentido horário',
    tipZoomOut: 'Reduzir',
    tipZoomIn: 'Ampliar',
    tipDownload: 'Descarregar',
    tipClose: 'Fechar (Esc)',
    tipOriginalSize: 'Zoom para o tamanho original'
  },
  Heatmap: {
    less: 'menos',
    more: 'mais',
    monthFormat: 'MMM',
    weekdayFormat: 'eeeeee'
  }
}

export default ptPT
