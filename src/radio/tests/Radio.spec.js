import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { radioLight } from '../styles'
import { NRadio } from '../index'

describe('n-radio', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      radioLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NRadio, {
      global: {
        plugins: [naive]
      }
    })
  })
})
