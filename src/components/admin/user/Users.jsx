import React, { lazy, useEffect, useState } from 'react'
import fetchData, { deleteData } from '../../../util/DataFetcher.js'
import { showToast } from '../../../util/appUtil.js'
const AddUserModel = lazy(() => import('./AddUserModel.jsx'))
const UpdateUserModel = lazy(() => import('./UpdateUserModel.jsx'))

const Users = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ customerId: 0 });

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () => {
    fetchData(
      'customers',
      (data) => {
        setUsers(data);
      },
      (errorMsg) => { console.log(errorMsg) },
      "customers"
    );
  }

  const deleteUser = (customerId) => {
    deleteData(
      `customers/${customerId}`,
      () => {
        fetchUsers();
        showToast("User deleted successfully");
      },
      (errorMsg) => {
        showToast("Unable to delete user");
        console.log(errorMsg)
      }
    );
  }

  return (
    <div>
      <section id="user-section" className="mt-5">
        <h3>Users</h3>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="align-middle">
              <tr>
                <th className="w-10">ID</th>
                <th className="w-25">Name</th>
                <th className="w-25">Email</th>
                <th className="w-25">Phone Number</th>
                <th>Role</th>
                <th className="w-25">Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle'>
              {
                users?.map(customer => (
                  <tr key={customer.customerId}>
                    <td className="w-10">{customer.customerId}</td>
                    <td className="w-25">{customer.firstName + " " + customer.lastName}</td>
                    <td className="w-25 text-start">{customer.email}</td>
                    <td className="w-25">{customer.phoneNumber}</td>
                    <td className="text-start">{customer.role}</td>
                    {/* <td>{category?.parentCategory?.categoryId}</td> */}
                    <td className="w-25">
                      <div className='d-block'>
                        <button className="btn btn-outline-secondary me-0 me-xxl-2 mb-2 mb-xxl-0"
                          data-bs-toggle="modal" data-bs-target="#updateUserModal"
                          onClick={() => setUser(customer)}
                        >Edit</button>
                        <button className="btn btn-outline-danger"
                          onClick={() => deleteUser(customer.customerId)}
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>

      {/* <!-- Add Customer Modal --> */}
      <AddUserModel fetchUsersFn={fetchUsers} />

      {/* <!-- Update Customer Modal --> */}
      <UpdateUserModel userId={user.customerId} fetchUsersFn={fetchUsers} />

    </div>
  )
}

export default Users
