import React from 'react';
import classNames from 'classnames';

// sphinx.addnodes: translatable toctree desc desc_signature desc_signature_line desc_addname desc_addname desc_type desc_returns desc_name desc_parameterlist desc_parameter desc_optional desc_annotation desc_content versionmodified seealso productionlist production math math_block displaymath index centered acks
//hlist hlistcol compact_paragraph glossary only start_of_file highlightlang tabular_col_spec meta pending_xref number_reference download_reference literal_emphasis literal_strong abbreviation manpage'

// (Node Text Element TextElement FixedTextElement) document title subtitle rubric docinfo author authors organization address contact version revision status date copyright decoration header footer section topic sidebar transition paragraph compound container bullet_list enumerated_list list_item definition_list definition_list_item term classifier definition field_list field field_name field_body option option_argument option_group option_list option_list_item option_string description literal_block doctest_block math_block line_block line block_quote attribution attention caution danger error important note tip hint warning admonition comment substitution_definition target footnote citation label figure caption legend table tgroup colspec thead tbody row entry system_message pending raw emphasis strong literal reference footnote_reference citation_reference substitution_reference title_reference abbreviation acronym superscript subscript math image inline problematic generated

/* basic element wrapping.
   this still passes unwanted props to the underlying element */

function wrapElement(element) {
    return (props) => React.createElement(element, filterProps(props));
}

const Document = (props) => React.createElement('div', { 'id': props.id, 'className': classNames(props.className, "docutils-document document") }, props.children);
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
const Desc = (props) => React.createElement('div', { className: classnames(props.className, 'doc-desc', `doc-domain-${props.domain}`, `doc-objtype-$Pprops.objType}`, `doc-desctype-${props.descType}`) }, props.children);

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

/* Elements/components are mostly in order of incidence */
export const Section = wrapElement('section');

/* Is there a reason this isn't 'wrapElement'? perhaps className stuff */
export const Title = (props) => React.createElement('h1', { 'className': classNames(props.className, 'doc-title') }, props.children);
export const BulletList = wrapElement('ul');
export const ListItem = wrapElement('li');

export const Inline = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-inline'), ...filterProps(props) });

export const Paragraph = (props) => React.createElement('p', { 'className': classNames(props.className, 'paragraph') , ...filterProps(props)});

export const CompactParagraph = (props) => React.createElement('div', { 'className': classNames('compact-paragraph'), ...filterProps(props) });
export const DescSignature = (props) => React.createElement('div', { 'className': classNames('doc-desc-signature'), ...filterProps(props) });
export const DescAnnotation = (props) => React.createElement('em', { 'className': classNames(props.className, 'doc-desc-annotation'), ...filterProps(props) });
export const DescAddname = (props) => React.createElement('code', { 'className': classNames(props.className, 'doc-desc-addname'), ...filterProps(props) });
export const DescName = (props) => React.createElement('code', { 'className': classNames(props.className, 'doc-desc-name'), ...filterProps(props) });
export const DescContent = (props) => React.createElement('div', { 'className': classNames('doc-desc-content'), ...filterProps(props) });
export const Literal = (props) => React.createElement('code', { 'className': classNames(props.className, 'doc-literal'), ...filterProps(props) });
export const LiteralStrong = (props) => React.createElement('code', { 'className': classNames('literal-strong'), ...filterProps(props) });
export const LiteralEmphasis = (props) => React.createElement('code', { 'className': classNames('literal-emphasis'), ...filterProps(props) });
/* We dont need a component for Index */
export const Index = (props) => null;

export const Caption = (props) => React.createElement('div', { 'className': classNames('doc-caption'), ...filterProps(props) });
export const Compound = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-compound'), ...filterProps(props) });
export const DescParameterlist = (props) => React.createElement('ul', { 'className': classNames(props.className, 'parameter-list'), ...filterProps(props) });
export const DescParameter = (props) => React.createElement('li', { 'className': classNames(props.className, 'parameter-item'), ...filterProps(props) });
export const TitleReference = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-title-reference'), ...filterProps(props) });
export const FieldList = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field-list'), ...filterProps(props) });
export const Field = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field'), ...filterProps(props) });
export const FieldName = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field-name'), ...filterProps(props) });
export const FieldBody = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-field-body'), ...filterProps(props) });
export const DescReturns = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-returns'), ...filterProps(props) });
export const Colspec = (props) => React.createElement('div', { 'className': 'doc-colspec' });
export const Table = props => {
    const children = []
    for (let child of props.children) {
	if(child.type === Title) {
	    children.push(React.createElement('caption', { ...filterProps(props), key: 'caption' }, child.props.children));
	} else if(child.type === Colspec) {
	} else if(child.type == Tgroup) {
	    children.splice(children.length, ...child.props.children);
	} else {
	    children.push(child);
	}

    }
    return React.createElement('table', {}, children);
};

