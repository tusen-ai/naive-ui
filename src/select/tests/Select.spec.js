import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { selectLight } from '../styles'
import { NSelect } from '../index'

describe('n-select', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      selectLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NSelect, {
      global: {
        plugins: [naive]
      }
    })
  })
})
