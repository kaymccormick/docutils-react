import { getComponentForXml } from "./getComponentForXmlSax";
import xpath from "xpath";
import React from "react";
import { renderToString } from "react-dom/server";
import renderer from "react-test-renderer";

const xmlVersionPragma = '<?xml version="1.0" encoding="utf-8"?>';
const doctypeDecl =
  '<!DOCTYPE document PUBLIC "+//IDN docutils.sourceforge.net//DTD Docutils Generic//EN//XML" "http://docutils.sourceforge.net/docs/ref/docutils.dtd">';
const docutilsComment = "<!-- Generated by Docutils 0.14 -->";

test("full docutils xml; single paragraph", () => {
  //    const container = (props) => { const _props = props; delete _props._children; return <div {..._props}>{props._children}</div>; };
  return getComponentForXml(
    '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE document PUBLIC "+//IDN docutils.sourceforge.net//DTD Docutils Generic//EN//XML" "http://docutils.sourceforge.net/docs/ref/docutils.dtd"><!-- Generated by Docutils 0.14 --><document><paragraph>test</paragraph></document>',
    {
      /*container*/
    }
  ).then(component => {
    expect(component).not.toBeUndefined();
    expect(renderer.create(component).toJSON()).toMatchInlineSnapshot(`
.emotion-0 {
  padding: 1em;
}

<div
  className="emotion-0 emotion-1 docutils-document document"
>
  <p
    className="paragraph"
  >
    test
  </p>
</div>
`);
    //	var DOMParser = require('xmldom').DOMParser;
    //	var domDoc = new DOMParser().parseFromString(strRender);
    //	var nodes = xpath.select('/div[contains(@class, "document")]', domDoc);
    //	expect(nodes).toHaveLength(1);
  });
});

test("parses a fragment containing only document node", () => {
  //    const container = (props) => { const _props = props; delete _props._children; return <div {..._props}>{props._children}</div>; };
  return getComponentForXml(
    '<document><section ids="introduction" names="introduction">        <title>Introduction</title>        <paragraph>This sample project is a demonstration of a React-based application            hosting a DocumentViewer component. The DocumentViewer component is            designed to process Docutils XML into a React component tree for            rendering. Itï¿½s especially designed for Sphinx XML output but should            also work with vanilla Docutils output (such as from <literal>rst2xml</literal>).</paragraph></section></document>',
    {
      /*container*/
    }
  ).then(component => {
    expect(component).not.toBeUndefined();
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
    //	const strRender = renderToString(component);
    //	var DOMParser = require('xmldom').DOMParser;
    //	var domDoc = new DOMParser().parseFromString(strRender);
    //	var nodes = xpath.select('/div[contains(@class, "document")]', domDoc);
    //	expect(nodes).toHaveLength(1);
  });
});

