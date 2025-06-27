<markdown>
# 支持位置和头像

通过 `avatar` 设置自定义头像，通过 `placement` 设置位置，提供了 `start`、`end` 两个选项。
</markdown>

<template>
  <n-flex vertical>
    <n-bubble
      content="落魄谷中寒风吹，春秋蝉鸣少年归。"
      placement="start"
      avatar="https://avatars.githubusercontent.com/u/20943608?s=60&v=4"
    />

    <n-bubble
      content="荡魂山处石人泪，定仙游走魔向北。"
      placement="start"
    />

    <n-bubble
      content="逆流河上万仙退，爱情不敌坚持泪。"
      placement="end"
    >
      <template #avatar>
        <n-avatar src="https://avatars.githubusercontent.com/u/60170001?v=4" />
      </template>
    </n-bubble>

    <n-bubble
      content="宿命天成命中败。仙尊悔而我不悔。"
      placement="end"
      avatar=""
    />
  </n-flex>
</template>
