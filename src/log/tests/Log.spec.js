import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { logLight } from '../styles'
import { NLog } from '../index'

describe('n-log', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      logLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NLog, {
      global: {
        plugins: [naive]
      }
    })
  })
})
