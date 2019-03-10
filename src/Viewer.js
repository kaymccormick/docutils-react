/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import styled from '@emotion/styled';
import DocutilsXmlDocument from './DocutilsXmlDocument';
import {getComponent as wrappedGetComponent} from './docutilsWrapper';

const handleNewDocument = (app) => (o) => {
    console.log('handleNewDocument');
    return new Promise((resolve, reject) => {
        app.setState(o, () => { resolve(); });
    });
};

const resolveUriRef = function(curDocName, href) {
    const fragmentIndex = href.indexOf('#');
    let fragment;
    let docName;
    if(fragmentIndex !== -1) {
        fragment = href.substring(fragmentIndex + 1);
        docName = href.substring(0, fragmentIndex);
    } else {
        docName = href;
    }
    
    let slash = curDocName.lastIndexOf('/');
    if (slash !== -1) {
        curDocName = curDocName.substring(0, slash);
    } else {
        curDocName = "";
    }
    while(docName.startsWith('../')) {
        docName = docName.substring(3);
        const slash = curDocName.lastIndexOf('/');
        curDocName = curDocName.substring(0, slash);
    }
    if(docName) {
        docName = (curDocName ? curDocName + '/' : '') + docName;
    }
    return { fragmentId: fragment, docName };
}

const getXmlDocumentComponent = (xmlData, extraProps, config) => {
    if(!config) {
        config = {};
    }
    return getComponentForXml(xmlData, { ...config, extraProps });
};

