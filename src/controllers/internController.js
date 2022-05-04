const { default: mongoose } = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

//========================CREATE Intern ===================================

const createInterns = async (req, res) => {
  try {

    let value = req.body

    let college = await collegeModel.findById(value.collegeId);
    if (!college) {
      return res.status(404).send({ status: false, msg: "No such collegeId  exist" });
    }
    
    let emailId = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(req.body.email)
    //let mobileNumber = "^\d{10}$".test(req.body.mobile)

    let arr = Object.keys(value)
    let emailCheck = await internModel.findOne({email: req.body.email})
    let mobileCheck = await internModel.findOne({mobile: req.body.mobile})
  
    if(arr.length == 0){
      return res.status(400).send({status: false, massage: "Invalid details please provid deatils" });
    } else if(!value.name){
      return res.status(400).send({status: false, massage: "Name is requred" });
    } else if(!value.mobile){
      return res.status(400).send({status: false, massage: "please enter valid 10 digite mobile number" });
    } else if(emailId == false){
      res.status(400).send({status: false, massage: "please Enter valid email"})
    } else if(!value.email){
      return res.status(400).send({status: false, massage: "Email is requred" });
    } else if(!value.collegeId){
      return res.status(400).send({status: false, massage: "collegeId is requred" });
    } else if(!emailCheck && !mobileCheck){
      let value = req.body
      let valueCreate = await internModel.create(value)
      res.status(200).send({status: true, data: valueCreate})
    } else if(emailCheck){
      res.status(400).send({status: false, massage: "Email is all ready exist"})
    } else if(mobileCheck)   {
      res.status(400).send({status: false, massage: "Moblie is all ready exist"})
    }
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}

// due balance => collegeId valided or number valided 

//===================================College DETAILS===================================
// const collegeDetails = async (req, res) => {
//   try {

//     let data = req.query

//     if (Object.keys(data).length == 0) {
//       let getAllBlogs = await blogModel.find({ isDeleted: false, isPublished: true });
//       if (!getAllBlogs) return res.status(404).send({ status: false, msg: "No such blog exist" });
//       // if (getAllBlogs.length == 0) return res.status(404).send({ status: false, msg: "No such blog exist" });
//       return res.status(200).send({ status: true, data: getAllBlogs })
//     }

//     let getBlogs = await blogModel.find({ $and: [{ $and: [{ isDeleted: false }, { isPublished: true }] }, { $or: [{ authorid: data.authorid }, { category: { $in: [data.category] } }, { tags: { $in: [data.tags] } }, { subcategory: { $in: [data.subcategory] } }] }] });

//     if (getBlogs.length == 0) return res.status(200).send({ status: true, msg: "No such blog exist" });
//     res.status(200).send({ status: true, data: getBlogs })
//   } catch (err) {
//     res.status(500).send({ status: false, error: err.message });
//   }
// }

module.exports ={
  createInterns,
 // collegeDetails
}