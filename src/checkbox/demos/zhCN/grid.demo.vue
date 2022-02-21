<markdown>
# 栅格

和栅格一起使用。
</markdown>

<template>
  <n-checkbox-group>
    <n-grid :y-gap="8" :cols="2">
      <n-gi>
        <n-checkbox value="Pushes Open" label="推开" />
      </n-gi>
      <n-gi>
        <n-checkbox value="The Window" label="窗户" />
      </n-gi>
      <n-gi>
        <n-checkbox value="And Raises" label="举起" />
      </n-gi>
      <n-gi>
        <n-checkbox value="The Spyglass" label="望远镜" />
      </n-gi>
    </n-grid>
  </n-checkbox-group>
</template>
