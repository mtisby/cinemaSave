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

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    console.log('login:')
    res.json('success')
})


const UserRoutes = router
export { UserRoutes }