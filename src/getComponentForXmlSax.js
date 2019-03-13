/**
 * File: getComponentForSax.js
 * Project: docutils-react
 * Author: Kay McCormick <kay@kaymccormick.com>
 * Copyright: 2019 Kay McCormick
 * License: MIT
 */

import { jsx, css } from '@emotion/core'
import React from 'react';
import { getComponent} from './docutilsWrapper';

import sax from 'sax';

/**
 * Converts a docutils element name to a corresponding docutils-react
 * component name. This is a simple mapping, since the tag names are
 * in snake_case and the component names are CamelCase.
 * @param {string} tagName - Name of the docutils XML element tag.
 */
export function tagNameToComponentName(tagname) {
    let nName = tagname;
    if (!nName) {
	throw new Error('Need a name for the node !?');
    }
    
    let rName = '';
    let uscore = nName.indexOf('_');
    while (uscore !== -1) {
	rName = rName + nName[0].toUpperCase() + nName.substring(1, uscore);
	nName = nName.substring(uscore + 1);
	uscore = nName.indexOf('_');
    }
    if (nName) {
	rName = rName + nName[0].toUpperCase() + nName.substring(1);
    }
    
    return rName;
}

/**
 * Given an attribute name, return a suitable prop name. Does not
 * filter prop names, i.e., will not return null or throw in case of
 * an invalid input - It performs a mechanical translation.
 */
export function attributeNameToPropName(attName) {
    let propName = attName;
    const colonIndex = attName.indexOf(':');
    if(colonIndex !== -1) {
	propName = attName.substr(0, colonIndex) +
	    attName.substr(colonIndex + 1, 1).toUpperCase() +
	    attName.substr(colonIndex + 2);
    }
    return propName;
}


/**
 * Takes an object and returns a new object with the xml attribute
 * names converted into react props. This doesn't convert things like
 * 'for' to htmlFor - it removed colons used in XML Namespaces and
 * capitalizes the following letter. For instance, xlink:href bcomes
 * xlinkHref
 *
 */
export function attributesToProps(att) {
    const props = {};
    for (let attName of Object.keys(att)) {
	const destProp = attributeNameToPropName(attName);
	if(destProp) {
	    props[destProp] = att[attName];
	}
    }
    return props;
}


/**
 * given a tagname, retrieve the proper component
 */
export function getComponentForTagName(tagName) {
    return getComponent(tagNameToComponentName(tagName));
}

/**
 * return a configured sax parser ready to parse XML and generate
 * react components for us.
 */
export function setupSaxParser(options) {
    let { container, context } = options;
    const parser = sax.parser(true);

    if(context === undefined) {
	context = {}
    }
    
    if(context.getComponent === undefined) {
	context.getComponent = getComponent;
    }

    /* nodes is not fully used/implemented, so careful */
    context.nodes = [{dataChildren: []}];
    context.tags = [];
    context.siblings = [[]];
    context.attributes = [];
    context.depth = 0;
    if(container !== undefined) {
	context.container = container;
    }

    parser.onclosetag = tagName => {
	context.depth--;
	const Component = context.getComponent(tagNameToComponentName(tagName));
	context.tags.pop();
	const thisNode = context.nodes.pop();

	if (!context.siblings.length) {
	    throw new Error("no siblings");
	}
	const siblings = context.siblings.pop();
	const liftUp = context.siblings.length == 2 &&
	      options.liftUpNodes && options.liftUpNodes.includes(tagName);
	if (!context.siblings.length) {
	    throw new Error("no siblings for " + tagName);
	}
	const att = { getComponent: context.getComponent,
		      ... attributesToProps(context.attributes.pop()),
		      ...options.extraProps };
	att.key = context.siblings[context.siblings.length - 1].length;
	const makeComponent = () => {
	    return <Component {...att} children={siblings.map(f => f())}/>;
	}
	const makeData = () => {
	    return [tagName, {...att}, thisNode.dataChildren.map(f => f())];
	}
	
	if(!liftUp) {
	    context.siblings[context.siblings.length - 1].push(makeComponent);
	}
	context.nodes[context.nodes.length - 1].dataChildren.push(makeData);
    }
	
    parser.onopentag = node => {
	context.depth++;
	/* nodes isn't fully maintained */
	context.nodes.push({ name: node.name,
			     attributes: {...node.attributes},
			     dataChildren: [], children: [] });
	context.tags.push(node.name);
	context.siblings.push([]);
	context.attributes.push({... node.attributes});
    };
    parser.ontext = t => {
	if (t.trim() === '') {
	    return;
	}
	context.siblings[context.siblings.length - 1].push(() => t);
	context.nodes[context.nodes.length - 1].dataChildren.
	    push(() => ['#text', {}, t]);
    };

    return { parser };
}

/* This may be untested/unused */
export function getComponentForXml(xmlData, config) {
    if(!config) {
	config = {}
    }
    const saxContext = { };
    const { parser } = setupSaxParser({extraProps: config.extraProps,
				       liftUpNodes: config.liftUpNodes,
				       container: config.container,
				       context: saxContext });
    return new Promise((resolve, reject) => {
	parser.onend = () => {
	    const nodes = saxContext.siblings[0].map(f => f());
	    const r = nodes.filter(React.isValidElement)[0];
	    if(!React.isValidElement(r)) {
		console.dir(r);
		console.log('invalid element');
	    }
	    resolve(r);
	};
	parser.write(xmlData);
	parser.close();
    });
};

/* This may be untested/unused */
export function getComponentForXmlSync(xmlData, config) {
    if(!config) {
	config = {}
    }
    const saxContext = { };
    const { parser } = setupSaxParser({extraProps: config.extraProps,
				       liftUpNodes: config.liftUpNodes,
				       container: config.container,
				       context: saxContext });
    const output = { };
    parser.onend = () => {
	const nodes = saxContext.siblings[0].map(f => f());
	const r = nodes.filter(React.isValidElement)[0];
	if(!React.isValidElement(r)) {
	    console.dir(r);
	    console.log('invalid element');
	}
	output.component = r;
    };
    parser.write(xmlData);
    parser.close();
    return output.component;
};
