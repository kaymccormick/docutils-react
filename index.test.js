import * as docutils from './index';
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

test('section', () => {
    const props = { docutils, 'className': 'my-class' };
    const elem = React.createElement(docutils.components.Section, props, 'My section');
    const w = shallow(elem);
    expect(w.props().className).toBe('my-class');
    console.dir(w.html());
});

test('Title', () => {
    const props = { docutils, 'className': 'my-class' };
    const elem = React.createElement(docutils.components.Title, props, 'My title');
    const w = shallow(elem);
    expect(w.props().className).toBe('my-class doc-title');
    console.dir(w.html());
});

test('Reference', () => {
    const click = (e) => { };
    const props = { docutils, 'className': 'my-class',
		    refUri: 'test' };
    const elem = React.createElement(docutils.components.Reference, props, 'My title');
    expect(elem).toBeTruthy();
    const w = shallow(elem);

    // this is super weird because we cant discover the resulting classnames ...
    expect(w.props().className).toBe('my-class reference');
    console.dir(w.html());
});

test('bullet_list results in UL element', () => {
    const wrapper = shallow(React.createElement(docutils.components.BulletList, {}));
    expect(wrapper.find('ul')).toHaveLength(1);
});
test('ordered_list results in OL element', () => {
    const wrapper = shallow(React.createElement(docutils.components.EnumeratedList, {}));
    expect(wrapper.find('ol')).toHaveLength(1);
});
test('literal_block results in properly styled element', () => {
    const LiteralBlock = docutils.components.LiteralBlock;
    const tree = renderer.create(React.createElement(LiteralBlock, {})).toJSON();
    expect(tree).toMatchSnapshot();
//    const wrapper = mount(React.createElement(docutils.components.LiteralBlock, {}));
//    expect(wrapper.toJSON())
//    expect(wrapper.hostNodes().find('div')).toHaveLength(1);
});
    
test('document with paragraph', () => {
    const Document = docutils.components.Document;
    const Paragraph = docutils.components.Paragraph;
    expect(renderer.create(<Document _children={<Paragraph _children="test"/>}/>).toJSON()).toMatchSnapshot();
});
