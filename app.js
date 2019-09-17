const fs = require('fs');
const inquirer = require('inquirer');
const colors = require('colors');

class TemplateJS{
    constructor(){
        this.configFileName = './config.templates.json';
    }
    
    createConfigFile(){
        const json = JSON.stringify({
            templates: []
        });
        if(!fs.existsSync(this.configFileName)){
            fs.writeFileSync(this.configFileName, json);
        }
    }

    getConfigFile(){
        this.createConfigFile();
        let configFile = JSON.parse(fs.readFileSync('./config.templates.json'));
        return configFile;
    }

    addTemplate(){
        let templates = this.getConfigFile();

        var questions = [{
            type: 'input',
            name: 'name',
            message: "Name of template (to be used in the terminal)?",
          },{
            type: 'input',
            name: 'url',
            message: "location of template?"
          }];
          inquirer.prompt(questions).then(answers =>{
              if(answers.name === '' || answers.url === '' ){
                  console.log('ERROR: you need to fill the fields'.red);
              }else{
                if(fs.existsSync(answers.url)){
                    templates.templates.push({name: answers.name, url: answers.url});
                    fs.writeFileSync(this.configFileName, JSON.stringify(templates));
                    console.log('New template added!'.green);
                }else{
                    console.log('ERROR: Template location does not exist'.red);
                }
            }
        });
    }

    newTemplate(templateName, name){
        let templates = this.getConfigFile();
        let exists = false;
        let object = {};

        templates.templates.forEach(t => {
            if(t.name == templateName){
                object = t;
                exists = true;
            }
        });

        if(exists){
            if(fs.existsSync(object.url)){
                const content = fs.readFileSync(object.url);
                fs.writeFileSync('./' + name, content);
                console.log('SUCCESS: file created...'.green);
            }
        }else{
            console.log(`ERROR: template '${name}' does not exist`.red);
        }
    }
}

module.exports = TemplateJS;