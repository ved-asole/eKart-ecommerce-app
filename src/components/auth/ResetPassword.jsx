import React, { lazy, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postData } from '../../util/DataFetcher.js';
import { showToast } from '../../util/appUtil.js';
const RouteLoadError = lazy(() => import('../../pages/RouteLoadError.jsx'));
const FormScreen = lazy(() => import('../common/FormScreen.jsx'));

const ResetPassword = () => {

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let token = searchParams.get('token');
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const { register, handleSubmit, formState, reset, getValues } = useForm({ mode: 'onChange' });
  const { errors, isSubmitted, isSubmitting, isSubmitSuccessful, isValid } = formState;

  useEffect(() => {
    reset();
    postData(
      'auth/validate-reset-token',
      { token: token },
      () => setIsTokenInvalid(false),
      () => {
        setIsTokenInvalid(true);
        showToast('Invalid or expired token, please try again!');
      }
    )
  }, [token]);


  const formSubmitHandler = async () => {
    const newPassword = getValues('password');
    postData(
      'auth/reset-password',
      { token, newPassword },
      () => {
        navigate('/auth');
        showToast('Password reset successfully!')
      },
      (errorMsg) => {
        if (errorMsg == 'Invalid or expired token') {
          setIsTokenInvalid(true);
          showToast('Invalid or expired token, please try again!');
          return;
        }
        showToast('Password reset failed!')
      }
    );
  };

  if (!token || isTokenInvalid) {
    return <RouteLoadError message='Invalid link, please try again!' />
  } else return (
    <FormScreen mode="Reset Password" desc="Change your Password">
      <form id='resetPasswordForm'>
        <div className="form-floating mt-3">
          <input type="password"
            className={errors.password ? "form-control is-invalid" : "form-control"}
            id="password" placeholder="Password" autoComplete='current-password'
            defaultValue={''} required
            {...register("password", {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: "Should have atleast 8 characters"
              },
              maxLength: {
                value: 20,
                message: "Should not be more than 20 characters"
              },
              // deps: ['confirmPassword']
            })}
          />
          <label htmlFor="password">Password</label>
          <div className="form-text text-start" hidden={errors.password}>Should be between 8 to 20 characters</div>
          {errors.password && <div className="invalid-feedback text-start">{errors.password.message}</div>}
        </div>
        <div className="form-floating mt-3">
          <input type="password" id="confirmPassword" placeholder="Confirm Password" autoComplete='current-password' required
            className={errors.confirmPassword ? "form-control is-invalid" : "form-control"} defaultValue={''}
            {...register("confirmPassword", {
              required: 'Confirm Password is required',
              minLength: {
                value: 8,
                message: "Should have atleast 8 characters"
              },
              maxLength: {
                value: 20,
                message: "Should not be more than 20 characters"
              },
              // deps: ['password'],
              validate: (value) => value === getValues('password') || 'Passwords do not match!'
            })}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="form-text text-start" hidden={errors.confirmPassword}>Should be between 8 to 20 characters</div>
          {errors.confirmPassword && <div className="invalid-feedback text-start">{errors.confirmPassword.message}</div>}
        </div>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit"
          onClick={handleSubmit(formSubmitHandler)}
          disabled={errors && isValid && isSubmitSuccessful && (isSubmitting || isSubmitted || isSubmitSuccessful)}
        >
          {/* {
            errors && isValid && (isSubmitting || isSubmitted || isSubmitSuccessful) ?
              <p className='text-center mb-0'>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <output className='ms-1'>Signing in...</output>
              </p>
              : "Reset Password"
          } */}
          Reset Password
        </button>
      </form>
    </FormScreen>
  );
};

export default ResetPassword;