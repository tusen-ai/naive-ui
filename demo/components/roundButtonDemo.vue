<template>
  <div class="doc">
    <h1>圆按钮 / n-round-button</h1>
    <hr>
    <h2>基本用法</h2>
    <n-round-button>Edit</n-round-button><n-round-button>Cancel</n-round-button><n-round-button>Delete</n-round-button><n-round-button>New Service</n-round-button>
    <br><br>
    <textarea rows="5"><n-round-button>Edit</n-round-button><n-round-button>Cancel</n-round-button><n-round-button>Delete</n-round-button><n-round-button>New Service</n-round-button></textarea>
    <hr>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.doc {
  width: 900px;
  margin: auto;
  textarea {
    width: 100%;
    min-height: 3em;
  }
}

</style>
