import React from 'react'
import { shallow } from 'enzyme'

import Header from '../components/generic/Dialog/Header';
import Footer from '../components/generic/Dialog/Footer';
import Sidebar from '../components/generic/Dialog/Sidebar';
import Body from '../components/generic/Dialog/Body';
import { findByTestAttr } from '../utils/test/testUtils';



describe('Header', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Header />));


    // it('renders the props to text', () => {
    //     wrapper.setProps({ headerText: 'test' });
    //     const component = findByTestAttr(wrapper, 'headerText');
    //     expect(component.text()).toEqual('test');
    // })

    // it('renders the subheader to text', () => {
    //     wrapper.setProps({ subHeaderText: 'test2' });
    //     const component = findByTestAttr(wrapper, 'subHeaderText');
    //     expect(component.text()).toEqual('test2');
    // })
});

describe('Footer', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Footer />));
    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => expect(wrapper.find('div').length).toEqual(1));

    it('close and submit button renders', () => {
        expect(wrapper.find('Button').length).toEqual(3);
    })
})

describe('Sidebar', () => {

    const setup = ({ subHeaderText, sidebarHeader, enabled }) => {
        return shallow(<Sidebar
            subHeaderText={subHeaderText}
            sidebarHeader={sidebarHeader}
            enabled={enabled}
        />)
    }

    test('is should render null', () => {
        const wrapper = setup({});
        expect(wrapper.type()).toEqual(null)
    })

    test('renders the sidebar Header to text', () => {
        const wrapper = setup({ enabled: true, sidebarHeader: 'test' });
        expect(wrapper.text()).toEqual('test');
    })


    test('renders the sidebar subjeader to text', () => {
        const wrapper = setup({ enabled: true, subHeaderText: 'test2' });
        expect(wrapper.text()).toEqual('test2');
    })


})

describe('Body', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Body />));

    it('it should render a <div />', () => expect(wrapper.find('div').length).toEqual(1));

    it('renders the sidebar children to text', () => {

        wrapper.setProps({ children: 'test2' });
        const component = findByTestAttr(wrapper, 'body');
        expect(component.text()).toEqual('test2');
    })

})

