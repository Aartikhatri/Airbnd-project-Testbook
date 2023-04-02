import { now } from "mongoose"
import multer from "multer"
import Path from "path"
import DbConnection from "../db/DbConnection.js"
import { registrationModel, setYourPlaceModel, staticImageModel } from '../model/allModel.js'
import flash from 'connect-flash';
import session from "express-session"
import { request } from "http"
import { log } from "console"




class mainController {

    static home = async (req, res) => {
        const result = await setYourPlaceModel.find();

        res.render('index', { data: result })
    }

    static registration = (req, res) => {
        res.render('registrationPage')
    }

    static loginPage = (req, res) => {
        res.render('loginPage');
    }


    static airbnbYourHome = async (req, res) => {
        res.render('airbnbYourHome')
    }




    static bookinPageData = async (req, res) => {
        try {
            const result = await setYourPlaceModel.findById(req.params.id);
           
            res.render('bookingPage', { data2: [result] });
        } catch (error) {
            console.log(error);
        }
    }

    static homepage2 = async (req, res) => {
        const result = await setYourPlaceModel.find();

        req.flash("login", "congratulation you logged in successfuly")
        res.render('indexPage2', { data: result, msg: req.flash("login") })
    }

    static InvalidLoginPage = async (req, res) => {
        res.render('InvalidLoginPage')
    }

    static Airbnd_Before_LoginPage = (req, res) => {
        res.render('firstRegisterToAddHotel')
    }




    // creating data and sending data to data base 
    static createDocuments = async (req, res) => {
        try {
            const { country, number, name, email, password } = req.body
            const registrDetails = new registrationModel({
                country: country,
                number: number,
                name: name,
                email: email,
                password: password
            })

            res.cookie('name', registrDetails.name);
            res.cookie('password', registrDetails.password);

            console.log(registrDetails);
            await registrDetails.save();
            res.redirect('/');

        } catch (error) {
            console.log(error);
        }
    }


    //  code for login page 
    static loginUserData = async (req, res) => {
        try {
            const { loginEmail, loginPassword } = req.body;

            const userDetails = await registrationModel.findOne({ email: loginEmail });

            if (userDetails != null && userDetails.email === loginEmail && userDetails.password === loginPassword) {
                
                res.cookie('useremail', userDetails.email);
                res.cookie('password', userDetails.password);
                res.redirect('/homepage2')
            } else {
                res.redirect('InvalidLoginPage')
            }

        } catch (error) {
            console.log(error);
        }
    }

    //  for image storage 
    static Storage = multer.diskStorage({
        destination: './public//hotels-image',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });

    static imageUpload = multer({
        storage: this.Storage
    }).single('images')


    static AirbndSetPlace = async (req, res) => {

        this.imageUpload(req, res, async (err) => {
            if (err) { console.log(err); }
            else {
                const { location, area, date, price, hostby, villaName } = req.body;
                const setPlaceDetails = new setYourPlaceModel({

                    location: location,
                    area: area,
                    date: date,
                    price: price,
                    hostby: hostby,
                    villaName: villaName,
                    image: req.file.filename
                })

                await setPlaceDetails.save()
                res.redirect('/homepage2')


            }
        })


    };


    // for static image uploads 
    static Storage = multer.diskStorage({
        destination: './public//images',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });

    static staticImageUpload = multer({
        storage: this.Storage
    }).single('staticImages')

    static webStaticImage = async (req, res) => {
        this.staticImageUpload(req, res, async (err) => {
            if (err) { console.log(err) }
            else {

                const { img } = req.body;

                const staticImageData = new staticImageModel({
                    staticImg: img
                })
                await staticImageData.save();
               
                res.send("image Added")
                
            }
        })
    }


    // code for editing page 
    static editControler = async (req, res) => {
        try {
            const result = await setYourPlaceModel.findById(req.params.id);
            res.render('EditPage', { data2: [result] });
        } catch (error) {
            console.log(error);
        }
    }

    // update value ;
    static updatePlaceData = async (req, res) => {
        try {
            const update = await setYourPlaceModel.findByIdAndUpdate(req.params.id, {$set : req.body });
            res.redirect('/homepage2')
        } catch (error) {
            console.log(error);
        }
    }

    static DeletePlace = async (req, res) => {
        try {
            const update = await setYourPlaceModel.findByIdAndDelete(req.params.id, {$set : req.body });
            console.log("deleted successfully");
            res.redirect('/homepage2')
        } catch (error) {
            console.log(error);
        }
    }

};

export default mainController;