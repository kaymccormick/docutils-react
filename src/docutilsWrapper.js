/*
 * module
 * @module docutilsWrapper
*/
import modern from './modern';
import styled from '@emotion/styled';
import React from 'react'

const modernComponents = modern(React.createElement)

const components = { ... modernComponents }
components.LiteralBlock = styled(modernComponents.LiteralBlock)`
white-space: pre;
font-family: monospace;
`;

/* Admonition */
components.Admonition = styled(modernComponents.Admonition)`
    margin: 1em;
    border: 1px dashed black;
    padding-left: .66rem;
`;

components.RelLinks = styled(modernComponents.RelLinks)`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  grid-area: rellinks;
  * {
    padding: .25rem;
    border: 1px dashed black;
  }
`;

const DocumentLink = styled(modernComponents.DocumentLink)``;

components.DocumentLinks = styled(modernComponents.DocumentLinks)`
 display: block;
 padding: 1em;
 border-radius: 3px;
 border: 1px solid gray;
 ${DocumentLink} {
    padding: 1rem;
 }
`;

components.Document = styled(modernComponents.Document)`padding: 1em;`;

components.DocumentLink = DocumentLink;

export function getComponent(componentName, node, root, context) {
    return components[componentName];
};
