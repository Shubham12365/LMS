import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CourseCard = ({ course, onClick }) => {
	return (
		<div
			className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
			onClick={() => onClick(course)}
		>
			<div className="bg-gradient-to-r from-purple-400 to-pink-500 h-40 flex justify-center items-center">
				<img
					src=""
					alt={course.course_name}
					className="h-16 w-16 rounded-full"
				/>
			</div>
			<div className="p-4">
				<h2 className="text-lg font-semibold mt-2">{course.course_name}</h2>
				<p className="text-gray-600 text-sm mt-1">{course.description}</p>
				<span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
					{course.trainer_name}
				</span>
				<div className="flex justify-between mt-3 text-gray-500 text-sm">
					<span>📅 {new Date(course.start_date).toLocaleDateString()}</span>
					<span>📅 {new Date(course.end_date).toLocaleDateString()}</span>
				</div>
				<div className="flex items-center mt-3">
					<span className="text-gray-700 text-sm">
						Assigned Employees: {course.employees_assigned.map(employee => employee.name).join(", ")}
					</span>
				</div>
			</div>
		</div>
	);
};

const CourseGrid = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCourse, setSelectedCourse] = useState(null);

	// Fetch the courses from the backend
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get("http://localhost:4000/api/v1/CourseRoutes");
				const courses = response.data;

				const updatedCourses = await Promise.all(
					courses.map(async (course) => {
						try {
							const trainerResponse = await axios.get(`http://localhost:4000/api/v1/TrainerRoutes/${course.trainer_name}`);

							const employeesWithDetails = await Promise.all(
								course.employees_assigned.map(async (employeeId) => {
									try {
										const employeeResponse = await axios.get(`http://localhost:4000/api/v1/EmployeeRoutes/${employeeId}`);
										return { id: employeeId, name: employeeResponse.data.name };
									} catch (error) {
										return { id: employeeId, name: "Unknown Employee" };
									}
								})
							);

							return {
								...course,
								trainer_name: trainerResponse.data.name,
								employees_assigned: employeesWithDetails,
							};
						} catch (error) {
							return course;
						}
					})
				);

				setCourses(updatedCourses);
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	if (loading) {
		return <div className="text-center mt-10">Loading...</div>;
	}

	if (courses.length === 0) {
		return <div className="text-center mt-10">No courses available</div>;
	}

	if (selectedCourse) {
		return (
			<EmployeeListCard
				course={selectedCourse}
				onBack={() => setSelectedCourse(null)}
			/>
		);
	}

	return (
		<div className="min-h-screen ">
			<div className="m-4 flex justify-between">
				<div className="font-semibold text-3xl">My Courses</div>
				<div>
					<input
						type="search"
						id="default-search"
						className="mr-2 w-64 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
						placeholder="Search for Employee"
						required
					/>
					<button className=" h-10 w-44 ml-1 bg-blue-600 text-white rounded-2xl">
						+ Add Course
					</button>
				</div>
			</div>
			<div className='mt-8 mr-8 h-full  '>

				<div className="bg-blue-100 rounded-3xl p-4 w-full border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{courses.map((course, index) => (
						<CourseCard key={index} course={course} onClick={setSelectedCourse} />
					))}
				</div>
			</div>
		</div>

	);
};

const EmployeeCard = ({ employee, courseId }) => {
	const [formData, setFormData] = useState({
		quiz_score: "",
		behavioral_metrics: {
			discipline: "",
			punctuality: "",
			teamwork: "",
			communication: "",
			problem_solving: "",
		},
		comments: "",
	});
	const [submitted, setSubmitted] = useState(false);


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name in formData.behavioral_metrics) {
			setFormData({
				...formData,
				behavioral_metrics: {
					...formData.behavioral_metrics,
					[name]: value,
				},
			});
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const dataToSend = {
				employee_id: employee.id,
				course_id: courseId,
				quiz_score: formData.quiz_score,
				behavioral_metrics: formData.behavioral_metrics,
				comments: formData.comments,
			};

			await axios.post(
				"http://localhost:4000/api/v1/PerformanceMetricRoutes",
				dataToSend
			);
			setSubmitted(true);
		} catch (error) {
			console.error("Error submitting performance metrics:", error);
		}
	};


	const checkPrevEntry = async () => {
		try {
			// Prepare the query parameters
			const params = {
				employee_id: employee.id,
				course_id: courseId,
			};

			// Send GET request with query parameters
			const response = await axios.get(
				"http://localhost:4000/api/v1/PerformanceMetricRoutes",
				{ params }
			);

			// Log the response data
			// console.log("Response Data:", response.data);

			// Check if the backend response is 'Found'
			if (response.data.message === "Found") {
				setSubmitted(true); // Set submission to true if found
			} else {
				setSubmitted(false); // Set submission to false if not found
			}
		} catch (err) {
			console.error("Error checking performance metrics:", err);
		}
	};

	useEffect(() => {
		checkPrevEntry();
	}, [employee.id, courseId]);

	useEffect(() => {
		// Trigger the check whenever employee ID or course ID changes
		checkPrevEntry();
	}, [employee.id, courseId]);

	return (
		<div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
			<h3 className="text-lg font-semibold text-center text-purple-600">{employee.name}</h3>


			{!submitted ? (
				<form onSubmit={handleSubmit} className="mt-4">
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Quiz Score (0-10)
						</label>
						<input
							type="number"
							name="quiz_score"
							value={formData.quiz_score}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border rounded"
							min="0"
							max="10"
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{["discipline", "punctuality", "teamwork", "communication", "problem_solving"].map((metric) => (
							<div key={metric} className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2">
									{metric.charAt(0).toUpperCase() + metric.slice(1)} (0-5)
								</label>
								<input
									type="number"
									name={metric}
									value={formData.behavioral_metrics[metric]}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border rounded"
									min="0"
									max="5"
									required
								/>
							</div>
						))}
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Comments (Optional)
						</label>
						<textarea
							name="comments"
							value={formData.comments}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border rounded"
						></textarea>
					</div>

					<button
						type="submit"
						className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 w-full"
					>
						Submit Metrics
					</button>
				</form>
			) : (
				<div className="text-green-500 font-semibold mt-4 text-center">
					Metrics submitted successfully!
				</div>
			)}
		</div>
	);
};


const EmployeeListCard = ({ course, onBack }) => {
	return (
		<div className="container mx-auto mt-10">
			<h2 className="text-3xl font-bold text-center mb-4 text-purple-600">
				{course.course_name}
			</h2>
			<p className="text-gray-800 text-center mb-6 text-lg font-semibold">
				Assigned Trainer: {course.trainer_name}
			</p>

			<div className="bg-blue-100 rounded-3xl p-4 w-full border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{course.employees_assigned.map((employee, index) => (
					<EmployeeCard key={index} employee={employee} courseId={course._id} />
				))}
			</div>

			<div className="text-center mt-6">
				<button
					onClick={onBack}
					className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
				>
					Back to Courses
				</button>
			</div>
		</div>
	);
};


export default CourseGrid;
