import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { scrollbarLight } from '../styles'
import { NScrollbar } from '../index'

describe('n-scrollbar', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      scrollbarLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NScrollbar, {
      global: {
        plugins: [naive]
      }
    })
  })
})
