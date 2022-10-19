import React from 'react';
import spinner from './spinner4.gif';

const Spinner = () => {
  return (
    <div className="col-md-12">
      <img 
        src={spinner}
        alt="Loading..."
        style={{ width: '120px', margin: '50px auto', display: 'block'}}
      />
    </div>
  );
}

export default Spinner
