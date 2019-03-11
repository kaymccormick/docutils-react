import React from 'react';
import classNames from 'classnames';

/* rudimentary prop filtering function */
function filterProps(props) {
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

/* Basic element wrapper. Designed to provide a simple mapping from
 * Docutils nodes to HTML elements. This is possible due to the
 * functional overlap between Docutils and HTML - many elements may be
 * translated straightforwardly.
 */

function wrapElement(element) {
    return (props) => React.createElement(element, filterProps(props));
}

/*
 * Document component. Adds classed docutils-document and document.
 */
const Document = (props) => React.createElement('div', { 'id': props.id, 'className': classNames(props.className, "docutils-document document") }, props.children);

/*
 * Reference component.
 */
const Reference = (props) => {
    let href;
    if(props.refuri) {
	href = props.refuri;
    } else if(props.refid) {
	href = `#${props.refid}`;
    }
    return React.createElement('a', { href: href,
				      className: classNames(props.className, 'reference') },
			       props.children);
};

/*
 * Parent component for an object description.
 */
const Desc = (props) => React.createElement('div', { className: classnames(props.className, 'doc-desc', `doc-domain-${props.domain}`, `doc-objtype-${props.objtype}`, `doc-desctype-${props.desctype}`) }, props.children);



/* Elements/components are mostly in order of incidence */

/**
 * Section Component
 *
 */
export const Section = wrapElement('section');

/* Is there a reason this isn't 'wrapElement'? perhaps className stuff */
/**
 * Title Component
 *
 */
export const Title = (props) => React.createElement('h1', { 'className': classNames(props.className, 'doc-title') }, props.children);
/**
 * BulletList Component
 *
 */
export const BulletList = wrapElement('ul');
/**
 * ListItem Component
 *
 */
export const ListItem = wrapElement('li');

/**
 * Inline Component
 *
 */
export const Inline = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-inline'), ...filterProps(props) });

/**
 * Paragraph Component
 *
 */
export const Paragraph = (props) => React.createElement('p', { 'className': classNames(props.className, 'paragraph') , ...filterProps(props)});

/**
 * CompactParagraph Component
 *
 */
export const CompactParagraph = (props) => React.createElement('div', { 'className': classNames('compact-paragraph'), ...filterProps(props) });
/**
 * DescSignature Component
 *
 */
export const DescSignature = (props) => React.createElement('div', { 'className': classNames('doc-desc-signature'), ...filterProps(props) });
/**
 * DescAnnotation Component
 *
 */
export const DescAnnotation = (props) => React.createElement('em', { 'className': classNames(props.className, 'doc-desc-annotation'), ...filterProps(props) });
/**
 * DescAddname Component
 *
 */
export const DescAddname = (props) => React.createElement('code', { 'className': classNames(props.className, 'doc-desc-addname'), ...filterProps(props) });
/**
 * DescName Component
 *
 */
export const DescName = (props) => React.createElement('code', { 'className': classNames(props.className, 'doc-desc-name'), ...filterProps(props) });
/**
 * DescContent Component
 *
 */
export const DescContent = (props) => React.createElement('div', { 'className': classNames('doc-desc-content'), ...filterProps(props) });
/**
 * Literal Component
 *
 */
export const Literal = (props) => React.createElement('code', { 'className': classNames(props.className, 'doc-literal'), ...filterProps(props) });
/**
 * LiteralStrong Component
 *
 */
export const LiteralStrong = (props) => React.createElement('code', { 'className': classNames('literal-strong'), ...filterProps(props) });
/**
 * LiteralEmphasis Component
 *
 */
export const LiteralEmphasis = (props) => React.createElement('code', { 'className': classNames('literal-emphasis'), ...filterProps(props) });
/* We dont need a component for Index */
/**
 * Index Component
 *
 */
export const Index = (props) => null;

/**
 * Caption Component
 *
 */
export const Caption = (props) => React.createElement('div', { 'className': classNames('doc-caption'), ...filterProps(props) });
/**
 * Compound Component
 *
 */
export const Compound = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-compound'), ...filterProps(props) });
/**
 * DescParameterlist Component
 *
 */
export const DescParameterlist = (props) => React.createElement('ul', { 'className': classNames(props.className, 'parameter-list'), ...filterProps(props) });
/**
 * DescParameter Component
 *
 */
export const DescParameter = (props) => React.createElement('li', { 'className': classNames(props.className, 'parameter-item'), ...filterProps(props) });
/**
 * TitleReference Component
 *
 */
export const TitleReference = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-title-reference'), ...filterProps(props) });
/**
 * FieldList Component
 *
 */
export const FieldList = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field-list'), ...filterProps(props) });
/**
 * Field Component
 *
 */
export const Field = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field'), ...filterProps(props) });
/**
 * FieldName Component
 *
 */
export const FieldName = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field-name'), ...filterProps(props) });
/**
 * FieldBody Component
 *
 */
export const FieldBody = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field-body'), ...filterProps(props) });
/**
 * DescReturns Component
 *
 */
export const DescReturns = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-returns'), ...filterProps(props) });
/**
 * Colspec Component
 *
 */
export const Colspec = (props) => React.createElement('div', { 'className': 'doc-colspec' });
/**
 * Table Component
 *
 */
export const Table = props => {
    const children = []
    for (let child of props.children) {
	if(child.type === Title) {
	    children.push(React.createElement('caption', { ...filterProps(props), key: 'caption' }, child.props.children));
	} else if(child.type === Colspec) {
	} else if(child.type === Tgroup) {
	    children.splice(children.length, ...child.props.children);
	} else {
	    children.push(child);
	}

    }
    return React.createElement('table', {}, children);
};

/**
 * Row Component
 *
 */
export const Row = (props) => React.createElement('tr', { 'className': classNames(props.className, 'doc-row') });
// componentize TODO
/**
 * Entry Component
 *
 */
export const Entry = function(props) {
    let attrs = {};
    if(props.morecols) {
        attrs.colSpan = props.morecols + 1;
    }
    if(props.morerows) {
        attrs.rowSpan = props.morerows + 1;
    }
    return React.createElement('td', attrs, props.children);
};

/**
 * Tbody Component
 *
 */
export const Tbody = (props) => React.createElement('tbody', filterProps(props));
/**
 * Thead Component
 *
 */
export const Thead = (props) => React.createElement('thead', filterProps(props));
function make_class(name) {
    return name.replace('+', '_');
}

/**
 * LiteralBlock Component
 *
 */
export const LiteralBlock = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-literal-block', props.language ? ('doc-language-' + make_class(props.language)) : '') });
/**
 * DoctestBlock Component
 *
 */
export const DoctestBlock = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-doctest-block'), ...filterProps(props) });
/**
 * Versionmodified Component
 *
 */
export const Versionmodified = (props) => React.createElement('div', { 'className': classNames(props.className, 'versionmodified'), ...filterProps(props) });
/**
 * DefinitionList Component
 *
 */
export const DefinitionList = (props) => React.createElement('dl', { 'className': classNames(props.className, 'doc-definition-list'), ...filterProps(props) });
/**
 * DefinitionListItem Component
 *
 */
export const DefinitionListItem = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-definition-list-item'), ...filterProps(props) });
/**
 * Term Component
 *
 */
export const Term = (props) => React.createElement('dt', { 'className': classNames(props.className, 'doc-term'), ...filterProps(props) });
/**
 * Definition Component
 *
 */
export const Definition = (props) => React.createElement('dd', { 'className': classNames(props.className, 'doc-definition'), ...filterProps(props) });
/**
 * Emphasis Component
 *
 */
export const Emphasis = (props) => React.createElement('em', { 'className': classNames(props.className, 'doc-emphass'), ...filterProps(props) });
/**
 * Strong Component
 *
 */
export const Strong = (props) => React.createElement('strong', { 'className': classNames(props.className, 'doc-strong'), ...filterProps(props) });
/**
 * EnumeratedList Component
 *
 */
export const EnumeratedList = (props) => React.createElement('ol', { 'className': classNames(props.className, 'doc-enumerated-list'), ...filterProps(props) });
/**
 * DescOptional Component
 *
 */
export const DescOptional = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-desc-optional'), ...filterProps(props) });
/**
 * Admonition Component
 *
 */
export const Admonition = (props) => React.createElement('div', { 'className': 'doc-admonition', ...filterProps(props) });
/**
 * OptionList Component
 *
 */
export const OptionList = (props) => React.createElement('div', { 'className': 'doc-option-list', ...filterProps(props) });
/**
 * OptionListItem Component
 *
 */
export const OptionListItem = (props) => React.createElement('div', { 'className': 'doc-option-list-item', ...filterProps(props) });
/**
 * OptionGroup Component
 *
 */
export const OptionGroup = (props) => React.createElement('div', { 'className': 'doc-option-group', ...filterProps(props) });
/**
 * Option Component
 *
 */
export const Option = (props) => React.createElement('div', { 'className': 'doc-option', ...filterProps(props) });
/**
 * Description Component
 *
 */
export const Description = (props) => React.createElement('div', { 'className': 'doc-description', ...filterProps(props) });
/**
 * OptionArgument Component
 *
 */
export const OptionArgument = (props) => React.createElement('div', { 'className': 'doc-option-argument', ...filterProps(props) });
/**
 * Target Component
 *
 */
export const Target = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-target'), ...filterProps(props) });
/**
 * Footnote Component
 *
 */
export const Footnote = (props) => React.createElement('div', { 'className': 'doc-footnote', ...filterProps(props) });
/**
 * FootnoteReference Component
 *
 */
export const FootnoteReference = (props) => React.createElement(Reference, {className: classNames(props.className, 'doc-footnote-reference'), onClick: props.referenceOnClick, ...filterProps(props)});
/**
 * Citation Component
 *
 */
export const Citation = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-citation'), ...filterProps(props) });
/**
 * Label Component
 *
 */
export const Label = (props) => React.createElement('div', { 'className': 'doc-footnote-label', ...filterProps(props)});
/**
 * Toctree Component
 *
 */
export const Toctree = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-toctree'), ...filterProps(props) });
/**
 * Figure Component
 *
 */
export const Figure = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-figure'), ...filterProps(props) });
/**
 * Rubric Component
 *
 */
export const Rubric = (props) => React.createElement('p', { 'className': 'rubric', ...filterProps(props) });
/**
 * Seealso Component
 *
 */
export const Seealso = (props) => React.createElement('div', { 'className': 'doc-seealso', ...filterProps(props) });
/**
 * Note Component
 *
 */
export const Note = (props) => React.createElement('div', { 'className': 'doc-note', ...filterProps(props) });
/**
 * RelLinks Component
 *
 */
export const RelLinks = (props) => React.createElement('div', { 'className': 'doc-rel-links', ...filterProps(props) });
/**
 * Image Component
 *
 */
export const Image = (props) => React.createElement('img', { 'className': 'doc-image',
					    'src': props.uri, ...filterProps(props) });
/**
 * DescSignatureLine Component
 *
 */
export const DescSignatureLine = (props) => React.createElement('div', { 'className': 'doc-desc-signature-line', ...filterProps(props) });
/**
 * LineBlock Component
 *
 */
export const LineBlock = (props) => React.createElement('div', { 'className': 'doc-line-block', ...filterProps(props) });
/**
 * Line Component
 *
 */
export const Line = (props) => React.createElement('div', { 'className': 'doc-line', ...filterProps(props) });
/**
 * OptionString Component
 *
 */
export const OptionString = (props) => React.createElement('div', { 'className': 'doc-option-string', ...filterProps(props) });
/**
 * Sidebar Component
 *
 */
export const Sidebar = (props) => React.createElement('div', { 'className': 'doc-sidebar', ...filterProps(props) });
/**
 * Meta Component
 *
 */
export const Meta = (props) => React.createElement('div', { 'className': 'doc-meta', ...filterProps(props) });
/**
 * Attribution Component
 *
 */
export const Attribution = (props) => React.createElement('div', { 'className': 'doc-attributon', ...filterProps(props) });
/**
 * BlockQuote Component
 *
 */
export const BlockQuote = (props) => React.createElement('div', { 'className': 'doc-block-quote', ...filterProps(props) });
/**
 * Warning Component
 *
 */
export const Warning = (props) => React.createElement('div', { 'className': 'doc-warning', ...filterProps(props) });
/**
 * Tip Component
 *
 */
export const Tip = (props) => React.createElement('div', { 'className': 'doc-tip', ...filterProps(props) });
/**
 * Manpage Component
 *
 */
export const Manpage = (props) => React.createElement('span', { 'className': 'doc-manpage', ...filterProps(props) });
/**
 * NumberReference Component
 *
 */
export const NumberReference = (props) => React.createElement(Reference, { 'className': 'doc-number-reference', ...filterProps(props) });
/**
 * Abbreviation handles the Sphinx 'abbreviation' node. classname of
 * doc-abbreviation.
 *
 */
export const Abbreviation = (props) => React.createElement('span', { 'className': 'doc-abbreviation', ...filterProps(props) });
/**
 * TabularColSpec Component
 *
 */
export const TabularColSpec = (props) => React.createElement('div', { 'className': 'doc-tabular-col-spec', ...filterProps(props) });
/**
 * Tgroup Component
 *
 */
export const Tgroup = (props) => React.createElement('div', { 'className': 'doc-tgroup', ...filterProps(props) });
/**
 * Legend Component
 *
 */
export const Legend = (props) => React.createElement('div', { 'className': 'doc-legend', ...filterProps(props) });
/**
 * Container Component
 *
 */
export const Container = wrapElement('div');
/**
 * Topic Component
 *
 */
export const Topic = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-topic') });
/**
 * DescType Component
 *
 */
export const DescType = props => null;
/**
 * Comment Component
 *
 */
export const Comment = props => null;

/**
 * DocumentLink Component
 *
 */
export const DocumentLink = (props) => React.createElement('a', { onClick: props.referenceOnClick, 'href': props.xlinkHref, 'className': classNames(props.className, 'document-link') }, props.xlinkTitle);

/**
 * DocumentLinks Component
 *
 */
export const DocumentLinks = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'document-links') });
/**
 * DocumentToctree Component
 *
 */
