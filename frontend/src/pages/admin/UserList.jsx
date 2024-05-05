import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from 'react-toastify'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../redux/api/userApiSlice"
import { useEffect, useState } from "react"
import Message from '../../components/Message'
import AdminMenu from "./AdminMenu"




const UserList = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery()
	const [deleteUser] = useDeleteUserMutation()
	const [updateUser] = useUpdateUserMutation()
	const [editableUserId, setEditableUserId] = useState(null)
	const [editableUserName, setEditableUserName] = useState('')
	const [editableUserEmail, setEditableUserEmail] = useState('')
	const [editAdmin, setEditAdmin] = useState('')
	const [chk, setChk] = useState('')
	useEffect(() => {
		refetch()
	}, [refetch, users])

	const deleteHandler = async (user) => {
		if (window.confirm(`Are you sure to delete a ${user.username} ?`)) {
			try {
				await deleteUser(user._id)
			} catch (error) {
				toast.error(error.data.message || error.message || error.error)
			}
		}
		refetch()
	}

	const toggleEdit = async (user) => {
		setEditableUserId(user._id)
		setEditableUserName(user.username)
		setEditableUserEmail(user.email)
		setEditAdmin(user.isadmin)
	}


	const updateHandler = async (id) => {
		try {
			await updateUser({
				userId: id,
				username: editableUserName,
				email: editableUserEmail,
				isadmin: editAdmin,
			})
			setEditableUserId(null)
			refetch()
		} catch (error) {
			toast.error(error.data.message || error.error)
		}

	}
	return (
		<div className="p-4">
			{isLoading ? (<Loader />) : error ? (<Message varient={'danger'}>
				{error?.data.message || error.message}
			</Message>) : (
				<div className="flex flex-col text-slate-gray">
					<AdminMenu />
					<h1 className="w-full mb-8 text-4xl font-semibold text-center">Users</h1>

					<table className="w-full mx-auto md:w-4/5">
						<thead>
							<tr>
								<th className="px-4 py-2 text-left ">ID</th>
								<th className="px-4 py-2 text-left ">NAME</th>
								<th className="px-4 py-2 text-left ">EMAIL</th>
								<th className="px-4 py-2 text-left ">ADMIN</th>
								<th className="px-4 py-2 text-left ">DELETE</th>

							</tr>
						</thead>
						<tbody>
							{users.map((user) => {

								return (
									<tr key={user._id}>
										<td className="px-4 py-2 " > {user._id}</td>
										<td className="px-4 py-2">
											{editableUserId === user._id ? (
												<div className="flex items-center">
													<input type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} className="w-full p-2 text-white border rounded-lg" />
													<button onClick={() => updateHandler(user._id)} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"><FaCheck /></button>
												</div>
											) : (
												<div className="flex items-center">
													{user.username} {" "}
													<button onClick={() => toggleEdit(user)}>
														<FaEdit className="text-blue-400 ml-[1rem]" />
													</button>
												</div>
											)}
										</td>
										<td className="px-4 py-2">
											{editableUserId === user._id ? (
												<div className="flex items-center">
													<input type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} className="w-full p-2 text-white border rounded-lg" />
													<button onClick={() => updateHandler(user._id)} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"><FaCheck /></button>
												</div>
											) : (
												<div className="flex items-center">
													<p>{user.email} </p>
													<button onClick={() => toggleEdit(user)}>
														<FaEdit className="text-blue-400 ml-[1rem]" />
													</button>
												</div>
											)}
										</td>
										<td className="px-4 py-2">
											{editableUserId === user._id ? (
												<div className="flex items-center">
													<input

														type="checkbox" checked={editAdmin} onChange={
															e => {
																setEditAdmin(e.target.checked)
																setChk(e.target.value)
															}

														} className={`${chk ? 'bg-green-500 text-green-500' : 'bg-red-500 text-red-500'} p-2  bg-red-500 border rounded-lg `} />

													<button onClick={() => updateHandler(user._id)} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"><FaCheck /></button>
												</div>
											) : (
												<div className="flex items-center">
													<p>{user.isadmin ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />} </p>
													<button onClick={() => toggleEdit(user)}>
														<FaEdit className="text-blue-400 ml-[1rem]" />
													</button>
												</div>
											)}
										</td>
										<td className="px-4 py-2 ">
											{!user.isadmin &&
												(
													<div className="flex ">
														<button className="p-2 ml-2 font-bold bg-red-500 rounded-md hover:bg-red-600" onClick={() => deleteHandler(user)}><FaTrash className="text-white" /></button>
													</div>
												)
											}
										</td>


									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			)}

		</div>
	)
}

export default UserList