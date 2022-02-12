

$( document ).ready(function() {
        var scrollFlag = true;
        // sticky header
        function stickyHeader() {
                        // variable
                        var $window = $(window);
                            
                            scrollFlagMobile = true;
                            // off the scroll
                            $window.off('scroll');
                            // check if the sticky header true
                                // scroll function
                                $window.on('scroll', function () {
                                  menu = document.getElementsByClassName("menu")[0];
                                  console.log(menu.offsetTop);
                                  console.log(window.pageYOffset);
                                  if (window.pageYOffset >= (menu.offsetTop + menu.offsetHeight)) {
                                        // check if flag true
                                        if (scrollFlag === true) {
                                            // fade out
                                            $(".menu").fadeOut(200, function () {
                                                // add class and fade in
                                                $(".menu").addClass('desktopTopFixed').fadeIn(200);
                                            });
                                            // scroll flag false
                                            scrollFlag = false;
                                        }
                                    } else {
                                        // check if flag false
                                        if (scrollFlag === false) {
                                            // fade out
                                            $(".menu").fadeOut(200, function () {
                                                // add class and fade in
                                                $(".menu").removeClass('desktopTopFixed').fadeIn(200);
                                            });
                                            // scroll flag true
                                            scrollFlag = true;
                                        }
                                    }
                                });
                            };
    
    
    
    
    
        document.addEventListener('scroll', function(e){
          stickyHeader();
         }, true);
        
         var matSelectOffsetHeight = document.getElementById("home-city");
         console.log('matSelectOffsetHeight' + matSelectOffsetHeight);
         document.documentElement.style.setProperty('--selectPanelCityMargin', matSelectOffsetHeight + 'px'); //suffix may be px or ''
    
    
        });


$( document ).ready(function() {
        jQuery.event.special.touchstart = {
        setup: function( _, ns, handle ) {
            this.addEventListener("touchstart", handle, { passive: true });
        }
    };
    jQuery.event.special.touchmove = {
        setup: function( _, ns, handle ) {
            this.addEventListener("touchmove", handle, { passive: true });
        }
    };
    jQuery.event.special.wheel = {
        setup: function( _, ns, handle ){
            this.addEventListener("wheel", handle, { passive: true });
        }
    };
    jQuery.event.special.mousewheel = {
        setup: function( _, ns, handle ){
            this.addEventListener("mousewheel", handle, { passive: true });
        }
    };
});