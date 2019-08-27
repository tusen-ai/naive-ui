import {
  rootedOptions,
  patchedOptions,
  linkedOptions,
  menuOptions
} from 'packages/utils/component/menuModel'
import { expect } from 'chai'

import rootedOptionsCases from './rootedOptionsCases'
import linkedOptionsCases from './linkedOptionsCases'
import menuOptionsCases from './menuOptionsCases'

describe('Cascader Menu Model', function () {
  describe('rootedOptions', function () {
    rootedOptionsCases.forEach((testCase, index) => {
      it(`should pass case#${index}`, function () {
        expect(testCase.output).to.deep.equal(rootedOptions(...testCase.input))
      })
    })
  })
  describe('linkedOptions', function () {
    linkedOptionsCases.forEach((testCase, index) => {
      it(`should pass case#${index}`, function () {
        expect(testCase.output).to.deep.equal(linkedOptions(...testCase.input))
      })
    })
  })
  describe('menuOptions', function () {
    menuOptionsCases.forEach((testCase, index) => {
      it(`should pass case#${index}`, function () {
        expect(testCase.output).to.deep.equal(menuOptions(...testCase.input))
      })
    })
  })
})
