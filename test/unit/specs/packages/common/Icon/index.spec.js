import NIcon from 'packages/common/Icon'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import { existsInClassList } from '../../utils'

describe('Icon', function () {
  const localVue = createLocalVue()
  describe('props.type', function () {
    it('should set class name when `type` is set', function () {
      const type = 'md-alert'
      const NIconTestContext = {
        localVue,
        components: {
          NIcon
        },
        template: `<n-icon type="${type}"></n-icon>`,
        data () {
          return {
            content: null
          }
        }
      }
      const wrapper = mount(NIconTestContext)
      expect(existsInClassList(wrapper.element, type))
    })
  })
  describe('props.size', function () {
    it('should not set font-size when `size` is not set', function () {
      const NIconTestContext = {
        localVue,
        components: {
          NIcon
        },
        template: `<n-icon type="md-alert"></n-icon>`,
        data () {
          return {
            content: null
          }
        }
      }
      const wrapper = mount(NIconTestContext)
      expect(wrapper.element.style.fontSize).to.equal('')
    })
    it('should set font-size when `size` is set as String', function () {
      const NIconTestContext = {
        localVue,
        components: {
          NIcon
        },
        template: `<n-icon type="md-alert" size="40"></n-icon>`,
        data () {
          return {
            content: null
          }
        }
      }
      const wrapper = mount(NIconTestContext)
      expect(wrapper.element.style.fontSize).to.equal('40px')
    })
    it('should set font-size when `size` is set as Number', function () {
      const NIconTestContext = {
        localVue,
        components: {
          NIcon
        },
        template: `<n-icon type="md-alert" :size="40"></n-icon>`,
        data () {
          return {
            content: null
          }
        }
      }
      const wrapper = mount(NIconTestContext)
      expect(wrapper.element.style.fontSize).to.equal('40px')
    })
  })
  describe('props.color', function () {
    it('should not set font-size when `color` is not set', function () {
      const NIconTestContext = {
        localVue,
        components: {
          NIcon
        },
        template: `<n-icon type="md-alert"></n-icon>`,
        data () {
          return {
            content: null
          }
        }
      }
      const wrapper = mount(NIconTestContext)
      expect(wrapper.element.style.color).to.equal('')
    })
    it('should set font-size when `color` is set', function () {
      const color = 'rgba(111, 111, 111, 0.1)'
      const NIconTestContext = {
        localVue,
        components: {
          NIcon
        },
        template: `<n-icon type="md-alert" color="${color}"></n-icon>`,
        data () {
          return {
            content: null
          }
        }
      }
      const wrapper = mount(NIconTestContext)
      expect(wrapper.element.style.color).to.equal(color)
    })
  })
})
