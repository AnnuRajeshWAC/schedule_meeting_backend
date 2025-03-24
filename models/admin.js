import mongoose from "mongoose"

const adminSchema=mongoose.Schema({
    name:String,
    email:String,
    designation:Number
})
export const admin=mongoose.model('users',adminSchema)