var express = require('express');
var bcryptjs=require('bcryptjs');
var router = express.Router(); 
var User = require('../models/user');
var Ville = require('../models/ville');
var Marker = require('../models/marker');
var Token = require('../models/token');
var Booking = require('../models/booking');
var Info = require('../models/info');
var nodemailer=require('nodemailer');
var crypto = require('crypto');
var passport =require('passport');


router.post('/reserve',(req,res) =>{
  console.log(req.body[0])
  var booking = new Booking({
    date_debut:req.body[1],
    date_fin:req.body[2],
    days:req.body[3],
    marker_id:req.body[4],
    user_id:req.body[0],
    date_created:req.body[6],
  });
  console.log()
  booking.save((err) => {
      if (err) {
        console.log(err);
      }
      else {
          res.json({success:true,msg:"yes"});
        }
    }
  );
  var info = new Info({
    info:req.body[5],
    booking_id:booking._id,
  });
  info.save((err) => {
    if (err) {
      console.log(err);
    }
  }
);
});
router.get("/userInfo/:id",(req,res) => {
  Info.findOne({booking_id:req.params.id}).populate('booking_id').populate('info.ville_id').exec(function(error, info) {
    res.json(info);
  });
});
router.get("/oneRes/:id",(req,res) => {
  Booking.findOne({_id:req.params.id}).populate('marker_id').exec(function(error, booking) {
    res.json(booking);
  });
});
router.get("/userRes/:id",(req,res) => {
  Booking.find({user_id:req.params.id}).populate('marker_id').exec(function(error, booking) {
    res.json(booking);
  });
});
router.post("/user",(req,res) => {
    var user = new User(
      {
        prenom:req.body.name,
        nom:req.body.firstName,
        email: req.body.email,
        role:"client",
        tel:req.body.tel,
        adresse:req.body.adress,
        password:req.body.password,
      }
    );
    console.log(req.body);
    bcryptjs.genSalt(12,(err, salt) => {
      bcryptjs.hash(user.password, salt,(err, hash) => {
          if (err) {
            console.log(err);
          }
          else {
            user.password=hash;
            user.save((err) => {
              if (err) {
                console.log(err);
                res.json({success:false,msg:'no'});
                if (err.code == 11000 ) {
                 res.send('exist');
                }
              }
              else {
                  res.json({success:true,msg:"yes"});
                }
              
            });
          }
      });
  });
  var token = new Token({ userId: user._id, token: crypto.randomBytes(16).toString('hex') });
          token.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              let   transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 25,
                secure: false,
                auth: {
                  user:'testmed03@gmail.com',
                  pass:20181273
                }
            });
            let mailOptions = {
                from: 'testmed03@gmail.com', 
                to: user.email, 
                subject: 'Account Verification Token', 
                html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/user/confirmation\/' +user._id+'/'+ token.token + '.\n'
            };
            
            transporter.sendMail(mailOptions, (err, res) => {
                if (err) {
                    return console.log(err);
                }
                else{
                   console.log('Message sent: %s', res);
                }
            });
          });
  });
  router.get('/user/confirmation/:id/:token',(req,res) =>{
    User.findOneAndUpdate({_id:req.params.id},{ $set: {isVerified:true}},(err,user) => {
      if(err){
        console.log(err);  
      }
      else{
        res.redirect("/");
      }
    });
  });
  router.post('/login',(req,res,next) =>{
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(501).json(err); }
      if (!user) { return res.status(501).json(info); }
      req.logIn(user, function(err) {
        if (err) { return res.status(501).json(err); }
        return res.status(200).json({success:true,user:user});
      });
    })(req, res, next);
  });
  router.get('/user',(req,res) => {
    return res.status(200).json({user:req.user});
  });
  router.get('/ville' , (req,res) => {
    Ville.find( {} ,(err,ville)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json({ville:ville});
      }
      
    });
    
  });

  /*function isValidUser(req,res,next)  {
    if(req.isAuthenticated()){
      next();
    }
    return res.status(200).json({success:false});
  }*/
  router.get('/hotel/:h' , (req,res) => {
    var hotel=req.params.h.split(',');
    Marker.find({$and:[{'ville_id':{ $in:hotel}},{'cat_id':{$eq:'5a9a86bbac8e150da48477b0'}}]}).exec((err,marker)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json(marker);
      }
      
    });
    
  });
  router.get('/hotelres/:h' , (req,res) => {
    var hotel=req.params.h.split(',');
    Marker.find({'_id':{ $in:hotel}}).exec((err,marker)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json(marker);
      }
      
    });
    
  });
  router.get('/resto/:r' , (req,res) => {
    var resto=req.params.r.split(',');
    Marker.find({$and:[{'ville_id':{ $in:resto}},{'cat_id':{$eq:'5a8ae4eff1ef40206077534f'}}]}).exec((err,marker)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json(marker);
      }
      
    });
    
  });
  router.get('/restores/:r' , (req,res) => {
    var resto=req.params.r.split(',');
    Marker.find({'_id':{ $in:resto}}).exec((err,marker)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json(marker);
      }
      
    });
    
  });

  router.get('/visite/:v' , (req,res) => {
    var visite=req.params.v.split(',');
    Marker.find({$and:[{'ville_id':{ $in:visite}},{'cat_id':{$eq:'5a92bc8debbe9925348d3f4e'}}]}).exec((err,marker)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json(marker);
      }
      
    });
    
  });
  router.get('/visiteres/:v' , (req,res) => {
    var visite=req.params.v.split(',');
    Marker.find({'_id':{ $in:visite}}).exec((err,marker)=>{
      if (err) {
        console.log(err);
      } 
      else{
        return res.status(200).json(marker);
      }
      
    });
    
  });
  module.exports = router; 