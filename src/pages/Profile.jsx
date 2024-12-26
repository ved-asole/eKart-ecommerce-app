import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import fetchData, { postData, updateData } from '../util/DataFetcher.js';
import { showToast } from '../util/appUtil.js';

const Profile = () => {

  const [cookies,] = useCookies();
  const [customerId, setCustomerId] = useState(cookies['customerId']);
  const [user, setUser] = useState({});
  const { register, handleSubmit, reset, formState, getValues } = useForm({});
  const { errors, isSubmitting } = formState;
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (cookies['customerId'] != undefined) {
      setCustomerId(Number(cookies['customerId']));
      fetchData(
        `customers/${customerId}`,
        (data) => {
          setUser(data)
          reset({
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email
          });
        },
        (errorMsg) => console.log(errorMsg)
      );
    }
  }, [customerId])

  const onSubmit = (data) => {
    delete data.password;
    updateData(
      `customers/${user.customerId}`,
      data,
      (data) => {
        setUser(data);
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email
        });
        showToast("Profile updated successfully");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  const resetPassword = () => {
    let email = getValues('email');
    setIsResetting(true);
    postData(
      'auth/generate-reset-token',
      { email: email },
      () => {
        setIsResetting(false);
        showToast("Reset Password link sent to your email")
      },
      (error) => {
        setIsResetting(false);
        console.error(error)
        showToast("Error sending reset password link")
      }
    )
  }

  return (
    <div className="container bg-secondary-subtle p-md-5">
      <div className="row d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-md-4 text-start p-5 pb-3 align-self-stretch border-end">
          <h1>Update Profile</h1>
          <h5 className='text-secondary'>Enter user details</h5>
        </div>
        <div className="col-md-8 py-2 px-5">
          <form id='userForm'
            onSubmit={handleSubmit(onSubmit, (data) => {
              console.log(data)
            })}
          >
            <div className="row">
              <div className="form-floating col-md-6 mt-4">
                <input type="text" className={'form-control' + (errors.firstName ? ' is-invalid' : '')} id="firstName" placeholder="First Name" required
                  defaultValue={user.firstName}
                  {...register("firstName", {
                    required: "First name should not be empty",
                    minLength: {
                      value: 3,
                      message: "First name should be at least 3 characters long"
                    },
                    maxLength: {
                      value: 20,
                      message: "First name should be at most 20 characters long"
                    }
                  })}
                />
                <label className='ms-2' htmlFor="firstName">First Name</label>
                <div className="form-text text-start">Should be between 3 to 20 characters</div>
                {errors.firstName && <div className="text-danger form-text text-start mt-1">{errors.firstName.message}</div>}
              </div>
              <div className="form-floating col-md-6 mt-4">
                <input type="text" className={'form-control' + (errors.lastName ? ' is-invalid' : '')} id="lastName" placeholder="Last Name" required
                  defaultValue={user.lastName}
                  {...register("lastName", {
                    required: "Last name should not be empty",
                    minLength: {
                      value: 3,
                      message: "Last name should be at least 3 characters long"
                    },
                    maxLength: {
                      value: 20,
                      message: "Last name should be at most 20 characters long"
                    }
                  })}
                />
                <label className='ms-2' htmlFor="lastName">Last Name</label>
                <div className="form-text text-start">Should be between 3 to 20 characters</div>
                {errors.lastName && <div className="text-danger form-text text-start mt-1">{errors.lastName.message}</div>}
              </div>
            </div>
            <div className="row">
              <div className="form-floating col-md-6 mt-4">
                <input type="number" className={"form-control" + (errors.phoneNumber ? ' is-invalid' : '')} id="phoneNumber" placeholder="Phone Number" required
                  defaultValue={user.phoneNumber}
                  {...register("phoneNumber", {
                    required: 'Phone Number should not be empty',
                    minLength: {
                      value: 10,
                      message: 'Phone Number length should be atleast of 10 characters'
                    },
                    maxLength: {
                      value: 15,
                      message: 'Phone Number length should be less than 15'
                    }
                  })}
                />
                {/* <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input type="number" id='phoneNumber' className="form-control" placeholder="Phone Number" aria-label="Username" aria-describedby="basic-addon1" />
                  </div> */}
                <label className='ms-2' htmlFor="phoneNumber">Phone Number</label>
                <div className="form-text text-start">Should be between 8 to 16 characters</div>
                {errors.phoneNumber && <div className="text-danger form-text text-start mt-1">{errors.phoneNumber.message}</div>}
              </div>
              <div className="form-floating col-md-6 mt-4">
                <input type="text" disabled className={"form-control" + (errors.password ? ' is-invalid' : '')} id="password" value="**********" required
                  defaultValue={user.password}
                  {...register("password", {
                    required: 'Password should not be empty',
                    minLength: {
                      value: 0,
                      message: 'Password should be non-negative'
                    },
                    disabled: true
                  })}
                />
                <label className='ms-2' htmlFor="password">Password</label>
                {errors.password && <div className="text-danger form-text text-start mt-1">{errors.password.message}</div>}
              </div>
            </div>
            <div className="form-floating mt-3">
              <input type="text" className={'form-control' + (errors.email ? ' is-invalid' : '')} id="email" placeholder="Email" required
                defaultValue={user.email}
                {...register("email",
                  {
                    required: "Email should not be empty"
                  },
                )}
              />
              <label htmlFor="email">Email</label>
              <div className="form-text text-start">Should be between 3 to 60 characters</div>
              {errors.email && <div className="text-danger form-text text-start mt-1">{errors.email.message}</div>}
            </div>
            <button className="btn btn-light py-2 mt-5 mb-4 mb-md-0" type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}
              {isSubmitting ? <output className='ms-1'>Updating profile...</output> : "Update Profile"}
            </button>
            <button className="btn btn-light py-2 ms-3 mt-5 mb-4 mb-md-0"
              type='button'
              disabled={isResetting}
              onClick={resetPassword}>
              {isResetting ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}
              {isResetting ? <output className='ms-1'>Sending email...</output> : "Reset Password"}
            </button>
          </form>
        </div>
      </div >
    </div >
  )
}

export default Profile
