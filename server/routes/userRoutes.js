import express from "express"
import passport from "passport"
import { User } from "../models/user.js";

const router = express.Router()
router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, error => {
            if (error) {
                return next(error)
            }
        })
        res.json('success');
    } catch (e) {
        console.log(e)
    }
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    console.log('login:')
    res.json('success')
})

router.post('/profile/addboard/', async (req, res) => {
    // find user by id and update
    console.log('add board')        
})

router.post('/profile/deleteboard/', async (req, res) => {
    // find user by id and update
    console.log('delete board')        
})

router.post('/profile/addpin/', async (req, res) => {
    // find user by id and update
    console.log('add pin')        
})

router.post('/profile/deletepin/', async (req, res) => {
    // find user by id and update
    console.log('delete pin')        
})

const UserRoutes = router
export { UserRoutes }