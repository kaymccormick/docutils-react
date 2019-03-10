/*
 * module
 * @module docutilsWrapper
*/
import * as docutils from './index';
import styled from '@emotion/styled';

const components = { ...docutils.components };
components.LiteralBlock = styled(docutils.components.LiteralBlock)`
white-space: pre;
font-family: monospace;
`;

/* Admonition */
components.Admonition = styled(docutils.components.Admonition)`
    margin: 1em;
    border: 1px dashed black;
    padding-left: .66rem;
`;

components.RelLinks = styled(docutils.components.RelLinks)`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  grid-area: rellinks;
  * {
    padding: .25rem;
    border: 1px dashed black;
  }
`;

const DocumentLink = styled(docutils.components.DocumentLink)``;

components.DocumentLinks = styled(docutils.components.DocumentLinks)`
 display: block;
 padding: 1em;
 border-radius: 3px;
 border: 1px solid gray;
 ${DocumentLink} {
    padding: 1rem;
 }
`;

components.Document = styled(docutils.components.Document)`padding: 1em;`;

components.DocumentLink = DocumentLink;

export function getComponent(componentName, node, root, context) {
    return components[componentName];
};
