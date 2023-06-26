import { createPageItemsInfo, type PageItem } from '../src/utils'

function createFastBackwardItem (options: number[]): PageItem {
  return {
    type: 'fast-backward',
    active: false,
    label: undefined,
    options: options.map((v) => ({
      label: `${v}`,
      value: v
    }))
  }
}

function createFastForwardItem (options: number[]): PageItem {
  return {
    type: 'fast-forward',
    active: false,
    label: undefined,
    options: options.map((v) => ({
      label: `${v}`,
      value: v
    }))
  }
}

function createPageItem (options: {
  label: number
  currentPage: number
  pageCount: number
}): PageItem {
  return {
    type: 'page',
    active: options.label === options.currentPage,
    mayBeFastBackward: options.label === 2,
    mayBeFastForward:
      options.label > 2 && options.pageCount === options.label + 1,
    label: options.label
  }
}

describe('Pagination', function () {
  describe('utils', function () {
    describe('#createPageItemsInfo', function () {
      it('should work when less than 9 total pages', function () {
        expect(createPageItemsInfo(1, 1, 9).items).toEqual(
          [1].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 1
            })
          )
        )
        expect(createPageItemsInfo(1, 2, 9).items).toEqual(
          [1, 2].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 2
            })
          )
        )
        expect(createPageItemsInfo(2, 2, 9).items).toEqual(
          [1, 2].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 2
            })
          )
        )
        expect(createPageItemsInfo(1, 3, 9).items).toEqual(
          [1, 2, 3].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 3
            })
          )
        )
        expect(createPageItemsInfo(2, 3, 9).items).toEqual(
          [1, 2, 3].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 3
            })
          )
        )
        expect(createPageItemsInfo(3, 3, 9).items).toEqual(
          [1, 2, 3].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 3
            })
          )
        )
        expect(createPageItemsInfo(1, 4, 9).items).toEqual(
          [1, 2, 3, 4].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 4
            })
          )
        )
        expect(createPageItemsInfo(2, 4, 9).items).toEqual(
          [1, 2, 3, 4].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 4
            })
          )
        )
        expect(createPageItemsInfo(3, 4, 9).items).toEqual(
          [1, 2, 3, 4].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 4
            })
          )
        )
        expect(createPageItemsInfo(4, 4, 9).items).toEqual(
          [1, 2, 3, 4].map((v) =>
            createPageItem({
              label: v,
              currentPage: 4,
              pageCount: 4
            })
          )
        )
        expect(createPageItemsInfo(1, 5, 9).items).toEqual(
          [1, 2, 3, 4, 5].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 5
            })
          )
        )
        expect(createPageItemsInfo(2, 5, 9).items).toEqual(
          [1, 2, 3, 4, 5].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 5
            })
          )
        )
        expect(createPageItemsInfo(3, 5, 9).items).toEqual(
          [1, 2, 3, 4, 5].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 5
            })
          )
        )
        expect(createPageItemsInfo(4, 5, 9).items).toEqual(
          [1, 2, 3, 4, 5].map((v) =>
            createPageItem({
              label: v,
              currentPage: 4,
              pageCount: 5
            })
          )
        )
        expect(createPageItemsInfo(5, 5, 9).items).toEqual(
          [1, 2, 3, 4, 5].map((v) =>
            createPageItem({
              label: v,
              currentPage: 5,
              pageCount: 5
            })
          )
        )
        expect(createPageItemsInfo(1, 6, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 6
            })
          )
        )
        expect(createPageItemsInfo(2, 6, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 6
            })
          )
        )
        expect(createPageItemsInfo(3, 6, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 6
            })
          )
        )
        expect(createPageItemsInfo(4, 6, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6].map((v) =>
            createPageItem({
              label: v,
              currentPage: 4,
              pageCount: 6
            })
          )
        )
        expect(createPageItemsInfo(5, 6, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6].map((v) =>
            createPageItem({
              label: v,
              currentPage: 5,
              pageCount: 6
            })
          )
        )
        expect(createPageItemsInfo(6, 6, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6].map((v) =>
            createPageItem({
              label: v,
              currentPage: 6,
              pageCount: 6
            })
          )
        )
        expect(createPageItemsInfo(1, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(2, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(3, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(4, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 4,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(5, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 5,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(6, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 6,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(7, 7, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7].map((v) =>
            createPageItem({
              label: v,
              currentPage: 7,
              pageCount: 7
            })
          )
        )
        expect(createPageItemsInfo(1, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(2, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(3, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(4, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 4,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(5, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 5,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(6, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 6,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(7, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 7,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(8, 8, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8].map((v) =>
            createPageItem({
              label: v,
              currentPage: 8,
              pageCount: 8
            })
          )
        )
        expect(createPageItemsInfo(1, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 1,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(2, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 2,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(3, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 3,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(4, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 4,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(5, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 5,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(6, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 6,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(7, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 7,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(8, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 8,
              pageCount: 9
            })
          )
        )
        expect(createPageItemsInfo(9, 9, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) =>
            createPageItem({
              label: v,
              currentPage: 9,
              pageCount: 9
            })
          )
        )
      })
      it('should work when totalPage is 10', function () {
        expect(createPageItemsInfo(1, 10, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 10].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 1, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(2, 10, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 10].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 2, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(3, 10, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 10].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 3, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(4, 10, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 10].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 4, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(5, 10, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 10].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 5, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(6, 10, 9).items).toEqual(
          [1, -2, 4, 5, 6, 7, 8, 9, 10].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3])
            return createPageItem({ label: v, currentPage: 6, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(7, 10, 9).items).toEqual(
          [1, -2, 4, 5, 6, 7, 8, 9, 10].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3])
            return createPageItem({ label: v, currentPage: 7, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(8, 10, 9).items).toEqual(
          [1, -2, 4, 5, 6, 7, 8, 9, 10].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3])
            return createPageItem({ label: v, currentPage: 8, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(9, 10, 9).items).toEqual(
          [1, -2, 4, 5, 6, 7, 8, 9, 10].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3])
            return createPageItem({ label: v, currentPage: 9, pageCount: 10 })
          })
        )
        expect(createPageItemsInfo(10, 10, 9).items).toEqual(
          [1, -2, 4, 5, 6, 7, 8, 9, 10].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3])
            return createPageItem({ label: v, currentPage: 10, pageCount: 10 })
          })
        )
      })
      it('should work when totalPage is 11', function () {
        expect(createPageItemsInfo(1, 11, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 11].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9, 10])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 1, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(2, 11, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 11].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9, 10])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 2, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(3, 11, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 11].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9, 10])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 3, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(4, 11, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 11].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9, 10])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 4, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(5, 11, 9).items).toEqual(
          [1, 2, 3, 4, 5, 6, 7, -1, 11].map((v) => {
            if (v === -1) return createFastForwardItem([8, 9, 10])
            if (v === -2) return createFastBackwardItem([])
            return createPageItem({ label: v, currentPage: 5, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(6, 11, 9).items).toEqual(
          [1, -2, 4, 5, 6, 7, 8, -1, 11].map((v) => {
            if (v === -1) return createFastForwardItem([9, 10])
            if (v === -2) return createFastBackwardItem([2, 3])
            return createPageItem({ label: v, currentPage: 6, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(7, 11, 9).items).toEqual(
          [1, -2, 5, 6, 7, 8, 9, 10, 11].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3, 4])
            return createPageItem({ label: v, currentPage: 7, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(8, 11, 9).items).toEqual(
          [1, -2, 5, 6, 7, 8, 9, 10, 11].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3, 4])
            return createPageItem({ label: v, currentPage: 8, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(9, 11, 9).items).toEqual(
          [1, -2, 5, 6, 7, 8, 9, 10, 11].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3, 4])
            return createPageItem({ label: v, currentPage: 9, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(10, 11, 9).items).toEqual(
          [1, -2, 5, 6, 7, 8, 9, 10, 11].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3, 4])
            return createPageItem({ label: v, currentPage: 10, pageCount: 11 })
          })
        )
        expect(createPageItemsInfo(11, 11, 9).items).toEqual(
          [1, -2, 5, 6, 7, 8, 9, 10, 11].map((v) => {
            if (v === -1) return createFastForwardItem([])
            if (v === -2) return createFastBackwardItem([2, 3, 4])
            return createPageItem({ label: v, currentPage: 11, pageCount: 11 })
          })
        )
      })
    })
  })
})
