import NGradientText from 'src/GradientText'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import { existsInClassList } from '../utils'

describe('GradientText', function () {
  const localVue = createLocalVue()

  it('should show content', function () {
    const NGradientTextTestContext = {
      localVue,
      components: {
        NGradientText
      },
      template: `<n-gradient-text>{{ content }}</n-gradient-text>`,
      data () {
        return {
          content: 'hello'
        }
      }
    }
    const wrapper = mount(NGradientTextTestContext)
    expect(wrapper.contains('hello'))
  })
  describe('props.type', function () {
    it('should exist in one of class names', function () {
      const type = 'danger'
      const NGradientTextTestContext = {
        localVue,
        components: {
          NGradientText
        },
        template: `<n-gradient-text type="${type}">{{ content }}</n-gradient-text>`,
        data () {
          return {
            content: 'hello'
          }
        }
      }
      const wrapper = mount(NGradientTextTestContext)
      expect(existsInClassList(wrapper.element, type))
    })
  })
  describe('props.size', function () {
    it('should work with string input', function () {
      const NGradientTextTestContext = {
        localVue,
        components: {
          NGradientText
        },
        template: `<n-gradient-text size="40">{{ content }}</n-gradient-text>`,
        data () {
          return {
            content: 'hello'
          }
        }
      }
      const wrapper = mount(NGradientTextTestContext)
      expect(window.getComputedStyle(wrapper.element).fontSize).to.equal('40px')
    })
    it('should work with number input', function () {
      const NGradientTextTestContext = {
        localVue,
        components: {
          NGradientText
        },
        template: `<n-gradient-text :size="40">{{ content }}</n-gradient-text>`,
        data () {
          return {
            content: 'hello'
          }
        }
      }
      const wrapper = mount(NGradientTextTestContext)
      expect(window.getComputedStyle(wrapper.element).fontSize).to.equal('40px')
    })
  })
})
