<markdown>
# 配合 Router Link

有的时候会需要让 `<n-a />` 具有 router-link 的功能。

如果你觉得写起来很麻烦，可以再封装一个组件。
</markdown>

<template>
  <router-link to="/" #="{ navigate, href }" custom>
    <n-a :href="href" @click="navigate">
      回到主页
    </n-a>
  </router-link>
</template>
