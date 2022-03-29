const mongoose = require('mongoose');
const quizSubjects = require('../models/questionModel');

exports.createSubject = (req,res) => {
    try {
        const { subjectCategory, selectionType, gameDifficulty, questionText,correctAnswer, optionAlternatives  } = req.body;
        const addSubject = new quizSubjects({
            category: subjectCategory,
            type: selectionType,
            difficulty: gameDifficulty,
            question: questionText,
            answer: correctAnswer,
            altervatives: optionAlternatives,
        });
        addSubject.save();
        res.status(201).json({
            success: true,
            message: 'Subject added successfully',
        });
      } catch (error) {
          res.status(500).json({
              success: false,
              message: 'Internal server issue',
          })
      }
    

};

exports.getAllSubject =async (req,res) => {
    try {
        const getSubjectsData =await quizSubjects.find({});
        res.status(200).json({
            success: true,
            data: getSubjectsData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }

};

exports.getSubjectById =async (req,res) => {
    try {
        const gettingPerSubjectDetails =await quizSubjects.findById(req.params.id);
        if(gettingPerSubjectDetails){
            res.status(200).json({
                success: true,
                data: gettingPerSubjectDetails,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Subject not found',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }

};

exports.updateSubject =async (req,res) => {
    try {
        const { subjectCategory, selectionType, gameDifficulty, questionText,correctAnswer, optionAlternatives } = req.body;
        const addSubject = {
            category: subjectCategory,
            type: selectionType,
            difficulty: gameDifficulty,
            question: questionText,
            answer: correctAnswer,
            altervatives: optionAlternatives,
        };
        quizSubjects.findByIdAndUpdate(req.params.id, addSubject, {new: true}, (err, addSubject) => {
            if(err) {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: addSubject,
                });
            }
        });

    //     const subjectExist = await quizSubjects.findById(req,params.id);
    //     if(subjectExist) {
    //     const updatedSubject = await quizSubjects.findByIdAndUpdate(req,params.id, addSubject, {
    //         new: true,
    //     });
    //     if(updatedSubject) {
    //        res.status(200).json({
    //            success: true,
    //            data: updatedSubject,
    //        }); 
    //     } else {
    //         res.status(400).json({
    //             success: false,
    //             message: 'Something went wrong',
    //         });
    //     }
    // } else {
    //     res.status(404).json({
    //         success: false,
    //         message: 'Subject not found',
    //     })
    // }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
};

exports.deleteSubject =async (req,res) => {
    try {
       const subjectExists = await quizSubjects.findById(req.params.id);
       if(subjectExists) {
         const deleteTask =await quizSubjects.findByIdAndDelete(req.params.id);
         if(deleteTask){
             res.status(200).json({
                 success: true,
                 message: 'Subject deleted successfully',
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
               message: 'Subject record not found',
           })
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
};