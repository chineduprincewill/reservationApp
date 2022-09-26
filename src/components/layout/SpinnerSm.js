import React from 'react';
import spinner from './spinner4.gif';

export default () => {
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
