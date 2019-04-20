import React from 'react';
import classNames from 'classnames';
import { wrapElement, filterProps } from './utils';

export default function (e) {
    const w = wrapElement(e);

    const Reference = (props) => {
	    let href;
	    if (props.refuri) {
		href = props.refuri;
	    } else if (props.refid) {
		href = `#${props.refid}`;
	    }
	    return e('a', { href, className: classNames(props.className, 'reference') }, props.children);
    };

    return {
	Reference,
	/**/ Document: props => e('div', { id: props.id, className: classNames(props.className, 'docutils-document document') }, props.children),
	/**/ Desc: props => e('div', { className: classnames(props.className, 'doc-desc', `doc-domain-${props.domain}`, `doc-objtype-${props.objType}`, `doc-desctype-${props.descType}`) }, props.children),
	/**/ Section: w('section'),
	/**/ Title: props => e('h1', { className: classNames(props.className, 'doc-title') }, props.children),
	/**/ BulletList: w('ul'),
	/**/ ListItem: w('li'),
	/**/ Inline: props => e('span', { className: classNames(props.className, 'doc-inline'), ...filterProps(props) }),
	/**/ Paragraph: props => e('p', { className: classNames(props.className, 'paragraph'), ...filterProps(props) }),
	/**/ CompactParagraph: props => e('div', { className: classNames('compact-paragraph'), ...filterProps(props) }),
	/**/ DescSignature: props => e('div', { className: classNames('doc-desc-signature'), ...filterProps(props) }),
	/**/ DescAnnotation: props => e('em', { className: classNames(props.className, 'doc-desc-annotation'), ...filterProps(props) }),
	/**/ DescAddname: props => e('code', { className: classNames(props.className, 'doc-desc-addname'), ...filterProps(props) }),
	/**/ DescName: props => e('code', { className: classNames(props.className, 'doc-desc-name'), ...filterProps(props) }),
	/**/ DescContent: props => e('div', { className: classNames('doc-desc-content'), ...filterProps(props) }),
	/**/ Literal: props => e('code', { className: classNames(props.className, 'doc-literal'), ...filterProps(props) }),
	/**/ LiteralStrong: props => e('code', { className: classNames('literal-strong'), ...filterProps(props) }),
	/**/ LiteralEmphasis: props => e('code', { className: classNames('literal-emphasis'), ...filterProps(props) }),
	/**/ Index: props => null,
	/**/ Caption: props => e('div', { className: classNames('doc-caption'), ...filterProps(props) }),
	/**/ Compound: props => e('div', { className: classNames(props.className, 'doc-compound'), ...filterProps(props) }),
	/**/ DescParameterlist: props => e('ul', { className: classNames(props.className, 'parameter-list'), ...filterProps(props) }),
	/**/ DescParameter: props => e('li', { className: classNames(props.className, 'parameter-item'), ...filterProps(props) }),
	/**/ TitleReference: props => e('span', { className: classNames(props.className, 'doc-title-reference'), ...filterProps(props) }),
	/**/ FieldList: props => e('div', { className: classNames(props.className, 'doc-field-list'), ...filterProps(props) }),
	/**/ Field: props => e('div', { className: classNames(props.className, 'doc-field'), ...filterProps(props) }),
	/**/ FieldName: props => e('div', { className: classNames(props.className, 'doc-field-name'), ...filterProps(props) }),
	/**/ FieldBody: props => e('div', { className: classNames(props.className, 'doc-field-body'), ...filterProps(props) }),
	/**/ DescReturns: props => e('span', { className: classNames(props.className, 'doc-returns'), ...filterProps(props) }),
	/**/ Colspec: props => e('div', { className: 'doc-colspec' }),
	/**/ Table: (props) => {
	    const children = [];
	    for (const child of props.children) {
		if (child.type === 'Title') {
		    children.push(e('caption', { ...filterProps(props), key: 'caption' }, child.props.children));
		} else if (child.type === 'Colspec') {
		} else if (child.type === 'Tgroup') {
		    children.splice(children.length, ...child.props.children);
		} else {
		    children.push(child);
		}
	    }
	    return e('table', {}, children);
	},

	/**/ Row: props => e('tr', { className: classNames(props.className, 'doc-row') }, props.children),
	// componentize TODO
	/**/ Entry(props) {
	    const attrs = {};
	    if (props.morecols) {
		attrs.colSpan = props.morecols + 1;
	    }
	    if (props.morerows) {
		attrs.rowSpan = props.morerows + 1;
	    }
	    return e('td', attrs, props.children);
	},

	/**/ Tbody: props => e('tbody', filterProps(props)),
	/**/ Thead: props => e('thead', filterProps(props)),
	/**/ LiteralBlock: props => e('div', { className: classNames(props.className, 'doc-literal-block', props.language ? (`doc-language-${make_class(props.language)}`) : '') }),
	/**/ DoctestBlock: props => e('div', { className: classNames(props.className, 'doc-doctest-block'), ...filterProps(props) }),
	/**/ Versionmodified: props => e('div', { className: classNames(props.className, 'versionmodified'), ...filterProps(props) }),
	/**/ DefinitionList: props => e('dl', { className: classNames(props.className, 'doc-definition-list'), ...filterProps(props) }),
	/**/ DefinitionListItem: props => e('div', { className: classNames(props.className, 'doc-definition-list-item'), ...filterProps(props) }),
	/**/ Term: props => e('dt', { className: classNames(props.className, 'doc-term'), ...filterProps(props) }),
	/**/ Definition: props => e('dd', { className: classNames(props.className, 'doc-definition'), ...filterProps(props) }),
	/**/ Emphasis: props => e('em', { className: classNames(props.className, 'doc-emphass'), ...filterProps(props) }),
	/**/ Strong: props => e('strong', { className: classNames(props.className, 'doc-strong'), ...filterProps(props) }),
	/**/ EnumeratedList: props => e('ol', { className: classNames(props.className, 'doc-enumerated-list'), ...filterProps(props) }),
	/**/ DescOptional: props => e('span', { className: classNames(props.className, 'doc-desc-optional'), ...filterProps(props) }),
	/**/ Admonition: props => e('div', { className: 'doc-admonition', ...filterProps(props) }),
	/**/ OptionList: props => e('div', { className: 'doc-option-list', ...filterProps(props) }),
	/**/ OptionListItem: props => e('div', { className: 'doc-option-list-item', ...filterProps(props) }),
	/**/ OptionGroup: props => e('div', { className: 'doc-option-group', ...filterProps(props) }),
	/**/ Option: props => e('div', { className: 'doc-option', ...filterProps(props) }),
	/**/ Description: props => e('div', { className: 'doc-description', ...filterProps(props) }),
	/**/ OptionArgument: props => e('div', { className: 'doc-option-argument', ...filterProps(props) }),
	/**/ Target: props => e('span', { className: classNames(props.className, 'doc-target'), ...filterProps(props) }),
	/**/ Footnote: props => e('div', { className: 'doc-footnote', ...filterProps(props) }),
	/**/ FootnoteReference: props => e(Reference, { className: classNames(props.className, 'doc-footnote-reference'), onClick: props.referenceOnClick, ...filterProps(props) }),
	/**/ Citation: props => e('div', { className: classNames(props.className, 'doc-citation'), ...filterProps(props) }),
	/**/ Label: props => e('div', { className: 'doc-footnote-label', ...filterProps(props) }),
	/**/ Toctree: props => e('div', { className: classNames(props.className, 'doc-toctree'), ...filterProps(props) }),
	/**/ Figure: props => e('div', { className: classNames(props.className, 'doc-figure'), ...filterProps(props) }),
	/**/ Rubric: props => e('p', { className: 'rubric', ...filterProps(props) }),
	/**/ Seealso: props => e('div', { className: 'doc-seealso', ...filterProps(props) }),
	/**/ Note: props => e('div', { className: 'doc-note', ...filterProps(props) }),
	/**/ RelLinks: props => e('div', { className: 'doc-rel-links', ...filterProps(props) }),
	/**/ Image: props => e('img', { className: 'doc-image', src: props.uri, ...filterProps(props) }),
	/**/ DescSignatureLine: props => e('div', { className: 'doc-desc-signature-line', ...filterProps(props) }),
	/**/ LineBlock: props => e('div', { className: 'doc-line-block', ...filterProps(props) }),
	/**/ Line: props => e('div', { className: 'doc-line', ...filterProps(props) }),
	/**/ OptionString: props => e('div', { className: 'doc-option-string', ...filterProps(props) }),
	/**/ Sidebar: props => e('div', { className: 'doc-sidebar', ...filterProps(props) }),
	/**/ Meta: props => e('div', { className: 'doc-meta', ...filterProps(props) }),
	/**/ Attribution: props => e('div', { className: 'doc-attributon', ...filterProps(props) }),
	/**/ BlockQuote: props => e('div', { className: 'doc-block-quote', ...filterProps(props) }),
	/**/ Warning: props => e('div', { className: 'doc-warning', ...filterProps(props) }),
	/**/ Tip: props => e('div', { className: 'doc-tip', ...filterProps(props) }),
	/**/ Manpage: props => e('span', { className: 'doc-manpage', ...filterProps(props) }),
	/**/ NumberReference: props => e(Reference, { className: 'doc-number-reference', ...filterProps(props) }),
	/**/ Abbreviation: props => e('span', { className: 'doc-abbreviation', ...filterProps(props) }),
	/**/ TabularColSpec: props => e('div', { className: 'doc-tabular-col-spec', ...filterProps(props) }),
	/**/ Tgroup: props => e('div', { className: 'doc-tgroup', ...filterProps(props) }),
	/**/ Legend: props => e('div', { className: 'doc-legend', ...filterProps(props) }),
	/**/ Container: w('div'),
	/**/ Topic: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-topic') }),
	/**/ DescType: props => null,
	/**/ Comment: props => null,
	/**/ Transition: props => null,
	/**/ Problematic: props => null,
	/**/ SystemMessage: props => null,
	/**/ DocumentLink: props => e('a', { onClick: props.referenceOnClick, href: props.xlinkHref, className: classNames(props.className, 'document-link') }, props.xlinkTitle),
	/**/ DocumentLinks: props => e('div', { ...filterProps(props), className: classNames(props.className, 'document-links') }),
	/**/ DocumentToctree: props => e('div', { ...filterProps(props), className: classNames(props.className, 'document-toctree', props.master ? 'toctree-master' : '') }),
	/**/ ToctreeList: props => e('div', { ...filterProps(props), className: classNames(props.className, 'toctree-list') }),
	/**/ ToctreeListItem: props => e('div', { ...filterProps(props), className: classNames(props.className, 'toctree-list-item') }),
	/**/ ToctreeLink: props => e(props.getComponent('Reference'), { refuri: props.xlinkHref, className: classNames(props.className, 'toctree-link') }, props.children),
	/**/ DocumentIndex: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-document-index') }),
	/**/ DocumentRef: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-document-ref') }),
	/**/ Links: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-links') }),
	/**/ Caution: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-caution') }),
	/**/ Acks: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-acks') }),
	/**/ Raw: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-raw') }),
	/**/ LocalToctree: props => e('div', { ...filterProps(props), className: classNames(props.className, 'doc-local-toctree') }),
    };
}
