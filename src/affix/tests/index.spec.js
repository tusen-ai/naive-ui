import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { affixLight } from '../styles'
import { NAffix } from '../index'

describe('n-affix', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      affixLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NAffix, {
      global: {
        plugins: [naive]
      }
    })
  })
})
