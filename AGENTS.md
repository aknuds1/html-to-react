# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Project Overview

html-to-react is a lightweight library that converts raw HTML to a React DOM structure. It parses HTML using htmlparser2, then traverses the resulting DOM tree and converts nodes to React elements. Supports custom processing instructions for selectively transforming specific DOM nodes and preprocessing hooks for general node mutation before processing.

## Development Commands

- `npm test` - Run ESLint + Mocha tests
- `npm run test-coverage` - Run tests with nyc coverage + lcov report
- `npm run test-html-coverage` - Generate and open HTML coverage report
- Run a single test: `npx mocha --require ts-node/register --extension ts 'test/html-to-react-tests.ts' --grep 'test name pattern'`

## Code Style

ESLint enforces (see `eslint.config.mjs`):
- Single quotes, mandatory semicolons
- Trailing commas in arrays, objects, imports, exports (but NOT function arguments)
- Max line length: 100 characters

Source is CommonJS JavaScript (`lib/`). Tests are TypeScript (`test/`).

## Architecture

**Entry point** (`index.js`) exports: `Parser`, `ProcessingInstructions`, `IsValidNodeDefinitions`, `ProcessNodeDefinitions`.

**Core flow** (`lib/parser.js`):
1. `parseHtmlToTree()` - htmlparser2 parses HTML string into a DOM tree (filtering out directives)
2. `traverseDom()` - Recursively walks the tree: applies preprocessing instructions (mutating nodes in-place), then finds the first matching processing instruction via `shouldProcessNode`, and calls its `processNode`
3. `parse()` - Simple API using default processing instructions
4. `parseWithInstructions()` - Full API accepting custom `isValidNode`, processing instructions, and preprocessing instructions

**Processing instructions** are objects with `{ shouldProcessNode, processNode, replaceChildren? }`. Order matters - the first matching instruction wins. A catch-all instruction using `processDefaultNode` should always be last.

**`replaceChildren: true`** on an instruction causes the parent element to be preserved while its children are replaced with the `processNode` result.

**`lib/utils.js`** handles HTML-to-React attribute conversion: `class` -> `className`, `for` -> `htmlFor`, style strings to objects, boolean attributes, camelCase mapping, and custom element passthrough (elements with hyphens keep attributes as-is).

## TypeScript

- Type declarations are generated from JS source via `tsc` (config in `tsconfig.json`)
- Generated `.d.ts` files go to `types/` directory
- Tests use ts-node for direct TypeScript execution

## Node Version

Volta pins a certain version of Node (see `package.json`).
