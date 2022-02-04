<markdown>
# 字数限制

惜字如金。
</markdown>

<template>
  <n-space vertical>
    <n-input maxlength="30" show-count clearable />
    <n-input default-value="哦" show-count clearable>
      <template #count="{ value }">
        {{ value.includes('哦') ? '99+' : value.length }}
      </template>
    </n-input>
    <n-input type="textarea" maxlength="30" show-count />
    <n-input type="textarea" default-value="啥" show-count>
      <template #count="{ value }">
        {{ value.includes('啥') ? '99+' : value.length }}
      </template>
    </n-input>
  </n-space>
</template>
