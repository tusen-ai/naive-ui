import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { transferLight } from '../styles'
import { NTransfer } from '../index'

describe('n-transfer', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      transferLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NTransfer, {
      global: {
        plugins: [naive]
      }
    })
  })
})
