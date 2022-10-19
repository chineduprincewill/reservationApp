import React from 'react';
import spinner from './spinner4.gif';

const SpinnerSm = () => {
  return (
    <div className="col-md-12">
      <img 
        src={spinner}
        alt="Loading..."
        style={{ width: '80px', margin: '10px auto', display: 'block'}}
      />
    </div>
  );
}

export default SpinnerSm
