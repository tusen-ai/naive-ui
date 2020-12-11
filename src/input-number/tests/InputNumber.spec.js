import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { inputNumberLight } from '../styles'
import { NInputNumber } from '../index'

describe('n-input-number', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      inputNumberLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NInputNumber, {
      global: {
        plugins: [naive]
      }
    })
  })
})
