import React from 'react';
import { mount } from 'enzyme';
import { Demo, IProps, ICheckedState } from '../containers/main/index';
import { IInitialState } from '../reducers/demoReducers';

describe('main component', () => {

  const mockProps: IProps<IInitialState> = {
    demoState: {
      checkboxes: [null, null, null, null],
      showPreloader: false,
      error: false,
      value: {},
      commentValue: '',
      request: false,
    },
    toggleCheckbox: jest.fn(),
    showPreloaderAction: jest.fn(),
    errorAction: jest.fn(),
    emailFieldValue: jest.fn(),
    commentFieldValue: jest.fn(),
    sendRequest: jest.fn(),
  };

  it(('component is mount with 4 checkboxes'), () => {
    const wrapper = mount(<Demo {...mockProps} />);

    expect(wrapper.find('[data-component="switch"]')).toHaveLength(4);
  });

  it(('checkbox is checked'), () => {
    const { toggleCheckbox } = mockProps;
    const wrapper = mount(<Demo {...mockProps} />);

    expect(wrapper.find('.switch_input').at(0).simulate('change'));
    expect(toggleCheckbox).toBeCalledWith(['selfie', null, null, null]);
  });

  it(('get-started button is anable'), () => {
    const { sendRequest } = mockProps;
    const wrapper = mount(<Demo {...mockProps} />);

    expect(wrapper.find('.switch_input').at(1).simulate('change'));
    expect(wrapper.find('[data-id="start-btn"]').at(0).props()['disabled']).toBe(false);
  });

  it(('email field is render and call action on change'), () => {
    const { emailFieldValue } = mockProps;

    const wrapper = mount(<Demo {...mockProps} />);

    expect(wrapper.find('.switch_input').at(1).simulate('change'));

    expect(wrapper.find('[data-id="email-btn"]').at(1).simulate('click'));
    wrapper.find('.input_field').at(0).simulate('change', { target: { value: 'test@i.ua' } });
    expect(emailFieldValue).toBeCalledWith({ email: 'test@i.ua' });
    expect(wrapper.find('[data-id="start-btn"]').at(0).props()['disabled']).toBe(false);
  });

  it(('comment field is render and call action on change'), () => {
    const { commentFieldValue } = mockProps;

    const wrapper = mount(<Demo {...mockProps} />);

    expect(wrapper.find('[data-id="email-btn"]').at(1).simulate('click'));
    wrapper.find('.input_field').at(1).simulate('change', { target: { value: 'some comment' } });
    expect(commentFieldValue).toBeCalledWith('some comment');
  });

  it(('invalid email'), () => {
    const wrapper = mount(<Demo {...mockProps} />);

    expect(wrapper.find('[data-id="email-btn"]').at(1).simulate('click'));
    wrapper.find('.input_field').at(1).simulate('change', { target: { value: 'somestring' } });
    expect(wrapper.find('[data-id="start-btn"]').at(0).props()['disabled']).toBe(true);
  });

  it(('preloader is shown'), () => {
    const wrapper = mount(<Demo {...mockProps} />);

    wrapper.setProps({
      emailValid: true,
      demoState:
      {
        ...mockProps.demoState,
        showPreloader: true,
        error: false,
      },
    });

    expect(wrapper.find('[data-id="preloader"]').exists());
    expect(wrapper.find('[data-id="start-btn"]').at(0).props()['disabled']).toBe(true);
  });

  it(('error is shown'), () => {
    const wrapper = mount(<Demo {...mockProps} />);

    wrapper.setProps({
      emailValid: true,
      demoState:
      {
        ...mockProps.demoState,
        error: true,
      },
    });

    expect(wrapper.find('[data-id="error"]').exists());
    expect(wrapper.find('[data-id="start-btn"]').at(0).props()['disabled']).toBe(false);
  });
});
