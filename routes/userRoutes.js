import express from "express"
import passport from "passport";
import { register, login, getProfile, getBoard, getBoardID, addBoard, editBoard, deleteBoard, addPin, deletePins } from '../controllers/movies.js';

const router = express.Router()
router.route('/register')
    .post(register)

router.route('/login')
    .post(passport.authenticate('local'), login)


router.route('/profile')
    .post(getProfile)

router.route('/profile/getboard')
    .post(getBoard)

router.route('/profile/getboard/id')
    .post(getBoardID)

router.route('/profile/addboard')
    .post(addBoard)

router.route('/profile/editboard')
    .post(editBoard)

router.route('/profile/deleteboard')
    .post(deleteBoard)

router.route('/profile/addpin')
    .post(addPin)

router.route('/profile/deletepin')
    .post(deletePins)

const UserRoutes = router
export { UserRoutes }