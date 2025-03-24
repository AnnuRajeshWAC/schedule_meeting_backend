import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import mongoose from 'mongoose';
import { meetingModel } from './models/meeting.js';
const app=express()
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log('listening....')
})
mongoose.connect(process.env.DB);
const db=mongoose.connection
if(db){
    console.log("connected to db")
}
const adminCollection=mongoose.connection.collection('users')
app.get('/admin',async(req,res)=>{
    try {
        const users=await adminCollection.find().toArray()
        res.json({data:users,success:true})
        
    } catch (error) {
        
        res.json({error:error,success:false})
    }
})
const desCollection=mongoose.connection.collection('designations')
app.get('/designations',async(req,res)=>{
    try {
        const designations=await desCollection.find().toArray()
        res.json({data:designations,success:true})
    } catch (error) {
        
        res.json({success:false})
    }
})

const holidays=mongoose.connection.collection('holidays')
app.get('/holidays',async(req,res)=>{
    const holidaysData=await holidays.find().toArray()
    res.json({data:holidaysData,success:true}) 
})

app.post('/meeting',async(req,res)=>{
    try {
        const {title,email,lead,members,room,start,end,date}=req.body
        const newMeeting= meetingModel({title,email,lead,members,room,start,end,date})
       const suc=await  newMeeting.save()
       if(suc){
        res.json({success:true})
       }
       else{
        res.json({success:false})
        console.log('error in adding');
        console.log(req.body);
        
        
       }
    } catch (error) {
        res.json({success:false})
        
    }
})
const meetingCollection=mongoose.connection.collection('meetings')

app.get('/meetings',async(req,res)=>{
    try {
        const meetings=await meetingCollection.find().toArray()
        res.json({data:meetings,success:true})
    } catch (error) {
        res.json({success:false})
    }
})
app.delete('/delete/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const deleteMeeting=await meetingModel.findByIdAndDelete(id)
        if(deleteMeeting){
            res.json({success:true,message:'deleted successfully'})
        }
    } catch (error) {
        res.json({success:false})
    }
})
app.put('/meetings/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const updatedData = req.body
        const updateMeeting=await meetingModel.findByIdAndUpdate(id,updatedData,{new:true})
        if(updateMeeting){
            res.json({success:true,message:'updated successfully'})
        }
    } catch (error) {
        res.json({success:false})
    }
})