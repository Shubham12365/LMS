import Course from '../models/Course.model.js'; // Ensure to include the file extension if using ES modules

export const GetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const CreateCourse = async (req, res) => {

  const {course_name , description , trainer_name, start_date, end_date, employees_assigned } =
		req.body;
  
	try {
		const newCourse = new Course({
			course_name , description , trainer_name, start_date, end_date, employees_assigned
		});

		const savedCourse = await newCourse.save();
		console.log("saved", savedCourse);
		res.status(201).json(savedCourse);
	} catch (err) {
		console.error("Error creating course:", err);
		res.status(400).json({ message: err.message, details: err.errors });
	}


};

// Additional methods: updateCourse, deleteCourse, etc.
