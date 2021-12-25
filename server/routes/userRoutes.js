import express from "express"
import passport from "passport"
import { Movie } from "../models/movies.js"
import { User } from "../models/user.js";
import { Board } from "../models/boards.js";

// debugging
const debugLvl1 = true;


const router = express.Router()
router.post('/register', async (req, res) => {
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

    res.json(user)
})

router.post('/profile/getboard/', async (req, res) => {
    const userID = req.body.user_id;
   
    const user = await User.findById(userID)
    let sendUser = null

    if(user.boards) { 
        sendUser = user.boards
    } 
    
    res.json(sendUser)
})

router.post('/profile/getboard/id', async (req, res) => {
    const boardID = req.body.board_id;
    const userID = req.body.user_id;
    const user = await User.findById(userID).populate('boards.pins')

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

router.post('/profile/editboard/', async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('edit board')
        console.log('*******************************')
    }

    const userID = req.body.userID;
    const boardID = req.body.boardID;
    const board_title = req.body.title;
    const board_descript = req.body.description;

    const user = await User.findById(userID);
    const boards = user.boards; 

    Object.keys(user.boards).map(function (key) {
        if(user.boards[key]._id.toString() === boardID){
            user.boards[key].title = board_title;
            user.boards[key].description = board_descript;
        }
    })

    user.save();
    res.json({'title': board_title, 'description': board_descript})
})

router.post('/profile/deleteboard/', async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('delete board')
        console.log('*******************************')
    }       

    const userID = req.body.userID
    const boardID = req.body.boardID;
    const user = await User.findById(userID);
    let x = 0


    console.log('length before: ', user.boards.length)

    Object.keys(user.boards).map(function (key) {
        if (user.boards[key]._id.toString() === boardID) {
           user.boards.splice(x, 1)
        }
        x ++
    })
    console.log('length after: ', user.boards.length)

    user.save()
})

router.post('/profile/addpin/', async (req, res) => {
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const movie = await Movie.findById(movieID);
    const user = await User.findById(userID);
    const boards = user.boards;
    user.pins.push(movieID)

    if (req.body.boardID) { 
        boards.map(function (i) {
            if (i._id.toString() === req.body.boardID) {
                i.pins.push(movie);
            }
        })
    }

    user.save()
})

router.post('/profile/deletepin/', async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('delete pin')
        console.log('*******************************')
    }
    const userID = req.body.userID;
    const user = await User.findById(userID)
    user.populate('pins')
    user.populate('boards.pins')

    const movieID = req.body.movieID;
    let movie = await Movie.findById(movieID);
    
    let allPins = user.pins
    let boards = user.boards
    
    for (var i = 0; i < allPins.length; i++) { 
        let string1 = allPins[i]._id.toString()
        let string2 = movie._id.toString()

        if (string1 === string2) { 
            allPins.splice(i, 1);
        }
    }

    if (req.body.boardID != undefined) { 
        Object.keys(user.boards).map(function (key) {
            if(user.boards[key]._id.toString() === req.body.boardID){
                const boardPins = user.boards[key].pins
                boardPins.map(function (i){
                    if(i._id.toString() === movieID){
                        let index = boardPins.indexOf(i);
                        boardPins.splice(index, 1);
                        user.boards[key].pins = boardPins
                        user.populate('boards.pins');

                        allPins = user.boards[key].pins;
                        boards = user.boards[key];
                        
                    }
                })
            }
        })
    }

    user.save()
    res.json({'pins': allPins, 'boards': boards})
})

const UserRoutes = router
export { UserRoutes }