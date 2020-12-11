import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { configConsumerLight } from '../styles'
import { NConfigConsumer } from '../index'

describe('n-config-consumer', () => {
  const naive = create({
    locales: [
      enUS
    ],
    styles: [
      configConsumerLight
    ]
  })
  it('should work with import on demand', () => {
    mount(NConfigConsumer, {
      global: {
        plugins: [naive]
      }
    })
  })
})
