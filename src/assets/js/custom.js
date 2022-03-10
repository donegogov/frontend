function zoomIn(event) {
    /* $(".menu").removeClass('desktopTopFixed'); */
    /* var result = document.getElementById(event.target.id + 'result');
    result.style.display = "inline-block"; */
    var img = event.target;
    var result = document.getElementById(event.target.id + 'result');
    result.style.display = "inline-block";
        console.log('HOOOOOOOOOOOOOVVVVVVVVVVVVVVVVEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRR');
        
    /* console.log(img);
    console.log(element);
    var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
    var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
    element.style.backgroundPosition = (-posX * 1) + "px " + (-posY * 1) + "px"; */
/*create lens:*/

lens = 1;
console.log(img);
    console.log(result);
    console.log('document.getElementById(img-zoom-lens)');
    console.log(document.getElementById("img-zoom-lens")); 
    if(document.getElementById("img-zoom-lens") == null) {
        console.log('YYYYYYYYYYYYEEEEEEEEEEEEAAAAAAAAAAAAHHHHHHHHHHHHHHH');
lens = document.createElement("DIV");
lens.setAttribute("id", "img-zoom-lens");
lens.setAttribute("class", "img-zoom-lens");
lens.style="position:absolute; border: 1px solid #d4d4d4; width: 40px; height: 40px; ";

    }
    else {
        lens = document.getElementById("img-zoom-lens");
    }
img.parentElement.insertBefore(lens, img);
/*calculate the ratio between result DIV and lens:*/
cx = result.offsetWidth / lens.offsetWidth;
cy = result.offsetHeight / lens.offsetHeight;
/*set background properties for the result DIV:*/
result.style.backgroundImage = "url('" + img.src + "')";
result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
/*execute a function when someone moves the cursor over the image, or the lens:*/
lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
  $('#' + result.id).fadeIn();
        console.log($('#' + result.id));

        setImg(img, result);
}
    
  
  function mouseout(event) {
    /* var element = document.getElementById("overlay");
    element.style.display = "none"; */
    /* menu = document.getElementsByClassName("menu")[0];
    menu.style.visibility = "visible";
    menu.style.opcity = 1;
    menu.style.display = "flex"; */
    /* $(".menu").on("mouseout", function () {
        // add class and fade in
        $(".menu").addClass('desktopTopFixed');
    }); */
    $(".menu").addClass('desktopTopFixed');
  }

  function setImg(mainImg, resultImg) {
    
    

    var x = mainImg.offsetWidth;
    var y = mainImg.offsetTop;
  
    var imgWidth = mainImg.offsetWidth;
    var imgHeight = mainImg.offsetHeight;
  
    var leftSpace = x + mainImg.offsetWidth;
    var topSpace = y;
    var rightSpace = innerWidth - x - imgWidth;
    var bottomSpace = innerHeight - y - imgHeight;
    console.log(x, y, imgWidth, imgHeight, leftSpace, topSpace, rightSpace, bottomSpace);
    var top  = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;
    console.log('top, left');
    var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );


    console.log(height, window.scrollY, window.scrollX, window.pageYOffset, window.pageXOffset, document.documentElement.clientWidth, document.documentElement.clientHeight);
  console.log(x, leftSpace, imgWidth);
  if (mainImg.getBoundingClientRect().left < 20 && 20 > document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth) {
    console.log(mainImg.getBoundingClientRect().left < document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth);
    var top = mainImg.height + 30;
    var width = 'calc(100vw - 45px)';
    var height = mainImg.height;
    var right = 0;
    document.documentElement.style.setProperty('--overlayTop', top + "px");
    document.documentElement.style.setProperty('--overlayWidth', width);
    document.documentElement.style.setProperty('--overlayHeight', height + "px");
    document.documentElement.style.setProperty('--overlayMarginLeft', "calc(-50vw + 50%)");
    document.documentElement.style.setProperty('--overlayLeft', '0px');
  

}
    else if (mainImg.getBoundingClientRect().left < document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth) {
         console.log(mainImg.getBoundingClientRect().left < document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth);
      var top = mainImg.getBoundingClientRect().top;
      var width = document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth;
      var height = document.documentElement.clientHeight;
      document.documentElement.style.setProperty('--overlayTop', -top + "px");
      document.documentElement.style.setProperty('--overlayWidth', width + "px");
      document.documentElement.style.setProperty('--overlayHeight', height + "px");
      document.documentElement.style.setProperty('--overlayMarginRight', "auto");
      document.documentElement.style.setProperty('--overlayLeft', imgWidth + "px");
     }
       else if (mainImg.getBoundingClientRect().left > document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth) {
        console.log(mainImg.getBoundingClientRect().left < document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth);
        var top = mainImg.getBoundingClientRect().top;
        var width = mainImg.getBoundingClientRect().left;
        var height = document.documentElement.clientHeight;
        var right = document.documentElement.clientWidth - mainImg.getBoundingClientRect().left - imgWidth;
        document.documentElement.style.setProperty('--overlayTop', -top + "px");
        document.documentElement.style.setProperty('--overlayWidth', width + "px");
        document.documentElement.style.setProperty('--overlayHeight', height + "px");
        //document.documentElement.style.setProperty('--overlayMarginRight', right + "px");
        document.documentElement.style.setProperty('--overlayLeft', '-' + (mainImg.getBoundingClientRect().left) + 'px');
      }
      
    }


