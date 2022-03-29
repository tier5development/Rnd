const mongoose = require('mongoose');
const {subjectName, validate} = require('../models/subjectModel');

exports.createSubjectName = async (req,res) => {
    try {
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        const subjectNameExist = await subjectName.findOne({name: req.body.name});
        
        if(subjectNameExist){
            return res.status(409).send({message: "Subject with the given name already exist"});
        }
        let subjectNamedata = {...req.body};
        await new subjectName(subjectNamedata).save();
        res.status(201).send({message: "Subject Name created successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: "Internal server error"});
    }
}

exports.getAllSubjectName = async (req,res) => {
    try {
        const getSubjectNameData =await subjectName.find({});
        res.status(200).json({
            success: true,
            data: getSubjectNameData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

exports.deleteSubjectName = async (req,res) => {
    try {
        const subjectNameExists = await subjectName.findById(req.params.id);
        if(subjectNameExists) {
          const deleteTask =await subjectName.findByIdAndDelete(req.params.id);
          if(deleteTask){
              res.status(200).json({
                  success: true,
                  message: 'Subject name deleted successfully',
              });
          }
          else {
              res.status(400).json({
                  success: false,
                  message: 'Something went wrong',
              });
          }
        } else {
            res.status(404).json({
                success: false,
                message: 'Subject name not found in the records',
            })
        }
     } catch (error) {
         console.log(error);
         console.log(error.message);
         res.status(500).json({
             success: false,
             message: 'Internal server error',
         })
     }
}