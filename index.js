import React from 'react';
import classNames from 'classnames';

import BaseComponent from './lib/BaseComponent';
import Document from './lib/Document';
import Desc from './lib/Desc';
import Reference from './lib/Reference';

// sphinx.addnodes: translatable toctree desc desc_signature desc_signature_line desc_addname desc_addname desc_type desc_returns desc_name desc_parameterlist desc_parameter desc_optional desc_annotation desc_content versionmodified seealso productionlist production math math_block displaymath index centered acks
//hlist hlistcol compact_paragraph glossary only start_of_file highlightlang tabular_col_spec meta pending_xref number_reference download_reference literal_emphasis literal_strong abbreviation manpage'

// (Node Text Element TextElement FixedTextElement) document title subtitle rubric docinfo author authors organization address contact version revision status date copyright decoration header footer section topic sidebar transition paragraph compound container bullet_list enumerated_list list_item definition_list definition_list_item term classifier definition field_list field field_name field_body option option_argument option_group option_list option_list_item option_string description literal_block doctest_block math_block line_block line block_quote attribution attention caution danger error important note tip hint warning admonition comment substitution_definition target footnote citation label figure caption legend table tgroup colspec thead tbody row entry system_message pending raw emphasis strong literal reference footnote_reference citation_reference substitution_reference title_reference abbreviation acronym superscript subscript math image inline problematic generated

/* basic element wrapping.
   this still passes unwanted props to the underlying element */

function wrapElement(element) {
    return class extends BaseComponent {
	render() {
	    return React.createElement(element, filterProps(this.props), this.state._children);
	}
    };
}

/* rudimentary prop filtering function */
function filterProps(props) {
    const suppressProps = ['docutils', /*'className', */'class', 'names', 'ids', 'backrefs', 'auto', 'children',
			   'referenceOnClick', 'navigateToDocument', '_children', 'getComponent'];
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
export const Title = class Title extends BaseComponent {
    render() {
	return React.createElement('h1', { 'className': classNames(this.props.className, 'doc-title') }, this.state._children);
    }
};

export const BulletList = wrapElement('ul');
export const ListItem = wrapElement('li');

export const Inline = class Inline extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': classNames(this.props.className, 'doc-inline'), ...filterProps(this.props) }, this.state._children);
    }
}

export const Paragraph = class Paragraph extends BaseComponent {
    render() {
	return React.createElement('p', { 'className': classNames(this.props.className, 'paragraph') , ...filterProps(this.props)}, this.state._children);
    }
}

export const CompactParagraph = class CompactParagraph extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames('compact-paragraph'), ...filterProps(this.props) }, this.state._children);
    }
};


export const DescSignature = class DescSignature extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames('doc-desc-signature'), ...filterProps(this.props) }, this.state._children);
    }
};

export const DescAnnotation = class DescAnnotation extends BaseComponent {
    render() {
	return React.createElement('em', { 'className': classNames(this.props.className, 'doc-desc-annotation'), ...filterProps(this.props) }, this.state._children);
    }
}

export const DescAddname = class DescAddname extends BaseComponent {
    render() {
	return React.createElement('code', { 'className': classNames(this.props.className, 'doc-desc-addname'), ...filterProps(this.props) }, this.state._children);
    }
}

export const DescName = class DescName extends BaseComponent {
    render() {
	return React.createElement('code', { 'className': classNames(this.props.className, 'doc-desc-name'), ...filterProps(this.props) }, this.state._children);
    }
}

export const DescContent = class DescContent extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames('doc-desc-content'), ...filterProps(this.props) }, this.state._children);
    }
}

export const Literal = class Literal extends BaseComponent {
    render() {
	return React.createElement('code', { 'className': classNames(this.props.className, 'doc-literal'), ...filterProps(this.props) }, this.state._children);
    }
};
export const LiteralStrong = class LiteralStrong extends BaseComponent {
    render() {
	return React.createElement('code', { 'className': classNames('literal-strong'), ...filterProps(this.props) }, this.state._children);
    }
};
export const LiteralEmphasis = class LiteralEmphasis extends BaseComponent {
    render() {
	return React.createElement('code', { 'className': classNames('literal-emphasis'), ...filterProps(this.props) }, this.state._children);
    }
};

