const Student = require('../models/Student');

// Create new Student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Students
exports.getAllStudents = async (req, res) => {
  try {
    const Students = await Student.find();
    res.json(Students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Student count
exports.getStudentCount = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Student statistics
exports.getStudentStats = async (req, res) => {
  try {
    // Example: Group by status (change 'status' to your actual attribute)
    const stats = await Student.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    // Format for Chart.js
    const result = {
      labels: stats.map(item => item._id || 'Unknown'),
      values: stats.map(item => item.count)
    };
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
