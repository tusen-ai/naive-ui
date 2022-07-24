<markdown>
# Nested debug
</markdown>

<template>
  <n-timeline horizontal>
    <n-timeline-item content="啊" />
    <n-timeline-item
      type="success"
      title="成功"
      content="哪里成功"
      time="2018-04-03 20:46"
    >
      <n-timeline>
        <n-timeline-item content="啊" />
        <n-timeline-item
          type="success"
          title="成功"
          content="哪里成功"
          time="2018-04-03 20:46"
        />
        <n-timeline-item
          type="error"
          content="哪里错误"
          time="2018-04-03 20:46"
        />
        <n-timeline-item
          type="warning"
          title="警告"
          content="哪里警告"
          time="2018-04-03 20:46"
        />
        <n-timeline-item
          type="info"
          title="信息"
          content="是的"
          time="2018-04-03 20:46"
        />
      </n-timeline>
    </n-timeline-item>
    <n-timeline-item type="error" content="哪里错误" time="2018-04-03 20:46" />
    <n-timeline-item
      type="warning"
      title="警告"
      content="哪里警告"
      time="2018-04-03 20:46"
    />
    <n-timeline-item
      type="info"
      title="信息"
      content="是的"
      time="2018-04-03 20:46"
    />
  </n-timeline>
</template>
