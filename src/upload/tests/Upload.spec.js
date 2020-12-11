import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { uploadLight } from '../styles'
import { NUpload } from '../index'

describe('n-upload', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      uploadLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NUpload, {
      global: {
        plugins: [naive]
      }
    })
  })
})
