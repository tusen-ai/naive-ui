import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { gradientTextLight } from '../styles'
import { NGradientText } from '../index'

describe('n-gradient-text', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      gradientTextLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NGradientText, {
      global: {
        plugins: [naive]
      }
    })
  })
})
