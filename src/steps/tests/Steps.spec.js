import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { stepsLight } from '../styles'
import { NSteps } from '../index'

describe('n-steps', () => {
  const naive = create({
    locales: [enUS],
    styles: [stepsLight]
  })
  it('should work with import on demand', () => {
    mount(NSteps, {
      global: {
        plugins: [naive]
      }
    })
  })
})
