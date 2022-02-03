<markdown>
# Using it in a form

`n-dynamic-input` itself cannot be verified. If you need to verify the input of `n-dynamic-input`, you can pass `n-form-item` in the custom content to complete the verification. Here is a complete example.
</markdown>

<template>
  <n-form :model="model">
    <n-dynamic-input
      v-model:value="model.dynamicInputValue"
      item-style="margin-bottom: 0;"
      :on-create="onCreate"
      #="{ index, value }"
    >
      <div style="display: flex">
        <!--
          Usually, the path change will cause the form-item verification content
          or rules to be changed, so naive-ui will clear the existing
          verification effect. But this example is a special case, as we know
          the changes in path will not change form-item verification result and
          rules, so set ignore-path-change on form-item
        -->
        <n-form-item
          ignore-path-change
          :show-label="false"
          :path="`dynamicInputValue[${index}].name`"
          :rule="dynamicInputRule"
        >
          <n-input
            v-model:value="model.dynamicInputValue[index].name"
            placeholder="Name"
            @keydown.enter.prevent
          />
          <!--
           Since pressing enter on the input element will cause the button in the form to be clicked, the default behavior is prevented
          -->
        </n-form-item>
        <div style="height: 34px; line-height: 34px; margin: 0 8px">
          =
        </div>
        <n-form-item
          ignore-path-change
          :show-label="false"
          :path="`dynamicInputValue[${index}].value`"
          :rule="dynamicInputRule"
        >
          <n-input
            v-model:value="model.dynamicInputValue[index].value"
            placeholder="Value"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
    </n-dynamic-input>
  </n-form>
  <pre>{{ JSON.stringify(model.dynamicInputValue, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      dynamicInputRule: {
        trigger: 'input',
        validator (rule: unknown, value: string) {
          if (value.length >= 5) return new Error('Input up to 4 characters')
          return true
        }
      },
      model: ref({
        dynamicInputValue: [{ value: '', name: '' }]
      }),
      onCreate () {
        return {
          name: '',
          value: ''
        }
      }
    }
  }
})
</script>
