const express = require('express')
const router =  express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/executor', require('./executor.routes'))
router.use('/docData', require('./dataDoc.routes'))
router.use('/user', require('./user.routes'))
router.use('/administrator', require('./administrator.routes'))

module.exports = router