module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            bower: {
                files: [
                    {cwd: 'bower_components/foundation/scss/', src: '**', dest: 'dist/scss/', expand: true},
                    {cwd: 'bower_components/foundation/js/foundation/', src: '**', dest: 'dist/js/foundation/', expand: true},
                    {src: 'bower_components/fastclick/lib/fastclick.js', dest: 'dist/js/vendor/fastclick.js'},
                    //{src: 'bower_components/modernizr/modernizr.js', dest: 'dist/js/vendor/modernizr.js'},
                    //{src: 'bower_components/jquery/dist/jquery.js', dest: 'dist/js/vendor/jquery.js'},
                    {src: 'bower_components/jquery-placeholder/jquery.placeholder.js', dest: 'dist/js/vendor/jquery.placeholder.js'},
                    {src: 'bower_components/jquery.cookie/jquery.cookie.js', dest: 'dist/js/vendor/jquery.cookie.js'},
                    {src: 'bower_components/salvattore/dist/salvattore.js', dest: 'dist/js/vendor/salvattore.js'},
                    //{src: 'bower_components/google-code-prettify/src/prettify.js', dest: 'dist/js/vendor/prettify.js'},
                    {cwd: 'bower_components/fontawesome/scss/', src: '**', dest: 'dist/scss/fontawesome/', expand: true},
                    {cwd: 'bower_components/fontawesome/fonts/', src: '**', dest: 'fonts/', expand: true}
                ]
            }
        },
        sass: {
            styles: {
                options: {
                    style: 'compressed' // nested, compact, compressed, expanded.
                },
                files: {
                    'assets/css/style.css': 'style.scss'
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true
            },
            target: {
                files: {
                    'assets/js/foundation.min.js': ['dist/js/foundation/vendor/fastclick.js', 'dist/js/foundation/foundation.js', 'dist/js/foundation/foundation.topbar.js'],
                    'assets/js/salvattore.min.js': 'dist/js/vendor/salvattore.js'
                    //'assets/js/modernizr.min.js': 'dist/js/vendor/modernizr.js'
                }
            }
        },
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },
        watch: {
            sass: {
                files: ['dist/scss/**', 'scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['dist/js/**'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            jekyll: {
                files: [
                    'assets/**',
                    '_includes/*.html',
                    '_layouts/*.html',
                    '_config.yml',
                    'index.html'
                ],
                tasks: ['shell:jekyllBuild', 'shell:jekyllServe'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['watch']);
    // This will overwrite your possible changes! Make sure you version your work (ie Git).
    grunt.registerTask('init', ['copy', 'sass', 'uglify']);
};