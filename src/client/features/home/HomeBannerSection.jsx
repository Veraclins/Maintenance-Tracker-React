import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const HomeBannerSection = ({ user, isLoggedIn, isAdmin }) => (
  <div className="content_banner">
    <div className="content_banner_inner">
      <div className="banner_top_bg" />
      <div className="banner_left_bg" />
      <div className="container">
        <div className="inner_layout wow fadeInUp">
          {isLoggedIn ? (
            <h1 className="home_welcome">
              Welcome back{' '}
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </h1>
          ) : (
            false
          )}
          <h1>
            <strong>This is VeraTech Solutions Hub.</strong>
          </h1>
          <h1>
            The Home of World Class Maintenance and Repairs for your{' '}
            <i>Modern Devices.</i>
          </h1>
          {!isLoggedIn ? (
            <h5>
              VeraTech Solutions Hub gives you the peace of mind you need. We
              care for your devices so you won{"'"}t lose sleep. Whatever the need
              of your device, we got you covered.
            </h5>
          ) : (
            false
          )}
          {isLoggedIn ? (
            <React.Fragment>
              <div className="buttons_banner">
                {' '}
                <Link to="/requests/create" className="buttons button_default">
                  CREATE A NEW REQUEST
                </Link>{' '}
                <Link to="/dashboard" className="buttons button_blank">
                  GO TO YOUR DASHBOARD
                </Link>
              </div>
              {isAdmin ? (
                <div className="buttons_banner">
                  {' '}
                  <Link to="/admin" className="buttons button_default">
                    GO TO ADMIN PAGE
                  </Link>
                </div>
              ) : (
                false
              )}
            </React.Fragment>
          ) : (
            <div className="buttons_banner">
              {' '}
              <Link to="/signup" className="buttons button_default">
                CREATE A NEW ACCOUNT
              </Link>{' '}
              <Link to="/login" className="buttons button_blank">
                LOGIN TO YOUR ACCOUNT
              </Link>
            </div>
          )}
        </div>
      </div>{' '}
      <span className="banner_big_title">RELIABILITY</span>
      <div
        className="vertical_anchor left_vertical wow fadeInLeft"
        data-wow-delay="0.4s"
      >
        {' '}
        <Link to="/signup">CREATE_A_NEW_ACCOUNT</Link>
      </div>
      <div
        className="vertical_anchor right_vertical wow fadeInRight"
        data-wow-delay="0.4s"
      >
        {' '}
        <Link to="/login">LOGIN_TO_YOUR_ACCOUNT</Link>
      </div>
    </div>
  </div>
);

HomeBannerSection.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default HomeBannerSection;
