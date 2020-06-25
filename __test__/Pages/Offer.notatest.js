import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { findByTestAttr } from '../../utils/test/testUtils';

import OfferPage from '../../pages/buyer/Offer/[Offer]/index';
import Amount from '../../components/buyers/offerWizard/Amount';


// describe('OfferPage', () => {
//     let wrapper;
//     beforeEach(() => wrapper = shallow(<OfferPage />))

//     test('should render without throwing an error', function () {
//         const wrapper = shallow(<OfferPage />)
//         const component = findByTestAttr(wrapper, 'offer-wizard');
//         //expect(component.length).toEqual(1);
//     })

//     // test('should render Header, Sidebar, Footer, and Body components', () => {
//     //     expect(wrapper.containsAllMatchingElements([<Header />, <Body />, <Sidebar />, <Footer />])).toEqual(true);
//     // })
// })

//TODO TEST FORMIK

// describe('Form', () => {

//     let wrapper;
//     beforeEach(() => wrapper = shallow(<OfferPage />))

//     test('should update an input when it is changed', () => {
//         const component = wrapper.find('[data-test="form"]').dive().find('Amount').dive().find('input');
//         console.log(component.debug());
//         component.simulate('change', {
//             // you must add this next line as (Formik calls e.persist() internally)
//             persist: () => { },
//             // simulate changing e.target.name and e.target.value
//             target: {
//                 name: 'name',
//                 value: 'ian',
//             },
//         });

//         // const newValue = wrapper.find('[data-test="form"]').dive().find('Amount').dive().find('input').props().value;

//         // expect(newValue).toEqual('ian');
//     });
// })

