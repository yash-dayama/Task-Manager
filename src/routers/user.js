const express = require('express');
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

module.exports = router