// rubbish code here

import type { MenuOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { MenuItem } from './menu-data'
import { NSpace, NTag } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { componentMenuItems, docMenuItems } from './menu-data'

export type Lang = 'en-US' | 'zh-CN'

/** A menu item with the number of pages it holds */
interface CountedMenuItem extends Omit<MenuItem, 'children'> {
  count?: number
  children?: CountedMenuItem[]
}

export type SiteMenuOption = MenuOption & {
  path?: string
  extraString: string
  children?: SiteMenuOption[]
}

export function renderMenuLabel(option: MenuOption): VNodeChild {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label as VNodeChild
  }
  return h(
    RouterLink,
    {
      to: option.path as string
    },
    { default: () => option.label as string }
  )
}

function renderNewTag(isZh?: boolean): VNodeChild {
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

function renderItemExtra(
  rawItem: MenuItem,
  isZh: boolean
): string | (() => VNodeChild) | undefined {
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
function getItemExtraString(rawItem: MenuItem, isZh: boolean): string {
  if (!rawItem.enSuffix || !isZh) {
    return ''
  }
  else {
    return rawItem.en
  }
}

function appendCounts(item: CountedMenuItem): CountedMenuItem {
  if (!item.children) {
    item.count = 1
    return item
  }
  item.children.forEach(appendCounts)
  item.count = item.children.reduce((sum, child) => sum + (child.count ?? 0), 0)
  if (item.type === 'group') {
    item.en += ` (${item.count})`
    item.zh += ` (${item.count})`
  }
  return item
}

function createItems(
  lang: Lang,
  prefix: string,
  items: MenuItem[]
): SiteMenuOption[] {
  const isZh = lang === 'zh-CN'
  const langKey = isZh ? 'zh' : 'en'
  return items.map((rawItem) => {
    const { children, ...fields } = rawItem
    const item: SiteMenuOption = {
      ...fields,
      key: rawItem.en,
      label: rawItem[langKey] || rawItem.en,
      extra: renderItemExtra(rawItem, isZh),
      extraString: getItemExtraString(rawItem, isZh),
      path: rawItem.path ? `/${lang}${prefix}${rawItem.path}` : undefined
    }
    if (children) {
      item.children = createItems(lang, prefix, children)
    }
    return item
  })
}

export function createDocumentationMenuOptions({
  lang
}: {
  lang: Lang
}): SiteMenuOption[] {
  return createItems(lang, '/docs', structuredClone(docMenuItems))
}

export function createComponentMenuOptions({
  lang
}: {
  lang: Lang
}): SiteMenuOption[] {
  return createItems(
    lang,
    '/components',
    structuredClone(componentMenuItems).map(appendCounts)
  )
}
