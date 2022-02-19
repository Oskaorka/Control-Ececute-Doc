const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    executor: { type: String },
    type: { type: String }
}, {
    timestamps: true
})

module.exports = model('Administrator', schema)