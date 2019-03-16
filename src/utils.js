export function filterProps(props) {
    const suppressProps = ['docutils', /*'className', */'class', 'names', 'ids', 'backrefs', 'auto',// 'children',
			   'referenceOnClick', 'navigateToDocument', 'getComponent'];
    const newProps = {};
    for (let prop of Object.keys(props)) {
	if(suppressProps.includes(prop)) {
	    continue;
	}
	let destProp = prop;
	const colonIndex = prop.indexOf(':');
	if(colonIndex !== -1) {
	    destProp = prop.substr(0, colonIndex) + prop.substr(colonIndex + 1, 1).toUpperCase() +
		prop.substr(colonIndex + 2);
	    destProp = undefined;
	}
	if(destProp) {
	    newProps[destProp] = props[prop];
	}
    }
    return newProps;
}

export function wrapElement(e) {
    return (element) => (props) => e(element, filterProps(props));
}
