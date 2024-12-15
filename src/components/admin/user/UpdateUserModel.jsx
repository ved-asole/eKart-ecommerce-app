import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import fetchData, { updateData } from '../../../util/DataFetcher.js';
import { showToast } from '../../../util/appUtil.js';

const UpdateUserModel = ({ userId, fetchUsersFn }) => {

  const { register, handleSubmit, reset, formState, setValue } = useForm({});
  const { errors, isSubmitting, isSubmitted } = formState;
  const [user, setUser] = useState({});

  useEffect(() => {
    if (userId !== 0 && userId !== user.customerId) {
      reset({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        joiningDate: '',
        userRole: ''
      });
      fetchData(
        "customers".concat(`/${userId}`),
        (data) => {
          setValue('userRole', data.role);
          setUser(data);
          reset({
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            joiningDate: data.createdAt.split(' ')[0],
            userRole: data.role
          });
        },
        (errorMsg) => console.log(errorMsg)
      );
    }
  }, [userId, user])

  const onSubmit = (data) => {
    data.customerId = user.userId;
    delete data.joiningDate;
    data.role = data.userRole;
    delete data.userRole;
    updateData(
      "customers".concat(`/${userId}`),
      data,
      (data) => {
        setUser(data);
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          joiningDate: data.createdAt.split(' ')[0],
          userRole: data.role
        }, {
          errors: false,
          // isSubmitting: false,
          // isSubmitted: true,
          // isSubmitSuccessful: true
        });
        showToast("User updated successfully");
        fetchUsersFn();
      },
      (error) => {
        showToast("Unable to update user");
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          joiningDate: data.joiningDate,
          userRole: data.role
        }, {
          errors: false,
          isSubmitting: false,
          isSubmitted: false
        });
        console.log(error);
      }
    )
  }

  return (
    <div className="modal fade" id="updateUserModal" tabIndex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateUserModalLabel">Update User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-start">
            <form id='updateUserForm'>
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName"
                    defaultValue={user.firstName} disabled required
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 3,
                        message: "First name should be at least 3 characters long"
                      },
                      maxLength: {
                        value: 20,
                        message: "First name should be at most 50 characters long"
                      }
                    })}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName"
                    defaultValue={user.lastName} disabled required
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 3,
                        message: "Last name should be at least 3 characters long"
                      },
                      maxLength: {
                        value: 20,
                        message: "Last name should be at most 50 characters long"
                      }
                    })}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phoneNumber"
                    defaultValue={user.phoneNumber} disabled required
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number should be at least 10 digits long"
                      },
                      maxLength: {
                        value: 14,
                        message: "Phone number should be at max 14 digits long"
                      }
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-5">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail"
                    defaultValue={user.email} disabled required
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label htmlFor="joiningDate" className="form-label">Joining Date</label>
                  <input type="text" className="form-control" id="joiningDate"
                    defaultValue={user?.createdAt?.split(' ')[0]} disabled required
                    {...register("joiningDate", {
                      required: "Joining date is required",
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: "Invalid date format"
                      }
                    })}
                  />
                </div>
                <div className="mb-3 col-md-3">
                  <label htmlFor="userRole" className="form-label">Role</label>
                  <select className={"form-control form-select" + (errors.categoryId ? ' is-invalid' : '')}
                    id="userRole" required
                    {...register("userRole", {
                      required: 'User role should be selected'
                    })}>
                    <option key="USER" value="USER">User</option>
                    <option key="ADMIN" value="ADMIN">Admin</option>
                  </select>
                  {errors.userRole && <div className="text-danger form-text text-start mt-1">{'User Role should be selected'}</div>}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-light py-2 mt-3 mb-1" type="submit"
                  disabled={isSubmitting || isSubmitted}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting || isSubmitted ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}
                  {isSubmitting || isSubmitted ? <output className='ms-1'>Updating user...</output> : "Update User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
UpdateUserModel.propTypes = {
  userId: PropTypes.number.isRequired,
  fetchUsersFn: PropTypes.func.isRequired
};

export default UpdateUserModel