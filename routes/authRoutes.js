const express = require('express');
const { registerController, loginController, testController,tokenValidationController } = require('../controllers/authController');
const {authMiddleware,} = require('../middlewares/authMiddleware');



//routerObject
const authRouter = express.Router();


//routing
//Register||Method POST

authRouter.post('/register',registerController);

//Login||Method POST

authRouter.post('/login',loginController);


authRouter.get('/validateToken',authMiddleware,tokenValidationController);




authRouter.get('/test',authMiddleware,testController);



module.exports = authRouter;