export const DocumentToctree = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'document-toctree', props.master ? 'toctree-master' : '') });
/**
 * ToctreeList Component
 *
 */
export const ToctreeList = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'toctree-list') });
/**
 * ToctreeListItem Component
 *
 */
export const ToctreeListItem = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'toctree-list-item') });
/**
 * ToctreeLink Component
 *
 */
export const ToctreeLink = (props) => React.createElement(props.getComponent('Reference'), { refuri: props.xlinkHref, 'className': classNames(props.className, 'toctree-link') }, props.children);
/**
 * DocumentIndex Component
 *
 */
export const DocumentIndex = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-document-index') } );
/**
 * DocumentRef Component
 *
 */
export const DocumentRef = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-document-ref') } );
/**
 * Links Component
 *
 */
export const Links = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-links') } );
/**
 * Caution Component
 *
 */
export const Caution = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-caution') } );
/**
 * Acks Component
 *
 */
export const Acks = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-acks') } );
/**
 * Raw Component
 *
 */
export const Raw = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-raw') } );
/**
 * LocalToctree Component
 *
 */
export const LocalToctree = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-local-toctree') } );

export const components = {
    Section, Title, BulletList, ListItem, Inline, Document, Paragraph, CompactParagraph, Desc, DescSignature, DescAnnotation, DescAddname, DescName, DescContent, Literal, LiteralStrong, LiteralEmphasis, Index, Caption, Compound, DescParameterlist, DescParameterlist, DescParameter, DescParameter, TitleReference, FieldList, Field, FieldName, FieldBody, DescReturns, Table, Row, Entry, Tbody, Thead, LiteralBlock, DoctestBlock, Versionmodified, DefinitionList, DefinitionListItem, Term, Definition, Emphasis, Strong, EnumeratedList, DescOptional, Admonition, OptionList, OptionListItem, OptionGroup, Option, Description, OptionArgument, Target, Footnote, FootnoteReference, Citation, Label, Toctree, Figure, Topic, Rubric, Seealso, Note, RelLinks, Image, DescSignatureLine, LineBlock, Line, OptionString, Sidebar, Meta, Attribution, BlockQuote, Warning, Tip, Manpage, NumberReference, Abbreviation, TabularColSpec, Colspec, Tgroup, Legend, Container, Reference, DescType, Comment, DocumentLink, DocumentLinks, DocumentToctree, ToctreeList, ToctreeListItem, ToctreeLink, DocumentIndex, DocumentRef, Links, Caution, Acks, Raw, LocalToctree
};

export function getComponent(componentName, node, root, context) {
    return components[componentName];
};
