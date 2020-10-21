# 在表单中使用
`n-dynamic-input` 并不能作为一个单独的表项检验，如果你需要检验 `n-dynamic-input` 里面的内容，可以在自定义内容中传入 `n-form-item` 来完成数据的检验。下面是一个完整的例子。
```html
<n-form :model="model" ref="form">
  <!--
    设定 key-field 是为了每一项都能稳定的待在原地。如果不做设定可能会导致在增加删除项目时，表
    项的验证信息消失或错位
  -->
  <n-dynamic-input
    v-model:value="model.dynamicInputValue"
    key-field="key"
    :on-create="onCreate"
    :on-clear="onClear"
  >
    <template v-slot="{ index, value }">
      <div style="display: flex;">
        <!--
          通常，path 的变化会导致 form-item 验证内容或规则的改变，所以 naive-ui 会清理掉
          表项已有的验证信息。但是这个例子是个特殊情况，我们明确的知道，path 的改变不会导致
          form-item 验证内容和规则的变化，所以就 ignore-path-change
        -->
        <n-form-item
          ignore-path-change
          :path="`dynamicInputValue[${index}].name`"
          :rule="dynamicInputRule"
        >
          <n-input
            placeholder="Name"
            @keydown.enter.prevent
            v-model:value="model.dynamicInputValue[index].name"
          />
          <!--
            由于在 input 元素里按回车会导致 form 里面的 button 被点击，所以阻止了默认行为
          -->
        </n-form-item>
        <div style="height: 34px; line-height: 34px; margin: 0 8px;">=</div>
        <n-form-item
          ignore-path-change
          :path="`dynamicInputValue[${index}].value`"
          :rule="dynamicInputRule"
        >
          <n-input
            placeholder="Value"
            @keydown.enter.prevent
            v-model:value="model.dynamicInputValue[index].value"
          />
        </n-form-item>
      </div>
    </template>
  </n-dynamic-input>
</n-form>
<pre>
{{  JSON.stringify(model.dynamicInputValue, 0, 2) }}
</pre>
```
```js
export default {
  data () {
    return {
      dynamicInputRule: {
        trigger: 'input',
        validator (rule, value) {
          if (value.length >= 5) return new Error('最多输入四个字符')
          return true
        }
      },
      model: {
        dynamicInputValue: [
          { key: 0, value: '', name: '' }
        ]
      }
    }
  },
  methods: {
    onCreate () {
      return {
        name: '',
        value: '',
        /** 生成 key ，目的是让这个值对应的表项的验证信息不错位 */
        key: Math.random().toString(16).slice(2, 10)
      }
    },
    /**
     * 由于清除 input 的内容是个外部行为，input 不会发出事件，所以 form-item 无法得到从
     * input 发出的事件。于是为了验证结果和显示的值同步，需要手动验证。使用 $nextTick 是因
     * 为这个函数结束后，新的值才会被设定，需要等下个tick 才能验证新的结果
     */
    onClear () {
      this.$nextTick().then(
        () => this.$refs.form.validate()
      )
      return  {
        name: '',
        value: '',
        key: 0
      }
    }
  }
}
```