import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { postData } from '../../../util/DataFetcher.js';
import { hideModel, showToast } from '../../../util/appUtil.js';

const AddUserModel = ({ fetchUsersFn }) => {

  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors, isSubmitting, isSubmitted } = formState;

  useEffect(() => {
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      userRole: 'USER'
    });
  }, [])

  const onSubmit = (data) => {
    delete data.joiningDate;
    data.role = data.userRole;
    delete data.userRole;
    data.password = window.crypto.getRandomValues(new Uint32Array(1)).toString();
    postData(
      'customers',
      data,
      (data) => {
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          userRole: data.role
        });
        showToast("User added successfully");
        fetchUsersFn();
        hideModel('addUserModal');
      },
      (error) => {
        showToast("Unable to add user");
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
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
    <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-start">
            <form id='addUserForm'>
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName" required
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
                  <input type="text" className="form-control" id="lastName" required
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
                  <input type="tel" className="form-control" id="phoneNumber" required
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
                <div className="mb-3 col-md-6">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail" required
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                <div className="mb-3 col-md-6">
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
                  {isSubmitting || isSubmitted ? <output className='ms-1'>Adding user...</output> : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

AddUserModel.propTypes = {
  fetchUsersFn: PropTypes.func.isRequired,
};

export default AddUserModel