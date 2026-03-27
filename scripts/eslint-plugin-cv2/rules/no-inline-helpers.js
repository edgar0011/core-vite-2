/**
 * Rule: graet/no-inline-helpers
 *
 * Warns when helper functions or constants are defined in component files
 * instead of in a co-located .helpers.ts file.
 *
 * Applies only to files that export a React component (default or named).
 * Ignores: type aliases, interfaces, props types, the component itself,
 * and simple one-liner constants (strings, numbers, booleans).
 */

const HELPERS_SUFFIX = /\.helpers\.(ts|tsx|js|jsx)$/
const COMPONENT_FILE = /\.(tsx|jsx)$/

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Helper functions and non-trivial constants should live in a .helpers.ts file, not in the component file',
    },
    schema: [],
    messages: {
      moveToHelpers:
        '"{{name}}" looks like a helper. Move it to a co-located .helpers.ts file.',
    },
  },

  create(context) {
    const filename = context.filename || context.getFilename()

    // Only apply to component files (.tsx/.jsx), skip .helpers, .spec, .stories, .types
    if (!COMPONENT_FILE.test(filename)) {
      return {}
    }
    if (
      HELPERS_SUFFIX.test(filename) ||
      /\.(spec|test|stories|types)\.(ts|tsx|js|jsx)$/.test(filename)
    ) {
      return {}
    }

    let hasComponentExport = false
    const candidates = []

    return {
      // Track if file exports a component (function returning JSX)
      ExportDefaultDeclaration(node) {
        hasComponentExport = true
      },
      ExportNamedDeclaration(node) {
        if (node.declaration) {
          hasComponentExport = true
        }
      },

      // Top-level function declarations (not the component itself)
      FunctionDeclaration(node) {
        if (node.parent.type !== 'Program' && node.parent.type !== 'ExportNamedDeclaration' && node.parent.type !== 'ExportDefaultDeclaration') {
          return
        }
        // Skip if it's a component (PascalCase)
        if (node.id && /^[A-Z]/.test(node.id.name)) {
          return
        }
        if (node.id) {
          candidates.push({ node, name: node.id.name })
        }
      },

      // Top-level const declarations that are functions or complex objects
      VariableDeclaration(node) {
        if (node.parent.type !== 'Program' && node.parent.type !== 'ExportNamedDeclaration') {
          return
        }

        for (const decl of node.declarations) {
          if (!decl.id || decl.id.type !== 'Identifier') {
            continue
          }
          const name = decl.id.name

          // Skip PascalCase (components), ALL_CAPS is fine here
          if (/^[A-Z][a-zA-Z]/.test(name)) {
            continue
          }

          const init = decl.init
          if (!init) {
            continue
          }

          // Arrow functions / function expressions → should be in helpers
          if (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression') {
            candidates.push({ node: decl, name })
            continue
          }

          // Non-trivial: arrays, objects, new expressions, call expressions
          if (
            init.type === 'ArrayExpression' ||
            init.type === 'ObjectExpression' ||
            init.type === 'NewExpression' ||
            init.type === 'CallExpression'
          ) {
            candidates.push({ node: decl, name })
          }
        }
      },

      'Program:exit'() {
        if (!hasComponentExport) {
          return
        }
        for (const { node, name } of candidates) {
          context.report({ node, messageId: 'moveToHelpers', data: { name } })
        }
      },
    }
  },
}
