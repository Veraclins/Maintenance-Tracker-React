import React from 'react';
import spinner from '../../img/spinner.svg';

const Spinner = () => (
  <React.Fragment>
    <nav className="loader">
      <img src={spinner} alt="loading........" />
    </nav>
  </React.Fragment>
);

export default Spinner;
