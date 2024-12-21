import React, { lazy, useEffect, useState } from 'react'
import fetchData, { deleteData } from '../../../util/DataFetcher.js'
import { showToast } from '../../../util/appUtil.js'
import AppLoader from '../../common/AppLoader.jsx'
const AddUserModel = lazy(() => import('./AddUserModel.jsx'))
const UpdateUserModel = lazy(() => import('./UpdateUserModel.jsx'))
const Pagination = lazy(() => import('../../products/Pagination.jsx'))

const Users = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ customerId: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(10);
  const size = 10;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage])

  const fetchUsers = () => {
    setLoading(true);
    let pageNum = currentPage > 0 ? currentPage - 1 : currentPage;
    fetchData(
      `customers/page?page=${pageNum}&size=${size}`,
      (data) => {
        setUsers(data.content);
        setTotalElements(data.totalElements);
        setLoading(false);
      },
      (errorMsg) => { console.log(errorMsg) }
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
        {loading ? <AppLoader status={loading} /> :
          <div className="users">
            <div className="d-flex justify-content-between mb-3">
              <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
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
                    users?.map((customer, index) => (
                      <tr key={customer.customerId}>
                        <td className="w-10">{10 * (currentPage > 0 ? currentPage - 1 : currentPage) + index + 1}</td>
                        <td className="w-25">{customer.firstName + " " + customer.lastName}</td>
                        <td className="w-25 text-start">{customer.email}</td>
                        <td className="w-25">{customer.phoneNumber}</td>
                        <td className="text-start">{customer.role}</td>
                        <td className="w-25">
                          <div className='d-flex flex-column flex-lg-row justify-content-evenly justify-content-lg-center align-items-center'>
                            <button className="btn btn-outline-secondary me-lg-2 mb-2 mb-lg-0"
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
          </div>
        }
      </section>

      <div id="pagination">
        <Pagination
          currentPage={currentPage == 0 ? 1 : currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={size}
          totalItems={totalElements}
        />
      </div>

      {/* <!-- Add Customer Modal --> */}
      <AddUserModel fetchUsersFn={fetchUsers} />

      {/* <!-- Update Customer Modal --> */}
      <UpdateUserModel userId={user.customerId} fetchUsersFn={fetchUsers} />

    </div>
  )
}

export default Users
