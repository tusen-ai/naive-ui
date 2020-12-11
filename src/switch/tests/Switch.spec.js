import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { switchLight } from '../styles'
import { NSwitch } from '../index'

describe('n-switch', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      switchLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NSwitch, {
      global: {
        plugins: [naive]
      }
    })
  })
})
