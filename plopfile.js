export default function init(plop) {
  plop.setGenerator('component', {
    description: 'Add a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        validate: requireField('name'),
      },
      {
        type: 'confirm',
        name: 'wantMessages',
        default: true,
        message:
          'Do you want i18n messages (i.e. will this component use text)?',
      },
      {
        type: 'confirm',
        name: 'memo',
        default: false,
        message: 'Do you want to wrap your component in React.memo?',
      },
    ],

    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'src/components/{{properCase name}}/{{properCase name}}.js',
          templateFile: 'internals/plop-templates/component/component.js.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{properCase name}}/{{properCase name}}.test.js',
          templateFile:
            'internals/plop-templates/component/component.test.js.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{properCase name}}/{{properCase name}}.module.css',
          templateFile:
            'internals/plop-templates/component/component.module.css.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{properCase name}}/{{properCase name}}.stories.js',
          templateFile:
            'internals/plop-templates/component/component.stories.js.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{properCase name}}/index.js',
          templateFile: 'internals/plop-templates/component/index.js.hbs',
        },
        {
          type: 'add',
          path: 'src/components/index.js',
          templateFile: 'internals/plop-templates/injectable-index.js.hbs',
          skipIfExists: true,
        },
        {
          type: 'append',
          path: 'src/components/index.js',
          pattern: `/* PLOP_INJECT_IMPORT */`,
          template: `import {{properCase name}} from './{{properCase name}}';`,
        },
        {
          type: 'append',
          path: 'src/components/index.js',
          pattern: `/* PLOP_INJECT_EXPORT */`,
          template: `\t{{properCase name}},`,
        },
      ];

      // If the user wants i18n messages
      if (data.wantMessages) {
        actions.push({
          type: 'add',
          path: 'src/components/{{properCase name}}/{{properCase name}}.messages.js',
          templateFile:
            'internals/plop-templates/component/component.messages.js.hbs',
        });
      }

      return actions;
    },
  });

  plop.setGenerator('page', {
    description: 'Add a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
        validate: requireField('name'),
      },
      {
        type: 'confirm',
        name: 'wantMessages',
        default: true,
        message:
          'Do you want i18n messages (i.e. will this component use text)?',
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'src/pages/{{properCase name}}/{{properCase name}}.js',
          templateFile: 'internals/plop-templates/page/page.js.hbs',
        },
        {
          type: 'add',
          path: 'src/pages/{{properCase name}}/{{properCase name}}.test.js',
          templateFile: 'internals/plop-templates/page/page.test.js.hbs',
        },
        {
          type: 'add',
          path: 'src/pages/{{properCase name}}/{{properCase name}}.module.css',
          templateFile: 'internals/plop-templates/page/page.module.css.hbs',
        },
        {
          type: 'add',
          path: 'src/pages/{{properCase name}}/index.js',
          templateFile: 'internals/plop-templates/page/index.js.hbs',
        },
        {
          type: 'add',
          path: 'src/pages/index.js',
          templateFile: 'internals/plop-templates/injectable-index.js.hbs',
          skipIfExists: true,
        },
        {
          type: 'append',
          path: 'src/pages/index.js',
          pattern: `/* PLOP_INJECT_IMPORT */`,
          template: `import {{properCase name}} from './{{properCase name}}';`,
        },
        {
          type: 'append',
          path: 'src/pages/index.js',
          pattern: `/* PLOP_INJECT_EXPORT */`,
          template: `\t{{properCase name}},`,
        },
      ];

      // If the user wants i18n messages
      if (data.wantMessages) {
        actions.push({
          type: 'add',
          path: 'src/pages/{{properCase name}}/{{properCase name}}.messages.js',
          templateFile: 'internals/plop-templates/page/page.messages.js.hbs',
        });
      }

      return actions;
    },
  });

  plop.setGenerator('hook', {
    description: 'Add a custom hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your hook name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{dashCase name}}-hook.js',
        templateFile: 'internals/plop-templates/hook/hook.js.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/index.js',
        templateFile: 'internals/plop-templates/injectable-index.js.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/hooks/index.js',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import use{{properCase name}} from './{{dashCase name}}-hook';`,
      },
      {
        type: 'append',
        path: 'src/hooks/index.js',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\tuse{{properCase name}},`,
      },
    ],
  });

  plop.setGenerator('context', {
    description: 'Add a context provider',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        validate: requireField('name'),
      },
    ],

    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'src/contexts/{{dashCase name}}/{{dashCase name}}-context.js',
          templateFile:
            'internals/plop-templates/context/context.js.hbs',
        },
        {
          type: 'add',
          path: 'src/contexts/{{dashCase name}}/index.js',
          templateFile: 'internals/plop-templates/context/index.js.hbs',
        },
      ];

      return actions;
    },
  });
}

function requireField(fieldName) {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }

    return true;
  };
}
