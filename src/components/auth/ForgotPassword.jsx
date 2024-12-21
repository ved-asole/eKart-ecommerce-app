import React, { lazy, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../../util/DataFetcher.js';
import { appendAlert } from '../../util/appUtil.js';
const FormScreen = lazy(() => import('../common/FormScreen.jsx'));

const ForgotPassword = () => {

  const { register, handleSubmit, formState, getValues, reset } = useForm({ mode: 'onChange' });
  const { errors, isSubmitted, isSubmitting, isSubmitSuccessful, isValid } = formState;
  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false);

  const formSubmitHandler = async () => {
    let email = getValues('email');
    postData(
      'auth/generate-reset-token',
      { email: email },
      () => {
        setEmailSentSuccessfully(true);
        appendAlert(
          'liveAlertPlaceholder',
          'Password reset email sent successfully',
          'success',
          false
        )
      },
      () => {
        reset();
        setEmailSentSuccessfully(false);
        appendAlert(
          'liveAlertPlaceholder',
          'Unable to send email!',
          'danger',
          false
        )
      }
    );
  };

  return (
    <FormScreen mode="Forgot Password" desc="Proceed to reset your password">
      <form id='forgotPasswordForm'>
        <div className="form-floating mt-3">
          <input type="email" className={errors.email ? "form-control is-invalid" : "form-control"} id="email" placeholder="name@example.com" autoComplete='email' required
            {...register("email", {
              required: 'Email is required',
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
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit"
          onClick={handleSubmit(formSubmitHandler)}
          disabled={errors && isValid && isSubmitSuccessful && (isSubmitting || isSubmitted || isSubmitSuccessful)}
        >
          {
            errors && isValid && (isSubmitting || isSubmitted || isSubmitSuccessful) ?
              <p className='text-center mb-0'>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <output className='ms-1'>Sending Email...</output>
              </p>
              : "Send Email"
          }
        </button>
        <div id="liveAlertPlaceholder" className='mt-3'>
        </div>
      </form>
    </FormScreen>
  );
};

export default ForgotPassword;