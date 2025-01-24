const fs = require('node:fs')
const path = require('node:path')

const extraKeys = ['createDiscreteApi']
const componentMapping = {
  'n-collapse-item': 'n-collapse',
  'n-float-button-group': 'n-float-button',
  'n-checkbox-group': 'n-checkbox',
  'n-form-item': 'n-form',
  'n-form-item-gi': 'n-form-item',
  'n-input-group': 'n-input',
  'n-upload-trigger': 'n-upload',
  'n-descriptions-item': 'n-descriptions',
  'n-image-group': 'n-image',
  'n-list-item': 'n-list',
  'n-timeline-item': 'n-timeline',
  'n-anchor-link': 'n-anchor',
  'n-breadcrumb-item': 'n-breadcrumb',
  'n-tab-pane': 'n-tabs',
  'n-drawer-content': 'n-drawer',
  'n-layout-sider': 'n-layout',
  'n-layout-header': 'n-layout',
  'n-layout-footer': 'n-layout',
  'n-layout-content': 'n-layout',
  'n-grid-item': 'n-grid'
}

function parseChangelog(content) {
  const logs = {}
  let version = ''
  let date = ''
  let isBreaking = false

  content.split('\n').forEach((line) => {
    line = line.trim()

    const versionMatch = line.match(/^## ([\d.]+)/)
    if (versionMatch) {
      version = versionMatch[1]
      isBreaking = false
      return
    }

    const dateMatch = line.match(/^`(\d{4}-\d{2}-\d{2})`/)
    if (dateMatch) {
      date = dateMatch[1]
      return
    }

    if (line === '### Breaking Changes') {
      isBreaking = true
      return
    }
    if (line.startsWith('### ') && line !== '### Breaking Changes') {
      isBreaking = false
      return
    }

    const componentMatches = Array.from(line.matchAll(/`(n-[^`]*)`/g)).map(
      match => match[1]
    )

    const extraMatches = extraKeys.filter(key => line.includes(`\`${key}\``))

    const names = new Set()

    componentMatches.forEach((name) => {
      if (componentMapping[name]) {
        names.add(componentMapping[name])
      }
      else {
        names.add(name)
      }
    })

    extraMatches.forEach((name) => {
      names.add(name)
    })

    if (names.size === 0) {
      names.add('')
    }

    const content = isBreaking ? `${line.trim()} 🚨` : `${line.trim()}`

    names.forEach((name) => {
      if (!logs[name]) {
        logs[name] = []
      }

      const existingLog = logs[name].find(
        log => log.version === version && log.date === date
      )

      if (existingLog) {
        existingLog.changes.push(content)
      }
      else {
        logs[name].push({
          version,
          date,
          changes: [content]
        })
      }
    })
  })

  return logs
}

function main() {
  const langs = ['cn', 'en']
  langs.forEach((lang) => {
    const content = fs.readFileSync(
      path.resolve(
        __dirname,
        `../CHANGELOG.${lang === 'cn' ? 'zh-CN' : 'en-US'}.md`
      ),
      'utf-8'
    )
    fs.writeFileSync(
      path.resolve(__dirname, `../components-changelog-${lang}.json`),
      JSON.stringify(parseChangelog(content), null, 2)
    )
  })
}

main()
