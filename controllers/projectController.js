const projects = require("../models/projectModel")

// add project
exports.addProjectController = async (req,res)=>{
    console.log("Inside addProjectController");
    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const {title,langauges,overview,github,website}=req.body
    const projectImage = req.file.filename
    try{
        const existingProject =await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist") 
        }
        else{
            const newProject=  new projects({
                title,langauges,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)

    }

    
     
    // res.status(200).json("Add project request recieved")
    
}

// get home project

exports.getHomeProjectsController = async (req,res)=>{
    console.log("Inside getHomeProjectsController");
    try{
         const allHomeProjects= await projects.find().limit(3)
         res.status(200).json(allHomeProjects)
    }
    catch(err){
         res.status(401).json(err)
    }
    
}
// get user projects of authorised user
exports.getUserProjectsController = async (req,res)=>{
    console.log("Inside getUserProjectsController");
    const userId=req.userId
    try{
         const allUserProjects= await projects.find({userId})
         res.status(200).json(allUserProjects)
    }
    catch(err){
         res.status(401).json(err)
    }
    
}

// for gettin all projects
exports.getAllProjectsController = async (req,res)=>{
    console.log("Inside getAllProjectsController");
    const searchKey = req.query.search
    
    
    try{
         const allProjects= await projects.find({
            langauges:{
                $regex:searchKey,$options:"i"
            }
         })
         res.status(200).json(allProjects)
    }
    catch(err){
         res.status(401).json(err)
    }
    
}

// Edit project
exports.editProjectController = async(req,res)=>{
    console.log("Inside editProjectController");
    // get project id from  request params
    const {id} = req.params

    // req body contains only text type data

    
    const {title,langauges,overview,github,website,projectImage}=req.body
    // to get file data req.file
    const reUploadImageFileName = req.file?req.file.filename:projectImage
    // to get userid use jwtmiddleware
    const userId = req.userId
    console.log(id,title,langauges,overview,github,website,reUploadImageFileName,userId);
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:id},{
            title,langauges,overview,github,website,projectImage:reUploadImageFileName,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
    
    
}

// remove project

exports.removeProjectController = async (req,res)=>{
    console.log("Inside removeProjectController");
    // get project id from  request params
    const {id} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    }
    catch(err){
        res.status(401).json(err)
    }
}