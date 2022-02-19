const express  = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const routes = require('./routes')
/*const cors = require('cors')*/

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
/*app.use(cors())*/
app.use('/api', routes)

const PORT = config.get('port') ?? 3030

async  function start() {
    try{
        await  mongoose.connect(config.get('mongoUri'))
        console.log(chalk.yellow(`MongoDB connected.`))
        app.listen(PORT, () => {
            console.log(chalk.blue(`Server haas been started on port ${PORT}`))
        })
    }catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()
