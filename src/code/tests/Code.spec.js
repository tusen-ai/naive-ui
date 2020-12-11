import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { codeLight } from '../styles'
import { NCode } from '../index'

describe('n-code', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      codeLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NCode, {
      global: {
        plugins: [naive]
      }
    })
  })
})
