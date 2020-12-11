import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { gridLight } from '../styles'
import { NGrid } from '../index'

describe('n-grid', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      gridLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NGrid, {
      global: {
        plugins: [naive]
      }
    })
  })
})
