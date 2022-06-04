<markdown>
# Avatar

Put avatar in tag.
</markdown>

<template>
  <n-space>
    <n-tag>
      Anyway.FM
      <template #avatar>
        <n-avatar
          src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
        />
      </template>
    </n-tag>
    <n-tag round :bordered="false">
      Anyway.FM
      <template #avatar>
        <n-avatar
          src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
        />
      </template>
    </n-tag>
  </n-space>
</template>
