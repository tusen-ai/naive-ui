import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  ruRU,
  zhCN,
  enUS,
  ukUA,
  dateEnUS,
  dateZhCN,
  dateRuRU,
  dateUkUA,
  NConfigProvider,
  NDateLocale,
  NLocale,
  NInput
} from '../index'

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
  })
})
