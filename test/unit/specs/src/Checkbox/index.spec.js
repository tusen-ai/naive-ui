import { NCheckbox } from 'src/checkbox'
import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'

describe('Checkbox', function () {
  const localVue = createLocalVue()

  it('should follow v-model\'s change', function () {
    const NCheckboxTestContext = {
      localVue,
      components: {
        NCheckbox
      },
      template: '<n-checkbox v-model="checked"></n-checkbox>',
      data () {
        return {
          checked: false
        }
      }
    }
    const wrapper = mount(NCheckboxTestContext)
    const vm = wrapper.vm
    const el = wrapper.element
    expect(el.classList.contains('n-checkbox--checked')).to.equal(false)
    vm.checked = true
    expect(el.classList.contains('n-checkbox--checked')).to.equal(true)
    vm.checked = false
    expect(el.classList.contains('n-checkbox--checked')).to.equal(false)
  })
  it('should change `isChecked` status when clicked', function () {
    const NCheckboxTestContext = {
      localVue,
      components: {
        NCheckbox
      },
      template: '<n-checkbox v-model="checked"></n-checkbox>',
      data () {
        return {
          checked: false
        }
      }
    }
    const wrapper = mount(NCheckboxTestContext)
    const vm = wrapper.vm
    wrapper.trigger('click')
    expect(vm.checked).to.equal(true)
    wrapper.trigger('click')
    expect(vm.checked).to.equal(false)
  })
  it('should be disabled when prop `disabled` is set', function () {
    const NCheckboxTestContext = {
      localVue,
      components: {
        NCheckbox
      },
      template: '<n-checkbox v-model="checked" disabled></n-checkbox>',
      data () {
        return {
          checked: false
        }
      }
    }
    const wrapper = mount(NCheckboxTestContext)
    const el = wrapper.element
    expect(el.classList.contains('n-checkbox--disabled')).to.equal(true)
  })
  it('should not change `isChecked` status when prop `disabled` is set', function () {
    const NCheckboxTestContext = {
      localVue,
      components: {
        NCheckbox
      },
      template: '<n-checkbox v-model="checked" disabled></n-checkbox>',
      data () {
        return {
          checked: false
        }
      }
    }
    const wrapper = mount(NCheckboxTestContext)
    const vm = wrapper.vm
    wrapper.trigger('click')
    expect(vm.checked).to.equal(false)
  })
})