export const Row = (props) => React.createElement('tr', { 'className': classNames(props.className, 'doc-row') });
// componentize TODO
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

export const Tbody = (props) => React.createElement('tbody', filterProps(props));
export const Thead = (props) => React.createElement('thead', filterProps(props));
function make_class(name) {
    return name.replace('+', '_');
}

export const LiteralBlock = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-literal-block', props.language ? ('doc-language-' + make_class(props.language)) : '') });
export const DoctestBlock = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-doctest-block'), ...filterProps(props) });
export const Versionmodified = (props) => React.createElement('div', { 'className': classNames(props.className, 'versionmodified'), ...filterProps(props) });
export const DefinitionList = (props) => React.createElement('dl', { 'className': classNames(props.className, 'doc-definition-list'), ...filterProps(props) });
export const DefinitionListItem = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-definition-list-item'), ...filterProps(props) });
export const Term = (props) => React.createElement('dt', { 'className': classNames(props.className, 'doc-term'), ...filterProps(props) });
export const Definition = (props) => React.createElement('dd', { 'className': classNames(props.className, 'doc-definition'), ...filterProps(props) });
export const Emphasis = (props) => React.createElement('em', { 'className': classNames(props.className, 'doc-emphass'), ...filterProps(props) });
export const Strong = (props) => React.createElement('strong', { 'className': classNames(props.className, 'doc-strong'), ...filterProps(props) });
export const EnumeratedList = (props) => React.createElement('ol', { 'className': classNames(props.className, 'doc-enumerated-list'), ...filterProps(props) });
export const DescOptional = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-desc-optional'), ...filterProps(props) });
export const Admonition = (props) => React.createElement('div', { 'className': 'doc-admonition', ...filterProps(props) });
export const OptionList = (props) => React.createElement('div', { 'className': 'doc-option-list', ...filterProps(props) });
export const OptionListItem = (props) => React.createElement('div', { 'className': 'doc-option-list-item', ...filterProps(props) });
export const OptionGroup = (props) => React.createElement('div', { 'className': 'doc-option-group', ...filterProps(props) });
export const Option = (props) => React.createElement('div', { 'className': 'doc-option', ...filterProps(props) });
export const Description = (props) => React.createElement('div', { 'className': 'doc-description', ...filterProps(props) });
export const OptionArgument = (props) => React.createElement('div', { 'className': 'doc-option-argument', ...filterProps(props) });
export const Target = (props) => React.createElement('span', { 'className': classNames(props.className, 'doc-target'), ...filterProps(props) });
export const Footnote = (props) => React.createElement('div', { 'className': 'doc-footnote', ...filterProps(props) });
export const FootnoteReference = (props) => React.createElement(Reference, {className: classNames(props.className, 'doc-footnote-reference'), onClick: props.referenceOnClick, ...filterProps(props)});
export const Citation = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-citation'), ...filterProps(props) });
export const Label = (props) => React.createElement('div', { 'className': 'doc-footnote-label', ...filterProps(props)});
export const Toctree = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-toctree'), ...filterProps(props) });
export const Figure = (props) => React.createElement('div', { 'className': classNames(props.className, 'doc-figure'), ...filterProps(props) });
export const Rubric = (props) => React.createElement('p', { 'className': 'rubric', ...filterProps(props) });
export const Seealso = (props) => React.createElement('div', { 'className': 'doc-seealso', ...filterProps(props) });
export const Note = (props) => React.createElement('div', { 'className': 'doc-note', ...filterProps(props) });
export const RelLinks = (props) => React.createElement('div', { 'className': 'doc-rel-links', ...filterProps(props) });
export const Image = (props) => React.createElement('img', { 'className': 'doc-image',
					    'src': props.uri, ...filterProps(props) });
