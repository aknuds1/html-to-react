'use strict';

const parser = require('./lib/parser');
const processingInstructions = require('./lib/processing-instructions');
const isValidNodeDefinitions = require('./lib/is-valid-node-definitions');
const processNodeDefinitions = require('./lib/process-node-definitions');
const camelCaseAttributeNamesMap = require('lib/camel-case-attribute-names');

module.exports = {
  Parser: parser,
  ProcessingInstructions: processingInstructions,
  IsValidNodeDefinitions: isValidNodeDefinitions,
  ProcessNodeDefinitions: processNodeDefinitions,
  camelCaseAttributeNamesMap,
};
