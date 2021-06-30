import { mount } from '@vue/test-utils'
import { NCode } from '../index'

describe('n-code', () => {
  it('should warn when no hljs is set', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    mount(NCode)
    expect(spy).toHaveBeenCalled()
  })
})
