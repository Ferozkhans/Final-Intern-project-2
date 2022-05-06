const { default: mongoose } = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

//========================CREATE Intern ===================================

const createInterns = async (req, res) => {
  try{
    let data = req.body
    let arr = Object.keys(data)
    let Name = /^[a-zA-Z ]{2,45}$/.test(req.body.name);
    let Email = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(req.body.email)
    let Mobile = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(req.body.mobile) 
    let intern = await internModel.findOne({ email : req.body.email});
    let mobileNo = await internModel.findOne({ mobile : req.body.mobile});

    if (arr.length == 0){
    return res.status(400).send({ status: false, msg: "Invalid request. Please provide Details" })
    } else if(!data.name){
      return res.status(400).send({ status: false, massage: "Fill the name block" });
    }
    else if(!data.email){
    return res.status(400).send({ status: false, massage: "Email is required" });
   }
    else if(!data.mobile){
    return res.status(400).send({status:false, massage:"Enter 10digit moblie number"})
   }
    
    else if (Name == false)  {
      return res.status(400).send({status:false , msg: "Please Enter valid name." })
    }
    
    else if (Email == false){
       return res.status(400).send({status:false , msg: "Please Enter valid email." })
    }
    else if(intern) {
       return res.status(400).send({status: false, msg: "email already exist!"})
    }
    
    else if (Mobile == false){
     return res.status(400).send({status:false , msg: "Please Enter valid mobile number." })
    }
    else if(mobileNo) {
       return res.status(400).send({status: false, msg: "mobile number already exist!"})
    }
  
    else if (mongoose.Types.ObjectId.isValid(data.collegeId) == false){
       return res.status(400).send({ staus: false, msg: "College Id is Invalid" })
    }

    let Id = await collegeModel.findOne({ _id: data.collegeId ,isDeleted:false});

    if(!Id){res.status(404).send({ status: false, Error: "College does not exist!" });}
    else{
        let internCreated = await internModel.create(data);
        res.status(201).send({ status: true, data: internCreated});
    }
  }   catch (err) {
  res.status(500).send({  status: false , msg: "Server not responding", error: err.message });
}
};







const getcollegeDetails = async (req, res) => {


 // const collegeDetails =async function(req ,res){
    try{

        const info = req.query.collegeName

        if (!info){
          let allintern = await internModel.find({isDeleted: false });
          return res.status(200).send({ status: true, Data: allintern });
        }

        if(Object.keys(info).length === 0) return res.status(400).send({status:false , message:"Please Enter College Name"})
        const college = await collegeModel.findOne({name: info ,isDeleted:false})
        if(!college) return res.status(400).send({status:false , message:"Did not found college with this name please register first"})
          const { name, fullName, logoLink } = college
          const data = { name, fullName, logoLink };
          data["interests"] = [];
          const collegeIdFromcollege = college._id;
  
          const internList = await internModel.find({ collegeId: collegeIdFromcollege  ,isDeleted:false});
          if (!internList) return res.status(404).send({ status: false, message: " We Did not Have Any Intern With This College" });
          data["interests"] = [...internList]
          res.status(200).send({ status: true, data: data });
    }
    catch(error){
      console.log({message:error.message})
      res.status(500).send({status:false , message:error.Message})
    }
  }

















//   try {
//     let collegeName = req.query.collegeName

//     if (!collegeName) 
//       return res.status(404).send({ status: false, msg: "plese fill  college name" });
    
//     const college ={names ,fullName, logoLink}
//     const data={names , fullName,logoLink}
//     data["intersest"] = [];
// const StoreData = college.id
//   //   let showcollegelist = await collegeModel.findOne({name: collegeName}).select({name: 1, fullName: 1, logoLink: 1})
//   //   if(!showcollegelist){
//   //     return res.status(400).send({status: false, massage: "College not found please check name"})
//   //   }
    
//   //   let StoreData = showcollegelist;
//   //   //StoreData["instrest"]=[];
//      let getInterns = await internModel.find({ collegeId:StoreData })//.select({ name: 1, email: 1, mobile: 1 });
//     data["intersest"]=[...getInterns]

//   //       let gy = (StoreData["showcollegelist"] = [...getInterns])
//   //  //StoreData["instrest"]= [...getInterns]
//      res.status(200).send({data: data})
      
//   } catch (err) {
//       res.status(500).send({ status: false, msg:"showcollegelist"  })
//   }
 

module.exports = {
  createInterns, getcollegeDetails
  // collegeDetails
}































































// const getcollegeDetails = async function (req, res) {
//   try {

//     let names = req.query.name['collegeId'];
    
//     //let colleges = req.query.

//     // applying filter on blog already present in mondodb subjected to condition ispublished true and isdeleted false
//     if (!names){
//       let blog = await internModel.find();
//    return res.status(200).send({ status: true, Data: blog });
//   }

//   let division = await internModel.find({})

//   if (mongoose.Types.ObjectId.isValid(_id)==names){
//     return res.status(200).send({ status: true, Data: division });
//   }
// // validate author id in mondo Db
  //   if (colleges) {
  //   if (mongoose.Types.ObjectId.isValid(Id) == false) {
  //     return res.status(400).send({ status: false, Error: "collegeId Invalid" });
  //   }
  // }
  // let division = await internModel.find().populate('collegeId', 'name')


  // if (division.length === 0) {
  //   return res.status(404).send({ Error: "Not Found" })
  // }

  // // if (division.length != 0) {
  // //   var data = division.filter(
  // //     (x) => x.name
  // //   );
  // // }
 
  // //console.log(data)
  // if (division.length === 0) {
  //   return res.status(404).send({ Error: "Blog does not exist" })
  // }
  // //let data = await interModel.find({ name : names});
  // else if (names) {
  //   return res.status(200).send({ status: true, Data: division });
  // }

//  } catch (err) {
//   res
//     .status(500)
//     .send({
//       status: false,
//       Error: "Server not responding",
//       error: err.message,
//     });
// }
// }


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

