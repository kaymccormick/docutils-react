import React from 'react';

export default class Desc extends React.Component {
    constructor(props)
    {
	super(props);
    }

    render() {
	return React.createElement('div', { 'className': 'doc-desc ' + 'doc-domain-' + this.props.domain + ' doc-objtype-' + this.props.objType + ' doc-desctype-' + this.props.descType }, this.props.children);
    }
};
