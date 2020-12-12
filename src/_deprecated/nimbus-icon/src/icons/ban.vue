<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>ban</title>
    <g :fill="color">
      <path
        d="M50,0A50,50,0,1,0,85.36,14.64,50,50,0,0,0,50,0Zm0,89.58A39.59,39.59,0,0,1,18.19,26.44L73.56,81.81A39.41,39.41,0,0,1,50,89.58Zm31.81-16L26.44,18.19A39.59,39.59,0,0,1,81.81,73.56Z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    }
  }
}
</script>