/* We dont need a component for Index */
export const Index = (props) => null;

export const Caption = class Caption extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames('doc-caption'), ...filterProps(this.props) }, this.state._children);
    }
};

export const Compound = class Compound extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-compound'), ...filterProps(this.props) }, this.state._children);
    }
};

export const DescParameterlist = class DescParameterlist extends BaseComponent {
    render() {
	return React.createElement('ul', { 'className': classNames(this.props.className, 'parameter-list'), ...filterProps(this.props) }, this.state._children);
    }
};

export const DescParameter = class DescParameter extends BaseComponent {
    render() {
	return React.createElement('li', { 'className': classNames(this.props.className, 'parameter-item'), ...filterProps(this.props) }, this.state._children);
    }
};

export const TitleReference = class TitleReference extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': classNames(this.props.className, 'doc-title-reference'), ...filterProps(this.props) }, this.state._children);
    }
};
export const FieldList = class FieldList extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-field-list'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Field = class Field extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-field'), ...filterProps(this.props) }, this.state._children);
    }
};
export const FieldName = class FieldName extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-field-name'), ...filterProps(this.props) }, this.state._children);
    }
};
export const FieldBody = class FieldBody extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-field-body'), ...filterProps(this.props) }, this.state._children);
    }
};
export const DescReturns = class DescReturns extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': classNames(this.props.className, 'doc-returns'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Colspec = class Colspec extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-colspec' }, this.state._children);
    }
};

export const Table = props => {
    const children = []
    for (let child of props._children) {
	if(child.type === Title) {
	    children.push(React.createElement('caption', { ...filterProps(props), key: 'caption' }, child.props._children));
	} else if(child.type === Colspec) {
	} else if(child.type == Tgroup) {
	    children.splice(children.length, ...child.props._children);
	} else {
	    children.push(child);
	}

    }
    return React.createElement('table', {}, children);
};

export const Row = class Row extends BaseComponent {
    render() {
	return React.createElement('tr', { 'className': classNames(this.props.className, 'doc-row') }, this.state._children);
    }
};


// componentize TODO
export const Entry = function(props) {
    let attrs = {};
    if(props.morecols) {
        attrs.colSpan = props.morecols + 1;
    }
    if(props.morerows) {
        attrs.rowSpan = props.morerows + 1;
    }
    return React.createElement('td', attrs, props._children);
};

export const Tbody = class Tbody extends BaseComponent {
    render() {
	return React.createElement('tbody', filterProps(this.props), this.state._children);
    }
};

export const Thead = class Thead extends BaseComponent {
    render() {
	return React.createElement('thead', filterProps(this.props), this.state._children);
    }
};
function make_class(name) {
    return name.replace('+', '_');
}

export const LiteralBlock = class LiteralBlock extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-literal-block', this.props.language ? ('doc-language-' + make_class(this.props.language)) : '') }, this.state._children);
    }
};

export const DoctestBlock = class DoctestBlock extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-doctest-block'), ...filterProps(this.props) }, this.state._children);
    }
};

export const Versionmodified = class Versionmodified extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'versionmodified'), ...filterProps(this.props) }, this.state._children);
    }
};

