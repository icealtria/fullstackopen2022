const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const monogoUrl = process.env.MonogoUrl
mongoose.connect(monogoUrl)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: (n) => /^\d{2,3}-\d+$/.test(n)
  }
})

personSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = new mongoose.model('Person', personSchema)