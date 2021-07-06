import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NEmpty } from '../index'
import commonThemeVars from '../styles/_common'

const descriptionSelector = '.n-empty__description'

describe('n-empty', () => {
  it('should work with import on demand', () => {
    mount(NEmpty)
  })

  it('should work with slots', () => {
    const wrapper = mount(NEmpty, {
      slots: {
        default: () => "There's nothing there.",
        extra: () => 'There.'
      }
    })
    expect(wrapper.html()).toContain("There's nothing there.")
    expect(wrapper.html()).toContain('There.')
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should render a description', () => {
    const description = 'nothing'
    const wrapper = mount(NEmpty, {
      props: {
        description
      }
    })
    expect(wrapper.find(descriptionSelector).text()).toContain(description)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not render a description', async () => {
    const wrapper = mount(NEmpty, {
      props: {
        showDescription: true
      }
    })
    expect(wrapper.find(descriptionSelector).exists()).toBe(true)
    await wrapper.setProps({
      showDescription: false
    })
    await nextTick()
    expect(wrapper.find(descriptionSelector).exists()).toBe(false)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should resize', async () => {
    const wrapper = mount(NEmpty)
    expect(wrapper.attributes('style')).toContain(
      '--icon-size: ' + commonThemeVars.iconSizeMedium
    )
    await wrapper.setProps({
      size: 'small'
    })
    await nextTick()
    expect(wrapper.attributes('style')).toContain(
      '--icon-size: ' + commonThemeVars.iconSizeSmall
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
