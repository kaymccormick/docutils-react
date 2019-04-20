/** @jsx jsx */
/**
 * This file is antiquiated
 */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { setupSaxParser, getComponentForTagName, attributesToProps } from './getComponentForXmlSax';
import "@babel/polyfill";
//import './DocutilsXmlDocument.css';
import nodeFetch from 'node-fetch';

async function myfunc(reader, parser) {
    while(true) {
        const { done, value } = await reader.read();
        if(done) {
            break;
        }
        const val = new TextDecoder("utf-8").decode(value);
//        console.log(val);
        parser.write(val);
    }
}

function myfunc2(stream, parser) {
    let chunk;
    while(null !== (chunk = stream.read())) {
//      console.log(chunk);
        parser.write(chunk);
    }
}

function handleNativeFetchResponse(parser) {
    return response => {
        const reader = response.body.getReader();
        return myfunc(reader, parser).then(() => {
            reader.releaseLock();
            parser.close();
        })
    };
}

function handleNodeFetchResponse(parser) {
    return response => {
        response.body.setEncoding('utf8');
        response.body.on('readable', () => myfunc2(response.body, parser));
        response.body.on('end', () => parser.close());
    };
}

class DocutilsXmlDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {xmlDocument: null, component: null, loading: true};
        this.updateDocument();
    }
    
    componentDidUpdate(prevProps, prevState)
    {
        console.log(`componentDidUpdate ${prevProps.docName} !== ? ${this.props.docName}`);
        if(prevProps.docName !== this.props.docName) {
            /* Update document */
            this.updateDocument();
        }
    }

    componentWillUnmount() {
        if(this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    updateDocument()
    {
        console.log('updateDocument');
        const context = { getComponent: this.props.getComponent };
        // extraProps?
        const { parser } = setupSaxParser({ context });
        const me = this;
        parser.onend = (() => {
            console.log('end');
            const nodes = context.siblings[0].map(f => f());
            const r = nodes.filter(React.isValidElement)[0];
            if(!React.isValidElement(r)) {
                console.dir(r);
                console.log('invalid element');
                return;
            }
            const data = context.nodes[0].dataChildren.map(f => f()).filter(e => e[0] === 'document')[0];
            if(this.props.handleData) {
                this.props.handleData(data);
            }
            this.setState({component: r, loading: false}, () => {
                console.log('state has been set');
                if(me.timerId) {
                    clearInterval(me.timerId);
                    this.timerId = undefined;
                }
                this.props.onComplete({ docName: me.props.docName});
            });
            
        }).bind(this);
        me.count = 0;
        //        this.timerId = setInterval(() => intervalFunc(me, context), 250);
        this.props.getDocumentStream({ docName: this.props.docName }).then(
            this.props.handleDocumentStream)
            .catch(err => {
                if(me.timerId) {
                    clearInterval(me.timerId);
                    me.timerId = undefined;
                }
                console.log(`get stream error ${this.props.docName}`);
                if(err.stack) {
                    console.log(err.stack);
                }
                console.log(err);
                this.setState({loading: false});
                if(this.props.onFail) {
                    this.props.onFail(this.props.docName, err);
                }
            });
    }
    
    render() {
        return (!this.state.loading) ? <div onClick={this.props.onClick}><div className="info-panel p-grid"><div className="p-col">Document Name:</div><div className="p-col">{this.props.docName}</div></div><div>{this.state.component}</div></div> : this.props.loadingRender({loading: this.state.loading});
    }
}

DocutilsXmlDocument.propTypes = {
    loadingRender: PropTypes.func.isRequired,
    handleDocumentStream: PropTypes.func.isRequired,
};

export default DocutilsXmlDocument;
