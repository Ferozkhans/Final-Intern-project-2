
const collegeModel = require('../models/collegeModel');

const createColleges = async (req, res) => {
  try {

    let names = /^[a-zA-Z ]{2,30}$/.test(req.body.name)
    let fullName =req.body.fullName
    let logoLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*\.(?:png|jpg|jpeg))*$/.test(req.body.logoLink)
    
    let data = await collegeModel.findOne({name: req.body.name})

    if(req.body.name === undefined || req.body.fullName === undefined || req.body.logoLink === undefined){
      return res.status(400).send({status: false, message: "invalid request ! please provide details"})
    }else if(!req.body.name){
      res.status(400).send({status: false, message: "Name is missing"})
      //console.log(renames)
    }else if(!req.body.fullName){
      res.status(400).send({status: false, message: "fullName is missing"})
    }else if(!req.body.logoLink){
      res.status(400).send({status: false, message: "LogoLink is missing"})
    }else if(names == false){
      res.status(400).send({status: false, message: "please inter valid name"})
     }else if(fullName == 0){
      res.status(400).send({status: false, message: "please inter valid fullName"})
    }else if(logoLink == false){
      res.status(400).send({status: false, message: "please inter valid link"})
    }else if(!data){
      let value  = req.body
      let valueCreate = await collegeModel.create(value)
      res.status(200).send({status: true, data: valueCreate})
    }else if(data){
      res.status(400).send({massage: "Name is alrady exist"})
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}

module.exports = {
  createColleges
}



