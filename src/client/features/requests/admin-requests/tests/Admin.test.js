import React from 'react';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import toastr from 'toastr';

import { Admin, mapStateToProps } from '../Admin';

describe('Tests the login component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<Admin
      isAdmin
    />);
    expect(wrapper.find(Switch)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(2);
  });
});

describe('directly invoking the componentDidMount method from component instance', () => {
  it('should route to the dashboard if not admin', () => {
    const wrapper = shallow(<Admin
      isAdmin={false}
    />);
    const instance = wrapper.instance();
    toastr.error = jest.fn();
    instance.componentDidMount();
    expect(toastr.error).toHaveBeenCalled();
  });
});

describe('Testing mapStateToProps', () => {
  it('should correctly map state  ', () => {
    const mockState = {
      auth: {
        isAdmin: true,
      },
    };

    const newState = mapStateToProps(mockState);

    expect(newState.isAdmin).toEqual(true);
  });
});
