import React from 'react';
import classNames from 'classnames';

export default class Reference extends React.Component {
    constructor(props)
    {
	super(props);
	let className = '';
	let refUri = props.refUri || props.refuri;
	if (props.internal && props.internal.toLowerCase() !== "false" &&
	    props.internal !== "0") {
	    className = 'reference-internal';
	}
	if (refUri && refUri.indexOf(':') !== -1 ) {
	    className = 'reference-external';
	}
	
	this.state = {
	    _children: props._children,
	    'className': classNames(props.className, className),
	    'refUri': props.refUri || props.refuri,
	    'refId': props.refId || props.refid,
	    'isReference': true,
	};
    }

    render() {
	const children = [];
	if(this.state._children) {
	    children.push(...this.state._children);
	}
	if(this.props.secnumber) {
	    children.unshift(this.props.secnumber.replace(' ', '.') + ' ');
	}

	const props =  { //onClick: this.props.referenceOnClick,
			 'className': classNames(this.state.className, 'reference')};
	if(this.state.refUri) {
	    props.href = this.state.refUri;
	} else if (this.state.refId) {
	    props.href = '#' + this.state.refId;
	}
	props['ref'] = this.props.forwardedRef;
//	console.dir(children);
	return React.createElement('a', props, children);
    }

    get ref() {
	if(!this._ref) {
	    throw new Error('reference is null');
	}
	return this._ref;
    }
};
