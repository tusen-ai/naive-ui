const request = require('superagent')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const { DINGTALK_TOKEN } = process.env

if (!DINGTALK_TOKEN) {
  console.log('No DINGTALK_TOKEN in your env.')
  process.exit(0)
}

const { DISCORD_TOKEN } = process.env

if (!DISCORD_TOKEN) {
  console.error('No DISCORD_TOKEN in your env.')
  process.exit(0)
}

async function releaseChangelogToDingTalk () {
  const changelog = fs
    .readFileSync(path.resolve(__dirname, '../CHANGELOG.zh-CN.md'), 'utf-8')
    .split(/^## /gm)[1]
    .replace(/^##/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '[$1]')

  const message = `变更日志 ${changelog.trim()}\n\n完整信息见 https://github.com/TuSimple/naive-ui/blob/main/CHANGELOG.zh-CN.md\n`

  await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'release-changelog',
        message: `发布以下变更日志到钉钉群：\n\n${message}`
      }
    ])
    .then((ans) => {
      if (ans['release-changelog']) {
        request
          .post('https://oapi.dingtalk.com/robot/send')
          .query({
            access_token: DINGTALK_TOKEN
          })
          .type('application/json')
          .send({
            msgtype: 'text',
            text: {
              content: message
            }
          })
          .then((res) => {
            console.log(res.text)
          })
      }
    })
}

async function releaseChangelogToDiscord () {
  const changelog = fs
    .readFileSync(path.resolve(__dirname, '../CHANGELOG.en-US.md'), 'utf-8')
    .split(/^## /gm)[1]
    .replace(/^##/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '[$1]')

  const message = `Changelog ${changelog.trim()}\n\nSee https://github.com/TuSimple/naive-ui/blob/main/CHANGELOG.en-US.md for details.\n`

  await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'release-changelog',
        message: `发布以下变更日志到 Discord：\n\n${message}`
      }
    ])
    .then((ans) => {
      if (ans['release-changelog']) {
        request
          .post(`https://discord.com/api/webhooks/${DISCORD_TOKEN}`)
          .type('application/json')
          .send({
            content: message
          })
          .then(() => {
            console.log('done')
          })
          .catch((e) => {
            console.error(e)
            console.log('Error happens.')
          })
      }
    })
}

;(async () => {
  await releaseChangelogToDingTalk()
  await releaseChangelogToDiscord()
})()