export const DescSignatureLine = (props) => React.createElement('div', { 'className': 'doc-desc-signature-line', ...filterProps(props) });
export const LineBlock = (props) => React.createElement('div', { 'className': 'doc-line-block', ...filterProps(props) });
export const Line = (props) => React.createElement('div', { 'className': 'doc-line', ...filterProps(props) });
export const OptionString = (props) => React.createElement('div', { 'className': 'doc-option-string', ...filterProps(props) });
export const Sidebar = (props) => React.createElement('div', { 'className': 'doc-sidebar', ...filterProps(props) });
export const Meta = (props) => React.createElement('div', { 'className': 'doc-meta', ...filterProps(props) });
export const Attribution = (props) => React.createElement('div', { 'className': 'doc-attributon', ...filterProps(props) });
export const BlockQuote = (props) => React.createElement('div', { 'className': 'doc-block-quote', ...filterProps(props) });
export const Warning = (props) => React.createElement('div', { 'className': 'doc-warning', ...filterProps(props) });
export const Tip = (props) => React.createElement('div', { 'className': 'doc-tip', ...filterProps(props) });
export const Manpage = (props) => React.createElement('span', { 'className': 'doc-manpage', ...filterProps(props) });
export const NumberReference = (props) => React.createElement(Reference, { 'className': 'doc-number-reference', ...filterProps(props) });
export const Abbreviation = (props) => React.createElement('span', { 'className': 'doc-abbreviation', ...filterProps(props) });
export const TabularColSpec = (props) => React.createElement('div', { 'className': 'doc-tabular-col-spec', ...filterProps(props) });
export const Tgroup = (props) => React.createElement('div', { 'className': 'doc-tgroup', ...filterProps(props) });
export const Legend = (props) => React.createElement('div', { 'className': 'doc-legend', ...filterProps(props) });
export const Container = wrapElement('div');
export const Topic = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-topic') });
export const DescType = props => null;
export const Comment = props => null;

export const DocumentLink = (props) => React.createElement('a', { onClick: props.referenceOnClick, 'href': props.xlinkHref, 'className': classNames(props.className, 'document-link') }, props.xlinkTitle);

export const DocumentLinks = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'document-links') });
export const DocumentToctree = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'document-toctree', props.master ? 'toctree-master' : '') });
export const ToctreeList = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'toctree-list') });
export const ToctreeListItem = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'toctree-list-item') });
export const ToctreeLink = (props) => React.createElement(props.getComponent('Reference'), { refuri: props.xlinkHref, 'className': classNames(props.className, 'toctree-link') }, props.children);
export const DocumentIndex = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-document-index') } );
export const DocumentRef = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-document-ref') } );
export const Links = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-links') } );
export const Caution = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-caution') } );
export const Acks = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-acks') } );
export const Raw = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-raw') } );
export const LocalToctree = (props) => React.createElement('div', { ...filterProps(props), 'className': classNames(props.className, 'doc-local-toctree') } );
export const components = {
    Section, Title, BulletList, ListItem, Inline, Document, Paragraph, CompactParagraph, Desc, DescSignature, DescAnnotation, DescAddname, DescName, DescContent, Literal, LiteralStrong, LiteralEmphasis, Index, Caption, Compound, DescParameterlist, DescParameterlist, DescParameter, DescParameter, TitleReference, FieldList, Field, FieldName, FieldBody, DescReturns, Table, Row, Entry, Tbody, Thead, LiteralBlock, DoctestBlock, Versionmodified, DefinitionList, DefinitionListItem, Term, Definition, Emphasis, Strong, EnumeratedList, DescOptional, Admonition, OptionList, OptionListItem, OptionGroup, Option, Description, OptionArgument, Target, Footnote, FootnoteReference, Citation, Label, Toctree, Figure, Topic, Rubric, Seealso, Note, RelLinks, Image, DescSignatureLine, LineBlock, Line, OptionString, Sidebar, Meta, Attribution, BlockQuote, Warning, Tip, Manpage, NumberReference, Abbreviation, TabularColSpec, Colspec, Tgroup, Legend, Container, Reference, DescType, Comment, DocumentLink, DocumentLinks, DocumentToctree, ToctreeList, ToctreeListItem, ToctreeLink, DocumentIndex, DocumentRef, Links, Caution, Acks, Raw, LocalToctree
};

export function getComponent(componentName, node, root, context) {
    return components[componentName];
};
