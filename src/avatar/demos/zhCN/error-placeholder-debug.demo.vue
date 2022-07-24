<markdown>
# Error placeholder debug
</markdown>

<template>
  <n-space :wrap-item="false">
    <n-avatar
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      lazy
      :intersection-observer-options="{ root: '.root-layout' }"
    >
      <template #placeholder>
        PH
      </template>
    </n-avatar>
    <n-avatar
      src="xxx"
      lazy
      :intersection-observer-options="{ root: '.root-layout' }"
    >
      <template #placeholder>
        PH
      </template>
    </n-avatar>
  </n-space>
</template>
