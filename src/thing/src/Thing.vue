<template>
  <div
    class="n-thing"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    :style="syntheticStyle"
  >
    <div v-if="$scopedSlots.avatar && contentIndented" class="n-thing-avatar">
      <slot name="avatar" />
    </div>
    <div class="n-thing-main">
      <div
        v-if="!contentIndented && ($scopedSlots.header || title || $scopedSlots['header-extra'] || titleExtra || $scopedSlots.avatar)"
        class="n-thing-avatar-header-wrapper"
      >
        <div v-if="$scopedSlots.avatar && !contentIndented" class="n-thing-avatar">
          <slot name="avatar" />
        </div>
        <div v-if="$scopedSlots.header || title || $scopedSlots['header-extra'] || titleExtra" class="n-thing-header-wrapper">
          <div class="n-thing-header">
            <div v-if="$scopedSlots.header || title" class="n-thing-header__title">
              <slot name="header">
                {{ title }}
              </slot>
            </div>
            <div v-if="$scopedSlots['header-extra'] || titleExtra" class="n-thing-header__extra">
              <slot name="header-extra">
                {{ titleExtra }}
              </slot>
            </div>
          </div>
          <div v-if="$scopedSlots.description || description" class="n-thing-main__description">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
      <template v-else>
        <div v-if="$scopedSlots.header || title || $scopedSlots['header-extra'] || titleExtra" class="n-thing-header">
          <div v-if="$scopedSlots.header || title" class="n-thing-header__title">
            <slot name="header">
              {{ title }}
            </slot>
          </div>
          <div v-if="$scopedSlots['header-extra'] || titleExtra" class="n-thing-header__extra">
            <slot name="header-extra">
              {{ titleExtra }}
            </slot>
          </div>
        </div>
        <div v-if="$scopedSlots.description || description" class="n-thing-main__description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </template>
      <div v-if="$scopedSlots.default || content" class="n-thing-main__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div v-if="$scopedSlots.footer" class="n-thing-main__footer">
        <slot name="footer" />
      </div>
      <div v-if="$scopedSlots.action" class="n-thing-main__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'Thing',
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    title: {
      type: String,
      default: null
    },
    titleExtra: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    contentIndented: {
      type: Boolean,
      default: false
    }
  }
}
</script>
