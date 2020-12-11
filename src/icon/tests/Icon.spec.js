import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { iconLight } from '../styles'
import { NIcon } from '../index'

describe('n-icon', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      iconLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NIcon, {
      global: {
        plugins: [naive]
      }
    })
  })
})
