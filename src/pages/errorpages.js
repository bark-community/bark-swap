import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ height: '100vh' }} className='bg-dark text-white d-flex align-items-center justify-content-center p-5'>
      <div className='text-center'>
        <h2 className='display-1 landText'>404!</h2>
        <p className='landText fs-1'>Page Not Found!</p>
      </div>
    </div>
  );
}

export default ErrorPage;
