import request from 'superagent'
import url from 'url'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const {
  DINGTALK_TOKEN,
  DINGTALK_TOKEN_2,
  DINGTALK_TOKEN_3,
  DINGTALK_TOKEN_4,
  DINGTALK_TOKEN_5
} = process.env

if (
  !DINGTALK_TOKEN ||
  !DINGTALK_TOKEN_2 ||
  !DINGTALK_TOKEN_3 ||
  !DINGTALK_TOKEN_4 ||
  !DINGTALK_TOKEN_5
) {
  console.log('No DINGTALK_TOKEN in your env.')
  process.exit(0)
}

const { DISCORD_TOKEN } = process.env

if (!DISCORD_TOKEN) {
  console.error('No DISCORD_TOKEN in your env.')
  process.exit(0)
}

async function releaseChangelogToDingTalk() {
  const allLog = fs
    .readFileSync(path.resolve(__dirname, '../CHANGELOG.zh-CN.md'), 'utf-8')
    .split(/^## /gm)[1]

  const changelog = allLog
    .replace(/(^.*?\n)/g, '')
    .replace(/^##/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '[$1]')

  const number = allLog.split(/^(.*)$/m)[1]

  const title = `变更日志 ${number.trim()}`

  const text = `${changelog.trim()}\n\n完整信息见 https://github.com/tusen-ai/naive-ui/blob/main/CHANGELOG.zh-CN.md\n`

  await inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'release-changelog',
        message: `发布以下变更日志到钉钉群：\n\n${title}\n\n${text}`
      }
    ])
    .then(async (ans) => {
      if (ans['release-changelog']) {
        for (const token of [
          DINGTALK_TOKEN,
          DINGTALK_TOKEN_2,
          DINGTALK_TOKEN_3,
          DINGTALK_TOKEN_4,
          DINGTALK_TOKEN_5
        ]) {
          await request
            .post('https://oapi.dingtalk.com/robot/send')
            .query({
              access_token: token
            })
            .type('application/json')
            .send({
              msgtype: 'markdown',
              markdown: {
                title,
                text: `${title}\n\n${text}`
              }
            })
            .then((res) => {
              console.log(res.text)
            })
        }
      }
    })
}

async function releaseChangelogToDiscord() {
  const changelog = fs
    .readFileSync(path.resolve(__dirname, '../CHANGELOG.en-US.md'), 'utf-8')
    .split(/^## /gm)[1]
    .replace(/^##/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '[$1]')

  const message = `Changelog ${changelog.trim()}\n\nSee https://github.com/tusen-ai/naive-ui/blob/main/CHANGELOG.en-US.md for details.\n`

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
        ;(async () => {
          for (let i = 0; i < message.length; i += 1800) {
            const part = message.slice(i, i + 1800)
            await request
              .post(`https://discord.com/api/webhooks/${DISCORD_TOKEN}`)
              .type('application/json')
              .send({
                content: part
              })
              .then(() => {
                console.log('done')
              })
              .catch((e) => {
                console.error(e)
                console.log('Error happens.')
              })
          }
        })()
      }
    })
}

;(async () => {
  await releaseChangelogToDingTalk()
  await releaseChangelogToDiscord()
})()
