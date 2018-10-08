import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

export const Dashboard = ({ isLoggedIn, user }) => (
  /* eslint-disable react/no-unescaped-entities */
  <section className="body_gradient home">
    <div className="dashboard_top">
      <div className="container">
        {isLoggedIn
          ? (
            <h1 className="home_welcome">
              Welcome back <strong>{user.firstName} {user.lastName}</strong>
            </h1>
          ) : false
        }
      </div>
    </div>
    <div className="content_section_1 section_viewer" data-section="deliver">
      <div className="container">
        <div className="layout_content wow fadeInUp" data-wow-offset="150">
          <h1>What do you want to do today?</h1>
          <span className="banner_big_title_2">DASHBOARD</span>
        </div>
      </div>
      <div className="section_1_bg" />
      <div className="how_section_bg" />
    </div>
    <div className="home_timeline_section">
      <div className="container">
        <div className="timeline_section_row">
          <div className="timeline_buttons timeline_button_left">
            <div className="wow fadeInLeft">
              {' '}
              <Link
                to="/requests/create"
                className="buttons button_default"
              >
                CREATE A NEW REQUEST
              </Link>
            </div>
          </div>
          <div className="timeline_buttons timeline_button_right">
            <div className="wow fadeInRight">
              {' '}
              <Link
                to="/requests"
                className="buttons button_blank"
              >
                VIEW ALL REQUESTS
              </Link>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
      <div className="timeline_section_bg" />
      <div className="footer_top_bg" />
    </div>
  </section>
);
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  user: state.auth.user,
});

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Dashboard);
