import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { configProviderLight } from '../styles'
import { NConfigProvider } from '../index'

describe('n-config-provider', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      configProviderLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NConfigProvider, {
      global: {
        plugins: [naive]
      }
    })
  })
})
