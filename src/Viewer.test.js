import renderer from 'react-test-renderer';
import React from 'react';
import ReactDOM from 'react-dom';
import Viewer from './Viewer';
import { mount } from 'enzyme';
import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);
import path from 'path';

const getDocumentXmlFromFile = (docqual) => {
    return readFile(path.join('public/xml', docqual + '.xml')).then(data => {
	return { data };
    });
};


test('renders without crashing', done => {
//    jest.setTimeout(10000);
    const div = document.createElement('div');
    const onComplete = () => {
	ReactDOM.unmountComponentAtNode(div);
	done();
    };
    ReactDOM.render(<Viewer getDocumentXml={getDocumentXmlFromFile} onComplete={onComplete} />, div);
    

});

test('mounts without crashing', done => {
//    jest.setTimeout(90000);
    const onComplete = () => {
	done();
    };
    
    const wrapper = mount(<Viewer getDocumentXml={getDocumentXmlFromFile} onComplete={onComplete} />);   

});

it('mounts without crashing', done => {
  //  jest.setTimeout(10000);
    let comp;
    const onComplete = () => {
	expect(comp.toJSON()).toMatchSnapshot();
	done();
    };

    comp = renderer.create(<Viewer getDocumentXml={getDocumentXmlFromFile} onComplete={onComplete} />);
});

test('navigates to intro', () => {
    console.log('navigates to intro');
    const wrapper = mount(<Viewer/>);
    const app = wrapper.instance();
    return app.navigateToDocument('intro').catch(err => {
	console.log(err);
    });
});

test.skip('navigates to anchor', done => {
    console.log('navigates to anchor');
    const onComplete = (e) => {
	console.log('document changed to: ' + e.docName);
	if(e.docName !== 'index') {
	    console.log('calling done callback');
	    done();
	}
    };

    const wrapper = mount(<Viewer getDocumentXml={getDocumentXmlFromFile} onComplete={onComplete}/>);
    const app = wrapper.instance();
/*    app.navigateToDocument('index').then(r => {	
	const ref = undefined;//findReference(app.state.document, child => child.ref.current.href.indexOf('intro') !== -1);
	if(!ref) {
	    throw new Error('no reference found');
	}
	const anchor = ref.ref.current;
	console.log('href is ' + anchor.href);
	ReactTestUtils.Simulate.click(anchor, { currentTarget: anchor });
    }).catch(err => {
	console.dir(err);
	console.log('error: ' + err);
    });
*/
});
