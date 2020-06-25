import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { findByTestAttr } from '../../utils/test/testUtils';

import Disclaimer from '../../components/buyers/offerWizard/Disclaimer';

test('render with no errors', () => {
    const component = findByTestAttr(shallow(<Disclaimer />), 'step-disclaimer');
    expect(component.length).toEqual(1);
})

test('render header', () => {
    const component = findByTestAttr(shallow(<Disclaimer />), 'step-disclaimer-header');
    expect(component.length).toEqual(1);
})

test('render subHeader', () => {
    const component = findByTestAttr(shallow(<Disclaimer />), 'step-disclaimer-sub-header');
    expect(component.length).toEqual(1);
})