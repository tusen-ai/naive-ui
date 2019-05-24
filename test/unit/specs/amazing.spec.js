import Amazing from 'main/Amazing.js'
import { mount } from '@vue/test-utils'

describe('amazing', function () {
  it('should amazing', function () {
    const wrapper = mount(Amazing)
    wrapper.setProps({
      title: 'not amazing'
    })
    expect(wrapper.element.textContent).to.equal('not amazing')
  })
})