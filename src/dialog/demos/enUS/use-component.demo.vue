<markdown>
# Use as a component

Sometimes you may want to use a component.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'

const message = useMessage()

function handleNegativeClick() {
  message.warning('Cancel')
}

function handlePositiveClick() {
  message.success('Confirm')
}
</script>

<template>
  <n-dialog
    title="Dialog"
    content="Are you sure?"
    negative-text="Cancel"
    positive-text="Submit"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  />
</template>
