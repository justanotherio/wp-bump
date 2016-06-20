var assert = require('chai').assert;
var wpBump = require('../index.js');


var validStyleFunctions = [
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', null );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', false );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array() );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep') );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep') );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), null );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), false );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), 'ch4n63m3' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), null, 'all' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), false, 'print' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), 'ch4n63m3', '(max-width: 640px)' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', null );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', false );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array() );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep') );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep') );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), null );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), false );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), 'ch4n63m3' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), null, 'all' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), false, 'print' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), 'ch4n63m3', '(max-width: 640px)' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', null );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', false );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array() );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep') );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep') );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), null );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), false );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), 'ch4n63m3' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), null, 'all' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), false, 'print' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), 'ch4n63m3', '(max-width: 640px)' );",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', null);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', false);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array());",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep'));",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'));",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), null);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), false);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), 'ch4n63m3');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), null, 'all');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), false, 'print');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . 'style.css', array('one-dep', 'two-dep'), 'ch4n63m3', '(max-width: 640px)');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', null);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', false);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array());",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep'));",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'));",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), null);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), false);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), 'ch4n63m3');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), null, 'all');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), false, 'print');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/style.css', array('one-dep', 'two-dep'), 'ch4n63m3', '(max-width: 640px)');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', null);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', false);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array());",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep'));",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'));",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), null);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), false);",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), 'ch4n63m3');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), null, 'all');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), false, 'print');",
    "wp_enqueue_style('test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), 'ch4n63m3', '(max-width: 640px)');",
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", null );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", false );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array() );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep") );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep") );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), null );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), false );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), "ch4n63m3" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), null, "all" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), false, "print" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), "ch4n63m3", "(max-width: 640px)" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", null );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", false );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array() );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep") );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep") );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), null );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), false );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), "ch4n63m3" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), null, "all" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), false, "print" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), "ch4n63m3", "(max-width: 640px)" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", null );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", false );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array() );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep") );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep") );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), null );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), false );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), "ch4n63m3" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), null, "all" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), false, "print" );',
    'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), "ch4n63m3", "(max-width: 640px)" );',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", null);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", false);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array());',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep"));',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"));',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), null);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), false);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), "ch4n63m3");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), null, "all");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), false, "print");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "style.css", array("one-dep", "two-dep"), "ch4n63m3", "(max-width: 640px)");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", null);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", false);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array());',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep"));',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"));',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), null);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), false);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), "ch4n63m3");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), null, "all");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), false, "print");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/style.css", array("one-dep", "two-dep"), "ch4n63m3", "(max-width: 640px)");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", null);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", false);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array());',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep"));',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"));',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), null);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), false);',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), "ch4n63m3");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), null, "all");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), false, "print");',
    'wp_enqueue_style("test-style", get_stylesheet_directory_uri() . "/assets/css/style.css", array("one-dep", "two-dep"), "ch4n63m3", "(max-width: 640px)");'
];

var invalidStyleFunctions = [
    "//wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css' );",
    "/*wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css' );*/",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/wrong-style.css' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', true );",
    "wp_enqueue_script( 'test-style', get_stylesheet_directory_uri() . 'style.css' );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array('one-dep', 'two-dep'), 'ch4n63m3', true );",
    "wp_enqueue_style( get_stylesheet_directory_uri() . '/assets/css/style.css' );",
    "wp_enqueue_style( 'test-style-2', get_stylesheet_directory_uri() . '/assets/css/style.css', );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array(), );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), 'ch4n63m3', );",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css', array(), 'ch4n63m3', 'all', );",
    "wp_enqueue_style( 'google-font', '//fonts.googleapis.com/css?family=Lato:900|Roboto:400,400italic,700|Bevan' );",
    "wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css' );"
];

var validScriptFunctions = [
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js' );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', null );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array() );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep') );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep') );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), null );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3' );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), null, true );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), false, false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', true );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js' );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', null );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array() );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep') );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep') );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), null );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3' );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), null, true );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), false, false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', true );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js' );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', null );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array() );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep') );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep') );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), null );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3' );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), null, true );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), false, false );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', true );",
    "wp_enqueue_script( 'test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', false );",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js');",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', null);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array());",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep'));",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'));",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), null);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3');",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), null, true);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), false, false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', true);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . 'scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js');",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', null);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array());",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep'));",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'));",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), null);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3');",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), null, true);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), false, false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', true);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js');",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', null);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array());",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep'));",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'));",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), null);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3');",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), null, true);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), false, false);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', true);",
    "wp_enqueue_script('test-script', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array('one-dep', 'two-dep'), 'ch4n63m3', false);",
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js" );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", null );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array() );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep") );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep") );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), null );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), "ch4n63m3" );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), null, true );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), false, false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), "ch4n63m3", true );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), "ch4n63m3", false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js" );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", null );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array() );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep") );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep") );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), null );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), "ch4n63m3" );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), null, true );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), false, false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", true );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js" );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", null );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array() );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep") );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep") );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), null );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), "ch4n63m3" );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), null, true );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), false, false );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", true );',
    'wp_enqueue_script( "test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", false );',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js");',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", null);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array());',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep"));',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"));',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), null);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), "ch4n63m3");',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), null, true);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), false, false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), "ch4n63m3", true);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "scripts.js", array("one-dep", "two-dep"), "ch4n63m3", false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js");',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", null);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array());',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep"));',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"));',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), null);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), "ch4n63m3");',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), null, true);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), false, false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", true);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js");',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", null);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array());',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep"));',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"));',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), null);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), "ch4n63m3");',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), null, true);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), false, false);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", true);',
    'wp_enqueue_script("test-script", get_stylesheet_directory_uri() . "/assets/js/scripts.js", array("one-dep", "two-dep"), "ch4n63m3", false);',
]

