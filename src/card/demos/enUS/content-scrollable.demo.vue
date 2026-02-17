<markdown>
# Content Scroll

Enable `content-scrollable` to keep scrolling inside the content area only. Header and footer stay fixed. It is usually used with a fixed card height.
</markdown>

<template>
  <n-card
    title="Task List"
    content-scrollable
    style="max-height: 280px"
    segmented
  >
    <p v-for="i in 20" :key="i" style="margin: 0 0 8px 0;">
      Task {{ i }}: only content area scrolls.
    </p>
    <template #footer>
      Footer actions stay fixed
    </template>
  </n-card>
</template>
