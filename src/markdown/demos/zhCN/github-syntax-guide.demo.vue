<markdown>
# Github Alerts
</markdown>

<script lang="ts" setup>
import { rehypeGithubAlerts } from 'rehype-github-alerts'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { ref } from 'vue'

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

- [ ] Task 1: Implement feature X
- [x] Task 2: Fix bug Y


## Github Footnotes

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.
`)
</script>

<template>
    <n-markdown
      :content="markdownText"
      :remark-plugins="[remarkGfm, remarkBreaks]"
      :rehype-plugins="[rehypeGithubAlerts]"
    />
</template>
