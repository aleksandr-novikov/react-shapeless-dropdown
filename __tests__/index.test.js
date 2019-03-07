import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dropdown from '../src';

Enzyme.configure({adapter: new Adapter()});
const dummy = ({text}) => (<button className={text}>{text}</button>);

describe('Dropdown component', () => {
    test('Renders without props', () => {
        const wrapper = shallow(<Dropdown/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('Renders with text button and text content', () => {
        const wrapper = shallow(<Dropdown button={'Menu'}>Content</Dropdown>);
        expect(wrapper).toMatchSnapshot();
    });

    test('Renders with component button and component content', () => {
        const wrapper = shallow(<Dropdown
            button={dummy({text: 'Menu'})}>{dummy({text: 'Content'})}</Dropdown>);
        expect(wrapper).toMatchSnapshot();
    });

    test('Handles clicks on button and changes state. Fires callbacks', () => {
        const openCb = jest.fn();
        const closeCb = jest.fn();
        const wrapper = mount(<Dropdown onDropdownOpen={openCb}
                                        onDropdownClose={closeCb}
                                        button={dummy({text: 'Menu'})}/>);
        const button = wrapper.find('button');

        button.simulate('click');
        expect(wrapper.state('opened')).toBe(true);
        button.simulate('click');
        expect(wrapper.state('opened')).toBe(false);

        expect(openCb).toHaveBeenCalled();
        expect(closeCb).toHaveBeenCalled();

    });

    test('Closes dropdown on scroll and on action', () => {
        const wrapper = mount(<Dropdown closeOnScroll={true}
                                        closeOnAction={true}
                                        button={dummy({text: 'Menu'})}/>);

        wrapper.setState({opened: true});
        global.dispatchEvent(new Event('scroll'));
        expect(wrapper.state('opened')).toBe(false);

        wrapper.setState({opened: true});
        wrapper.find('div').findWhere(n => typeof n.prop('onKeyDown') === 'function')
            .at(1).simulate('keyDown', {key: 'Enter'});
        expect(wrapper.state('opened')).toBe(false);
    });

    test('Updates its bounds on resize', () => {
        const wrapper = mount(<Dropdown button={'Menu'}/>);
        const width = 500;

        wrapper.setState({
            dropdownBounds: {width}
        });
        global.dispatchEvent(new Event('resize'));
        expect(wrapper.state('dropdownBounds').width !== width);

    });

});