function intervalFunc(me, context) {
//    console.log("here " + me.count);
    me.count++;
    const tags = context.tags.slice();
    const nodes = context.nodes.slice();
//    console.log(`${me.count}: ${tags.join(' > ')}`);
    let i = context.tags.length -1;
    let tag;
    let node;
    let lastComponent = undefined;
    while((node = nodes.pop()) && node.name) {
	// console.dir(siblings);
	const Component = getComponentForTagName(node.name);
	if(Component) {
	    let siblings = context.siblings[i].map(f => f());
	    if(lastComponent) {
		siblings.push(lastComponent);
	    }
	    // console.log(`length of context.attributes ${context.attributes.length}`);
	    // console.log(`i is ${i}`);
	    const a1 = node.attributes;
	    // console.dir(a1);
	    const att = attributesToProps(a1);
	    if(tag === "DocumentLink") {
		// console.dir(a1);
	    }
	    const c = <Component {...att} children={siblings}/>;
	    lastComponent = c;
	} else {
	    throw new Error("Invalid component");
	}
	i--;
    }
    const r = lastComponent;
    if(React.isValidElement(r)) {
//	console.log('setting state component to');
//	console.dir(r);
//	console.dir(renderToString(r));
	
	me.setState({component: r}, () => console.log('updated component at inteval'));
    }
    else {
//	me.setState({component: <div>Invalid component</div>});
    }
}

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.handleNewDocument = (handleNewDocument(this)).bind(this);
	this.referenceOnClick = this.referenceOnClick.bind(this);
	this.handleToctreeData = this.handleToctreeData.bind(this);
	if(props.getDocumentUrl) {
	    this.getDocumentUrl = props.getDocumentUrl;
	} else {
	    this.getDocumentUrl = this.getDocumentUrl.bind(this);
	}
        this.state = { docName: 'index', loading: true };
    }
    
    navigateToDocument(docName, fragmentId)
    {
        return this.handleNewDocument({docName, fragmentId});
    }

    referenceOnClick(o) {
	return ((e) => {
	    const getCurrentDocumentName = o.getCurDocName;
	    console.log("referenceOnClick");
	    if(e.target.tagName.toLowerCase() !== 'a') {
		return;
	    }
	    e.preventDefault();
	    const href = e.target.getAttribute('href');
	    console.log(`in referenceOnClick, href is ${href}`);
	    if (! href ) {
		e.preventDefault();
		console.log("No href, returning");
		return;
	    }
	    
	    if(href.includes(':')) {
		console.log("Xternal link");
		return;
	    }

	    const curDocName = getCurrentDocumentName() || "";
	    console.log(`curDocName is ${curDocName}`);
	    return;
	    const resolved = resolveUriRef(curDocName, href);
	    const fragmentId = resolved.fragmentId || '';
	    const docName = resolved.docName;

	    if(docName === "") {
		console.log("reference to element in current document #" + fragmentId);
		//      app.setState({fragmentId});
	    } else {
		console.log(`derived document name is ${docName}`);
		console.dir(this.props.match);
		const new1 = `${this.props.match.url}/../${href}`;
		console.log(`pushing ${new1}`);
		this.props.history.push(new1);
		/*        o.navigateToDocument(docName, fragmentId).then((...a) => {
			  console.log('navigation complete');
			  }).catch(err => {
			  console.log('Unable to navigate to document ' + docName + ': ' + err);
			  });*/
	    }
	}).bind(this);
    }

    getDocName() {
	return this.props.match && this.props.match.params ? (this.props.match.params.docName || 'index'): 'index';
    }
    
    getDocumentUrl() {
	return (docName => document.location.origin + (this.props.src || '') + '/' + docName + '.xml').bind(this);
    }
    

    doneLoading(...a) {
        const onComplete = this.props.onComplete;
	if(onComplete) {
	    this.setState({loading: false}, () => onComplete(...a));
	} else {
	    this.setState({loading: false});
	}
    }

    handleToctreeData(data) {
	if(this.props.handleToctreeData) {
	    this.props.handleToctreeData(data);
	}
    }
    
    render() {
        let linksComplete = false, docComplete = false;
	let linksFail= false, docFail = false;
        const onComplete = this.props.onComplete;
	const me = this;

        function handleLinksComplete(...a) {
            console.log('links complete');
            linksComplete = true;
            if((docComplete || docFail)) {
		me.doneLoading({ docComplete,
				 linksComplete }, ...a);
            }
        }

        function handleLinksFail(...a) {
            console.log('links fail');
            linksFail = true;
            if((docComplete || docFail)) {
		me.doneLoading({ docComplete,
				 linksComplete }, ...a);
            }
        }

        function handleDocComplete(...a) {
            console.log('doc complete');
            docComplete = true;
            if((linksComplete || linksFail)) {
		me.doneLoading({ docComplete,
				 linksComplete }, ...a);
            }
        }

        function handleDocFail(...a) {
            console.log('doc fail');
            docFail = true;
            if((linksComplete || linksFail)) {
		me.doneLoading({ docComplete,
				 linksComplete }, ...a);
            }
        }

	return (this.props.children(<DocutilsXmlDocument
				    getDocumentStream={this.props.getDocumentStream}
      handleData={this.handleToctreeData}
      css={{margin: '.8rem', border: 'dashed 1px #888888'}}
      getComponent={this.props.getComponent}
      referenceTemplate={this.props.referenceTemplate}
      match={this.props.match} location={this.props.location} history={this.props.history}
      onClick={this.referenceOnClick({navigateToDocument: this.navigateToDocument.bind(this),
      getCurDocName: () => '_links'})}
				    getDocumentUrl={() => this.getDocumentUrl('_links')}
      onFail={handleLinksFail}
      onComplete={handleLinksComplete} extraProps={{}}
      getXmlDocumentComponent={getXmlDocumentComponent}
	loadingRender={({loading}) => 'Loading'}
				    docName="_links"/>,
      <DocutilsXmlDocument
				    getDocumentStream={this.props.getDocumentStream}
	getComponent={this.props.getComponent}
	css={{margin: '.8rem', border: 'dashed 1px #888888'}}
	referenceTemplate={this.props.referenceTemplate}
	match={this.props.match} location={this.props.location} history={this.props.history}
	onClick={this.referenceOnClick({navigateToDocument: this.navigateToDocument.bind(this),
	getCurDocName: () => this.state.docName})}
				    getDocumentUrl={() => this.getDocumentUrl(this.getDocName())}
        ref={this.mainRef}
	onFail={handleDocFail}
        onComplete={handleDocComplete}
        css={{display: 'grid', gridTemplateAreas: ['"rellinks main"']}}
        extraProps={{}}
        getXmlDocumentComponent={getXmlDocumentComponent}
	loadingRender={({loading}) => 'Loading'}
        docName={this.props.docName||'index'}
				    />));
    }
}

Viewer.defaultProps = {
getComponent: wrappedGetComponent,
};

Viewer.propTypes = {
    src: PropTypes.string.isRequired,
    getComponent: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    getDocumentUrl: PropTypes.func,
    onComplete: PropTypes.func,
    getDocumentStream: PropTypes.func.isRequired,

};

export default Viewer;

