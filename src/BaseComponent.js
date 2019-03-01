
import React from 'react';

export default class BaseComponent extends React.Component {
    constructor(props) {
	super(props);
	this.state = { _children: ( props._children || [] ) };
    }
    componentDidCatch(error, info) {
	console.dir(error);
	console.dir(info);
	console.dir(this.props);
    }
};

