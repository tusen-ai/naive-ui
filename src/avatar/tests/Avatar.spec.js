import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { avatarLight } from '../styles'
import { NAvatar } from '../index'

describe('n-avatar', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      avatarLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NAvatar, {
      global: {
        plugins: [naive]
      }
    })
  })
})
