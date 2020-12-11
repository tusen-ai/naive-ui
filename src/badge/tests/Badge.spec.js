import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { badgeLight } from '../styles'
import { NBadge } from '../index'

describe('n-badge', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      badgeLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NBadge, {
      global: {
        plugins: [naive]
      }
    })
  })
})
