import { jsx, css } from '@emotion/core'
import React from 'react';
import { getComponent} from './docutilsWrapper';

import sax from 'sax';

/*
 * Function: tagNameToComponentNAme
 *
 * Converts a docutils element name to a corresponding docutils-react
   component name. This is a simple mapping, since the tag names are
   in snake_case and the component names are CamelCase.
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


export function attributeNameToPropName(attName) {
}


/**
 * Function: attributesToProps
 *
 * Takes an object and returns a new object with the xml attribute
 * names converted into react props. This doesn't convert things like
 * 'for' to htmlFor - it removed colons used in XML Namespaces and
 * capitalizes the following letter. For instance, xlink:href bcomes
 * xlinkHref
 *
 */

export function attributesToProps(att) {
    const props = {};
    for (let prop of Object.keys(att)) {
	let destProp = prop;
	const colonIndex = prop.indexOf(':');
	if(colonIndex !== -1) {
	    destProp = prop.substr(0, colonIndex) + prop.substr(colonIndex + 1, 1).toUpperCase() +
		prop.substr(colonIndex + 2);
	}
	if(destProp) {
	    props[destProp] = att[prop];
	}
    }
    return props;
}


export function getComponentForTagName(tagName) {
    return getComponent(tagNameToComponentName(tagName));
}

export function setupSaxParser(options) {
    const { container, context } = options;
    const parser = sax.parser(true);

    if(context.getComponent === undefined) {
	context.getComponent = getComponent;
    }
    
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
	// console.log(`[${context.depth}] close ${tagName}`);
	// console.dir(context.siblings);
	const Component = context.getComponent(tagNameToComponentName(tagName));
	context.tags.pop();
	const thisNode = context.nodes.pop();

	if (!context.siblings.length) { throw new Error("no siblings"); }
	const siblings = context.siblings.pop();
	const liftUp = context.siblings.length == 2 && options.liftUpNodes && options.liftUpNodes.includes(tagName);
	if (!context.siblings.length) { throw new Error("no siblings for " + tagName); }
	const att = { getComponent: context.getComponent, ... attributesToProps(context.attributes.pop()), ...options.extraProps };
	//const att = context.attributes.pop();
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
//	console.log(context.nodes.length);
	context.nodes[context.nodes.length - 1].dataChildren.push(makeData);
	//console.dir(context.siblings);
    }
	
    parser.onopentag = node => {
	// console.log('open ' + node.name);
	// console.dir(context.siblings)
	// console.log(`[${context.depth}] open ${node.name}`);
	context.depth++;
	context.nodes.push({ name: node.name, attributes: {...node.attributes}, dataChildren: [], children: [] });
	context.tags.push(node.name);
	context.siblings.push([]);
	context.attributes.push({... node.attributes});
	
    };
    parser.ontext = t => {
	if (t.trim() === '') {
	    return;
	}
//	console.log(t);
	context.siblings[context.siblings.length - 1].push(() => t);
	context.nodes[context.nodes.length - 1].dataChildren.push(() => ['#text', {}, t]);
    };

    return { parser };
}

/* callers call config extraProps ? */
export function getComponentForXml(xmlData, config) {
    if(!config) {
	config = {}
    }
    const saxContext = { };
    const { parser } = setupSaxParser({extraProps: config.extraProps, liftUpNodes: config.liftUpNodes, container: config.container, context: saxContext });
    return new Promise((resolve, reject) => {
	parser.onend = () => {
	    // console.dir(saxContext.siblings[0]);
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
