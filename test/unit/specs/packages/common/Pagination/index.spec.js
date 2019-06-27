import { pagesToShow, mapPagesToPageItems } from 'packages/common/Pagination/src/utils'

describe('Pagination', function () {
  describe('utils', function () {
    describe('#pagesToShow', function () {
      it('should not add splitor when less than 6 total pages', function () {
        expect(pagesToShow(1, 1)).to.deep.equal([1])
        expect(pagesToShow(1, 2)).to.deep.equal([1, 2])
        expect(pagesToShow(2, 2)).to.deep.equal([1, 2])
        expect(pagesToShow(1, 3)).to.deep.equal([1, 2, 3])
        expect(pagesToShow(2, 3)).to.deep.equal([1, 2, 3])
        expect(pagesToShow(3, 3)).to.deep.equal([1, 2, 3])
        expect(pagesToShow(1, 4)).to.deep.equal([1, 2, 3, 4])
        expect(pagesToShow(2, 4)).to.deep.equal([1, 2, 3, 4])
        expect(pagesToShow(3, 4)).to.deep.equal([1, 2, 3, 4])
        expect(pagesToShow(4, 4)).to.deep.equal([1, 2, 3, 4])
        expect(pagesToShow(1, 5)).to.deep.equal([1, 2, 3, 4, 5])
        expect(pagesToShow(2, 5)).to.deep.equal([1, 2, 3, 4, 5])
        expect(pagesToShow(3, 5)).to.deep.equal([1, 2, 3, 4, 5])
        expect(pagesToShow(4, 5)).to.deep.equal([1, 2, 3, 4, 5])
        expect(pagesToShow(5, 5)).to.deep.equal([1, 2, 3, 4, 5])
        expect(pagesToShow(1, 6)).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(pagesToShow(2, 6)).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(pagesToShow(3, 6)).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(pagesToShow(4, 6)).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(pagesToShow(5, 6)).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(pagesToShow(6, 6)).to.deep.equal([1, 2, 3, 4, 5, 6])
      })
      it('should work when totalPage is 7', function () {
        expect(pagesToShow(1, 7)).to.deep.equal([1, 2, 3, 4, 5, -1, 7])
        expect(pagesToShow(2, 7)).to.deep.equal([1, 2, 3, 4, 5, -1, 7])
        expect(pagesToShow(3, 7)).to.deep.equal([1, 2, 3, 4, 5, -1, 7])
        expect(pagesToShow(4, 7)).to.deep.equal([1, 2, 3, 4, 5, 6, 7])
        expect(pagesToShow(5, 7)).to.deep.equal([1, -2, 3, 4, 5, 6, 7])
        expect(pagesToShow(6, 7)).to.deep.equal([1, -2, 3, 4, 5, 6, 7])
        expect(pagesToShow(7, 7)).to.deep.equal([1, -2, 3, 4, 5, 6, 7])
      })
      it('should work when totalPage is 8', function () {
        expect(pagesToShow(1, 8)).to.deep.equal([1, 2, 3, 4, 5, -1, 8])
        expect(pagesToShow(2, 8)).to.deep.equal([1, 2, 3, 4, 5, -1, 8])
        expect(pagesToShow(3, 8)).to.deep.equal([1, 2, 3, 4, 5, -1, 8])
        expect(pagesToShow(4, 8)).to.deep.equal([1, 2, 3, 4, 5, 6, -1, 8])
        expect(pagesToShow(5, 8)).to.deep.equal([1, -2, 3, 4, 5, 6, 7, 8])
        expect(pagesToShow(6, 8)).to.deep.equal([1, -2, 4, 5, 6, 7, 8])
        expect(pagesToShow(7, 8)).to.deep.equal([1, -2, 4, 5, 6, 7, 8])
        expect(pagesToShow(8, 8)).to.deep.equal([1, -2, 4, 5, 6, 7, 8])
      })
      it('should work when totalPage is 9', function () {
        expect(pagesToShow(1, 9)).to.deep.equal([1, 2, 3, 4, 5, -1, 9])
        expect(pagesToShow(2, 9)).to.deep.equal([1, 2, 3, 4, 5, -1, 9])
        expect(pagesToShow(3, 9)).to.deep.equal([1, 2, 3, 4, 5, -1, 9])
        expect(pagesToShow(4, 9)).to.deep.equal([1, 2, 3, 4, 5, 6, -1, 9])
        expect(pagesToShow(5, 9)).to.deep.equal([1, -2, 3, 4, 5, 6, 7, -1, 9])
        expect(pagesToShow(6, 9)).to.deep.equal([1, -2, 4, 5, 6, 7, 8, 9])
        expect(pagesToShow(7, 9)).to.deep.equal([1, -2, 5, 6, 7, 8, 9])
        expect(pagesToShow(8, 9)).to.deep.equal([1, -2, 5, 6, 7, 8, 9])
        expect(pagesToShow(9, 9)).to.deep.equal([1, -2, 5, 6, 7, 8, 9])
      })
    })
    describe('#mapPagesToPageItems', function () {
      it('should return corresponding items', function () {
        expect(mapPagesToPageItems([-2, -1, 1, 2], 1)).to.deep.equal([
          {
            type: 'fastBackward',
            label: 'fastBackward'
          },
          {
            type: 'fastForward',
            label: 'fastForward'
          },
          {
            type: 'page',
            label: 1,
            active: true
          },
          {
            type: 'page',
            label: 2,
            active: false
          }
        ])
      })
    })
  })
})
