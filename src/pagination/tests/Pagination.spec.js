import Vue from 'vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Pagination from '../index'
import create from '../../create'
import zhCN from '../../locale/zhCN'
import enUS from '../../locale/enUS'
import { lightStyleScheme, darkStyleScheme } from '../../_deprecated/style-scheme'
import paginationLightStyle from '../styles/light'
import paginationDarkStyle from '../styles/dark'
import baseDarkStyle from '../../styles/base/dark'
import baseLightStyle from '../../styles/base/light'

describe('n-pagination', () => {
  describe('props.page', () => {
    it('should work', () => {
      const naive = create({
        locales: [zhCN, enUS],
        fallbackLocale: enUS,
        fallbackTheme: 'light',
        components: [
          Pagination
        ],
        styles: [
          baseLightStyle,
          baseDarkStyle,
          paginationLightStyle,
          paginationDarkStyle
        ],
        styleSchemes: {
          light: lightStyleScheme,
          dark: darkStyleScheme
        }
      })
      Vue.use(naive)
      const wrapper = mount(Pagination, {
        propsData: {
          page: 5,
          pageCount: 10
        }
      })
      expect(
        wrapper
          .find('.n-pagination-item--active')
          .text()
      ).to.equal('5')
    })
  })
})
