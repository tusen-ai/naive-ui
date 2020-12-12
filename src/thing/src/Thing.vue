<template>
  <div
    class="n-thing"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :style="mergedStyle"
  >
    <div v-if="$slots.avatar && contentIndented" class="n-thing-avatar">
      <slot name="avatar" />
    </div>
    <div class="n-thing-main">
      <div
        v-if="
          !contentIndented &&
            ($slots.header ||
              title ||
              $slots['header-extra'] ||
              titleExtra ||
              $slots.avatar)
        "
        class="n-thing-avatar-header-wrapper"
      >
        <div v-if="$slots.avatar && !contentIndented" class="n-thing-avatar">
          <slot name="avatar" />
        </div>
        <div
          v-if="$slots.header || title || $slots['header-extra'] || titleExtra"
          class="n-thing-header-wrapper"
        >
          <div class="n-thing-header">
            <div v-if="$slots.header || title" class="n-thing-header__title">
              <slot name="header">
                {{ title }}
              </slot>
            </div>
            <div
              v-if="$slots['header-extra'] || titleExtra"
              class="n-thing-header__extra"
            >
              <slot name="header-extra">
                {{ titleExtra }}
              </slot>
            </div>
          </div>
          <div
            v-if="$slots.description || description"
            class="n-thing-main__description"
          >
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
      <template v-else>
        <div
          v-if="$slots.header || title || $slots['header-extra'] || titleExtra"
          class="n-thing-header"
        >
          <div v-if="$slots.header || title" class="n-thing-header__title">
            <slot name="header">
              {{ title }}
            </slot>
          </div>
          <div
            v-if="$slots['header-extra'] || titleExtra"
            class="n-thing-header__extra"
          >
            <slot name="header-extra">
              {{ titleExtra }}
            </slot>
          </div>
        </div>
        <div
          v-if="$slots.description || description"
          class="n-thing-main__description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </template>
      <div v-if="$slots.default || content" class="n-thing-main__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div v-if="$slots.footer" class="n-thing-main__footer">
        <slot name="footer" />
      </div>
      <div v-if="$slots.action" class="n-thing-main__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles'

export default {
  name: 'Thing',
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    title: {
      type: String,
      default: undefined
    },
    titleExtra: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    content: {
      type: String,
      default: undefined
    },
    contentIndented: {
      type: Boolean,
      default: false
    }
  }
}
</script>
