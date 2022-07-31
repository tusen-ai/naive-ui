<markdown>
# Hoverable
</markdown>

<template>
  <n-list hoverable clickable>
    <n-list-item>
      <n-thing title="Better Late Than Never" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              Tag A
            </n-tag>
            <n-tag :bordered="false" type="info" size="small">
              Tag B
            </n-tag>
          </n-space>
        </template>
        Lorem ipsum dolor sit amet,<br>
        consectetur adipiscing elit,<br>
        sed do eiusmod tempor incididunt<br>
        ut labore et dolore magna aliqua.<br>
        Ut enim ad minim veniam,<br>
        quis nostrud exercitation ullamco
      </n-thing>
    </n-list-item>
    <n-list-item>
      <n-thing title="Lorem Ipsum" content-style="margin-top: 10px;">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              Tag C
            </n-tag>
            <n-tag :bordered="false" type="info" size="small">
              Tag D
            </n-tag>
          </n-space>
        </template>
        Lorem ipsum dolor sit amet,<br>
        consectetur adipiscing elit,<br>
        sed do eiusmod tempor incididunt<br>
        ut labore et dolore magna aliqua.<br>
        Ut enim ad minim veniam,<br>
        quis nostrud exercitation ullamco
      </n-thing>
    </n-list-item>
  </n-list>
</template>
