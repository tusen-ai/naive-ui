import type { NLocale } from './common/enUS'
import type { NDateLocale } from './date/enUS'
import { mount } from '@vue/test-utils'
import { defineComponent, h, onMounted, type PropType, ref } from 'vue'
import { NConfigProvider } from '../config-provider/index'
import { NDatePicker } from '../date-picker/index'
import {
  arDZ,
  azAZ,
  csCZ,
  dateArDZ,
  dateAzAZ,
  dateCsCZ,
  dateDeDE,
  dateEnGB,
  dateEnUS,
  dateEo,
  dateEsAR,
  dateEtEE,
  dateFaIR,
  dateFrFR,
  dateIdID,
  dateItIT,
  dateJaJP,
  dateKoKR,
  dateNbNO,
  dateNlNL,
  datePlPL,
  datePtBR,
  dateRuRU,
  dateSkSK,
  dateSvSE,
  dateThTH,
  dateTrTR,
  dateUkUA,
  dateUzUZ,
  dateZhCN,
  dateZhTW,
  deDE,
  enGB,
  enUS,
  eo,
  esAR,
  etEE,
  faIR,
  frFR,
  idID,
  itIT,
  jaJP,
  koKR,
  nbNO,
  nlNL,
  plPL,
  ptBR,
  ruRU,
  skSK,
  svSE,
  thTH,
  trTR,
  ukUA,
  uzUZ,
  zhCN,
  zhTW
} from '../index'
import { NInput } from '../input/index'
import { createLocale } from './utils/index'

const Wrapper = defineComponent({
  props: {
    dateLocale: Object as PropType<NDateLocale>,
    locale: Object as PropType<NLocale>,
    onMounted: Function as PropType<(date: string) => void>
  },
  setup() {
    const datePickerWrapperElRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      // const { value: datePickerWrapperEl } = datePickerWrapperElRef
      // if (!datePickerWrapperEl) return
      // TODO: Fix timezone caused CI Error
      // const dateInputEls = datePickerWrapperEl?.querySelectorAll('input')
      // props.onMounted?.(
      //   JSON.stringify([
      //     'check date format',
      //     dateInputEls[0].value,
      //     dateInputEls[1].value,
      //     dateInputEls[2].value,
      //     dateInputEls[3].value
      //   ])
      // )
    })
    return {
      datePickerWrapperElRef
    }
  },
  render() {
    return (
      <NConfigProvider {...this.$props}>
        {{
          default: () => (
            <div>
              <NInput />
              <div ref="datePickerWrapperElRef">
                <NDatePicker type="date" value={666} />
                <NDatePicker type="datetime" value={666} />
                <NDatePicker type="year" value={666} />
                <NDatePicker type="month" value={666} />
              </div>
            </div>
          )
        }}
      </NConfigProvider>
    )
  }
})

describe('locale', () => {
  it('works with createLocale', () => {
    const locale1: NLocale = createLocale(
      {
        Select: {
          placeholder: '???'
        }
      },
      enUS
    )
    expect(locale1.Select.placeholder).toEqual('???')
    locale1.Select.placeholder = enUS.Select.placeholder
    expect(locale1).toEqual(enUS)
    const locale2: NLocale = createLocale(enUS)
    expect(locale2).toEqual(enUS)
  })
  it('works', () => {
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateZhCN,
          locale: zhCN,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateZhTW,
          locale: zhTW,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEnUS,
          locale: enUS,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateRuRU,
          locale: ruRU,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateUkUA,
          locale: ukUA,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateUzUZ,
          locale: uzUZ,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateJaJP,
          locale: jaJP,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateKoKR,
          locale: koKR,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateIdID,
          locale: idID,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateDeDE,
          locale: deDE,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateNbNO,
          locale: nbNO,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateFrFR,
          locale: frFR
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEsAR,
          locale: esAR
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateItIT,
          locale: itIT
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEnGB,
          locale: enGB
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateSkSK,
          locale: skSK
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateCsCZ,
          locale: csCZ
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: datePlPL,
          locale: plPL
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: datePtBR,
          locale: ptBR
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateThTH,
          locale: thTH
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEo,
          locale: eo
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateNlNL,
          locale: nlNL
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateArDZ,
          locale: arDZ
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateTrTR,
          locale: trTR
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateFaIR,
          locale: faIR
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateSvSE,
          locale: svSE,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEtEE,
          locale: etEE,
          onMounted: (date: string) => {
            expect(date).toMatchSnapshot()
          }
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateAzAZ,
          locale: azAZ
        }
      }).html()
    ).toMatchSnapshot()
  })
})
