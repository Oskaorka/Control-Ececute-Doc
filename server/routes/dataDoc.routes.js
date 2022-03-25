const express = require('express')
const DataDoc = require('../models/DataDoc')
const router = express.Router({ mergeParams: true })

router.get('/', async(req, res ) => {
    try {
        const list = await  DataDoc.find()
        res.status(200).send( list )
        // console.log(list)
    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})
module.exports = router