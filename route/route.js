import exp from 'constants';
import express from 'express';
import mainController from '../controllers/mainController.js';
const route = express.Router();

route.get('/' , mainController.home);
route.get('/registration' , mainController.registration);
route.get('/login' , mainController.loginPage);
route.get('/InvalidLoginPage', mainController.InvalidLoginPage)
route.get('/airbnbYourHome' , mainController.airbnbYourHome)
route.get('/firstRegisterToAddPlace' , mainController.Airbnd_Before_LoginPage )
route.post('/registration' , mainController.createDocuments);
route.post('/login' , mainController.loginUserData);
route.post('/setPlace' , mainController.AirbndSetPlace);
route.get('/homepage2' , mainController.homepage2);
route.get('/homepage2/bookingPage/:id' , mainController.bookinPageData);
route.post('/webImage' , mainController.webStaticImage);
route.get('/homepage2/edit/:id' , mainController.editControler);
route.post('/homepage2/update/:id' , mainController.updatePlaceData )
route.post('/homepage2/delete/:id' , mainController.DeletePlace)






export default route ;  