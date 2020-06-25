import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { findByTestAttr } from '../../utils/test/testUtils';

import Amount from '../../components/buyers/offerWizard/Amount';

const setup = () => {
    const wrapper = shallow(<Amount
        errors=''
        touched={false}
        handleChange={jest.fn()}
        values='Test'
        handleBlur='asdlj'
        sending={true}
    />);
    return wrapper;
}

describe('Component', () => {
    test('render with no errors', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'step-amount');
        expect(component.length).toEqual(1);
    })

    test('renders header', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'step-amount-header');
        expect(component.length).toBe(1);
    })
})

describe('Form Field', () => {
    test('render input', () => {
        const wrapper = setup();
        const component = findByTestAttr(wrapper, 'step-amount-field');
        expect(component.length).toBe(1);
    })
})




