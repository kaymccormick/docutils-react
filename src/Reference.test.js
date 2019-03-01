import Reference from './Reference';
import Docutils from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';


it('renders without crashing', () => {
    const div = document.createElement('div');
    const x = React.createElement(Reference, {});
    ReactDOM.render(x, div);
});

it('lala', () => {
    const div = document.createElement('div');
    const x = React.createElement(Reference, {refUri: 'test1'});
    const wrapper = shallow(x);
    expect(wrapper.props().href).toBe('test1');
});
it('lala', () => {
    const div = document.createElement('div');
    const x = React.createElement(Reference, {});
    const wrapper = shallow(x);
    expect(wrapper.props().href).toBe(undefined);
});

it('lala', () => {
    const div = document.createElement('div');
    const ref = React.createRef();
    const x = React.createElement(Reference, {ref});
    const wrapper = shallow(x);
    console.dir("current is " + ref.current);
    expect(wrapper.props().href).toBe(undefined);
});

