import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { popselectLight } from '../styles'
import { NPopselect } from '../index'

describe('n-popselect', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      popselectLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NPopselect, {
      global: {
        plugins: [naive]
      }
    })
  })
})
