const express = require('express');
const  multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');



router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})
    }catch(e){
        res.status(400).send(e)
    }
    
})

// LOGIN
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/logout', auth, async(req, res) => {
    try {
        req.user.token = req.user.tokens.filter((token) => {
            return token.token !== req.token

        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// for all logout
router.post ('/users.logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens =[]
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/me', auth , async (req, res) =>{
   res.send(req.user)

})



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid Updates! '})
    }
    try {   
        // const user = await User.findByIdAndUpdate(req.params.id)
        updates.forEach((update) => 
            req.user[update] = req.body[update] 
        )
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user_id)

        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.send(500).send(e)
    }
})

const upload = multer({
    dest: 'avatars',
    limits:{
        filesize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an Image'))
        }
        cb(undefined, true)
        // cb(new Error('File must be PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})
 
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width : 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer 
    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.send(400).send({ error: error.message })
}    
)

router.delete('/user/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})  

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if(!user || !user.avatar ){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router