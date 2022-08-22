const express = require('express');
const router = express.Router();
const artistm = require('../models/artistm');
const songm = require('../models/songm');
const {isLoggedIn} = require('../middlewares');


// multer
const multer = require('multer');
const {storage} = require('../middlewares');
const upload = multer({ storage: storage })

router.get('/add-song',isLoggedIn,async(req,res)=>{
    const artists = await artistm.find({});
    res.render('addsong',{artists,tl:'Add Song'});
})

router.post('/add-song',upload.single('image'),async(req,res)=>{
    const {name,dor} = req.body;
    const s = new songm({name,dor,image:req.file.filename});
    for(let artistid of req.body.artists){
        s.artists.push(artistid);
    }
    await s.save();
    for(let artistid of req.body.artists){
        const a = await artistm.findById(artistid);
        a.songs.push(s._id);
        await a.save();
    }
    req.flash('success','successfully created Song');
    res.redirect('/home');
})

router.post('/add-artist',upload.single('image'),async(req,res)=>{
    const {name,dob,bio} = req.body;
    const a = new artistm({name,dob,bio,image:req.file.filename});
    await a.save();
    res.redirect('/add-song');
})

module.exports = router;