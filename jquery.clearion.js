;(function ( $ ) {


    $.fn.clearion = function(options) {

        var settings = $.extend({
            // These are the defaults.
            // color: "#556b2f",
            // backgroundColor: "white"
        }, options );
        
        return this.each(function() {
            var $wrapper = $(this).wrap('<div class="input-wrapper" />').parent();
            $wrapper.append('<span class="clear-input" tabindex="0" />');
            
            $wrapper
                .on('focusin', function() {
                    $(this).addClass('has-focus');
                }).on('focusout', function() {
                    $(this).removeClass('has-focus');
                });

            $wrapper.on('keydown', '.clear-input', function(e) {
                if (e.which === 32 || e.which === 13) {
                    e.preventDefault();
                    $(this).prev().val('').focus();
                }
            });
        });
    }
}( jQuery ));
