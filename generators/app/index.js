'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var AngularMaterial = yeoman.extend({

    prompting: function(args) {
        try {
            this.appname = args.replace(/ /g, '');
            this.log(yosay(
                chalk.red('Creating ' + this.appname)
            ));
        } catch (e) {
            this.log(yosay(
                'Welcome to ' + chalk.red('Angular Material')
            ));
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: 'What would you like to name your app? Default: ' + this.appname,
                default: this.appname
            }]).then((answers) => {
                if (this.appname != answers.name) {
                    this.appname = answers.name.replace(/ /g, '');
                }
                this.appname = this.appname.replace(/ /g, '');
                this.log('Creating ', this.appname);
            });
        }
    },

    writing: function() {
        this.fs.copyTpl(
                this.templatePath('./app.js'),
                this.destinationPath(this.appname + '/public/js/config/app.js'), {
                    AppName: this.appname
                }
            ),
        this.fs.copyTpl(
                this.templatePath('./about-controller.js'),
                this.destinationPath(this.appname + '/public/js/controllers/about-controller.js'), {
                    AppName: this.appname
                }
            ),
        this.fs.copyTpl(
                this.templatePath('./home-controller.js'),
                this.destinationPath(this.appname + '/public/js/controllers/home-controller.js'), {
                    AppName: this.appname
                }
            ),
        this.fs.copyTpl(
                this.templatePath('./index.html'),
                this.destinationPath(this.appname + '/dev/index.html'), {
                    AppName: this.appname
                }
            ),
        this.fs.copyTpl(
                this.templatePath('./index.html'),
                this.destinationPath(this.appname + '/dist/index.html'), {
                    AppName: this.appname
                }
            ),
            this.fs.copy(
                this.templatePath('./angular_material'),
                this.destinationPath(this.appname)
            );
    },

    install: function() {
        var npmdir = process.cwd() + '/' + this.appname;

        process.chdir(npmdir);

        this.installDependencies({
            bower: true,
            npm: true
        });
    },

    end: function() {
        this.log(this.appname + ' has been created!');
    }
});

module.exports = AngularMaterial;
