<markdown>
# Item placement

Left. .thgiR
</markdown>

<template>
  <n-flex :wrap="false">
    <n-timeline item-placement="left">
      <n-timeline-item content="Oops" />
      <n-timeline-item
        type="success"
        title="Success"
        content="success content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="error"
        content="Error content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="warning"
        title="Warning"
        content="warning content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="info"
        title="Info"
        content="info content"
        time="2018-04-03 20:46"
      />
    </n-timeline>
    <n-timeline item-placement="right">
      <n-timeline-item content="Oops" />
      <n-timeline-item
        type="success"
        title="Success"
        content="success content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="error"
        content="Error content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="warning"
        title="Warning"
        content="warning content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        type="info"
        title="Info"
        content="info content"
        time="2018-04-03 20:46"
      />
    </n-timeline>
  </n-flex>
  <n-timeline item-placement="alternate">
    <n-timeline-item content="Oops" />
    <n-timeline-item
      type="success"
      title="Success"
      content="success content"
      time="2018-04-03 20:46"
    />
    <n-timeline-item
      type="error"
      content="Error content"
      time="2018-04-03 20:46"
    />
    <n-timeline-item
      type="warning"
      title="Warning"
      content="warning content"
      time="2018-04-03 20:46"
    />
    <n-timeline-item
      type="info"
      title="Info"
      content="info content"
      time="2018-04-03 20:46"
    />
  </n-timeline>
</template>
