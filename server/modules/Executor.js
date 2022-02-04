const { Schema, model }= require('mongoose')

const schema = new Schema({
/*    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }*/
}, {
    timestamps: true
})

module.exports = model('Executor', schema)