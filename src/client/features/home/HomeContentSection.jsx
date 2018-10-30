import React from 'react';
import { Link } from 'react-router-dom';
import smartphone from '../../img/smartphones.jpg';
import laptopRepair from '../../img/laptop-repair.jpeg';

export const InnerLayoutLeft = () => (
  <div className="technical_layout_left">
    <div className="pipe_left">
      <div className="pipe_column">
        <h2>
          <span>10,000</span>+
        </h2>
        <p>
          Distinct devices
          <br />
          serviced by VeraTech annually
        </p>
        <p>&nbsp;</p>
      </div>
      <div className="pipe_column">
        <h2>
          N<span>50,000</span>
        </h2>
        <p>
          Average cost we save our customers
          <br /> in new device costs per year
        </p>
      </div>
      <div className="clear" />
    </div>
    <div className="video_home_column">
      <p>Smartphones and Tablets</p>
      <div className="video_widget_outerpart video_preview">
        <div className="video_widgetpart ">
          {' '}
          <img src={smartphone} alt="Smartphones" />
          <div className="video_backline_part" />
        </div>
      </div>
      <div className="more_case_study wow fadeInLeft">
        {' '}
        <Link to="/signup" className="link_yellow">
          GET STARTED
        </Link>
      </div>
    </div>
    <div className="pipe_left">
      <div className="pipe_column">
        <h2>50</h2>
        <p>Satisfied customers daily</p>
      </div>
      <div className="clear" />
    </div>
  </div>
);
export const InnerLayoutRight = () => (
  <div className="technical_layout_right">
    <div className="post_blog_sample wow fadeInRight">
      <div className="post_blog_image">
        {' '}
        <img src={laptopRepair} alt="" width="270" height="224" />
      </div>
      <div className="post_blog_detail">
        <h3>Get the juice back for your Mac and Windows PC</h3>
        <p>Laptops and PC</p>{' '}
        <Link to="/signup" className="link_yellow">
          GET STARTED
        </Link>
      </div>
      <div className="clear" />
    </div>
    <div className="pipe_right">
      <div className="pipe_column">
        <h2>
          <span>20</span>+
        </h2>
        <p>Brands of computers we service</p>
      </div>
      <div className="pipe_column">
        <h2>78</h2>
        <p>Engineers on ground to attend to you</p>
      </div>
      <div className="clear" />
    </div>
  </div>
);
export const FirstSection = () => (
  <div className="content_section_1 section_viewer" data-section="deliver">
    <div className="container">
      <div className="layout_content wow fadeInUp" data-wow-offset="150">
        <h1>10M+ users trust VeraTech to care for their devices</h1>
        <span className="banner_big_title_2">QUALITY</span>
        <p>
          Nothing beats the feeling of knowing that your device is in safe
          hands. VeraTech provides the confidence to be careless. We got your
          back! Whatever the fault, we are here to make it disappear!
        </p>
      </div>
    </div>
    <div className="container">
      <div className="inner_layout">
        {InnerLayoutLeft()}
        {InnerLayoutRight()}
        <div className="clear" />
      </div>
    </div>
    <div className="section_1_bg" />
    <div className="how_section_bg" />
    <div className="section_point home_first_section">
      <span />
    </div>
  </div>
);
export const SecondSection = () => (
  <div className="content_section_2 section_viewer" data-section="skills">
    <div className="container">
      <div className="layout_content wow fadeInUp" data-wow-offset="150">
        <h1>Complex Faults, simple fixes</h1>
        <span className="banner_big_title_3">TRUSTWORTHY</span>
        <p>
          Our approach to repairs is rooted in a deep understanding of the
          devices. Nothing is too complex to be fixed. The world’s toughest
          problems are solved with sustained incremental small fixes.
        </p>
      </div>
    </div>
    <div className="section_point home_second_section">
      <span />
    </div>
  </div>
);
export const ThirdSection = () => (
  <div className="content_section_4 section_viewer" data-section="online">
    <div className="container">
      <div className="layout_content wow fadeInUp" data-wow-offset="150">
        <h1>Software == Hardware</h1>
        <p>
          We are proficient in all round care for your devices. From
          software faults to physical hardware faults, we got you covered.
          Whatever the issue, no need to panic. Trust us to know what your
          device wants.
        </p>
      </div>
    </div>
    <div className="clear" />
    <div className="offline_top_bg" />
  </div>
);
export const FourthSection = () => (
  <div className="home_timeline_section">
    <div className="container">
      <div className="timeline_section_row">
        <div className="timeline_block odd_timeline">
          <div className="wow fadeInLeft">
            <h1>A data-driven approach to repairs</h1>
            <p>
              When we receive a device, we run a complete system
              diagnostics. We ensure we have all the data necessary to get
              an accurate diagnostics of the fault.
            </p>
          </div>
        </div>
        <div className="clear" />
        <div className="timeline_block even_timeline">
          <div className="wow fadeInRight">
            <h1>Precise, Methodical, and Scientific</h1>
            <p>
              Using a suite of state of the art software and hardware tools,
              we methodically identify the precise issue and with scientific
              precision go about fixing it.
            </p>
          </div>
        </div>
        <div className="clear" />
        <div className="timeline_block odd_timeline">
          <div className="wow fadeInLeft">
            <h1>World-class Service, competitive Price</h1>
            <p>
              We’re consistently striving to give our customers the best
              quality service possible while maintaining a price regime that
              leave our customers grinning every time.
            </p>
          </div>
        </div>
        <div className="clear" />
        <div className="timeline_buttons_section">
          <div className="timeline_buttons timeline_button_left">
            <div className="wow fadeInLeft">
              {' '}
              <Link to="/signup" className="buttons button_default">
                CREATE A NEW ACCOUNT
              </Link>
            </div>
          </div>
          <div className="timeline_buttons timeline_button_right">
            <div className="wow fadeInRight">
              {' '}
              <Link to="/login" className="buttons button_blank">
                LOGIN TO YOUR ACCOUNT
              </Link>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
    <div className="timeline_section_bg" />
    <div className="footer_top_bg" />
  </div>
);

const HomeContentSection = () => (
  <div>
    <React.Fragment>
      {FirstSection()}
      {SecondSection()}
      {ThirdSection()}
      {FourthSection()}
    </React.Fragment>
  </div>
);

export default HomeContentSection;
