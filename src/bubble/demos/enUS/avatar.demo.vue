<markdown>
# Supports location and avatar

Set a custom `avatar` via the avatar prop, and configure the position using the placement prop, which supports two options: `start` and `end``.
</markdown>

<template>
  <n-flex vertical>
    <n-bubble
      content="There’s this emperor, and he asks this shepherd’s boy, “How many seconds in eternity?”"
      placement="start"
      avatar="https://avatars.githubusercontent.com/u/20943608?s=60&v=4"
    />

    <n-bubble
      content="The shepherd's boy says: ”There's this mountain of pure diamond. It takes an hour to climb it, and an hour to go around it.“"
      placement="start"
    />

    <n-bubble
      content="Erery hundred years, a little bird comes. It sharpens its beak on the diamond mountain. And when the entire mountain is chiseled away, the first second of eternity will have passed."
      placement="end"
    >
      <template #avatar>
        <n-avatar src="https://avatars.githubusercontent.com/u/60170001?v=4" />
      </template>
    </n-bubble>

    <n-bubble
      content="You must think that's a hell of a long time. Personally, I think that's a hell of a bird."
      placement="end"
      avatar=""
    />
  </n-flex>
</template>
