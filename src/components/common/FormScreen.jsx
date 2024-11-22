import React from 'react'
import PropTypes from 'prop-types'

const FormScreen = ({ mode, desc, children }) => {
  return (
    <div className="container bg-secondary-subtle p-2 p-md-5">
      <div className="row d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-md-6 text-start p-5 pb-3 align-self-stretch border-end">
          <h1>{mode}</h1>
          <h5 className='text-secondary'>
            {desc}
          </h5>
        </div>
        <div className="col-md-6 gap-2 py-0 pb-5 py-md-5 px-5">
          {children}
        </div>
      </div>
    </div>
  )
}

FormScreen.propTypes = {
  mode: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.node
}

export default FormScreen
