import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { NSsrProvider } from '../index'
import { NButton } from '../../index'
import { setup } from '@css-render/vue3-ssr'

describe('n-ssr-provider', () => {
  it('should work with import on demand', (done) => {
    const app = createSSRApp({
      render () {
        return h(NSsrProvider, null, {
          default: () =>
            h(NButton, null, {
              default: () => 'btn'
            })
        })
      }
    })
    const { collect } = setup(app)
    renderToString(app).then((v) => {
      expect(collect() + '\n' + v).toMatchSnapshot()
      done()
    })
  })
})
