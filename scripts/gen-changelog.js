const fs = require('node:fs')
const path = require('node:path')

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

    const componentMatch = line.match(/^- .*?`(n-[^`]*)`/)
    if (!componentMatch)
      return

    const componentName = componentMatch[1]
    const content = isBreaking ? `${line.trim()} 🚨` : `${line.trim()}`

    if (!logs[componentName]) {
      logs[componentName] = []
    }

    const existingLog = logs[componentName].find(
      log => log.version === version && log.date === date
    )

    if (existingLog) {
      existingLog.changes.push(content)
    }
    else {
      logs[componentName].push({
        version,
        date,
        changes: [content]
      })
    }
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
