import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuthentication, processLogout, processSignIn, processSignUp, removeUserData } from '../util/auth.js';
import { showToast } from '../util/appUtil.js';

const AuthForm = () => {

  let [searchParams] = useSearchParams();
  let mode = searchParams.get("mode");
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors, isSubmitted, isSubmitting, isSubmitSuccessful, isValid } = formState;
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const dispatch = useDispatch();

  const formSubmitHandler = (data) => {
    removeUserData(removeCookie);
    if (mode == 'signup') processSignUp(data, setCookie, navigate, reset);
    else if (mode == 'login') processSignIn(data, setCookie, navigate, reset, dispatch);
    else showToast('Invalid request')
  };

  useEffect(() => {
    if (!mode) navigate('/auth?mode=login');
    if (mode == 'logout') processLogout(removeCookie, navigate, dispatch);
    if (cookies.customerId != undefined && localStorage.getItem('token'))
      checkAuthentication(removeCookie, navigate);
    isSubmitSuccessful && console.log("Form Submitted Successfully");
  }, [isSubmitting, isSubmitSuccessful])


  return (
    <div className="container bg-secondary-subtle p-2 p-md-5">
      <div className="row d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-md-6 text-start p-5 pb-3 align-self-stretch border-end">
          <h1>{mode == 'signup' ? 'Sign Up' : 'Login'}</h1>
          <h5 className='text-secondary'>
            {
              mode == 'signup' ?
                'Join us today and unlock exclusive deals, personalized recommendations, and more!'
                : 'Get access to your Orders, Wishlist and Recommendations'
            }
          </h5>
        </div>
        <div className="col-md-6 gap-2 py-0 pb-5 py-md-5 px-5">
          <form id='authForm'>
            <div className="signupFields" hidden={mode != 'signup'} >
              <div className="form-floating">
                <input type="text" className={errors.firstName ? "form-control is-invalid" : "form-control"} id="firstName" placeholder="ABC" autoComplete='name' required
                  {...register("firstName", {
                    required: mode == 'signup',
                    minLength: {
                      value: 3,
                      message: "Should have atleast 3 characters"
                    },
                    maxLength: {
                      value: 20,
                      message: "Should not be more than 20 characters"
                    }
                  })}
                />
                <label htmlFor="firstName">First name</label>
                <div className="form-text text-start" hidden={errors.firstName}>Should be between 3 to 20 characters</div>
                {errors.firstName && <div className="invalid-feedback text-start">{errors.firstName.message}</div>}
              </div>
              <div className="form-floating mt-3">
                <input type="text" className={errors.lastName ? "form-control is-invalid" : "form-control"} id="lastName" placeholder="XYZ" autoComplete='family-name' required
                  {...register("lastName", {
                    required: mode == 'signup',
                    minLength: {
                      value: 3,
                      message: "Should have atleast 3 characters"
                    },
                    maxLength: {
                      value: 20,
                      message: "Should not be more than 20 characters"
                    }
                  })}
                />
                <label htmlFor="lastName">Last name</label>
                <div className="form-text text-start" hidden={errors.lastName}>Should be between 3 to 20 characters</div>
                {errors.lastName && <div className="invalid-feedback text-start">{errors.lastName.message}</div>}
              </div>
              <div className="form-floating mt-3">
                <input type="number" className={errors.phoneNumber ? "form-control is-invalid" : "form-control"} id="phoneNumber" placeholder="1234567" autoComplete='tel' required
                  {...register("phoneNumber", {
                    required: mode == 'signup',
                    minLength: {
                      value: 10,
                      message: "Should have atleast 10 digits"
                    }
                  })}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
                <div className="form-text text-start" hidden={errors.phoneNumber}>Should be atleast 20 characters</div>
                {errors.phoneNumber && <div className="invalid-feedback text-start">{errors.phoneNumber.message}</div>}
              </div>
            </div>
            <div className="form-floating mt-3">
              <input type="email" className={errors.email ? "form-control is-invalid" : "form-control"} id="email" placeholder="name@example.com" autoComplete='email' required
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address"
                  }
                })}
              />
              <label htmlFor="email">Email address</label>
              <div className="form-text text-start" hidden={errors.email}>Should be a valid email</div>
              {errors.email && <div className="invalid-feedback text-start">{errors.email.message}</div>}
            </div>
            <div className="form-floating mt-3">
              <input type="password" className={errors.password ? "form-control is-invalid" : "form-control"} id="password" placeholder="Password" autoComplete='current-password' required
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Should have atleast 8 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "Should not be more than 20 characters"
                  }
                })}
              />
              <label htmlFor="password">Password</label>
              <div className="form-text text-start" hidden={errors.password}>Should be between 8 to 20 characters</div>
              {errors.password && <div className="invalid-feedback text-start">{errors.password.message}</div>}
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-md-between form-check text-start my-3 mb-4 my-md-3">
              <div className='me-5 me-md-0'>
                <input className="form-check-input" type="checkbox" value="remember-me" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className='mt-2 mt-md-0 link-secondary link-offset-2'>Forgot Password? Click here</Link>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit"
              onClick={handleSubmit(formSubmitHandler)}
              disabled={errors && isValid && isSubmitSuccessful && (isSubmitting || isSubmitted || isSubmitSuccessful)}
            >
              {
                errors && isValid && (isSubmitting || isSubmitted || isSubmitSuccessful) ?
                  <p className='text-center mb-0'>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <output className='ms-1'>Signing in...</output>
                  </p>
                  : mode == 'signup' ? "Sign up" : "Sign in"
              }
            </button>
            <Link to={mode == 'signup' ? '?mode=login' : '?mode=signup'} className="btn btn-dark w-100 py-2 mt-2">{mode != 'signup' ? "Sign up" : "Sign in"}</Link>
          </form>
        </div>
      </div>
    </div >
  )
}

export default AuthForm