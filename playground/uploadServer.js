const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

const app = express()
const upload = multer({ dest: path.resolve(__dirname, 'temp') })

app.options('/upload-test', cors())
app.post('/upload-test', cors(), upload.any(), function (req, res, next) {
  console.log(req.files)
  res.send('very good')
})

app.listen(3000)
