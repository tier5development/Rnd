const express = require('express');
const {
    createSubject, 
    getAllSubject, 
    getSubjectById, 
    updateSubject, 
    deleteSubject
} = require('../controller/questionController');

const router = express.Router();

router.route('/').post(createSubject).get(getAllSubject);
router.route('/:id').get(getSubjectById).put(updateSubject).delete(deleteSubject);

module.exports = router;