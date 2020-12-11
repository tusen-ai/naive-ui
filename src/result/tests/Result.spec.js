import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { resultLight } from '../styles'
import { NResult } from '../index'

describe('n-result', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      resultLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NResult, {
      global: {
        plugins: [naive]
      }
    })
  })
})
