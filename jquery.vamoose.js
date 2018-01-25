;( function( $ ) {
    function Vamoose( element, options ) { // eslint-disable-line  no-unused-vars
        this.$element = $( element );
        this.$wrapper = this.$element.wrap( "<div class=\"input-wrapper\" />" ).parent();
        this.init();
    }

    Vamoose.prototype.init = function() {
        var self = this;
        this.renderClearCTA();

        this.$element.on( "focus", function() {
            self.elementOnFocus();
        } );

        $( ".clear-input", this.$wrapper ).on( "focus", function() {
            self.clearOnFocus();
        } );

        this.$element.on( "blur", function() {
            self.elementOnBlur();
        } );
        $( ".clear-input", this.$wrapper ).on( "blur", function() {
            self.clearOnBlur();
        } );

        this.$wrapper.on( "keydown click", ".clear-input", function( e ) {
            if ( e.which === 32 || e.which === 13 || e.which === 1 ) { // space enter left-click
                e.preventDefault();
                self.clearInput.bind( this )();
            }
        } );
    };

    /**
     * Renders clear CTA
     */
    Vamoose.prototype.renderClearCTA = function() {
        var $clear = $( "<span class=\"clear-input\" tabindex=\"0\" role=\"button\"" +
            " aria-label=\"Clear this field\" />" );

        if ( this.$element.is( "textarea" ) ) {
            $clear.attr( "data-text", "Clear" );
        }
        this.$wrapper.append( $clear );
    };


    /**
     * Handles when input is given focus
     * @returns {void}
     */
    Vamoose.prototype.elementOnFocus = function() {
        this.$wrapper.addClass( "has-focus" );
        $( ".clear-input", this.$wrapper ).show();
    };


    /**
     * Handles when input is blurred
     * @returns {void}
     */
    Vamoose.prototype.elementOnBlur = function() {
        this.$wrapper.removeClass( "has-focus" );
    };


    /**
     * Handles when clear button is given focus
     * @returns {void}
     */
    Vamoose.prototype.clearOnFocus = function() {
        this.$wrapper.addClass( "has-focus" );
    };


    /**
     * Handles when clear button is blurred
     * @returns {void}
     */
    Vamoose.prototype.clearOnBlur = function() {
        this.$wrapper.removeClass( "has-focus" );
        $( ".clear-input", this.$wrapper ).hide();
    };


    /**
     * Handles when clear button triggered
     * @returns {void}
     */
    Vamoose.prototype.clearInput = function() {
        $( this ).prev().val( "" ).focus().trigger( "change" );
    };

    $.fn.vamoose = function( options ) {
        return this.each( function() {
            $.data( this, "vamoose", new Vamoose( this, options ) );
        } );
    };

} )( jQuery );
