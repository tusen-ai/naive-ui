
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
  <n-h1 :id="id">
    {{ text }}
    <n-tooltip
      :delay="300"
      :placement="'top'"
      :show-arrow="true"
    >
      <template v-slot:activator>
        <edit-on-github-button
          class="edit-button"
          :url="url"
        />
      </template>
      {{ $t('editOnGithub') }}
    </n-tooltip>
  </n-h1>
</template>
<script>
export default {
  name: 'EditOnGithubHeader',
  props: {
    url: {
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
<style lang="scss" scoped>
  .edit-button {
    margin-left: 10px;
  }
</style>
