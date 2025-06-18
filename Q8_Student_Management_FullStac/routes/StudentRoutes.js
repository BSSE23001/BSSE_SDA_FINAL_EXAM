const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');

// CRUD Routes
router.post('/', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/count', StudentController.getStudentCount);        // ADDED
router.get('/stats', StudentController.getStudentStats);       // ADDED
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
