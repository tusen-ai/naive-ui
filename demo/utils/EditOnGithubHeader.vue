
<i18n>
{
  "zh-CN": {
    "editOnGithub": "在 Github 上编辑"
    },
  "en-US": {
    "editOnGithub": "Edit on Github"
  }
}
</i18n>

<template>
  <n-h1 :id="id" class="naive-doc-title">
    <span>{{ text }}</span>
    <span class="edit-button">
      <n-tooltip
        :delay="300"
        placement="left"
        :show-arrow="true"
      >
        <template v-slot:activator>
          <edit-on-github-button
            text
            size="large"
            class="edit-button"
            :relative-url="relativeUrl"
          />
        </template>
        {{ $t('editOnGithub') }}
      </n-tooltip>
    </span>
  </n-h1>
</template>

<script>
export default {
  name: 'EditOnGithubHeader',
  props: {
    relativeUrl: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    id () {
      return this.text.replace(/ /g, '-')
    }
  }
}
</script>

<style scoped>
.naive-doc-title {
  display: flex;
  justify-content: space-between;
}

.naive-doc-title .edit-button {
  display: inline-flex;
  align-items: center;
}
/*
.naive-doc-title:hover .edit-button {
  opacity: 1;
  transition: opacity .3s ease-out;
} */
</style>
