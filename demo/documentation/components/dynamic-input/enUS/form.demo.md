# Use it in Form
`n-dynamic-input` itself cannot be verified. If you need to verify the input of `n-dynamic-input`, you can pass `n-form-item` in the custom content to complete the verification. Here is a complete example.
```html
<n-form :model="model" ref="form">
  <!--
    The key-field is set to make sure that each item can stay in the correct
    place. If not set, it may cause the item verification information disappearance
    or misplacement.
  -->
  <n-dynamic-input
    v-model:value="model.dynamicInputValue"
    key-field="key"
    :on-create="onCreate"
  >
    <template v-slot="{ index, value }">
      <div style="display: flex;">
        <!--
          Usually, the path change will cause the form-item verification content
          or rules to be changed, so naive-ui will clear the existing
          verification effect. But this example is a special case, as we know
          the changes in path will not change form-item verification result and
          rules, so set ignore-path-change on form-item
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
           Since pressing enter on the input element will cause the button in the form to be clicked, the default behavior is prevented
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
          if (value.length >= 5) return new Error('Input up to 4 characters')
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
        /** Generate a key to make the verification information will not be misplaced */
        key: Math.random().toString(16).slice(2, 10)
      }
    }
  }
}
```