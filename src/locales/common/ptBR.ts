import type { NLocale } from './enUS'

const ptBR: NLocale = {
  name: 'pt-BR',
  global: {
    undo: 'Desfazer',
    redo: 'Refazer',
    confirm: 'Confirmar',
    clear: 'Limpar'
  },
  Popconfirm: {
    positiveText: 'Confirmar',
    negativeText: 'Cancelar'
  },
  Cascader: {
    placeholder: 'Por favor selecione',
    loading: 'Carregando',
    loadingRequiredMessage: (label: string): string =>
      `Carregue todos os descendentes de ${label} antes de verificar.`
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
    monthTypeFormat: 'yyyy/MM',
    dateFormat: 'dd/MM/yyyy',
    dateTimeFormat: 'dd/MM/yyyy HH:mm:ss',
    quarterFormat: 'yyyy/qqq',
    clear: 'Limpar',
    now: 'Agora',
    confirm: 'Confirmar',
    selectTime: 'Selecionar hora',
    selectDate: 'Selecione a data',
    datePlaceholder: 'Selecione a data',
    datetimePlaceholder: 'Selecione Data e Hora',
    monthPlaceholder: 'Selecione o mês',
    yearPlaceholder: 'Selecione o ano',
    quarterPlaceholder: 'Selecione o quatrimestre',
    startDatePlaceholder: 'Selecione a data de início',
    endDatePlaceholder: 'Selecione a data de término',
    startDatetimePlaceholder: 'Selecione a data e hora de início',
    endDatetimePlaceholder: 'Select a data e hora de término',
    // FIXME: translation needed
    startMonthPlaceholder: 'Start Month',
    endMonthPlaceholder: 'End Month',
    monthBeforeYear: true,
    firstDayOfWeek: 6 as 0 | 1 | 2 | 3 | 4 | 5 | 6,
    today: 'Hoje'
  },
  DataTable: {
    checkTableAll: 'Selecionar todos na tabela',
    uncheckTableAll: 'Desmarcar todos na tabela',
    confirm: 'Confirmar',
    clear: 'Limpar'
  },
  LegacyTransfer: {
    sourceTitle: 'Fonte',
    targetTitle: 'Destino'
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
    description: 'Não há dados'
  },
  Select: {
    placeholder: 'Por favor selecione'
  },
  TimePicker: {
    placeholder: 'Selecione a hora',
    positiveText: 'OK',
    negativeText: 'Cancelar',
    now: 'Agora'
  },
  Pagination: {
    goto: 'Ir para',
    selectionSuffix: 'página'
  },
  DynamicTags: {
    add: 'Adicionar'
  },
  Log: {
    loading: 'Carregando'
  },
  Input: {
    placeholder: 'Por favor digite'
  },
  InputNumber: {
    placeholder: 'Por favor digite'
  },
  DynamicInput: {
    create: 'Criar'
  },
  ThemeEditor: {
    title: 'Editor de temas',
    clearAllVars: 'Limpar todas as variáveis',
    clearSearch: 'Limpar pesquisa',
    filterCompName: 'Filtrar nome do componente',
    filterVarName: 'Filtrar nome da variável',
    import: 'Importar',
    export: 'Exportar',
    restore: 'Restaurar'
  },
  Image: {
    tipPrevious: 'Foto anterior (←)',
    tipNext: 'Próxima foto (→)',
    tipCounterclockwise: 'Sentido anti-horário',
    tipClockwise: 'Sentido horário',
    tipZoomOut: 'Reduzir o zoom',
    tipZoomIn: 'Mais Zoom',
    tipClose: 'Fechar (Esc)',
    // TODO: translation
    tipOriginalSize: 'Zoom to original size'
  }
}

export default ptBR
