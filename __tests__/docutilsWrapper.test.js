import { getComponent } from '../src/docutilsWrapper';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

test('document render no children', () => {
    const Document = getComponent('Document');
    const tree = renderer.create(<Document/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('DocumentLinks render no children', () => {
    const DocumentLinks = getComponent('DocumentLinks');
    const tree = renderer.create(<DocumentLinks/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('DocumentLinks with children render', () => {
    const DocumentLinks = getComponent('DocumentLinks');
    const DocumentLink = getComponent('DocumentLink');
    const tree = renderer.create(<DocumentLinks children={[<DocumentLink key="1" xlinkTitle="link1" xlinkHref="link1"/>]}/>);
    expect(tree).toMatchSnapshot();
});

test('RelLinks with child', () => {
    const RelLinks = getComponent('RelLinks');
    const DocumentLink = getComponent('DocumentLink');
    expect(renderer.create(<RelLinks children={<DocumentLink xlinkTitle="link1" xlinkHref="link1"/>}/>).toJSON()).toMatchSnapshot();
});
