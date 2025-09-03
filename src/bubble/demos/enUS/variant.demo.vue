<markdown>
# Variants and Shapes

Set the style variants of the bubble through the `variant` attribute, and set the shape of the bubble through the `shape` attribute.
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-bubble variant="filled" content="filled" />
      <n-bubble variant="filled" shape="round" content="filled + round" />
      <n-bubble variant="filled" shape="corner" content="filled + corner" />
    </n-space>

    <n-space>
      <n-bubble variant="outlined" content="outlined" />
      <n-bubble variant="outlined" shape="round" content="outlined + round" />
      <n-bubble variant="outlined" shape="corner" content="outlined + corner" />
    </n-space>

    <n-space>
      <n-bubble variant="shadow" content="shadow" />
      <n-bubble variant="shadow" shape="round" content="shadow + round" />
      <n-bubble variant="shadow" shape="corner" content="shadow + corner" />
    </n-space>

    <n-space>
      <n-bubble
        variant="filled"
        shape="corner"
        placement="end"
        content="filled + corner"
      />
      <n-bubble
        variant="outlined"
        shape="corner"
        placement="end"
        content="outlined + corner"
      />
      <n-bubble
        variant="shadow"
        shape="corner"
        placement="end"
        content="shadow + corner"
      />
    </n-space>
  </n-space>
</template>
