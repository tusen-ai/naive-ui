import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  ruRU,
  zhCN,
  enUS,
  ukUA,
  jaJP,
  idID,
  deDE,
  nbNO,
  dateEnUS,
  dateZhCN,
  dateRuRU,
  dateUkUA,
  dateJaJP,
  dateIdID,
  dateDeDE,
  dateNbNO,
  NConfigProvider,
  NDateLocale,
  NLocale,
  NInput
} from '../index'
import { createLocale } from '.'

const Wrapper = (props: {
  dateLocale: NDateLocale
  locale: NLocale
}): JSX.Element => {
  return (
    <NConfigProvider {...props}>
      {{
        default: () => <NInput />
      }}
    </NConfigProvider>
  )
}

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
          locale: zhCN
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateEnUS,
          locale: enUS
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateRuRU,
          locale: ruRU
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateUkUA,
          locale: ukUA
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateJaJP,
          locale: jaJP
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateIdID,
          locale: idID
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateDeDE,
          locale: deDE
        }
      }).html()
    ).toMatchSnapshot()
    expect(
      mount(Wrapper, {
        props: {
          dateLocale: dateNbNO,
          locale: nbNO
        }
      }).html()
    ).toMatchSnapshot()
  })
})
