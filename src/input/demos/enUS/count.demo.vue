<markdown>
# Word limit

Don't waste words.
</markdown>

<template>
  <n-space vertical>
    <n-input maxlength="30" show-count clearable />
    <n-input default-value="Yes" show-count clearable>
      <template #count="{ value }">
        {{ value.includes('Yes') ? '99+' : value.length }}
      </template>
    </n-input>
    <n-input type="textarea" maxlength="30" show-count />
    <n-input type="textarea" default-value="What?" show-count>
      <template #count="{ value }">
        {{ value.includes('What?') ? '99+' : value.length }}
      </template>
    </n-input>
  </n-space>
</template>
