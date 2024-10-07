import React from 'react'

function Dashboard() {
  return (
		<div className="w-full h-full ">
			<div className="m-4 flex justify-between">
				<div className="font-semibold text-3xl">Dashboard</div>
				<div>
					<input
						type="search"
						id="default-search"
						className="mr-2 w-64 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
						placeholder="Search for Employee"
						required
					/>
					<button className=" h-10 w-44 ml-1 bg-blue-600 text-white rounded-2xl">
						+Add Employee
					</button>
				</div>
			</div>
			<div className="mt-8 mr-8 h-full max-h-full rounded-3xl bg-blue-100">
				<div className="m-4 p-2 pt-8 flex justify-between rounded-3xl h-2/6">
					<div className="border-2 bg-white border-gray-200 rounded-3xl w-1/3 ">
						Total Employees
					</div>
					<div className="ml-6 border-2 bg-white border-gray-200 rounded-3xl w-1/3 ">
						Total Courses
					</div>
					<div className="ml-6 border-2 bg-white border-gray-200 rounded-3xl w-1/3 ">
						Total Trainers
					</div>
				</div>
				<div className="flex h-3/6 w-full">
					<div className="m-5 mt-1 border-2 border-gray-200 bg-white rounded-3xl  w-4/6 h-full">
						Employee List
					</div>
					<div className="m-5 mt-1 border-2 border-gray-200 bg-white rounded-3xl w-2/6 h-full">
						Employee View
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard
