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
    weekFormat: 'yyyy-w',
    clear: 'Limpar',
    now: 'Agora',
    confirm: 'Confirmar',
    selectTime: 'Selecione a hora',
    selectDate: 'Selecione a data',
    datePlaceholder: 'Selecione a data',
    datetimePlaceholder: 'Selecione a data e hora',
    monthPlaceholder: 'Selecione o mês',
    yearPlaceholder: 'Selecione o ano',
    quarterPlaceholder: 'Selecione o trimestre',
    weekPlaceholder: 'Select Week',
    startDatePlaceholder: 'Selecione a data de início',
    endDatePlaceholder: 'Selecione a data de término',
    startDatetimePlaceholder: 'Selecione a data e hora de início',
    endDatetimePlaceholder: 'Selecione a data e hora de término',
    startMonthPlaceholder: 'Selecione o mês de início',
    endMonthPlaceholder: 'Selecione o mês de término',
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
    sourceTitle: 'Origem',
    targetTitle: 'Destino'
  },
  Transfer: {
    selectAll: 'Selecionar todos',
    unselectAll: 'Desmarcar todos',
    clearAll: 'Limpar',
    total: (num: number): string => `Total ${num} itens`,
    selected: (num: number): string => `${num} itens selecionados`
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
    tipZoomIn: 'Aumentar o zoom',
    tipDownload: 'Download',
    tipClose: 'Fechar (Esc)',
    tipOriginalSize: 'Exibir no tamanho original'
  }
}

export default ptBR
