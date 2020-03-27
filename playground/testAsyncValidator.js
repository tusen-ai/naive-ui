const Schema = require('async-validator')

const descriptor = {
  value: {
    type: 'string',
    required: true,
    validator: () => true
  }
}

const validator = new Schema(descriptor)

validator.validate({
  value: '123'
}, (errors, fields) => {
  console.log('wtf')
})
