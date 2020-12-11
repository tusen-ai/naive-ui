import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { sliderLight } from '../styles'
import { NSlider } from '../index'

describe('n-slider', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      sliderLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NSlider, {
      global: {
        plugins: [naive]
      }
    })
  })
})
