import NInput from 'src/Input'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import { existsInClassList } from '../utils'

describe('Input', function () {
  const localVue = createLocalVue()
  describe('props.type', function () {
    it('should contain <input> element when type is `input`', function () {
      const type = 'input'
      const NInputTestContext = {
        localVue,
        components: {
          NInput
        },
        template: `<n-input type="${type}" v-model="value"></n-input>`,
        data () {
          return {
            value: ''
          }
        }
      }
      const wrapper = mount(NInputTestContext)
      expect(wrapper.find('input').exists())
    })
    it('should contain <textarea> element when type is `textarea`', function () {
      const type = 'textarea'
      const NInputTestContext = {
        localVue,
        components: {
          NInput
        },
        template: `<n-input type="${type}" v-model="value"></n-input>`,
        data () {
          return {
            value: ''
          }
        }
      }
      const wrapper = mount(NInputTestContext)
      expect(wrapper.find('textarea').exists())
    })
  })
  describe('type=input', function () {
    describe('props.placeholder', function () {
      it('should work', function () {
        const placeholder = 'let it be'
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="input" v-model="value" :placeholder="placeholder"></n-input>',
          data () {
            return {
              value: '',
              placeholder
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        expect(wrapper.find('input').element.getAttribute('placeholder')).to.equal(wrapper.vm.placeholder)
        wrapper.vm.placeholder = 'hello'
        expect(wrapper.find('input').element.getAttribute('placeholder')).to.equal(wrapper.vm.placeholder)
      })
    })
    describe('props.round', function () {
      const NInputTestContext = {
        localVue,
        components: {
          NInput
        },
        template: '<n-input type="input" v-model="value" round></n-input>',
        data () {
          return {
            value: ''
          }
        }
      }
      const wrapper = mount(NInputTestContext)
      expect(existsInClassList(wrapper.element, 'round', true))
    })
    describe('props.disabled', function () {
      it('should exist `disabled` in some el\'s class name', function () {
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="input" v-model="value" disabled></n-input>',
          data () {
            return {
              value: ''
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        expect(existsInClassList(wrapper.element, 'disabled', true))
      })
      it('should set `disabled` attribute in inner <input>', function () {
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="input" v-model="value" disabled></n-input>',
          data () {
            return {
              value: ''
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        expect(wrapper.find('input').element.getAttribute('disabled')).to.equal('disabled')
      })
    })
    describe('v-model', function () {
      const oldValue = 'cool stuff!'
      const newValue = 'not cool stuff!'
      it('should sync value bidirectional', function () {
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="input" v-model="value"></n-input>',
          data () {
            return {
              value: ''
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        wrapper.vm.value = oldValue
        expect(wrapper.find('input').element.value).to.equal(oldValue)
        wrapper.find('input').element.value = newValue
        wrapper.find('input').trigger('input')
        expect(wrapper.vm.value).to.equal(newValue)
      })
    })
  })
  describe('type=textarea', function () {
    describe('props.disabled', function () {
      describe('props.disabled', function () {
        it('should exist `disabled` in some el\'s class name', function () {
          const NInputTestContext = {
            localVue,
            components: {
              NInput
            },
            template: '<n-input type="textarea" v-model="value" disabled></n-input>',
            data () {
              return {
                value: ''
              }
            }
          }
          const wrapper = mount(NInputTestContext)
          expect(existsInClassList(wrapper.element, 'disabled', true))
        })
        it('should set `disabled` attribute in inner <textarea>', function () {
          const NInputTestContext = {
            localVue,
            components: {
              NInput
            },
            template: '<n-input type="textarea" v-model="value" disabled></n-input>',
            data () {
              return {
                value: ''
              }
            }
          }
          const wrapper = mount(NInputTestContext)
          expect(wrapper.find('textarea').element.getAttribute('disabled')).to.equal('disabled')
        })
      })
    })
    describe('props.placeholder', function () {
      it('should work', function () {
        const placeholder = 'let it be'
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="textarea" v-model="value" :placeholder="placeholder"></n-input>',
          data () {
            return {
              value: '',
              placeholder
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        expect(wrapper.find('textarea').element.getAttribute('placeholder')).to.equal(wrapper.vm.placeholder)
        wrapper.vm.placeholder = 'hello'
        expect(wrapper.find('textarea').element.getAttribute('placeholder')).to.equal(wrapper.vm.placeholder)
      })
    })
    describe('props.rows', function () {
      it('should work with string input', function () {
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="textarea" v-model="value" rows="20"></n-input>',
          data () {
            return {
              value: ''
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        expect(wrapper.find('textarea').element.getAttribute('rows')).to.equal('20')
      })
      it('should work with number input', function () {
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="textarea" v-model="value" :rows="20"></n-input>',
          data () {
            return {
              value: ''
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        expect(wrapper.find('textarea').element.getAttribute('rows')).to.equal('20')
      })
    })
    describe('v-model', function () {
      const oldValue = 'cool stuff!'
      const newValue = 'not cool stuff!'
      it('should sync value bidirectional', function () {
        const NInputTestContext = {
          localVue,
          components: {
            NInput
          },
          template: '<n-input type="textarea" v-model="value"></n-input>',
          data () {
            return {
              value: ''
            }
          }
        }
        const wrapper = mount(NInputTestContext)
        wrapper.vm.value = oldValue
        expect(wrapper.find('textarea').element.value).to.equal(oldValue)
        wrapper.find('textarea').element.value = newValue
        wrapper.find('textarea').trigger('input')
        expect(wrapper.vm.value).to.equal(newValue)
      })
    })
  })
})
