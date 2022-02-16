<markdown>
# Prefix & suffix

Use `prefix` & `suffix` slot to add prefix & suffix.
</markdown>

<template>
  <n-tabs default-value="oasis">
    <template #prefix>
      Prefix
    </template>
    <n-tab-pane name="oasis" tab="Oasis">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou">
      Qilixiang
    </n-tab-pane>
    <template #suffix>
      Suffix
    </template>
  </n-tabs>
</template>
