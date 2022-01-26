<markdown>
# Segmented

`content`, `footer` can be segmented or `soft` segmented. `action` can be segmented. Segment border will appear at the top of segmented parts.

</markdown>

<template>
  <n-card
    title="Card Segmented Demo"
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header-extra>
      #header-extra
    </template>
    Card Content
    <template #footer>
      #footer
    </template>
    <template #action>
      #action
    </template>
  </n-card>
</template>