var invalidScriptFunctions = [
    "//wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array(), null, true );",
    "/*wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array(), null, true );*/",
    "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css' );",
    "wp_enqueue_style( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.js', array(), null, true );",
    "wp_enqueue_script( get_stylesheet_directory_uri() . '/assets/js/scripts.js' );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/wrong-scripts.js', array(), null, true );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/scripts.js', );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/wrong-scripts.js', array(), );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/wrong-scripts.js', array(), null, );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/wrong-scripts.js', array(), null, true, );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/wrong-scripts.js', array(), null, 'true' );",
    "wp_enqueue_script( 'main-scripts', get_stylesheet_directory_uri() . '/assets/js/wrong-scripts.js', array(), null, 'all' );"
];


function testRegex(needle) {
    var isStyles = needle.indexOf('.css') >= 0 ? true : false;

    if ( isStyles ) {
        return new RegExp('^(?:\\s*wp_enqueue_style\\(\\s*(?:[\'"][^,]*?[\'"])(?:\\s*?,\\s*)(?:[^,]*[\\/\\s*\'"]' + needle.replace('.', '\\.') + '[^,]*)(?:(?:\\s*?,\\s*)(?:null|false|array.*?\\)))(?:(?:\\s*?,\\s*)(^null|^false|[\'"][?=a-z0-9]*[\'"]))(?:(?:\\s*?,\\s*)(?:[\'"].*?[\'"]))?\\s*\\);)$', 'gm');
    } else {
        return new RegExp('^(?:\\s*wp_enqueue_script\\(\\s*(?:[\'"][^,]*?[\'"])(?:\\s*?,\\s*)(?:[^,]*[\\/\\s*\'"]' + needle.replace('.', '\\.') + '[^,]*)(?:(?:\\s*?,\\s*)(?:null|false|array.*?\\)))(?:(?:\\s*?,\\s*)(^null|^false|[\'"][?=a-z0-9]*[\'"]))(?:(?:\\s*?,\\s*)(?:true|false))?\\s*\\);)$', 'gm');
    }
}

describe('Valid function declarations', function() {

    it('should revise wp_enqueue_style functions', function () {
        for (var i = 0; i < validStyleFunctions.length; i++) {
            assert.notEqual( validStyleFunctions[i], wpBump('style.css', validStyleFunctions[i]) );
        }
    });

    it('should be a valid wp_enqueue_style format with version', function () {
        for (var i = 0; i < validStyleFunctions.length; i++) {
            assert.isTrue( testRegex('style.css').test(wpBump('style.css', validStyleFunctions[i])) );
        }
    });

    it('should revise wp_enqueue_script functions', function () {
        for (var i = 0; i < validScriptFunctions.length; i++) {
            assert.notEqual( validScriptFunctions[i], wpBump('scripts.js', validScriptFunctions[i]) );
        }
    });

    it('should be a valid wp_enqueue_script format with version', function () {
        for (var i = 0; i < validScriptFunctions.length; i++) {
            assert.isTrue( testRegex('scripts.js').test(wpBump('scripts.js', validScriptFunctions[i])) );
        }
    });


});

describe('Invalid function declarations', function() {

    it('should not revise wp_enqueue_style functions', function () {
        for (var i = 0; i < invalidStyleFunctions.length; i++) {
            assert.equal( invalidStyleFunctions[i], wpBump('style.css', invalidStyleFunctions[i]) );
        }
    });

    it('should not be a valid wp_enqueue_style format with version', function () {
        for (var i = 0; i < invalidStyleFunctions.length; i++) {
            assert.isFalse( testRegex('style.css').test(wpBump('style.css', invalidStyleFunctions[i])) );
        }
    });

    it('should not revise wp_enqueue_script functions', function () {
        for (var i = 0; i < invalidScriptFunctions.length; i++) {
            assert.equal( invalidScriptFunctions[i], wpBump('scripts.js', invalidScriptFunctions[i]) );
        }
    });

    it('should not be a valid wp_enqueue_script format with version', function () {
        for (var i = 0; i < invalidScriptFunctions.length; i++) {
            assert.isFalse( testRegex('scripts.js').test(wpBump('scripts.js', invalidScriptFunctions[i])) );
        }
    });

});

describe('Use correct quotes', function() {
    var singleQuote = "wp_enqueue_style( 'test-style', get_stylesheet_directory_uri() . 'style.css' );";
    var doubleQuote = 'wp_enqueue_style( "test-style", get_stylesheet_directory_uri() . "style.css" );';
    var singleQuoteRevised = wpBump('style.css', singleQuote);
    var doubleQuoteRevised = wpBump('style.css', doubleQuote);

    it('should use single quotes when handle is in single quotes', function () {
        singleQuoteRevised.replace(testRegex('style.css'), function(match, p1){
            assert.equal(p1.charAt(0), '\'');
        });
    });

    it('should use double quotes when handle is in double quotes', function () {
        doubleQuoteRevised.replace(testRegex('style.css'), function(match, p1){
            assert.equal(p1.charAt(0), '"');
        });
    });

});
