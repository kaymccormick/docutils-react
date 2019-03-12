import React from 'react'
import DocViewer from '../src/components/doc/Viewer'
import { setupSaxParser } from 'docutils-react/lib/getComponentForXmlSax'

export default class Viewer extends React.Component {
    constructor(props) {
	super(props);
	this.state = { component: props.component }
    }

    static async loadDocument(props) {
	const { server } = props;
	return new Promise((resolve, reject) => {
	    const parser = Viewer.getDocumentParser({ server, resolve, reject });
	    Viewer.getDocumentStream({ server, parser, docName:props.docName })
		    .then((stream) => Viewer.handleDocumentStream({ server, stream, parser }))
		    .catch(reject);
	});
    }
    
    static async getInitialProps({req}) {
	if(req) {
	    const server = true;
	    return Viewer.loadDocument({server, docName: 'index'});
	}
	return Promise.resolve({ server: false });
    }

    componentDidMount()
    {
	const {server} = this.props;
	if(!server) {
	    new Promise((resolve, reject) => {
		const parser = Viewer.getDocumentParser({ server, resolve, reject });
		Viewer.getDocumentStream({ server, parser, docName: 'index' })
		    .then((stream) => Viewer.handleDocumentStream({ server, stream, parser }))
		    .catch(reject);
	    }).then(({component}) => this.setState({component})).catch(err => console.log(err.stack));
	}
    }

    static getDocumentUrl(props) {
	return `http://localhost/xml/${props.docName}.xml`;
    }

    static nodeStreamReader(stream, parser) {
	let chunk;
	while(null !== (chunk = stream.read())) {
	    // console.log(chunk);
            parser.write(chunk);
	}
    }

    static handleNodeStream({stream, parser}) {
	if(!parser) {
	    throw new Error("Need parser");
	}
	stream.setEncoding('utf8');
	stream.on('readable', () => Viewer.nodeStreamReader(stream, parser));
	return new Promise((resolve, reject) => {
	    stream.on('end', () => { parser.close(); resolve({o: true});});
	});
    }
    
    static handleDocumentStream(props) {
	const { server, stream, parser } = props;
	if(server) {
	    return Viewer.handleNodeStream({stream, parser});
	} else {
	    return Viewer.handleWebStream({stream, parser});
	}
    }

    static getDocumentParser({ server, resolve, reject }) {
	const context = {};
	const { parser } = setupSaxParser({context});
	parser.onend = () => {
	    const nodes = context.siblings[0].map(f => f());
	    const r = nodes.filter(React.isValidElement)[0];
	    if(!React.isValidElement(r)) {
		reject(new Error("Invalid Element"));
	    }
	    const data = context.nodes[0].dataChildren.map(f => f()).filter(e => e[0] === 'document')[0];
	    resolve({ component: r });
	};
	return parser;
    }

    static getDocumentStream(props) {
	const url = Viewer.getDocumentUrl(props);
	let fetch;
	if(props.server) {
	    fetch = require('node-fetch');
	} else {
	    fetch = window.fetch;
	}
        return fetch(url).then(
	    response => {
		if(!response.ok) {
		    throw new Error(`Unable to retreieve URL ${url}`);
		}
		return response;
	    }).then(response => {
		if(props.server) {
		    return response.body;
		} else {
		    return response.body.getReader();
		}
	    });
    }

    render() {
	const props = { };
	console.log('hello props');
	console.log(Object.keys(this.props));
//	getDocumentStream={Viewer.getDocumentStream}
	return React.isValidElement(this.state.component) ? <div>{this.state.component}</div> : <div>invalid compoment</div>;
    }
}
