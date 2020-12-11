import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { collapseLight } from '../styles'
import { NCollapse } from '../index'

describe('n-collapse', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      collapseLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NCollapse, {
      global: {
        plugins: [naive]
      }
    })
  })
})
