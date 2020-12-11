import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { modalLight } from '../styles'
import { NModal } from '../index'

describe('n-modal', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      modalLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NModal, {
      global: {
        plugins: [naive]
      }
    })
  })
})
