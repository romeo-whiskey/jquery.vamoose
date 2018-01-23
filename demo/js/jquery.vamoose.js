'use strict';

;(function ($) {

    $.fn.vamoose = function (options) {

        return this.each(function () {
            var $input = $(this);
            var $wrapper = $input.wrap('<div class="input-wrapper" />').parent();
            $wrapper.append('<span class="clear-input" tabindex="0" role="button" />');

            $input.on('focus', function () {
                $wrapper.addClass('has-focus');
                $('.clear-input', $wrapper).show();
            });

            $('.clear-input', $wrapper).on('focus', function () {
                $wrapper.addClass('has-focus');
            });

            $input.on('blur', function () {
                $wrapper.removeClass('has-focus');
            });
            $('.clear-input', $wrapper).on('blur', function () {
                $wrapper.removeClass('has-focus');
                $(this).hide();
            });

            $wrapper.on('keydown click', '.clear-input', function (e) {
                if (e.which === 32 || e.which === 13 || e.which === 1) {
                    // space enter left-click
                    e.preventDefault();
                    $(this).prev().val('').focus().trigger('change');
                }
            });
        });
    };
})(jQuery);