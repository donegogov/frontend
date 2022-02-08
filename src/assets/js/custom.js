$( document ).ready(function() {
    const body = document.body;
const bgColorsBody = ["#ffb457", "#ff96bd", "#9999fb", "#ffe797", "#cffff1"];
const menu = body.querySelector(".menu");
const menuItems = menu.querySelectorAll(".menu__item");
const menuBorder = menu.querySelector(".menu__border");
let activeItem = menu.querySelector(".active");

function clickItem(item, index) {

menu.style.removeProperty("--timeOut");

if (activeItem == item) return;

if (activeItem) {
    activeItem.classList.remove("active");
}


item.classList.add("active");
body.style.backgroundColor = bgColorsBody[index];
activeItem = item;
offsetMenuBorder(activeItem, menuBorder);


}

function offsetMenuBorder(element, menuBorder) {

/* const offsetActiveItem = element.getBoundingClientRect();
const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
menuBorder.style.transform = `translate3d(${left}, 0 , 0)`; */

const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
    /* const top = (menu.offsetTop + menu.offsetHeight) + 'px';
    console.log(top); */
    menuBorder.style.transform = `translate3d(${left}, 0, 0)`
    menuBorder.style.transform += `rotate(180deg)`;
    /* menuBorder.style.marginTop = (menu.offsetTop + menu.offsetHeight);
    console.log('menu height ' + menu.offsetHeight);
    console.log('offset top ' + menu.offsetTop); */

}

offsetMenuBorder(activeItem, menuBorder);

menuItems.forEach((item, index) => {

item.addEventListener("click", () => clickItem(item, index));

})

window.addEventListener("resize", () => {
offsetMenuBorder(activeItem, menuBorder);
menu.style.setProperty("--timeOut", "none");
});


function clickLeftArrow(leftArrow) {
if(!leftArrow.classList.contains('rotate-left-anim-wrapper')){
leftArrow.classList.add('rotate-left-anim-wrapper');
} else {
leftArrow.classList.remove('rotate-left-anim-wrapper');
// Add it back after 3 seconds;
setTimeout(function(){
    leftArrow.classList.add('rotate-left-anim-wrapper');
}, 100);
}
}

function clickRightArrow(rightArrow) {
if(!rightArrow.classList.contains('rotate-right-anim-wrapper')){
    rightArrow.classList.add('rotate-right-anim-wrapper');
} else {
rightArrow.classList.remove('rotate-right-anim-wrapper');
// Add it back after 3 seconds;
setTimeout(function(){
    rightArrow.classList.add('rotate-right-anim-wrapper');
}, 100);
}
}

var leftArrow = body.querySelector('.left');
console.log(leftArrow);
leftArrow.addEventListener("click", () => clickLeftArrow(leftArrow));

var rightArrow = body.querySelector('.right');
rightArrow.addEventListener("click", () => clickRightArrow(rightArrow));

});

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
    