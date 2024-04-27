import express from "express";
import { createUser, updateCurrentUserProfile, loginUser, getCurrentProfile, logoutCurrentUser, getAllUsers, updateUserById, deleteUserById, getUserById } from "../controllers/userController.js";


const router = express.Router()
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);


router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser)
router.route('/profile').get(authenticate, getCurrentProfile).put(authenticate, updateCurrentUserProfile)
router.route('/:id')
	.delete(authenticate, authorizeAdmin, deleteUserById).get(authenticate, authorizeAdmin, getUserById)
	.put(authenticate, authorizeAdmin, updateUserById)

export default router;