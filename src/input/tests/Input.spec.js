import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { inputLight } from '../styles'
import { NInput } from '../index'

describe('n-input', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      inputLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NInput, {
      global: {
        plugins: [naive]
      }
    })
  })
})
