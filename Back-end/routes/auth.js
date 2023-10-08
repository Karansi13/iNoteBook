const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Karanisagoodboy';

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 4 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 6 characters").isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    // If there are error, return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the suser with this email exist already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10); // using await bcz it will return a promise
        const secPass = await bcrypt.hash(req.body.password, salt);  // same goes with this also

        // The basic meaning of await is rukjao jab tk ye promise resolve nhi hojati aur iski value leke jao

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

        // sign is a sync so, no need to write await
        // const jwtData = jwt.sign(data, JWT_SECTRET);
        // console.log(jwtData)
        // res.json({user});

        // catch errors
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique email'})
    //  })

    // res.send(req.body)
    // res.send("hello")
})

// Authentication a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are error, return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructuring
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        //internally saare hashes ko match krelega
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;   // abhi add hua h
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }


        // ABHI CHANGE KIYA HU
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Route 3: Get loggedin User Details using: POST "/api/auth/login". Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router