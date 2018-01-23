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

    $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

$("#privateParties").change(function() {
    if ($(this).is(":checked")) {
        $("#location-container").show();
    } else {
        $("#location-container").hide();
    }
});

  $("#loc").change(function() {
    var locationEmail = $(this).val();
    if (locationEmail == 'contactchimes@thechimes.com') {
        alert('Private parties are not available at The Chimes East');
        $('#privateParties').prop('checked', false);
        $("#location-container").hide();
        $('#loc').val(0);
        $("#contact").attr("action", "http://formspree.io/contactchimes@thechimes.com");
    } else {
        $("#contact").attr("action", "http://formspree.io/" + locationEmail);
    }
  });

});
