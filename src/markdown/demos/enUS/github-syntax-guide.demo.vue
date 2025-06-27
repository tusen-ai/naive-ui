<markdown>
# Github Alerts
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const options = {
  isBreaks: true
}

const markdownText = ref(`

## Github Alerts

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

## Github Tasks

- [x] highlight
- [ ] Mermaid
`)
</script>

<template>
  <n-markdown :content="markdownText" v-bind="options" />
</template>
