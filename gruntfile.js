var userSecrets = require('./user-secrets.json');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: userSecrets.screeps.email,
                password: userSecrets.screeps.password,
                branch: 'default'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
	
	grunt.registerTask('default', ['screeps']);
}