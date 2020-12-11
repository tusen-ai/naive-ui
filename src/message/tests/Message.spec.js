import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { messageLight } from '../styles'
import { NMessage } from '../index'

describe('n-message', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      messageLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NMessage, {
      global: {
        plugins: [naive]
      }
    })
  })
})
