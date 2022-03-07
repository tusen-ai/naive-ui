<markdown>
# Expand trigger

Use `expand-trigger="click"` with the `line-clamp` parameter to achieve the function of clicking the abbreviated text to expand the complete text.
</markdown>

<template>
  <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
    Lorem ipsum dolor sit amet,<br>
    consectetur adipiscing elit,<br>
    sed do eiusmod tempor incididunt<br>
    ut labore et dolore magna aliqua.<br>
    Ut enim ad minim veniam,<br>
    quis nostrud exercitation ullamco
  </n-ellipsis>
</template>
