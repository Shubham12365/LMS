import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Employee Card Component to display each employee's metrics
const EmployeeCard = ({ employee, metrics }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{employee.name}</h3>
            <p className="text-gray-600">Quiz Score: {metrics ? metrics.quiz_score : 'N/A'}</p>
            <p className="text-gray-600">Discipline: {metrics ? metrics.behavioral_metrics.discipline : 'N/A'}</p>
            <p className="text-gray-600">Punctuality: {metrics ? metrics.behavioral_metrics.punctuality : 'N/A'}</p>
            <p className="text-gray-600">Teamwork: {metrics ? metrics.behavioral_metrics.teamwork : 'N/A'}</p>
            <p className="text-gray-600">Communication: {metrics ? metrics.behavioral_metrics.communication : 'N/A'}</p>
            <p className="text-gray-600">Problem Solving: {metrics ? metrics.behavioral_metrics.problem_solving : 'N/A'}</p>
        </div>
    );
};

// Modal for entering performance metrics
const MetricsModal = ({ isOpen, onClose, onSubmit, employees }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-1/2">
                    <h2 className="text-xl font-bold mb-4">Enter Performance Metrics</h2>
                    <form onSubmit={handleSubmit}>
                        {employees.map((employee) => (
                            <div key={employee._id} className="mb-4">
                                <h3 className="font-semibold">{employee.name}</h3>
                                <input 
                                    type="number" 
                                    name={`quiz_score_${employee._id}`} 
                                    placeholder="Quiz Score" 
                                    onChange={handleChange} 
                                    className="border rounded p-2 w-full mb-2" 
                                    min="0" 
                                    max="100"
                                    required
                                />
                                <input 
                                    type="number" 
                                    name={`discipline_${employee._id}`} 
                                    placeholder="Discipline (0-10)" 
                                    onChange={handleChange} 
                                    className="border rounded p-2 w-full mb-2" 
                                    min="0" 
                                    max="10"
                                    required
                                />
                                <input 
                                    type="number" 
                                    name={`punctuality_${employee._id}`} 
                                    placeholder="Punctuality (0-10)" 
                                    onChange={handleChange} 
                                    className="border rounded p-2 w-full mb-2" 
                                    min="0" 
                                    max="10"
                                    required
                                />
                                <input 
                                    type="number" 
                                    name={`teamwork_${employee._id}`} 
                                    placeholder="Teamwork (0-10)" 
                                    onChange={handleChange} 
                                    className="border rounded p-2 w-full mb-2" 
                                    min="0" 
                                    max="10"
                                    required
                                />
                                <input 
                                    type="number" 
                                    name={`communication_${employee._id}`} 
                                    placeholder="Communication (0-10)" 
                                    onChange={handleChange} 
                                    className="border rounded p-2 w-full mb-2" 
                                    min="0" 
                                    max="10"
                                    required
                                />
                                <input 
                                    type="number" 
                                    name={`problem_solving_${employee._id}`} 
                                    placeholder="Problem Solving (0-10)" 
                                    onChange={handleChange} 
                                    className="border rounded p-2 w-full mb-2" 
                                    min="0" 
                                    max="10"
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">Submit</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 text-black rounded py-2 px-4 ml-2">Close</button>
                    </form>
                </div>
            </div>
        )
    );
};

// Main component to display the list of courses
const PerformanceMetrics = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [employeeMetrics, setEmployeeMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [employees, setEmployees] = useState([]); // Store the associated employees for the selected course

    // Fetch courses data
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/CourseRoutes'); // Replace with your actual API endpoint
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Fetch employee metrics and associated employees for a specific course
    const fetchEmployeeMetrics = async (courseId) => {
        setSelectedCourseId(courseId);
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/PerformanceMetricRoutes/${courseId}`); // Replace with your actual API endpoint
            const employeeResponse = await axios.get(`http://localhost:4000/api/v1/EmployeeRoutes/course/${courseId}`); // Replace with your actual API endpoint to get employees
            setEmployeeMetrics(response.data);
            setEmployees(employeeResponse.data);
            setModalOpen(true); // Open the modal when fetching employee metrics
        } catch (error) {
            console.error("Error fetching employee metrics:", error);
        }
    };

    // Handle submitting metrics form
    const handleMetricsSubmit = async (data) => {
        const metricsData = employees.map((employee) => ({
            employee_id: employee._id,
            course_id: selectedCourseId,
            quiz_score: data[`quiz_score_${employee._id}`],
            behavioral_metrics: {
                discipline: data[`discipline_${employee._id}`],
                punctuality: data[`punctuality_${employee._id}`],
                teamwork: data[`teamwork_${employee._id}`],
                communication: data[`communication_${employee._id}`],
                problem_solving: data[`problem_solving_${employee._id}`],
            },
        }));

        try {
            await axios.post('http://localhost:4000/api/v1/PerformanceMetricRoutes', metricsData); // Replace with your actual API endpoint
            setModalOpen(false);
            alert("Performance metrics submitted successfully!");
        } catch (error) {
            console.error("Error submitting performance metrics:", error);
            alert("Failed to submit performance metrics.");
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-8">Performance Metrics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div 
                        key={course._id} 
                        className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        onClick={() => fetchEmployeeMetrics(course._id)} // Fetch metrics when clicked
                    >
                        <h2 className="text-xl font-semibold">{course.course_name}</h2>
                        <p className="text-gray-600">{course.description}</p>
                    </div>
                ))}
            </div>

            <MetricsModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSubmit={handleMetricsSubmit} 
                employees={employees}
            />
        </div>
    );
};

export default PerformanceMetrics;
