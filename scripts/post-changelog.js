const request = require('superagent')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const { DINGTALK_TOKEN } = process.env

if (!DINGTALK_TOKEN) {
  console.log('No DINGTALK_TOKEN in your env.')
  process.exit(0)
}

const changelog = fs
  .readFileSync(path.resolve(__dirname, '../CHANGELOG.zh-CN.md'), 'utf-8')
  .split(/^## /gm)[1]
  .replace(/^##/gm, '')

const message = `变更日志 ${changelog}`

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'post-changelog',
      message: `发布以下变更日志到钉钉群：\n\n${message}`
    }
  ])
  .then((ans) => {
    if (ans['post-changelog']) {
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
