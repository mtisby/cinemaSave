import express from "express"
import passport from "passport"
import { Movie } from "../models/movies.js"
import { User } from "../models/user.js";
import { Board } from "../models/boards.js";

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
    const user = await User.findById(userID).populate('pins')
    user.populate('boards')
 
    // console.log('**********************************')
    // console.log('get profile')    
    // console.log('**********************************')
    // console.log(user)
    res.json(user)
})

router.post('/profile/getboard/', async (req, res) => {
    const userID = req.body.user_id;
   
    const user = await User.findById(userID)
    let sendUser = null

    if(user.boards) { 
        sendUser = user.boards
    } 
 
    // console.log('**********************************')
    // console.log('get board')    
    // console.log('**********************************')
    // console.log(user.boards)
    
    res.json(sendUser)
})

router.post('/profile/getboard/id', async (req, res) => {
    const boardID = req.body.board_id;
    const userID = req.body.user_id;
    const user = await User.findById(userID)

    const boards = user.boards
    let data = null

    boards.map(function (i) {
        if (i._id.toString() === boardID) {
            data = i;
        }
    })
    
    res.json(data)
})

router.post('/profile/addboard/', async (req, res) => {
    const userID = req.body.userID;
    const user = await User.findById(userID);
    const board_data = {
        'title': req.body.title,
        'description': req.body.description
    }

    user.boards.push(board_data)
    user.save()
    
    const board_id = (user.boards[user.boards.length - 1]._id).toString();
   
    res.json(board_id)
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
    console.log(user)
    res.json({'pins': allPins, 'boards': user.boards})
})

const UserRoutes = router
export { UserRoutes }