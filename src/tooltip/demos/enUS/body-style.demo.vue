<markdown>
# Body style

Setting style is sometimes useful.
</markdown>

<template>
  <n-space>
    <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
      <template #trigger>
        <n-button> California Girls </n-button>
      </template>
      I wish they all could be California girls. I wish they all could be
      California girls. I wish they all could be California girls.
    </n-tooltip>
    <n-tooltip :style="{ maxWidth: '400px' }" trigger="click">
      <template #trigger>
        <n-button> California Girls </n-button>
      </template>
      I wish ...
    </n-tooltip>
  </n-space>
</template>
