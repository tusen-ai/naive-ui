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

  it('should work with `font-size` prop', async () => {
    const fontSize = 20
    const wrapper = mount(NLog, { props: { fontSize } })

    expect(wrapper.find('.n-code').attributes('style')).toContain(
      `--font-size: ${fontSize}px`
    )
  })
})
