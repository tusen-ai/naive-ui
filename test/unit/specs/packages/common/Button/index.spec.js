import NButton from 'packages/common/Button'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Button', function () {
  const localVue = createLocalVue()

  it('should show content in it', function () {
    const NButtonTestContext = {
      localVue,
      components: {
        NButton
      },
      template: `<n-button>{{ content }}</n-button>`,
      data () {
        return {
          content: null
        }
      }
    }
    const wrapper = mount(NButtonTestContext)
    wrapper.vm.content = 'hello'
    expect(wrapper.contains('hello'))
    wrapper.vm.content = 'world'
    expect(wrapper.contains('world'))
  })
  it('should call click handler when clicked', function () {
    const handleClick = sinon.spy()
    const NButtonTestContext = {
      localVue,
      components: {
        NButton
      },
      template: `<n-button @click="handleClick">test</n-button>`,
      methods: {
        handleClick
      }
    }
    const wrapper = mount(NButtonTestContext)
    wrapper.trigger('click')
    expect(handleClick.calledOnce)
  })
  it('should auto adjust text-color to parents background-color when `auto-text-color` is set', function () {
    const backgroundColor = `rgba(6, 6, 6, 0.6)`
    const NButtonTestContext = {
      localVue,
      components: {
        NButton
      },
      template: `<div style="background-color: ${backgroundColor};"><div><n-button auto-text-color>test</n-button></div></div>`
    }
    const wrapper = mount(NButtonTestContext)
    expect(wrapper.element.querySelector('.n-button__content').style.color).to.equal('rgba(6, 6, 6, 0.6)')
  })
})
