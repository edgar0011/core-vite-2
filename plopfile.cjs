// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const shell = require('shelljs')

// Helper function to parse command line arguments
function getArgValue(argName) {
  const argIndex = process.argv.findIndex((arg) => arg === `--${argName}`)
  return argIndex !== -1 && process.argv[argIndex + 1] ? process.argv[argIndex + 1] : null
}

// Helper function to parse component path
function parseComponentPath(componentPath) {
  const parts = componentPath.split('/')
  const name = parts[parts.length - 1]
  const modulePath = parts.slice(0, -1).join('/')
  return { module: modulePath, name }
}

module.exports = function (plop) {
  plop.setGenerator('Component', {
    description: 'Component controller logic',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'component module, or path please',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.tsx',
        templateFile: 'scripts/plop-templates/ui/component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.types.ts',
        templateFile: 'scripts/plop-templates/ui/component/component.types.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.stories.tsx',
        templateFile: 'scripts/plop-templates/ui/component/component.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.spec.tsx',
        templateFile: 'scripts/plop-templates/ui/component/component.spec.hbs',
      },
    ],
  })

  // New generator that accepts command-line arguments
  plop.setGenerator('component', {
    description: 'Generate component with command-line arguments (use --component "path/name")',
    prompts: (inquirer) => {
      const componentArg = getArgValue('component')

      if (componentArg) {
        // If --component argument is provided, skip prompts
        const { module, name } = parseComponentPath(componentArg)
        return Promise.resolve({ module, name })
      }

      // Fallback to prompts if no arguments provided
      return inquirer.prompt([
        {
          type: 'input',
          name: 'module',
          message: 'component module, or path please',
        },
        {
          type: 'input',
          name: 'name',
          message: 'component name please',
        },
      ])
    },
    actions: [
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.tsx',
        templateFile: 'scripts/plop-templates/ui/component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.types.ts',
        templateFile: 'scripts/plop-templates/ui/component/component.types.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.stories.tsx',
        templateFile: 'scripts/plop-templates/ui/component/component.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.spec.tsx',
        templateFile: 'scripts/plop-templates/ui/component/component.spec.hbs',
      },
    ],
  })

  // Headless component generator with view separation
  plop.setGenerator('headless-component', {
    description:
      'Generate headless component with separated view (use --component "path/name")',
    prompts: (inquirer) => {
      const componentArg = getArgValue('component')

      if (componentArg) {
        const { module, name } = parseComponentPath(componentArg)
        return Promise.resolve({ module, name })
      }

      return inquirer.prompt([
        {
          type: 'input',
          name: 'module',
          message: 'component module, or path please',
        },
        {
          type: 'input',
          name: 'name',
          message: 'component name please',
        },
      ])
    },
    actions: [
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.tsx',
        templateFile:
          'scripts/plop-templates/ui/headless-component/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.types.ts',
        templateFile:
          'scripts/plop-templates/ui/headless-component/component.types.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/{{kebabCase name}}.helpers.ts',
        templateFile:
          'scripts/plop-templates/ui/headless-component/component.helpers.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/views/{{kebabCase name}}.view.tsx',
        templateFile:
          'scripts/plop-templates/ui/headless-component/component.view.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/views/{{kebabCase name}}.view.stories.tsx',
        templateFile:
          'scripts/plop-templates/ui/headless-component/component.view.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{module}}/views/{{kebabCase name}}.view.spec.tsx',
        templateFile:
          'scripts/plop-templates/ui/headless-component/component.view.spec.hbs',
      },
    ],
  })
}
