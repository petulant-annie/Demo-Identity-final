import React from 'react';
import { mount } from 'enzyme';
import Verification from '../containers/verification-block/verification';

describe('Test checkboxes', () => {
  it('Swich on check', () => {
    const event = jest.fn();

    const wrapper = mount(
      <Verification handler={event} />,
    );

    wrapper.find('input').at(0).simulate('change');

    expect(event).toBeCalledWith(0, 'selfie', jasmine.anything(), jasmine.anything());
  });
});