export const DefinitionList = class DefinitionList extends BaseComponent {
    render() {
	return React.createElement('dl', { 'className': classNames(this.props.className, 'doc-definition-list'), ...filterProps(this.props) }, this.state._children);
    }
};
export const DefinitionListItem = class DefinitionListItem extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-definition-list-item'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Term = class Term extends BaseComponent {
    render() {
	return React.createElement('dt', { 'className': classNames(this.props.className, 'doc-term'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Definition = class Definition extends BaseComponent {
    render() {
	return React.createElement('dd', { 'className': classNames(this.props.className, 'doc-definition'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Emphasis = class Emphasis extends BaseComponent {
    render() {
	return React.createElement('em', { 'className': classNames(this.props.className, 'doc-emphass'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Strong = class Strong extends BaseComponent {
    render() {
	return React.createElement('strong', { 'className': classNames(this.props.className, 'doc-strong'), ...filterProps(this.props) }, this.state._children);
    }
};
export const EnumeratedList = class EnumeratedList extends BaseComponent {
    render() {
	return React.createElement('ol', { 'className': classNames(this.props.className, 'doc-enumerated-list'), ...filterProps(this.props) }, this.state._children);
    }
};
export const DescOptional = class DescOptional extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': classNames(this.props.className, 'doc-desc-optional'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Admonition = class Admonition extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-admonition', ...filterProps(this.props) }, this.state._children);
    }
};
export const OptionList = class OptionList extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-option-list', ...filterProps(this.props) }, this.state._children);
    }
};
export const OptionListItem = class OptionListItem extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-option-list-item', ...filterProps(this.props) }, this.state._children);
    }
};
export const OptionGroup = class OptionGroup extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-option-group', ...filterProps(this.props) }, this.state._children);
    }
};
export const Option = class Option extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-option', ...filterProps(this.props) }, this.state._children);
    }
};
export const Description = class Description extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-description', ...filterProps(this.props) }, this.state._children);
    }
};
export const OptionArgument = class OptionArgument extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-option-argument', ...filterProps(this.props) }, this.state._children);
    }
};
export const Target = class Target extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': classNames(this.props.className, 'doc-target'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Footnote = class Footnote extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-footnote', ...filterProps(this.props) }, this.state._children);
    }
};
export const FootnoteReference = class FootnoteReference extends BaseComponent {
    render() {
	return React.createElement(Reference, {className: classNames(this.props.className, 'doc-footnote-reference'), onClick: this.props.referenceOnClick, ...filterProps(this.props)}, this.state._children);
    }
};
export const Citation = class Citation extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-citation'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Label = class Label extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-footnote-label', ...filterProps(this.props)}, this.state._children);
    }
};
export const Toctree = class Toctree extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-toctree'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Figure = class Figure extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': classNames(this.props.className, 'doc-figure'), ...filterProps(this.props) }, this.state._children);
    }
};
export const Rubric = class Rubric extends BaseComponent {
    render() {
	return React.createElement('p', { 'className': 'rubric', ...filterProps(this.props) }, this.state._children);
    }
};
export const Seealso = class Seealso extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-seealso', ...filterProps(this.props) }, this.state._children);
    }
};
export const Note = class Note extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-note', ...filterProps(this.props) }, this.state._children);
    }
};
export const RelLinks = class RelLinks extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-rel-links', ...filterProps(this.props) }, this.state._children);
    }
};
export const Image = class Image extends BaseComponent {
    render() {
	return React.createElement('img', { 'className': 'doc-image',
					    'src': this.props.uri, ...filterProps(this.props) });
    }
};
export const DescSignatureLine = class DescSignatureLine extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-desc-signature-line', ...filterProps(this.props) }, this.state._children);
    }
};
export const LineBlock = class LineBlock extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-line-block', ...filterProps(this.props) }, this.state._children);
    }
};
export const Line = class Line extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-line', ...filterProps(this.props) }, this.state._children);
    }
};
export const OptionString = class OptionString extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-option-string', ...filterProps(this.props) }, this.state._children);
    }
};
export const Sidebar = class Sidebar extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-sidebar', ...filterProps(this.props) }, this.state._children);
    }
};
export const Meta = class Meta extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-meta', ...filterProps(this.props) }, this.state._children);
    }
};
export const Attribution = class Attribution extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-attributon', ...filterProps(this.props) }, this.state._children);
    }
};
export const BlockQuote = class BlockQuote extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-block-quote', ...filterProps(this.props) }, this.state._children);
    }
};
export const Warning = class Warning extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-warning', ...filterProps(this.props) }, this.state._children);
    }
};
export const Tip = class Tip extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-tip', ...filterProps(this.props) }, this.state._children);
    }
};
export const Manpage = class Manpage extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': 'doc-manpage', ...filterProps(this.props) }, this.state._children);
    }
};
export const NumberReference = class NumberReference extends BaseComponent {
    render() {
	return React.createElement(Reference, { 'className': 'doc-number-reference', ...filterProps(this.props) }, this.state._children);
    }
};
export const Abbreviation = class Abbreviation extends BaseComponent {
    render() {
	return React.createElement('span', { 'className': 'doc-abbreviation', ...filterProps(this.props) }, this.state._children);
    }
};
export const TabularColSpec = class TabularColSpec extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-tabular-col-spec', ...filterProps(this.props) }, this.state._children);
    }
};
export const Tgroup = class Tgroup extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-tgroup', ...filterProps(this.props) }, this.state._children);
    }
};
export const Legend = class Legend extends BaseComponent {
    render() {
	return React.createElement('div', { 'className': 'doc-legend', ...filterProps(this.props) }, this.state._children);
    }
};

