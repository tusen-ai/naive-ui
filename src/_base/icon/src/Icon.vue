<template>
  <svg
    v-if="type === 'more'"
    class="n-base-icon n-base-icon--more"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M255.8 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM102 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM410 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z" />
  </svg>
  <svg
    v-else-if="type === 'fastForward' || type === 'fastBackward' || type === 'fast-forward' || type === 'fast-backward'"
    class="n-base-icon"
    :style="{
      transform: styleTransform
    }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <g>
      <path d="m220.1,256l-127.1,-127c-9.4,-9.4 -9.4,-24.6 0,-33.9s24.6,-9.3 34,0l144,143.9c9.1,9.1 9.3,23.7 0.7,33.1l-144.6,144.9c-4.7,4.7 -10.9,7 -17,7s-12.3,-2.3 -17,-7c-9.4,-9.4 -9.4,-24.6 0,-33.9l127,-127.1z" />
      <path d="m368.1,256l-127.1,-127c-9.4,-9.4 -9.4,-24.6 0,-33.9s24.6,-9.3 34,0l144,143.9c9.1,9.1 9.3,23.7 0.7,33.1l-144.6,144.9c-4.7,4.7 -10.9,7 -17,7s-12.3,-2.3 -17,-7c-9.4,-9.4 -9.4,-24.6 0,-33.9l127,-127.1z" />
    </g>
  </svg>
  <svg
    v-else-if="type === 'forward' || type === 'backward'"
    class="n-base-icon"
    :style="{
      transform: styleTransform
    }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" />
  </svg>
</template>

<script>
export default {
  name: 'NBaseIcon',
  props: {
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    styleTransform () {
      const type = this.type
      if (type === 'backward' || type === 'fast-backward') return 'rotate(180deg)'
      return null
    }
  }
}
</script>
