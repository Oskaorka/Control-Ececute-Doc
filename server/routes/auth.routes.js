const express = require('express')
const bcrypt = require('bcryptjs')
const Administrator =  require('../models/Administrator')
const tokenService =  require('../services/token.service')
const { check, validationResult } = require('express-validator')
const chalk = require("chalk");


const router =  express.Router({mergeParams: true})

// /api/auth/signUp
// 1. get data from req (email, password ...)
// 2. check if users already exists
// 3. hash password
// 4. create user
// 5. generate tokens

router.post('/signUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
    async(req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: 'INVALID_DATA',
                    code: 400,
                    errors: errors.array()
                }
            })
        }


        const { email, password } =  req.body
        const existingAdmin =  await Administrator.findOne({ email })
        if(existingAdmin) {
            return res.status(400).json({
                error: {
                    message: 'EMAIL_EXISTS',
                    code: 400
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const newAdmin = await Administrator.create({
            ...req.body,
            password: hashedPassword
        })

        const tokens = tokenService.generate({ _id: newAdmin._id })
        await tokenService.save(newAdmin._id, tokens.refreshToken)


        res.status(201).send({...tokens, userId: newAdmin._id})



    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
}])

router.post('/signInWithPassword', [
    check('email', 'Email некорректный').normalizeEmail().isEmail(),
    check('password', 'пароль не может быть пустым').exists(),
    async (req, res) => {
    try{
        const errors =  validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: {
                    message: 'INVALID_DATA',
                    code: 400
                }
            })
        }

        const { email, password} =  req.body
        const existingAdmin =  await Administrator.findOne({ email })

        if(!existingAdmin) {
            return  res.status(400).send({
                errors: {
                    message: 'EMAIL_NOT_FOUND',
                    code: 400
                }
            })
        }

        const isPasswordEqual = await bcrypt.compare(password, existingAdmin.password)

        if(!isPasswordEqual) {
            return  res.status(400).send({
                errors: {
                    message: 'INVALID_PASSWORD',
                    code: 400
                }
            })
        }

        const tokens = tokenService.generate({ _id: existingAdmin._id })
        await  tokenService.save(existingAdmin._id, tokens.refreshToken)
        res.status(200).send({ ...tokens, userId: existingAdmin._id })

    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
}])

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async(req, res) => {
    try{
        const { refresh_token: refreshToken } =  req.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)
        /*console.log(chalk.yellow(`password ${dbToken}`))*/
        if(isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: 'Unauthorized' })
        }


        const tokens = await  tokenService.generate({
            _id: data._id
        })

        await  tokenService.save(data._id, tokens.refreshToken)
        res.status(200).send({ ...tokens, userId: data._id })
    }catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports =  router