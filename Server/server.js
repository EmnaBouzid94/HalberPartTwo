const express=require('express')
const cors=require('cors')
const {MongoClient,ObjectId}=require('mongodb')
const bodyParser=require('body-parser')
const assert=require('assert')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const mongo_url='mongodb://localhost:27017'
const dataBase="HalberTest"

const app=express()

app.use(bodyParser.json())
app.use(cors())

MongoClient.connect(mongo_url,{ useUnifiedTopology: true },(err,client)=>{
    assert.equal(err,null,('DataBase connection failed'))
    const db=client.db(dataBase)
    const User =db.collection('Users')

    
    app.get("/users", (req, res) => {
        User.find().toArray((err,users) => {
            if (users.length > 0) {res.status(200).json(users)} 
            else {
                    res.status(404).json({
                    users:users,
                    message: 'No users found'
                   })
                }
        })
          
    
    })

    app.post("/signup", (req, res) => {
        User.find({ email: req.body.email },(err,user) => {
            if (user.length>=1) {
              return res.status(409).json({
                message: "Mail exists"
              })
            } 
            else  {bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  })
                } else {
                    const newuser={
                        name: req.body.name,
                        email:req.body.email,
                        password:hash
                    }
                  User.insertOne(newuser,(err,user)=>{
                    if (err) res.status(500).json({error: err})
                    else return res.status(200).json({
                        user:user,
                        message:"New User is added"
                    })
                    })
                    
                }
              })
            }
          })
      })
      app.post("/signin", (req, res) => {
        db.collection('Users').findOne({ email: req.body.email },(err,user) => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Auth failed"
              })
            }
           bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (err) {
                return res.status(401).json({
                  message: "Auth failed"
                })
              }
              if (result) {
                const token = jwt.sign(
                  {
                    email: user.email,
                    name:user.name,
                    userId: user._id
                  },
                  process.env.JWT_KEY,
                  {
                      expiresIn: "1h"
                  }
                )
                return res.status(200).json({
                  message: "Auth successful",
                  userId:user._id,
                  token: token
                })
              }
              res.status(401).json({
                message: "Auth failed"
              });
            });
          
          
          });
      });
    
    app.delete("/:userId", (req, res) => {
        db.collection('Users').deleteOne({ _id: ObjectId(req.params.userId) },(err,result) => {
            if (err) res.status(500).json({error: err})
            else  res.status(200).json({message: "User deleted"})
          })
      })
    
    app.put("/:userId", (req, res) => {
        db.collection('Users').findOneAndUpdate({ _id: ObjectId(req.params.userId) }, { $set:{...req.body} },(err,result) => {
            if (err) res.status(500).json({error: err})
            else  res.status(200).json({message: "Updated successfully"})
      })
    })
})




app.listen(3010,(err)=>{
    if (err) console.log("Server Crashed")
    else console.log("Server Running")
})