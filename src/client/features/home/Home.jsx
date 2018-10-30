import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import ContentSection from './HomeContentSection';
import HomeBannerSection from './HomeBannerSection';

export const Home = ({ isLoggedIn, isAdmin, user }) => (
  <section className="body_gradient home">
    <HomeBannerSection isLoggedIn={isLoggedIn} isAdmin={isAdmin} user={user} />
    {!isLoggedIn
      ? (
        <ContentSection />
      ) : false}
  </section>
);
export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  user: state.auth.user,
});

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Home);
