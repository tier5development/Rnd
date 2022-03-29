const {User, validate} = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req,res) => {
    try {
        // const { subjectCategory, selectionType, gameDifficulty, questionText, optionAlternatives  } = req.body;
        // const addSubject = new quizSubjects({
        //     category: subjectCategory,
        //     type: selectionType,
        //     difficulty: gameDifficulty,
        //     question: questionText,
        //     altervatives: optionAlternatives,
        // });
        // addSubject.save();
        // res.status(201).json({
        //     success: true,
        //     message: 'Subject added successfully',
        // });

        // res.json({
        //     reqqq: req
        // });
        // return;
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        const user = await User.findOne({email: req.body.email});  //to check whether the email already exists on the database or not.
        
        if(user){
            return res.status(409).send({message: "User with the given email already exist"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT)); // to check how many salt rounds we require like 1,2,3,5,10 times
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        let userdata = {...req.body, password: hashPassword};
        await new User(userdata).save();
        res.status(201).send({message: "User created successfully"});
      } catch (error) {
          res.status(500).send({message: "Internal server error"});
      }
    

};

exports.getAllUsers = async (req,res) => {
    try {
        const getUserData =await User.find({});
        res.status(200).json({
            success: true,
            data: getUserData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }

}

exports.getUserById = async (req,res) => {
    try {
        const gettingPerUserDetails =await User.findById(req.params.id);
        if(gettingPerUserDetails){
            res.status(200).json({
                success: true,
                data: gettingPerUserDetails,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

exports.updateUser = async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email});  //to check whether the email already exists on the database or not.
        
        if(!user){
            return res.status(409).send({message: "User with the given email doesnot exist"});
        }

        const updateUserBody = req.body;

        User.findByIdAndUpdate(req.params.id, updateUserBody, {new: true}, (err, updateUserBody) => {
            if(err) {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error',
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: updateUserBody,
                });
            }
        });      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const userExists = await User.findById(req.params.id);
        if(userExists) {
          const deleteTask =await User.findByIdAndDelete(req.params.id);
          if(deleteTask){
              res.status(200).json({
                  success: true,
                  message: 'User deleted successfully',
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
                message: 'User record not found',
            })
        }
     } catch (error) {
         console.log(error);
         res.status(500).json({
             success: false,
             message: 'Internal server error',
         })
     }
}