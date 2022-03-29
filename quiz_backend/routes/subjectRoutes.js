const express = require('express');
const {
    createSubjectName, 
    getAllSubjectName, 
    deleteSubjectName
} = require('../controller/subjectController');

const router = express.Router();

router.route('/').post(createSubjectName).get(getAllSubjectName);
router.route('/:id').delete(deleteSubjectName);

module.exports = router;