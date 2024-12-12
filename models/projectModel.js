const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        reqiured :true
    },
    langauges:{
        type:String,
        reqiured :true
    },
    overview:{
        type:String,
        reqiured :true
    },
    github:{
        type:String,
        reqiured :true,
        unique:true
    },
    website:{
        type:String,
        reqiured :true,
    },
    projectImage:{
        type:String,
        reqiured :true,
    },
    userId:{
        type:String,
        reqiured :true,
    }
})

const projects = mongoose.model("projects",projectSchema)
module.exports = projects