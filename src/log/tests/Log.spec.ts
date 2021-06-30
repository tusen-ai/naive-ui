import { mount } from '@vue/test-utils'
import { NLog } from '../index'

describe('n-log', () => {
  it('should warn with language setted & no hljs is set', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    mount(NLog)
    expect(spy).not.toHaveBeenCalled()
    mount(NLog, {
      props: {
        language: 'kirby'
      }
    })
    expect(spy).toHaveBeenCalled()
  })
})
