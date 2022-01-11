import { User } from "../models/user.js";
import { Movie } from "../models/movies.js";

// debugging
const debugLvl1 = true;

const register = async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('register')
        console.log('*******************************')
    }

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
};

const login = (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('login')
        console.log('*******************************')
    }
    res.json({'user_id':req.user._id, 'username':req.user.username})
}

const getProfile = async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('get profile')
        console.log('*******************************')
    }

    const userID = req.body.user_id;
    const user = await User.findById(userID).populate('pins')
    user.populate('boards')

    res.json(user)
}

const getBoard = async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('get board')
        console.log('*******************************')
    }
    const userID = req.body.user_id;
   
    const user = await User.findById(userID)
    let sendUser = null

    if (user.boards != null) {
        sendUser = await user.populate('boards.pins')
    }
    
    res.json(sendUser)
}

const getBoardID = async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('get board id')
        console.log('*******************************')
    }

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
}

const addBoard = async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('add board')
        console.log('*******************************')
    }

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
}

const editBoard = async (req, res) => {
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

    Object.keys(user.boards).map(function (key) {
        if(user.boards[key]._id.toString() === boardID){
            user.boards[key].title = board_title;
            user.boards[key].description = board_descript;
        }
    })

    user.save();
    res.json({'title': board_title, 'description': board_descript})
}

const deleteBoard = async (req, res) => {
    if (debugLvl1 === true) {
        console.log('*******************************')
        console.log('delete board')
        console.log('*******************************')
    }

    const userID = req.body.userID
    const boardID = req.body.boardID;
    const user = await User.findById(userID);
    let x = 0

    Object.keys(user.boards).map(function (key) {
        if (user.boards[key]._id.toString() === boardID) {
            user.boards.splice(x, 1)
        }
        x++
    })

    user.save()
}

const addPin = async (req, res) => {
    if(debugLvl1 === true){
        console.log('*******************************')
        console.log('add pin')
        console.log('*******************************')
    }

    
    const userID = req.body.userID;
    const movieID = req.body.movieID;
    const movie = await Movie.findById(movieID);
    const user = await User.findById(userID).populate('boards.pins');
    const boards = user.boards;
    user.pins.push(movieID)

    let dataSend = null

    if (req.body.boardID) { 
        boards.map(function (i) {
            if (i._id.toString() === req.body.boardID) {
                i.pins.push(movie);
                dataSend = i.pins
                
            }
        })
    }

    user.save()
    res.json({'pins':dataSend})
}

const deletePins =  async (req, res) => {
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
}

export { register, login, getProfile, getBoard, getBoardID, addBoard, editBoard, deleteBoard, addPin, deletePins}