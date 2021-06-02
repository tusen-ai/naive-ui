<template>
  <n-button class="edit-button" text :size="size" @click="handleClick">
    <template #icon>
      <n-icon>
        <code-sandbox-icon />
      </n-icon>
    </template>
  </n-button>
</template>

<script>
import { defineComponent } from 'vue'
import { getParameters } from 'codesandbox/lib/api/define'
import CodeSandboxIcon from '@vicons/ionicons5/CubeOutline'

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
        const parameters = getParameters({
          files: {
            'package.json': {
              content: {
                dependencies: {
                  vue: 'latest'
                }
              }
            },
            'App.vue': {
              content: props.code
            }
          }
        })
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