$( document ).ready(function() {
    $(".img-zoom-container").on("mouseover", function () {
        $(".menu").removeClass('desktopTopFixed');
    });
    $(".img-zoom-container").on("mouseout", function () {
        $(".menu").addClass('desktopTopFixed');
    });
});


function addToCart() {
  console.log('Add To Cart Shop Page');
  var addToCart = $('.addtocart');
  console.log(addToCart);
  $('.addtocart').each(function(i, element) {
      
      console.log(element);
      $(this).on('click',function(){
  console.log('Add To Cart');
  var button = $(this);
  var cart = $('#cart');
  console.log(cart.offset().top);
  document.documentElement.style.setProperty('--y-cart', -button.offset().top + cart.offset().top + 'px');
  var cartTotal = cart.attr('data-totalitems');
  var newCartTotal = parseInt(cartTotal) + 1;
  $(this).css('z-index', 2021);
  $('.cart-item').css('z-index', 2021);
  button.addClass('sendtocart');
  setTimeout(function(){
    button.removeClass('sendtocart');
    cart.addClass('shake').attr('data-totalitems', newCartTotal);
    $("#shoppingCard").find("#check, #carrito").toggleClass("elmActive");
    setTimeout(function(){
      cart.removeClass('shake');
    },500)
    setTimeout(function(){
      $("#shoppingCard").find("#check, #carrito").toggleClass("elmActive");
    },1000)
  },1000)
})
})
};

function notFound(){
  var c = document.getElementById('canv')
  var $ = c.getContext('2d')
  var ms = false
  var w = 0, h = 0
  
  var img = new Image()
//img.src==IMAGE OF ERROR
  // img.src = 'https://doofindermedia.s3.amazonaws.com/blog/2019/08/29/110655-404-not-found-Doofinder.jpg'
  // img.src = 'https://images.unsplash.com/photo-1562293661-7d82778e0a74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
 img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/131045/404.png'
  
  var set = function(){
    var run, _h, _w, dx, a
    w = img.width
    h = img.height
    c.width = w + 5
    c.height = h
    $.translate(5, 0)
// a==DISTORSION LEVEL
    a = 25
    dx = 0
    _w = w + 50
    _h = h + 50
    return (run = function() {
      var inc, i, j
      $.clearRect(-a, -a, _w, _h)
      inc = ms === true ? 0.5 : 0.18
      for (j=0; j <= h; i = 0 <= h ? ++j : --j) {
        dx = ~~(inc * (Math.random() - 0.5) * a)
        $.drawImage(img, 0, i, w, 1, dx, i, w, 1)
      }
      window.requestAnimationFrame(run);
    })()
  };
  img.onload = function(){
    return set()
  };
  c.addEventListener('mouseover', function(){
    return ms = true
  }, false)
  c.addEventListener('touchmove',function(e){
    e.preventDefault()
    return ms = true
  }, false)
  c.addEventListener('mouseout', function(){
    return ms = false
  }, false)
  c.addEventListener('touchend',function(){
    return ms = false
  }, false)
};
