# wp-bump
>Revisions CSS and JS assets within a Wordpress theme's functions.php file

## Usage
Simply put, wp-bump will take in a functions.php file and change the value of the version argument ($ver) in *wp_enqueue_style()* or *wp_enqueue_script()*.  To do so it requires a string of the functions.php file and the name of the file that needs to be bumped.

The functions.php argument can be an entire file, a chunk of the file, or a line of the file, as long as you are not cutting off the file in the middle of a line.  If the *wp_enqueue_style()* or *wp_enqueue_script()* is in the proper format, and the name of the file is in the source ($src) argument, then wp-bump will update the version number with a new hex.  For example, if you are changing style.css and need to bump the version, style.css needs to appear in the $src argument in plain text, it should not be passed in as a variable.

As long as the *wp_enqueue_style()* or *wp_enqueue_script()* function is valid, wp-bump will update the function while trying to maintain the original coding style.  It will use single quotes or double quotes appropriately and will maintain spacing within the function parentheses.  Not all arguments need to be present.  For example: since

```php
wp_enqueue_style( 'mystyle', 'style.css' );
```
is a valid function, wp-bump will rewrite it to
```php
wp_enqueue_style( 'mystyle', 'style.css', array(), c6c58fa7feebc3 );
```

## API
### wp-bump(needle, haystack)
#### needle
Type: `String`  
Name of the asset being bumped.  Example: style.css or scripts.js.

#### haystack
Type: `String`  
Text of the functions.php file.  Can be an entire file, a chunk of the file, or a line of the file, as long as it is not cut off in the middle of a line.
