import React from 'react';
import { mount } from 'enzyme';
import Slider from '../components/slider/slider';

describe('slider test', () => {
  it(('check number of paginations'), () => {
    const wrapper = mount(
      <Slider
        speed={3000}
        pause={true}
        pagination={true}
        animation={false}
      >
        <img />
        <img />
        <img />
      </Slider>,
    );

    expect(wrapper.find('img')).toHaveLength(3);
    expect(wrapper.find('[data-bar="controlBar"]').children()).toHaveLength(3);
  });

  it(('pagination on click'), () => {
    const wrapper = mount(
      <Slider
        speed={3000}
        pause={true}
        pagination={true}
        animation={false}
      >
        <div />
        <div />
        <div />
      </Slider>,
    );

    wrapper.find('[data-button="pagination"]').at(2).simulate('click');

    expect(wrapper.state('current')).toBe(2);
  });

  it(('slider autoplay'), () => {
    jest.useFakeTimers();

    const wrapper = mount(
      <Slider
        speed={3000}
        pause={false}
        pagination={true}
        animation={false}
      >
        <div />
        <div />
        <div />
      </Slider>,
    );

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });

  it(('slides change on click'), () => {
    const wrapper = mount(
      <Slider
        speed={3000}
        pause={true}
        pagination={true}
        animation={false}
      >
        <img />
        <img />
        <img />
      </Slider>,
    );

    wrapper.setState({ current: 2 });
    wrapper.find('[data-slider="slider"]').simulate('click');
    expect(wrapper.state('current')).toBe(2);
  });

  it(('one of slides are shown'), () => {
    const wrapper = mount(
      <Slider
        speed={3000}
        pause={true}
        pagination={true}
        animation={false}
      >
        <img />
        <img />
        <img />
      </Slider>,
    );

    expect(wrapper.find('img').some('.active')).toEqual(true);
    expect(wrapper.find('img').every('.active')).toEqual(false);
  });
});
