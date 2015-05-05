/*
    Usage:
        $('.js-text').autotext();

    Markup:
        Just call the plugin on an element as shown above. Note that it will delete the contents of the element, so don't try it on an element with any sub-elements.

    Options:
		output: array of strings, e.g. ['string 1,'string 2','string 3']
		speed: speed of 'typing', milliseconds, defaults to 20
		delayStart: milliseconds after page load to start of animation. Defaults to 0
		pause: pause between typing of sentences, milliseconds, defaults to 500
		deleteText: 1 to have text be deleted in the same way it was typed, 0 to not
		deleteSpeed: speed at which text characters should be deleted, milliseconds
		loop: 1 to infinitely loop through the strings provided, 0 to stop at the last one
		cursor: character to use as the cursor at the end of the line, defaults to "|"

*/
(function (window,$) {
	var Plugin = function(elem,options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options
	}

	Plugin.prototype = {
		init: function(){
			var thisobj = this;
			this.currpos = 0;
			this.currstr = 0;
			this.delpos = 0;

			this.settings = $.extend({
				output: ['This is the first string','This is the second','This is the third string, which is a bit longer than the others'],
				delayStart: 0,
				speed: 20,
				pause: 500,
				deleteText: 1,
				deleteSpeed: 15,
				loop: 1,
				cursor:"|"
			}, this.defaults, this.options);


			this.autotext = {
                //output text as if being typed by hand
                typeText: function(){
                    var curr = thisobj.settings.output[thisobj.currstr].slice(0,thisobj.currpos);
                    thisobj.$elem.html(curr + thisobj.settings.cursor + "&nbsp;"); //nbsp needed to prevent element from collapsing if deleting
                    thisobj.currpos++;
                    //if we're not at the end of the current string, keep going
                    if(thisobj.currpos <= thisobj.settings.output[thisobj.currstr].length){
                        thisobj.loop = setTimeout(thisobj.autotext.typeText,thisobj.settings.speed);
                    }
                    else {
                        //if the setting to delete the text is on
                        if(thisobj.settings.deleteText){
                            thisobj.delpos = thisobj.settings.output[thisobj.currstr].length;
                            thisobj.loop = setTimeout(thisobj.autotext.deleteText,thisobj.settings.pause);
                        }
                        else {
                            thisobj.loop = 0;
                            thisobj.currstr++;
                            thisobj.autotext.handleNext();
                        }
                    }
                },
                //delete text as if being typed by hand
                deleteText: function(){
                    var curr = thisobj.settings.output[thisobj.currstr].slice(0,thisobj.delpos);
                    thisobj.$elem.html(curr + thisobj.settings.cursor + "&nbsp;"); //nbsp needed to prevent element from collapsing if deleting
                    thisobj.delpos--;
                    //if not fully deleted, keep looping
                    if(thisobj.delpos >= 0){
                        thisobj.loop = setTimeout(thisobj.autotext.deleteText,thisobj.settings.deleteSpeed);
                    }
                    //otherwise proceed to the next string, if one exists
                    else {
                        thisobj.loop = 0;
                        thisobj.currstr++;
                        thisobj.autotext.handleNext();
                    }
                },
                //once we've finished writing a string, next steps
                handleNext: function(){
                    //if we've still got more strings to type out, having finished the current one
                    if(thisobj.currstr < thisobj.settings.output.length){
                        thisobj.currpos = 0;
                        thisobj.loop = setTimeout(thisobj.autotext.typeText,thisobj.settings.pause);
                    }
                    //if we've got to the end of all the strings
                    else if(thisobj.settings.loop){
                        thisobj.currpos = 0;
                        thisobj.currstr = 0;
                        thisobj.loop = setTimeout(thisobj.autotext.typeText,thisobj.settings.pause);
                    }
                }
            };
			this.loop = setTimeout(thisobj.autotext.typeText,this.settings.delayStart);
		},
	}
	$.fn.autotext = function(options){
		return this.each(function(){
			new Plugin(this,options).init();
		});
	}
	window.Plugin = Plugin;
})(window,jQuery);