export const Container = wrapElement('div');
export const Topic = class Topic extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-topic') }, this.state._children);
    }
};

export const DescType = props => null;
export const Comment = props => null;

export const DocumentLink = class DocumentLink extends BaseComponent {
    constructor(props) {
	super(props);
    }
    
    render() {
	return React.createElement('a', { onClick: this.props.referenceOnClick, 'href': this.props.xlinkHref, 'className': classNames(this.props.className, 'document-link') }, this.props.xlinkTitle);
    }
};

export const DocumentLinks = class DocumentLinks extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'document-links') }, this.state._children);
    }
};
export const DocumentToctree = class DocumentToctree extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'document-toctree', this.props.master ? 'toctree-master' : '') }, this.state._children);
    }
};
export const ToctreeList = class ToctreeList extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'toctree-list') }, this.state._children);
    }
};
export const ToctreeListItem = class ToctreeListItem extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'toctree-list-item') }, this.state._children);
    }
};
export const ToctreeLink = class ToctreeLink extends BaseComponent {
    render() {
	return React.createElement(this.props.getComponent('Reference'), { refuri: this.props.xlinkHref, 'className': classNames(this.props.className, 'toctree-link'), _children: this.state._children });
    }
};
export const DocumentIndex = class DocumentIndex extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-document-index') } , this.state._children);
    }
};
export const DocumentRef = class DocumentRef extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-document-ref') } , this.state._children);
    }
};
export const Links = class Links extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-links') } , this.state._children);
    }
};
export const Caution = class Caution extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-caution') } , this.state._children);
    }
};
export const Acks = class Acks extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-acks') } , this.state._children);
    }
};
export const Raw = class Raw extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-raw') } , this.state._children);
    }
};
export const LocalToctree = class LocalToctree extends BaseComponent {
    render() {
	return React.createElement('div', { ...filterProps(this.props), 'className': classNames(this.props.className, 'doc-local-toctree') } , this.state._children);
    }
};

export const components = {
    Section, Title, BulletList, ListItem, Inline, Document, Paragraph, CompactParagraph, Desc, DescSignature, DescAnnotation, DescAddname, DescName, DescContent, Literal, LiteralStrong, LiteralEmphasis, Index, Caption, Compound, DescParameterlist, DescParameterlist, DescParameter, DescParameter, TitleReference, FieldList, Field, FieldName, FieldBody, DescReturns, Table, Row, Entry, Tbody, Thead, LiteralBlock, DoctestBlock, Versionmodified, DefinitionList, DefinitionListItem, Term, Definition, Emphasis, Strong, EnumeratedList, DescOptional, Admonition, OptionList, OptionListItem, OptionGroup, Option, Description, OptionArgument, Target, Footnote, FootnoteReference, Citation, Label, Toctree, Figure, Topic, Rubric, Seealso, Note, RelLinks, Image, DescSignatureLine, LineBlock, Line, OptionString, Sidebar, Meta, Attribution, BlockQuote, Warning, Tip, Manpage, NumberReference, Abbreviation, TabularColSpec, Colspec, Tgroup, Legend, Container, Reference, DescType, Comment, DocumentLink, DocumentLinks, DocumentToctree, ToctreeList, ToctreeListItem, ToctreeLink, DocumentIndex, DocumentRef, Links, Caution, Acks, Raw, LocalToctree
};

export function getComponent(componentName, node, root, context) {
    return components[componentName];
};
