const express = require('express')
const router =  express.Router({mergeParams: true})

router.use('/executor', require('./executor.routes'))
router.use('/dataDoc', require('./dataDoc.routes'))

module.exports = router