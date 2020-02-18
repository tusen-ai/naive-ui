const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const dest = path.resolve(__dirname, 'temp')
const upload = multer({ dest })

app.options('/upload-test', cors())
app.post(
  '/upload-test',
  cors(),
  function (req, res, next) {
    req.on('close', () => {
      console.log('文件上传取消')
    })
    req.on('error', () => {
      console.log('文件上传出错')
    })
    next()
  },
  upload.any(),
  function (req, res, next) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest)
    console.log(req.headers)
    console.log(req.body)
    res.send('very good')
  }
)

app.listen(3000)
