const { Schema, model } = require('mongoose')

const schema = new Schema({
    dateDoc: { type: String },
    executionOrder: { type: String },
    id: { type: Number },
    idExecutor: { type: String },
    nameDoc: { type: String },
    nameExecutor: [{ type: Schema.Types.ObjectId, ref: 'Executor' }],
    nameInitiator: { type: String },
    periodOfExecution: { type: String },
    punctDoc: { type: String },
    typeDoc: { type: String }
}, {
    timestamps: true
})

module.exports = model('DataDoc', schema)