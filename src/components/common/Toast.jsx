import React from 'react'


const Toast = () => {

  return (
    <div>
      <div id='toast-container' className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toast-alert" className="toast" role="alert" data-bs-delay='2000' aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              Hello, world! This is a toast message.
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Toast