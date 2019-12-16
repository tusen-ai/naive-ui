# Basic
```html
<n-log
  :log="log"
  @reach-top="handleReachTop"
  @reach-bottom="handleReachBottom"
  :bottom-loading="bottomLoading"
  :top-loading="topLoading"
  trim
/>
```

```js
const log = `
import NScrollbar from '../../Scrollbar'

export default {
  name: 'NLog',
  components: {
    NScrollbar
  },
  props: {
    log: {
      type: String,
      default: null
    },
    lines: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    synthesizedLines () {
      if (this.lines.length) return this.lines
      if (!this.log) return []
      return this.log.split('\\n')
    }
  },
  methods: {
    handleScroll (e) {

    }
  }
}
`

export default {
  data () {
    return {
      topLoading: false,
      bottomLoading: false,
      log: log
    }
  },
  computed: {
    loading () {
      return this.topLoading || this.bottomLoading
    }
  },
  methods: {
    handleReachTop () {
      if (this.topLoading) return
      this.topLoading = true
      setTimeout(() => {
        this.log = log + this.log
        this.topLoading = false
      }, 6000)
    },
    handleReachBottom () {
      if (this.bottomLoading) return
      this.bottomLoading = true
      setTimeout(() => {
        this.log = this.log + log
        this.bottomLoading = false
      }, 6000)
    }
  }
}
```