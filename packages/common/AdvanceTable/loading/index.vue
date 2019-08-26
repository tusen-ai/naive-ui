<template>
  <div
    class="section_loading"
    :style="{height:svgCompute.height}"
  >
    <svg
      version="1.1"
      viewBox="-1 -1 102 102"
      enable-background="new 0 0 200 200"
      :style="svgCompute"
      xml:space="preserve"
    >
      <path
        id="circle"
        class="circle"
        :style="circleCompute"
        d="M0 50
            A50 50 0 1 1 100 50
            A50 50 0 1 1 0   50"
      />
      <path
        id="file"
        class="file"
        :d="animationPiece"
      />
    </svg>
    <h4 id="text">
      {{ text }}
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: [String],
      default: 'Loading'
    },
    circle: {
      type: [Object],
      default: function () {
        return {
          color: '#63e2b7',
          time: '1s'
        }
      }
    },
    svg: {
      type: [Object],
      default: function () {
        return {
          width: '150px',
          height: '150px'
        }
      }
    }
  },
  data () {
    return {
      text: this.loadingText,
      texttime: 400,
      intervalTextId: '',
      intervalIconId: '',
      backwards: false,
      animationTime: 2000 / 30,
      counter: 0,
      circleAnimationTime: '1s',
      animationPiece: 'M21 2 H5 v28 h22 l0 -22 z M25 28 H7 V4  h12 v6 h6 z',
      animationchange: [
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,2H5v28h22l0,-22z M25,28H7V4h12v6h6z',
        'M21,3H5v26h22l0-20L21,3z M25,27H7V5h12v6h6V27z',
        'M21,4H5v24h22l0-18L21,4z M25,26H7V6h12v6h6V26z',
        'M21,5H5v23h22l0-17L21,5z M25,26H7V7h12v6h6V26z',
        'M21,6H5v22h22l0-16L21,6z M25,26H7V8h12v6h6V26z',
        'M21,7H5v21h22l0-15L21,7z M25,26H7V9h12v6h6V26z',
        'M21,8H5v20h22l0-14L21,8z M25,26H7V10h12v6h6V26z',
        'M23,9H5v19h22l0-15L23,9z M25,26H7V11h14v4h4V26z',
        'M25,10H5v18h22l0-16L25,10z M25,26H7V12h15v3h3V26z',
        'M28,10H4v18h24L28,10L28,10z M26,26H6V12h18v2h2V26z',
        'M29,10H3v18h26L29,10L29,10z M27,26H5V12h22l0,0h0V26z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,6h2h2v2h-4z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,6h4h4v2h-8z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,6h6h6v2h-12z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,6h8h8v2h-16z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,6h8h12v2h-20z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,4h4v2h16v2h-20z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,4h8v2h12v2h-20z',
        'M3,10v18h26V10L3,10z M27,26H5V12h22V26z M5,4h8v2h12v2h-20z'
      ]
    }
  },
  computed: {
    svgCompute () {
      return this.svg
    },
    circleCompute () {
      return {
        'animation-duration': this.circle.time,
        stroke: this.circle.color
      }
    }
  },
  mounted () {
    // clearInterval(this.intervalTextId)
    // clearInterval(this.intervalIconId)
    if (!this.intervalTextId) {
      this.intervalTextId = setInterval(
        function () {
          if (this.text.indexOf('...') !== -1) {
            this.text = this.loadingText
          } else {
            this.text = this.text + '.'
          }
        }.bind(this),
        this.texttime
      )
    }
    if (!this.intervalIconId) {
      this.intervalIconId = setInterval(
        this.iconAnimation.bind(this),
        this.animationTime
      )
    }
  },
  beforeDestroy () {
    if (this.intervalTextId) {
      clearInterval(this.intervalTextId)
      this.intervalTextId = null
    }
    if (this.intervalIconId) {
      clearInterval(this.intervalIconId)
      this.intervalTextId = null
    }
  },
  methods: {
    iconAnimation () {
      if (this.counter === this.animationchange.length) {
        this.backwards = true
      } else if (this.counter === 0) {
        this.backwards = false
      }
      if (this.backwards) {
        this.animationPiece = this.animationchange[this.counter--]
      } else {
        this.animationPiece = this.animationchange[this.counter++]
      }
    }
  }
}
</script>

<style scoped>
.section_loading {
  text-align: center;
  position: relative;
}
h4 {
  font-family: Arial;
  font-weight: 100;
  color: #63e2b7;
  font-size: 0.8em;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  margin-top: 1.5em;
  text-align: center;
}
svg {
  width: 150px;
  height: 150px;
  display: inline-block;
  padding: 0px;
  /*transform:rotate(180deg);
    -webkit-transform:rotate(180deg);*/
}
.file {
  fill: #63e2b7;
  position: relative;
  transform: translate(34px, 28px);
}

.folder-top {
  fill: #ffffff;
  position: relative;
  transform: translate(34px, 28px);
}

.folder-square {
  fill: #ffffff;
  position: relative;
  transform: translate(34px, 28px);
}

.circle {
  fill: transparent;
  stroke: #63e2b7;
  stroke-width: 1px;
  /*transform:rotate(180deg);
    -webkit-transform:rotate(180deg);*/
  -webkit-animation: 1s circle infinite cubic-bezier(0, 0.3, 0.7, 1);
}
@-webkit-keyframes circle {
  0% {
    stroke-dasharray: 800 400;
    stroke-dashoffset: -400;
  }
  50% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dasharray: 0 400;
    stroke-dashoffset: 0;
  }
}
</style>
