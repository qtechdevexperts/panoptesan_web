// password show hide

$(".toggle-password").click(function () {

  $(this).toggleClass("icon-eye_icon icon-eye_slash_icon");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});


// sidebar
// toggle button sidebar
$(function () {
  $(".toggle-btn").on("click", function () {
    $(".toggle-btn .icon-menu").toggleClass("active");
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(".sidebar").css("left", "-100%");
      $(".body-wrapper").css("margin-left", "0px").removeClass("bg-overlay");
    } else {
      $(this).addClass("active");
      $(".sidebar").css("left", "0px");
      $(".body-wrapper").addClass("bg-overlay");
    }

  });
});

// label input
  $(".form-group .form-control").blur(function(){
    // alert($(this).val());
  var input=$(this).val();
  var thisvar=$(this);
  if (input) {
    thisvar.next("label").addClass("label-old");
    thisvar.next("label").removeClass("label");
  } else {
    thisvar.next("label").addClass("label");
    thisvar.next("label").removeClass("label-old"); 
  } 

  });


  

// otp
$('.digit-group').find('input').each(function () {
  $(this).attr('maxlength', 1);
  $(this).on('keyup', function (e) {
    var parent = $($(this).parent());

    if (e.keyCode === 8 || e.keyCode === 37) {
      var prev = parent.find('input#' + $(this).data('previous'));

      if (prev.length) {
        $(prev).select();
      }
    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
      var next = parent.find('input#' + $(this).data('next'));

      if (next.length) {
        $(next).select();
      } else {
        if (parent.data('autosubmit')) {
          parent.submit();
        }
      }
    }
  });
});

// malihu scroll
$(function () {
  ($.mCustomScrollbar.defaults.theme = "light-1"),
      $(".card .card-body .list-group").mCustomScrollbar({
          scrollButtons: { enable: !0 },
          callbacks: {
              onTotalScroll: function () {
                  addContent(this);
              },
              onTotalScrollOffset: 100,
              alwaysTriggerOffsets: !1,
          },
      });
});

// sweet alert
$(".logout-modal").on('click', function() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn',
      cancelButton: 'btn'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Logout',
    text: "Are you sure you want to logout",
    // icon: 'warning',
    allowOutsideClick: false,
    showClass: {
      popup: 'modal-sm'
    },
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true
  })
})
// sweet alert
$(".delete-modal").on('click', function() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn',
      cancelButton: 'btn'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Delete',
    text: "Are you sure you want to delete",
    // icon: 'warning',
    allowOutsideClick: false,
    showClass: {
      popup: 'modal-sm'
    },
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  })
})

$(document).on('click', '.dropdown-menu label', function (e) {
  e.stopPropagation();
});