<markdown>
# Access all dialog instances

You can use `useDialogReactiveList` to access all dialog reactive inside `n-dialog-provider`.
</markdown>

<script lang="ts">
import { useDialogReactiveList } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      dialogReactiveList: useDialogReactiveList()
    }
  }
})
</script>

<template>
  There is {{ dialogReactiveList.length }} dialog in the current page.
</template>
