import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

function Sidebar({ onSelectComponent }) {
	return (
		<div className="w-80 h-screen text-black p-4">
			<h1 className="text-3xl font-bold mb-4">LMS</h1>
			<div className="text-xl justify-center mt-9 flex flex-col space-y-3">
				<li
					className="list-none hover:text-gray-300 hover:bg-blue-500 hover:rounded-2xl cursor-pointer flex items-center space-x-2 p-2"
					onClick={() => onSelectComponent("Dashboard")}
				>
					<MdDashboard />
					<span>Dashboard</span>
				</li>

				<li
					className="list-none hover:text-gray-300 hover:bg-blue-500 hover:rounded-2xl cursor-pointer flex items-center space-x-2 p-2"
					onClick={() => onSelectComponent("Employees")}
				>
					<FaRegUser />
					<span>Employees</span>
				</li>

				<li
					className="list-none hover:text-gray-300 hover:bg-blue-500 hover:rounded-2xl cursor-pointer flex items-center space-x-2 p-2"
					onClick={() => onSelectComponent("Trainers")}
				>
					<PiUsersThree />
					<span>Trainers</span>
				</li>

				<li
					className="list-none hover:text-gray-300 hover:bg-blue-500 hover:rounded-2xl cursor-pointer flex items-center space-x-2 p-2"
					onClick={() => onSelectComponent("Courses")}
				>
					<FaBookReader />
					<span>Courses</span>
				</li>
			</div>
			<button
				className="mt-80 h-10 w-44 ml-1 text-xl bg-blue-200 rounded-md hover:text-gray-300 cursor-pointer flex items-center justify-center space-x-2 p-2 "
				onClick={() => onSelectComponent("Logout")}
			>
				<span>LogOut</span>
				<IoIosLogOut />
			</button>
		</div>
	);
}

export default Sidebar;
