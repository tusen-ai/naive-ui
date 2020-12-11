import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { dividerLight } from '../styles'
import { NDivider } from '../index'

describe('n-divider', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      dividerLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NDivider, {
      global: {
        plugins: [naive]
      }
    })
  })
})
