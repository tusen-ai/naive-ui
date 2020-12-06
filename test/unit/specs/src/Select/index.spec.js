import { NSelect } from 'src/select'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import { existsInClassList, sleep } from '../utils'
import _ from 'lodash'

/**
 * Warning: The following tests depend on class name `n-select-menu` and `n-select-menu__item` to work correctly
 */

describe('Select', function () {
  const localVue = createLocalVue()
  const items = [
    {
      label: 'label1',
      value: 'value1'
    },
    {
      label: 'label2',
      value: 'value2'
    },
    {
      label: 'label3',
      value: 'value3'
    },
    {
      label: 'label4',
      value: 'value4'
    }
  ]
  describe('props.items & menu', function () {
    describe('single select', function () {
      it('should not exist in dom tree when not clicked', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        const html = wrapper.html()
        items.forEach(item => expect(html).not.to.contain(item.label))
      })
      it('should be shown when select is clicked', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        const html = wrapper.html()
        items.forEach(item => expect(html).to.contain(item.label))
      })
      it('should be closed when outer dom is clicked', async function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        await sleep()
        document.body.click()
        const html = wrapper.html()
        items.forEach(item => expect(html).not.to.contain(item.label))
      })
    })
    describe('multiple select', function () {
      it('should not exist in dom tree when not clicked', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        const html = wrapper.html()
        items.forEach(item => expect(html).not.to.contain(item.label))
      })
      it('should be shown when select is clicked', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        const html = wrapper.html()
        items.forEach(item => expect(html).to.contain(item.label))
      })
      it('should be closed when outer dom is clicked', async function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        await sleep()
        document.body.click()
        const html = wrapper.html()
        items.forEach(item => expect(html).not.to.contain(item.label))
      })
    })
  })
  describe('props.multiple', function () {
    it('should have multiple in class name when specified', function () {
      const NSelectTestContext = {
        localVue,
        components: {
          NSelect
        },
        template: '<n-select :items="items" v-model="selectedArray" multiple/>',
        data () {
          return {
            items: _.cloneDeep(items),
            selectedArray: []
          }
        }
      }
      const wrapper = mount(NSelectTestContext)
      expect(existsInClassList(wrapper.element, 'mulitple', true))
    })
    it('should not have multiple in class name when not specified', function () {
      const NSelectTestContext = {
        localVue,
        components: {
          NSelect
        },
        template: '<n-select :items="items" v-model="selectedArray"/>',
        data () {
          return {
            items: _.cloneDeep(items),
            selectedArray: []
          }
        }
      }
      const wrapper = mount(NSelectTestContext)
      expect(existsInClassList(wrapper.element, 'mulitple', true)).to.equal(false)
    })
  })
  describe('props.placeholder', function () {
    describe('single select', function () {
      it('should work', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue" placeholder="666"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.find('input').element.placeholder).to.equal('666')
      })
      it('should show when nothing is selected', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.find('input').element.value).to.equal('')
        expect(wrapper.find('input').element.placeholder.toLowerCase()).to.contain('please select')
      })
      it('should show when v-model value is invalid', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: 'riduculousValue'
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.find('input').element.value).to.equal('')
        expect(wrapper.find('input').element.placeholder.toLowerCase()).to.contain('please select')
      })
      it('should show `Please select` when not specified', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.find('input').element.placeholder.toLowerCase()).to.contain('please select')
      })
    })
    describe('multiple select', function () {
      it('should show when nothing is selected', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(existsInClassList(wrapper.element, 'placeholder', true))
      })
      it('should show `Please select` when v-model value is invalid', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: 'ridiculous'
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.html().toLowerCase()).to.contain('please select')
      })
      it('should show `Please select` when not specified', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.html().toLowerCase()).to.contain('please select')
      })
    })
  })

  describe('props.size', function () {
    describe('single select', function () {
      it('should has effect in class name', function () {
        it('should has effect in class name', function () {
          let NSelectTestContext = {
            localVue,
            components: {
              NSelect
            },
            template: '<n-select :items="items" size="small" v-model="selectedValue"/>',
            data () {
              return {
                items: _.cloneDeep(items),
                selectedValue: null
              }
            }
          }
          let wrapper = mount(NSelectTestContext)
          expect(existsInClassList(wrapper.element, 'small', true))
          NSelectTestContext = {
            localVue,
            components: {
              NSelect
            },
            template: '<n-select :items="items" size="large" v-model="selectedValue"/>',
            data () {
              return {
                items: _.cloneDeep(items),
                selectedValue: null
              }
            }
          }
          wrapper = mount(NSelectTestContext)
          expect(existsInClassList(wrapper.element, 'large', true))
        })
      })
    })
    describe('multiple select', function () {
      it('should has effect in class name', function () {
        let NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" size="small" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        let wrapper = mount(NSelectTestContext)
        expect(existsInClassList(wrapper.element, 'small', true))
        NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" size="large" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        wrapper = mount(NSelectTestContext)
        expect(existsInClassList(wrapper.element, 'large', true))
      })
    })
  })
  describe('v-model', function () {
    describe('single select', function () {
      it('should sync view with value', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: 'value1'
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.find('input').element.value).to.contain('label1')
        wrapper.vm.selectedValue = 'value2'
        expect(wrapper.find('input').element.value).to.contain('label2')
        wrapper.vm.selectedValue = null
        expect(wrapper.find('input').element.value).to.equal('')
      })
      it('should sync value with view', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(wrapper.vm.selectedValue).to.equal('value1')
      })
      it('should not be selected when v-model\'s value is not in items(show placeholder).', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: 'not in anywhere'
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(existsInClassList(wrapper.element, 'placeholder', true))
      })
      it('should change to valid value when select an item when initial v-model value is invalid', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: { haha: 'ridiculous' }
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(wrapper.vm.selectedValue).to.equal('value1')
      })
    })
    describe('multiple select', function () {
      it('should sync view with value', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: ['value1']
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        expect(wrapper.html()).to.contain('label1')
        wrapper.vm.selectedArray.push('value2')
        expect(wrapper.html()).to.contain('label1', 'label2')
        wrapper.vm.selectedArray = []
        expect(wrapper.html().toLowerCase()).to.contain('please select')
      })
      it('should sync value with view', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select multiple :items="items" v-model="selectedArray"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(wrapper.vm.selectedArray).to.deep.equal(['value1'])
      })
      it('should change to valid value when select an item when initial v-model value is invalid (case 798)', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select multiple :items="items" v-model="selectedArray"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: 798
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(wrapper.vm.selectedArray).to.deep.equal(['value1'])
      })
      it('should change to valid value when select an item when initial v-model value is invalid (case [\'798\', \'999\'])', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select multiple :items="items" v-model="selectedArray"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: ['798', '999']
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(wrapper.vm.selectedArray).to.deep.equal(['value1'])
      })
    })
  })
  describe('@change', function () {
    describe('single select', function () {
      it('should be called when change selected item', function () {
        const handleChange = sinon.spy()
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue" @change="handleChange"/>',
          methods: {
            handleChange
          },
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(handleChange.calledOnce)
        expect(handleChange.calledWith('value1'))
      })
      it('should return item object', function () {
        const handleChange = sinon.spy()
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue" @change="handleChange" emitItem/>',
          methods: {
            handleChange
          },
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(handleChange.calledOnce)
        expect(handleChange.args[0][0]).to.deep.equal({
          value: 'value1',
          label: 'label1'
        })
      })
    })
    describe('multiple select', function () {
      it('should be called when change selected item', function () {
        const handleChange = sinon.spy()
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select multiple :items="items" v-model="selectedArray" @change="handleChange"/>',
          methods: {
            handleChange
          },
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(handleChange.calledOnce)
        expect(handleChange.calledWith('value1'))
      })
      it('should return item object when prop `emitItem` is specified', function () {
        const handleChange = sinon.spy()
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select multiple :items="items" v-model="selectedArray" @change="handleChange" emitItem/>',
          methods: {
            handleChange
          },
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        wrapper.find('.n-select-menu__item').trigger('click')
        expect(handleChange.calledOnce)
        expect(handleChange.args[0][0]).to.deep.equal({
          value: 'value1',
          label: 'label1'
        })
      })
    })
  })
  describe('lightbar', function () {
    describe('single select', function () {
      it('should show when mouse enter item', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedValue"/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedValue: null
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('mouseenter')
        expect(existsInClassList(wrapper.element, 'light-bar', true))
      })
    })
    describe('multiple select', function () {
      it('should show when mouse enter item', function () {
        const NSelectTestContext = {
          localVue,
          components: {
            NSelect
          },
          template: '<n-select :items="items" v-model="selectedArray" multiple/>',
          data () {
            return {
              items: _.cloneDeep(items),
              selectedArray: []
            }
          }
        }
        const wrapper = mount(NSelectTestContext)
        wrapper.trigger('click')
        /** Todo using XPath */
        wrapper.find('.n-select-menu__item').trigger('mouseenter')
        expect(existsInClassList(wrapper.element, 'light-bar', true))
      })
    })
  })
  describe('item selected status', function () {
    describe('single select', function () {
      const NSelectTestContext = {
        localVue,
        components: {
          NSelect
        },
        template: '<n-select :items="items" v-model="selectedValue"/>',
        data () {
          return {
            items: _.cloneDeep(items),
            selectedValue: null
          }
        }
      }
      const wrapper = mount(NSelectTestContext)
      wrapper.trigger('click')
      /** Todo using XPath */
      const itemWrapper = wrapper.find('.n-select-menu__item')
      itemWrapper.trigger('click')
      expect(existsInClassList(itemWrapper.element, 'selected', true))
    })
    describe('multiple select', function () {
      const NSelectTestContext = {
        localVue,
        components: {
          NSelect
        },
        template: '<n-select :items="items" v-model="selectedArray"/>',
        data () {
          return {
            items: _.cloneDeep(items),
            selectedArray: []
          }
        }
      }
      const wrapper = mount(NSelectTestContext)
      wrapper.trigger('click')
      /** Todo using XPath */
      const itemWrapper = wrapper.find('.n-select-menu__item')
      itemWrapper.trigger('click')
      expect(existsInClassList(itemWrapper.element, 'selected', true))
    })
  })
})
