import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { anchorLight } from '../styles'
import { NAnchor } from '../index'

describe('n-anchor', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      anchorLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NAnchor, {
      global: {
        plugins: [naive]
      }
    })
  })
})
