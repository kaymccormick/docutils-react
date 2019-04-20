import classNames from 'classnames';

function wrapElement(e) {
    return element => props => e(element, props);
}

export default function (e) {
    const w = wrapElement(e);
    return {
 Document: props => e('div', { id: props.id, className: classNames(props.className) }, props.children),
	     Section: props => e('div', { /* id: props.id, ?? */ className: classNames(props.className) }, props.children),
	     Title: w('h1'),
	     Desc: w('dl'),
	     BulletList: w('ul'),
	     ListItem: w('li'),
	     Address: w('address'),
	     Admonition: props => e('div', { className: classNames(props.className, 'admonition') }),
	     Authors: props => null,
	     Author: props => null,
	   };
}
