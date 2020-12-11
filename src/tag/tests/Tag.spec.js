import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { tagLight } from '../styles'
import { NTag } from '../index'

describe('n-tag', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      tagLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NTag, {
      global: {
        plugins: [naive]
      }
    })
  })
})
