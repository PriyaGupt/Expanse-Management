const moment = require("moment"); 
const transectionModel = require("../models/transectionModel")

const getAllTransection = async(req,res)=>{
    try{
        const {frequency,selectDate,type} =req.body;
        const transections = await transectionModel.find({
           ...(frequency!=='custom' ?{
            date:{
                $gt : moment().subtract(Number(frequency),"d").toDate(), 
              },
           }:{
            date:{
                
                $gt:selectDate[0],
                $lt:selectDate[1],
            },
           }),
           userid: req.body.userid,
           ...(type!=='all' && {type })
        });   
         res.status(200).json(transections); 
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const editTransection=async(req,res)=>{
   try{
      await transectionModel.findOneAndUpdate(
        {_id: req.body.transacationId },
        req.body.payload
      );
      res.status(200).send("Edit Successfully");
   }
   catch(error){
    console.log(error)
    res.status(500).json(error);
   }
};
const deleteTransection=async(req,res)=>{
   try{
     await transectionModel.findOneAndDelete({_id:req.body.transacationId})
     res.status(200).send("Tranasation Deleted");
   }
   catch(error){
      console.log(error);
      res.status(500).json(error)  
   }
}
const addTransection =async (req,res) =>  {
    try{
       const newTransection = new transectionModel(req.body);
       await newTransection.save();
       res.status(201).send("Transection Created");
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports= {getAllTransection ,addTransection,editTransection,deleteTransection};