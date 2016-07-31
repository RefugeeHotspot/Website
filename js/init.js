/*
@licstart
Copyright (C) 2016 u451f

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
@licend
*/

jQuery(document).ready(function($) {

    // antispam
    $('a.mail').each(function() {
      e = this.rel.replace('//','@');
      this.title = '';
      this.href = 'mailto:' + e;
      $(this).html(e);
    });

    // open external links in new window
    $('.post a').click(function(event){
        var url = $(this).attr('href');
        var siteurl = jQuery(location).attr('href');
        if( url.substr(0,15) != siteurl.substr(0,15) ) {
            window.open(url, "redirect");
            event.preventDefault();
        }
    });

    // if there is a hash in the URL, scroll to corresponding part
    $(window).bind('load', function () {
        scrollToElm();
        if(location.hash !== "undefined") {
          $('.page-link').each(function() {
            var url = $(this).attr('href');
            var parts = url.split("#");
            var trgt = parts[1];
            if(location.hash == "#"+trgt) {
              $(this).addClass('current');
            }
          });
        }
    });

    $('.page-link').click(function(event){
        $('.page-link').removeClass('current');
        $(this).addClass('current');
        var url = $(this).attr('href');
        var parts = url.split("#");
        var trgt = parts[1];
        var offset = $('.site-nav').height();
        if(trgt != undefined) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top - offset}, 500);
        }
    });

    // activate menu elements when they appear in the window
    // for this to work, the A needs a rel="id"
    $( window ).scroll(function() {
      $('.page-link').each(function() {
        var rel = $(this).attr('rel');
        if(rel != undefined) {
          if(isScrolledIntoView('#'+rel)) {
            $('.page-link').removeClass('current');
              $(this).addClass('current');
          }
        }
      });
    });

    // popins
    $('.option img').click(function() {
      $(this).parent().find('.popin').toggleClass('hidden');
    });
    $('.popin').click(function(e) {
      $(this).toggleClass('hidden');
    });
    $('.popin .post-content').click(function(e) {
			e.stopPropagation();
		});
});

function scrollToElm() {
    var url = document.location.href;
    var parts = url.split("#");
    var trgt = parts[1];
    var offset = $('.site-nav').height();
    if(trgt != undefined) {
        jQuery('html,body').animate({scrollTop:jQuery('#'+trgt).offset().top - offset}, 500);
    }
}

// adjust video sizes
function adjustIframes() {
  jQuery('iframe').each(function(){
    var
    $this       = jQuery(this),
    proportion  = $this.data( 'proportion' ),
    w           = $this.attr('width'),
    actual_w    = $this.width();

    if ( ! proportion ) {
        proportion = $this.attr('height') / w;
        $this.data( 'proportion', proportion );
    }

    if ( actual_w != w ) {
        $this.css( 'height', Math.round( actual_w * proportion ) + 'px' );
    }
  });
}

jQuery(window).on('resize load',adjustIframes);

function isScrolledIntoView(elem) {
    var $elem = jQuery(elem);
    var $window = jQuery(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
