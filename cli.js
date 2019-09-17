#!/usr/bin/env node
const Templatejs = require('./app.js');

const templates = new Templatejs();

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
                console.error('ERROR: arguments missing...');
            }
        break;

        default:
            console.error('ERROR: arguments missing...');
    }
}else{
    console.log('ERROR: no command was assigned...');
} 