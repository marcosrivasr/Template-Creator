#!/usr/bin/env node
const Templatejs = require('./app.js');
const colors = require('colors');

const templates = new Templatejs();

require('yargs')
  .scriptName("template")
  .usage('$0 <cmd> [args]')
  .command('add [name] [url]', 'Create a new template', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      describe: 'Name of new template'
    }),
    yargs.positional('url', {
        type: 'string',
        describe: 'Template file location'
    })
  }, function (argv) {
    templates.addTemplateWithParams(argv.name, argv.url);
  })
  .command('new [name] [url]', 'Create a new file based on a template', (yargs) => {
    yargs.positional('name', {
      type: 'string',
      describe: 'Name of template'
    }),
    yargs.positional('url', {
        type: 'string',
        describe: 'New file location'
    })
  }, function (argv) {
    templates.newTemplateWithParams(argv.name, argv.url);
  })
  .help()
  .argv
/*
const command = process.argv[2];
if(command){
    switch(command){
        case 'add':
            templates.addTemplate();
        break;

        case 'new':
            const templateName = process.argv[3];
            const fileName = process.argv[4];
            if(templateName || fileName){
                templates.newTemplate(templateName, fileName);
            }else{
                console.error('ERROR: arguments missing...'.red);
            }
        break;

        case '--help' || '-h':
            console.log(`
Welcome to t-creator!

list of commands:
    template add: it lets you add a new template to your config file
    template new: it lets you create a new file based on one of your templates`);
        break;

        default:
            console.error('ERROR: no arguments provided...'.red);
    }
}else{
    console.log('ERROR: no command provided...'.red);
} 
*/