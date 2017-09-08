$(document).ready(function() {
    $('.bxslider').bxSlider({
      mode: 'fade',
      speed: 1000,
      pause: 7500,
      controls: false,
      auto: true,
      autoControls: false,
      pager: false,
      easing: 'swing',
    });
    $('nav ul').slicknav();
});
