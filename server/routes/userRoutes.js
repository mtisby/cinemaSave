import express from "express"
import passport from "passport"
import { Movie } from "../models/movies.js"
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
        res.json(req.user._id)
    } catch (e) {
        console.log(e)
    }
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({'user_id':req.user._id, 'username':req.user.username})
})

router.post('/profile', async (req, res) => {
    const userID = req.body.user_id;
    const user = await User.findById(userID).populate({
        path: 'pins'
    });   
    res.json(user)
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
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const user = await User.findById(userID);
    user.pins.push(movieID)

    user.save()
})

router.post('/profile/deletepin/', async (req, res) => {
    const userID = req.body.userID;
    const user = await User.findById(userID).populate({
        path: 'pins'
    });
    const movieID = req.body.movieID;
    let movie = await Movie.findById(movieID);
    
    const allPins = user.pins
    
    for (var i = 0; i < allPins.length; i++) { 
        let string1 = allPins[i]._id.toString()
        let string2 = movie._id.toString()

        console.log(string2)
        if (string1 === string2) { 
            allPins.splice(i, 1);
        }
    }

    user.save()
})

const UserRoutes = router
export { UserRoutes }