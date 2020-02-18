# Uncontrolled Manually Submit
You can use `submit` method to submit in uncontrolled manner. Also you can do it in controlled manner in another way.
```html
<n-button
  :disabled="!fileListLength"
  @click="handleClick"
  style="margin-bottom: 12px;"
>
  Upload File
</n-button>
<div style="overflow: hidden">
  <n-upload
    @change="handleChange"
    action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-upload="false"
    multiple
    ref="upload"
  >
    <n-button>Select File</n-button>
  </n-upload>
</div>
```
```js
import archiveOutline from 'naive-ui/lib/icons/archive-outline'

export default {
  components: {
    archiveOutline
  },
  data () {
    return {
      fileListLength: 0
    }
  },
  methods: {
    handleChange ({
      fileList
    }) {
      this.fileListLength = fileList.length
    },
    handleClick () {
      this.$refs.upload.submit()
    }
  }
}
```