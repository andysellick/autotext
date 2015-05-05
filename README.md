Autotext
========

Simple plugin to animate text being typed. Includes options to configure speed, deletion, deletion speed, cursor.

Usage
-----
    
$('.js-text').autotext();

Markup
------

Just call the plugin on an element as shown above. Note that it will delete the contents of the element, so don't try it on an element with any sub-elements.

Options
-------
		
- output: array of strings, e.g. ['string 1,'string 2','string 3']
- speed: speed of 'typing', milliseconds, defaults to 20
- delayStart: milliseconds after page load to start of animation. Defaults to 0
- pause: pause between typing of sentences, milliseconds, defaults to 500
- deleteText: 1 to have text be deleted in the same way it was typed, 0 to not
- deleteSpeed: speed at which text characters should be deleted, milliseconds
- loop: 1 to infinitely loop through the strings provided, 0 to stop at the last one
- cursor: character to use as the cursor at the end of the line, defaults to "|"
