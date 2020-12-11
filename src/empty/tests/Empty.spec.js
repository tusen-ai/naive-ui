import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { emptyLight } from '../styles'
import { NEmpty } from '../index'

describe('n-empty', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      emptyLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NEmpty, {
      global: {
        plugins: [naive]
      }
    })
  })
})