test.each([
  ["self-closing document tag", "<document/>"],
  [
    "test",
    '<reference name="ref-name" refuri="https://heptet.us/external">lala</reference>'
  ],
  [
    "links",
    '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE document PUBLIC "+//IDN docutils.sourceforge.net//DTD Docutils Generic//EN//XML" "http://docutils.sourceforge.net/docs/ref/docutils.dtd"><!-- Generated by Docutils 0.14 --><document source="" xmlns:xlink="http://www.w3.org/1999/xlink">    <document_toctree docname="index" master="True">        <caption>Contents:</caption>        <toctree_list>            <toctree_list_item>                <toctree_link xlink:href="intro">Introduction                </toctree_link>                <toctree_list>                    <toctree_list_item>                        <toctree_link xlink:href="intro#dependencies">Dependencies                        </toctree_link>                    </toctree_list_item>                    <toctree_list_item>                        <toctree_link xlink:href="intro#middle-section">Middle Section                        </toctree_link>                    </toctree_list_item>                    <toctree_list_item>                        <toctree_link xlink:href="intro#final-section">Final Section                        </toctree_link>                    </toctree_list_item>                </toctree_list>            </toctree_list_item>            <toctree_list_item>                <toctree_link xlink:href="other_junk">Other Junk                </toctree_link>            </toctree_list_item>        </toctree_list>    </document_toctree>    <links>        <document_ref xmlns:href="testdoc1" xmlns:role="http://heptet.us/linkprops/document">        </document_ref>        <document_ref xmlns:href="other_junk" xmlns:role="http://heptet.us/linkprops/document">        </document_ref>        <document_ref xmlns:href="intro" xmlns:role="http://heptet.us/linkprops/document">        </document_ref>        <document_ref xmlns:href="index" xmlns:role="http://heptet.us/linkprops/document">        </document_ref>        <document_ref xmlns:href="a/a1" xmlns:role="http://heptet.us/linkprops/document">        </document_ref>        <document_link xlink:role="http://heptet.us/linkprops/parent" xlink:title="Parent">        </document_link>        <document_link xlink:role="http://heptet.us/linkprops/previous" xlink:title="Previous topic">        </document_link>        <document_link xlink:href="intro" xlink:role="http://heptet.us/linkprops/next" xlink:title="Next topic">            <reference refuri="intro">Introduction</reference>        </document_link>        <document_link xlink:href="index" xlink:role="http://heptet.us/linkprops/parent" xlink:title="Parent">            <reference refuri="index">Sphinx/Docutils Doc Browser</reference>        </document_link>        <document_link xlink:href="index" xlink:role="http://heptet.us/linkprops/previous" xlink:title="Previous topic">            <reference refuri="index">Sphinx/Docutils Doc Browser</reference>        </document_link>        <document_link xlink:href="other_junk" xlink:role="http://heptet.us/linkprops/next" xlink:title="Next topic">            <reference refuri="other_junk">Other Junk</reference>        </document_link>        <document_link xlink:href="https://www.npmjs.com/package/docutils-react" xlink:label="link_docutils-react" xlink:title="docutils-react">        </document_link>        <document_link xlink:href="https://www.npmjs.com/package/sphinx-build-client" xlink:label="link_sphinx-build-client" xlink:title="sphinx-build-client">        </document_link>        <document_link xlink:href="https://www.npmjs.com/package/grunt-sphinx-plugin" xlink:label="link_grunt-sphinx-plugin" xlink:title="grunt-sphinx-plugin">        </document_link>        <document_link xlink:href="#example" xlink:label="link_example" xlink:title="example">        </document_link>        <document_link xlink:href="index" xlink:role="http://heptet.us/linkprops/parent" xlink:title="Parent">            <reference refuri="index">Sphinx/Docutils Doc Browser</reference>        </document_link>        <document_link xlink:href="intro" xlink:role="http://heptet.us/linkprops/previous" xlink:title="Previous topic">            <reference refuri="intro">Introduction</reference>        </document_link>        <document_link xlink:role="http://heptet.us/linkprops/next" xlink:title="Next topic">        </document_link>    </links></document>'
  ],
  [
    "1",
    '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE document PUBLIC "+//IDN docutils.sourceforge.net//DTD Docutils Generic//EN//XML" "http://docutils.sourceforge.net/docs/ref/docutils.dtd"><!-- Generated by Docutils 0.14 --><document source="" xmlns:xlink="http://www.w3.org/1999/xlink">    <document_toctree docname="contents" master="True">        <toctree_list>            <toctree_list_item>                <toctree_link xlink:href="whatsnew/index">Whats New in Python                </toctree_link>            </toctree_list_item>        </toctree_list>    </document_toctree></document>'
  ]
])("snippet %s", (name, xml) => {
  return getComponentForXml(xml).then(component => {
    //a.forEach(cb => cb(component));
    expect(renderer.create(component).toJSON()).toMatchSnapshot(name);
    //	const strRender = renderToString(component);
    //	var DOMParser = require('xmldom').DOMParser;
    //	var domDoc = new DOMParser().parseFromString(strRender);
    //	var nodes = xpath.select('/div[contains(@class, "document")]', domDoc);
    //	expect(nodes).toHaveLength(1);
  });
});
