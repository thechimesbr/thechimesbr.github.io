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
    var selectedLocation = $(this).val();
    if (selectedLocation == 'east') {
        $("#east-location-validation").modal()
        $('#privateParties').prop('checked', false);
        $("#location-container").hide();
        $('#loc').val(0);
        $("#contact").attr("action", "http://formspree.io/contactchimes@thechimes.com");
    } else if (selectedLocation == 'highland') {
        $("#contact").attr("action", "http://formspree.io/highland.events@thechimes.com");
    } else if (selectedLocation == 'covington') {
        $("#contact").attr("action", "http://formspree.io/covington.events@thechimes.com");
    }
  });

   $('.input-group.date').datepicker({format: "dd.mm.yyyy"});

});
