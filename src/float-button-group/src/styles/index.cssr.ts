import { cB, cM, cNotM } from '../../../_utils/cssr/index'

export default cB('float-button-group', `
  position: fixed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-color);
  transition:
    color .3s var(--n-bezier),
    box-shadow .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
`, [
  cNotM('vertical', {
    flexDirection: 'row'
  }, [

  ]),
  cM('vertical', {
    flexDirection: 'column'
  }, [
  ])
])
