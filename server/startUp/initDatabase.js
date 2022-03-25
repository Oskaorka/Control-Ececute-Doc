const Executor =  require('../models/Executor')
const  executorMock = require('../mock/executors.json')

module.exports = async () => {
    const executors =  await Executor.find()
    if(executors.length !== executorMock.length) {
        await createInitialEntity(Executor, executorMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async  item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return  newItem
            }catch (e) {
                return e
            }
        })
    )
}