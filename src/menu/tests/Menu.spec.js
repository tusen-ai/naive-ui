import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { menuLight } from '../styles'
import { NMenu } from '../index'

describe('n-menu', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      menuLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NMenu, {
      global: {
        plugins: [naive]
      }
    })
  })
})
