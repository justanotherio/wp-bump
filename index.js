'use strict';
var crypto = require('crypto');

function wpBump(needle, haystack) {

    // Determine if we are dealing with css or js
    var isStyles = needle.indexOf('.css') >= 0 ? true : false;
    var isScripts = needle.indexOf('.js') >= 0 ? true : false;

    // Check if valid, css and js values should not be equal (XOR)
    if ( isStyles === isScripts ) {
        return haystack;
    }

    // Function opening, would have used (?:style|script) but finalArgs is different depending on the function
    // Opening of regex excludes lines that start with comments
    // Allows for space after opening parenthesis
    var functionOpen = isStyles ? '^(?:\\s*wp_enqueue_style\\(\\s*' : '^(?:\\s*wp_enqueue_script\\(\\s*';

    // REQUIRED: Expecting a string (anything but a comma) with single or double quotes
    // Followed by comma with optional whitespace before and after
    var handle = '([\'"][^,]*?[\'"])(?:\\s*?,\\s*)';

    // REQUIRED: Path to css or js file
    // Expecting a single or double quote or slash before filename (common in most use cases)
    // Example: Prevents ie-styles.css from being changed when looking for styles.css
    // Also escaping the . in the filename
    var src = '(?:[^,]*[\\/\\s*\'"]' + needle.replace('.', '\\.') + '[^,]*)';

    // OPTIONAL: List of dependencies
    // Preceding comma is grouped with optional arg
    var deps = '(?:(?:\\s*?,\\s*)(?:null|false|array.*?\\)))?';

    // OPTIONAL: Version number (capturing value)
    // Accommodates alphanumeric strings, get params ?v=, and null and false without quotes
    // Preceding comma is grouped with optional arg
    var ver = '(?:(?:\\s*?,\\s*)(null|false|[\'"][?=a-z0-9]*[\'"]))?';

    // OPTIONAL: Media (CSS), In Footer (JS)
    // Valid for CSS: all, print, screen, speech, and media queries in single or double quotes
    // Valid for JS: true, false
    // Preceding comma is grouped with optional arg
    var finalArg = isStyles ? '(?:(?:\\s*?,\\s*)(?:[\'"].*?[\'"]))?' : '(?:(?:\\s*?,\\s*)(?:true|false))?';

    // Closing parenthesis with optional space
    // Closes capturing group for entire function
    var functionClose = '\\s*\\);)$';

    // Regex Assemble!!!
    var searchRegex = new RegExp(functionOpen + handle + src + deps + ver + finalArg + functionClose, 'gm');

    var output = haystack.replace(searchRegex, function(match, p1, p2){
        var functionString = match;
        var handleVal = p1;
        var versionVal = p2;
        var quotes = handleVal.charAt(0) === '"' ? '"' : '\'';
        var token = quotes + crypto.randomBytes(7).toString('hex') + quotes;


        if ( versionVal ) {
            // If we already have a value for the version just replace it
            return functionString.replace(versionVal, token);
        } else {
            // No version value defined, split function apart and rebuild with version added
            // We are going to split on commas but need to remove arrays first and save them
            var depsArg = '';
            functionString = functionString.replace(/array\(.*?\)/g, function(match){
                depsArg = match;
                return '{{array_placeholder}}';
            });

            // Split function into argument sections by commas
            var functionSections = functionString.split(',');

            // Adds array args back
            if (depsArg !== '') {
                functionSections[2] = functionSections[2].replace('{{array_placeholder}}', depsArg);
            }

            // Removes ); from end of function, save to preserve coding style whitespace
            var endOfFunction = functionSections[functionSections.length -1].split(/(\s*\);)/);
            var endCap = endOfFunction[1];
            functionSections[functionSections.length -1] = endOfFunction[0];

            // Sets dependency arg to empty array if not present
            functionSections[2] = functionSections[2] || ' array()';

            // Add new version
            functionSections[3] = ' ' + token;

            // Assemble function
            return functionSections.join(',') + endCap;
        }

    });

    return output;

}

module.exports = wpBump;
