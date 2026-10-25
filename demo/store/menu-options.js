// rubbish code here

import { NSpace, NTag } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { componentMenuItems, docMenuItems } from './menu-data'

export function renderMenuLabel(option) {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label
  }
  return h(
    RouterLink,
    {
      to: option.path
    },
    { default: () => option.label }
  )
}

function renderNewTag(isZh) {
  return h(
    NTag,
    {
      type: 'success',
      size: 'small',
      round: true,
      bordered: false,
      style: { pointerEvents: 'none' }
    },
    { default: isZh ? () => '新' : () => 'New' }
  )
}

function renderItemExtra(rawItem, isZh) {
  if (!rawItem.enSuffix || !isZh) {
    return rawItem.isNew ? renderNewTag : undefined
  }
  const renderEn = () =>
    h(
      NSpace,
      { inline: true, size: 6, wrapItem: false, align: 'center' },
      { default: () => [rawItem.en, renderNewTag(isZh)] }
    )
  return rawItem.isNew ? renderEn : rawItem.en
}
function getItemExtraString(rawItem, isZh) {
  if (!rawItem.enSuffix || !isZh) {
    return ''
  }
  else {
    return rawItem.en
  }
}

function appendCounts(item) {
  if (!item.children) {
    item.count = 1
    return item
  }
  if (item.children) {
    item.children.forEach(appendCounts)
    item.count = item.children.reduce((sum, item) => sum + item.count, 0)
    if (item.type === 'group') {
      item.en += ` (${item.count})`
      item.zh += ` (${item.count})`
    }
    return item
  }
}

function createItems(lang, prefix, items) {
  const isZh = lang === 'zh-CN'
  const langKey = isZh ? 'zh' : 'en'
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem[langKey] || rawItem.en,
      extra: renderItemExtra(rawItem, isZh),
      extraString: getItemExtraString(rawItem, isZh),
      path: rawItem.path ? `/${lang}${prefix}${rawItem.path}` : undefined
    }
    if (rawItem.children) {
      item.children = createItems(lang, prefix, rawItem.children)
    }
    return item
  })
}

export function createDocumentationMenuOptions({ lang }) {
  return createItems(lang, '/docs', structuredClone(docMenuItems))
}

export function createComponentMenuOptions({ lang }) {
  return createItems(
    lang,
    '/components',
    structuredClone(componentMenuItems).map(appendCounts)
  )
}
