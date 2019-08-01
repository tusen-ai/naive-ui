<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-steps
        :current="current"
        :finish-status="finishStatus"
        :current-status="currentStatus"
      >
        <n-step
          title="I Me Mine"
          description="All through the day, I me mine I me mine, I me mine"
        />
        <n-step
          title="Let It Be"
          description="When I find myself in times of trouble Mother Mary comes to me"
        />
        <n-step
          title="Come Together"
          description="Here come old flat top He come grooving up slowly"
        />
        <n-step
          title="Something"
          description="Something in the way she moves Attracts me like no other lover"
        />
      </n-steps>
      <div
        style="display: flex; justify-content: center; flex-wrap: wrap; margin-top: 48px;"
      >
        <n-button
          icon="md-arrow-round-back"
          @click="prev"
        /><n-button
          icon="md-arrow-round-forward"
          @click="next"
        />
        <n-button @click="currentStatus='error'">
          current-status: error
        </n-button>
        <n-button @click="currentStatus='process'">
          current-status: process
        </n-button>
        <n-button @click="finishStatus='error'">
          finish-status: error
        </n-button>
        <n-button @click="finishStatus='process'">
          finish-status: process
        </n-button>
        <n-button @click="finishStatus='success'">
          finish-status: success
        </n-button>
      </div>
      <!--EXAMPLE_END-->
    </div>

    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: null,
      finishStatus: 'success',
      currentStatus: 'error'
    }
  },
  beforeDestroy () {
  },
  methods: {
    next () {
      if (this.current === null) this.current = 0
      else if (this.current >= 3) this.current = null
      else this.current++
    },
    prev () {
      if (this.current === 0) this.current = null
      else if (this.current === null) this.current = 3
      else this.current--
    }
  }
}
</script>
