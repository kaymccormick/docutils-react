import React from 'react';
import classNames from 'classnames';
import BaseComponent from './BaseComponent';

export default class Document extends BaseComponent {
    constructor(props)
    {
	super(props);
    }

    render() {
	return React.createElement('div', { 'id': this.props.id, 'className': classNames(this.props.className, "docutils-document document") }, this.state._children);
    }
};
