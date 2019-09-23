<template>
  <div class="percent-circle">
    <svg
      :width="width"
      :height="height"
    >
      <circle
        :cx="width/2"
        :cy="width/2"
        :r="r+percentWidth"
        fill="#273C4C"
      />
      <circle
        v-if="!usage"
        :cx="width/2"
        :cy="width/2"
        :r="r"
        fill="#1F263E"
      />
      <circle
        v-if="usage"
        :cx="width/2"
        :cy="width/2"
        :r="r"
        fill="#29575B"
      />
      <circle
        v-if="usage"
        :cx="width/2"
        :cy="width/2"
        :r="r-percentWidth"
        fill="#1F263E"
      />
      <path
        :id="id+'request'"
        fill="none"
        stroke="#426783"
      />
      <path
        :id="id+'usage'"
        fill="none"
        stroke="#51BF9A"
      />
      <foreignObject
        :width="textWidth"
        :height="textWidth"
        :x="width/2-textWidth/2"
        :y="width/2-textWidth/2"
      >
        <slot name="text" />
      </foreignObject>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'PercentCircle',
  props: {
    request: {
      type: Number,
      default: 0
    },
    usage: {
      type: Number,
      default: 0
    },
    cx: {
      type: Number,
      default: 110
    },
    cy: {
      type: Number,
      default: 110
    },
    r: {
      type: Number,
      default: 76
    },
    percentWidth: {
      type: Number,
      default: 22
    },
    key: {
      type: String,
      require: true
    }
    // width: {
    //   type: Number,
    //   default: 220
    // },
    // height: {
    //   type: Number,
    //   default: 220
    // }
  },
  data () {
    return {
      width: (this.r + this.percentWidth) * 2,
      height: (this.r + this.percentWidth) * 2
    }
  },
  computed: {
    textWidth () {
      return Math.floor(Math.sqrt((this.r - 22) * 2 * (this.r - 22) * 2 / 2))
    }
  },
  watch: {
    request () {
      this.setPercent(this.request, this.usage, this.r, this.percentWidth, this.width, this.height)
    }
  },
  mounted () {
    this.setPercent(this.request, this.usage, this.r, this.percentWidth, this.width, this.height)
  },
  methods: {
    setPercent (request, usage, r, percentWidth, width, height) {
      var requestPath = document.getElementById(this.id + 'request')
      var usagePath = document.getElementById(this.id + 'usage')
      let cx = width / 2
      let cy = height / 2
      var requestr = r + percentWidth / 2
      var usager = r - percentWidth / 2
      // 将requestPath平移到我们需要的坐标位置
      requestPath.setAttribute('transform', 'translate(' + cx + ',' + cy + ')')
      requestPath.setAttribute('stroke-width', percentWidth + 'px')
      usagePath.setAttribute('transform', 'translate(' + cx + ',' + cy + ')')
      usagePath.setAttribute('stroke-width', percentWidth + 'px')

      // 计算当前的进度对应的角度值
      var requestDegrees = request * 360
      var usageDegrees = usage * 360

      // 计算当前角度对应的弧度值
      var requestRad = requestDegrees * (Math.PI / 180)
      var usageRad = usageDegrees * (Math.PI / 180)

      console.log()

      // 极坐标转换成直角坐标
      var requestx = (Math.sin(requestRad) * requestr).toFixed(2)
      var requesty = -(Math.cos(requestRad) * requestr).toFixed(2)
      var usagex = (Math.sin(usageRad) * usager).toFixed(2)
      var usagey = -(Math.cos(usageRad) * usager).toFixed(2)

      // 大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
      var requestLenghty = window.Number(requestDegrees > 180)
      var usageLenghty = window.Number(usageDegrees > 180)

      var requestdescriptions = ['M', 0, -requestr, 'A', requestr, requestr, 0, requestLenghty, 1, requestx, requesty]
      var usagedescriptions = ['M', 0, -usager, 'A', usager, usager, 0, usageLenghty, 1, usagex, usagey]

      requestPath.setAttribute('d', requestdescriptions.join(' '))
      usagePath.setAttribute('d', usagedescriptions.join(' '))
    }
  }
}
</script>

<style scoped>
.percent-circle {
  text-align: center;
}
</style>
