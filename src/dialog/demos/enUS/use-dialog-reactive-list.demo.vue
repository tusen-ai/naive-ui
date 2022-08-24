<markdown>
# Access all dialog instances

You can use `useDialogReactiveList` to access all dialog reactive inside `n-dialog-provider`.
</markdown>

<template>
  There is {{ dialogReactiveList.length }} dialog in the current page.
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialogReactiveList } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      dialogReactiveList: useDialogReactiveList()
    }
  }
})
</script>
