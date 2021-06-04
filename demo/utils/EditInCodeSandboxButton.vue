<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    @click="handleClick"
    depth="3"
  >
    <template #icon>
      <n-icon>
        <code-sandbox-icon />
      </n-icon>
    </template>
  </n-button>
</template>

<script>
import { defineComponent } from 'vue'
import CodeSandboxIcon from '@vicons/ionicons5/CubeOutline'
import { getCodeSandboxParams } from './codesandbox'

export default defineComponent({
  name: 'EditInCodeSandboxButton',
  components: {
    CodeSandboxIcon
  },
  props: {
    code: String,
    size: String
  },
  setup (props) {
    return {
      handleClick () {
        const div = document.createElement('div')
        const parameters = getCodeSandboxParams(props.code)
        div.style.display = 'none'
        div.innerHTML = `<form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
  <input type="hidden" name="parameters" value="${parameters}" />
  <input type="submit" value="Open in sandbox" />
</form>`
        document.body.appendChild(div)
        div.firstElementChild.submit()
        document.body.removeChild(div)
      }
    }
  }
})
</script>
