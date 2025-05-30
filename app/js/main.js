/**
 * Header Connect
 * retinaLogo
 * ajaxContactForm
 * headerFixed
 * select js
 * mobileNav
 * ajaxSubscribe
 * alertBox
 * loadmore
 */

(function ($) {
  "use strict";

  var themesflatTheme = {
    // Main init function
    init: function () {
      this.config();
      this.events();
    },

    // Define vars for caching
    config: function () {
      this.config = {
        $window: $(window),
        $document: $(document),
      };
    },

    // Events
    events: function () {
      var self = this;

      // Run on document ready
      self.config.$document.on("ready", function () {
        // Retina Logos
        self.retinaLogo();
      });

      // Run on Window Load
      self.config.$window.on("load", function () {});
    },
  }; // end themesflatTheme

  // Start things up
  themesflatTheme.init();

  var retinaLogos = function () {
    var retina = window.devicePixelRatio > 1 ? true : false;
    if (retina) {
      $("#site-logo-inner").find("img").attr({
        src: "assets/images/logo/loading.PNG",
        width: "197",
        height: "48",
      });
    }
  };

  var ajaxContactForm = function () {
    $("#contactform,#commentform").each(function () {
      $(this).validate({
        submitHandler: function (form) {
          var $form = $(form),
            str = $form.serialize(),
            loading = $("<div />", { class: "loading" });

          $.ajax({
            type: "POST",
            url: $form.attr("action"),
            data: str,
            beforeSend: function () {
              $form.find(".form-submit,comment-form").append(loading);
            },
            success: function (msg) {
              var result, cls;
              if (msg === "Success") {
                result =
                  "Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )";
                cls = "msg-success";
              } else {
                result = "Error sending email.";
                cls = "msg-error";
              }

              $form.prepend(
                $("<div />", {
                  class: "flat-alert " + cls,
                  text: result,
                }).append(
                  $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                )
              );

              $form.find(":input").not(".submit").val("");
            },
            complete: function (xhr, status, error_thrown) {
              $form.find(".loading").remove();
            },
          });
        },
      });
    }); // each contactform
  };

  var headerFixed = function () {
    if ($("header").hasClass("header-fixed")) {
      var nav = $("#header");

      if (nav.length) {
        var offsetTop = nav.offset().top,
          headerHeight = nav.height(),
          injectSpace = $("<div>", {
            height: headerHeight,
          });
        injectSpace.hide();

        if ($("header").hasClass("style-absolute")) {
          injectSpace.hide();
        } else {
          injectSpace.insertAfter(nav);
        }

        $(window).on("load scroll", function () {
          if ($(window).scrollTop() > offsetTop + headerHeight) {
            nav.addClass("is-fixed");
            injectSpace.show();
          } else {
            nav.removeClass("is-fixed");
            injectSpace.hide();
          }

          if ($(window).scrollTop() > 150) {
            nav.addClass("is-small");
          } else {
            nav.removeClass("is-small");
          }
        });
      }
    }
  };

  //  show logo home2
  $("#showlogo").prepend(
    '<a href="index.html"><img id="theImg" src="assets/images/logo/logo2.png" /></a>'
  );

  //=========NICE SELECT=========
  $(".select_js").niceSelect();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown2 ul").length) {
    $(".main-header li.dropdown2").append('<div class="dropdown2-btn"></div>');

    //Dropdown Button
    $(".main-header li.dropdown2 .dropdown2-btn").on("click", function () {
      $(this).prev("ul").slideToggle(500);
    });

    //Disable dropdown parent link
    $(".navigation li.dropdown2 > a").on("click", function (e) {
      e.preventDefault();
    });

    //Disable dropdown parent link
    $(
      ".main-header .navigation li.dropdown2 > a,.hidden-bar .side-menu li.dropdown2 > a"
    ).on("click", function (e) {
      e.preventDefault();
    });

    $(".price-block .features .arrow").on("click", function (e) {
      $(e.target.offsetParent.offsetParent.offsetParent).toggleClass(
        "active-show-hidden"
      );
    });
  }

  // Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    //$('.mobile-menu .menu-box').mCustomScrollbar();

    var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
    $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
    $(".sticky-header .main-menu").append(mobileMenuContent);

    //Hide / Show Submenu
    $(".mobile-menu .navigation > li.dropdown2 > .dropdown2-btn").on(
      "click",
      function (e) {
        e.preventDefault();
        var target = $(this).parent("li").children("ul");

        if ($(target).is(":visible")) {
          $(this).parent("li").removeClass("open");
          $(target).slideUp(500);
          $(this)
            .parents(".navigation")
            .children("li.dropdown2")
            .removeClass("open");
          $(this)
            .parents(".navigation")
            .children("li.dropdown2 > ul")
            .slideUp(500);
          return false;
        } else {
          $(this)
            .parents(".navigation")
            .children("li.dropdown2")
            .removeClass("open");
          $(this)
            .parents(".navigation")
            .children("li.dropdown2")
            .children("ul")
            .slideUp(500);
          $(this).parent("li").toggleClass("open");
          $(this).parent("li").children("ul").slideToggle(500);
        }
      }
    );

    //3rd Level Nav
    $(
      ".mobile-menu .navigation > li.dropdown2 > ul  > li.dropdown2 > .dropdown2-btn"
    ).on("click", function (e) {
      e.preventDefault();
      var targetInner = $(this).parent("li").children("ul");

      if ($(targetInner).is(":visible")) {
        $(this).parent("li").removeClass("open");
        $(targetInner).slideUp(500);
        $(this)
          .parents(".navigation > ul")
          .find("li.dropdown2")
          .removeClass("open");
        $(this)
          .parents(".navigation > ul")
          .find("li.dropdown > ul")
          .slideUp(500);
        return false;
      } else {
        $(this)
          .parents(".navigation > ul")
          .find("li.dropdown2")
          .removeClass("open");
        $(this)
          .parents(".navigation > ul")
          .find("li.dropdown2 > ul")
          .slideUp(500);
        $(this).parent("li").toggleClass("open");
        $(this).parent("li").children("ul").slideToggle(500);
      }
    });

    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });

    //Menu Toggle Btn
    $(".mobile-menu .menu-backdrop, .close-btn").on("click", function () {
      $("body").removeClass("mobile-menu-visible");
      $(".mobile-menu .navigation > li").removeClass("open");
      $(".mobile-menu .navigation li ul").slideUp(0);
    });

    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        $("body").removeClass("mobile-menu-visible");
        $(".mobile-menu .navigation > li").removeClass("open");
        $(".mobile-menu .navigation li ul").slideUp(0);
      }
    });
  }

  var ajaxSubscribe = {
    obj: {
      subscribeEmail: $("#subscribe-email"),
      subscribeButton: $("#subscribe-button"),
      subscribeMsg: $("#subscribe-msg"),
      subscribeContent: $("#subscribe-content"),
      dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
      success_message:
        '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
      failure_message:
        '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
      noticeError: '<div class="notification_error">{msg}</div>',
      noticeInfo: '<div class="notification_error">{msg}</div>',
      basicAction: "mail/subscribe.php",
      mailChimpAction: "mail/subscribe-mailchimp.php",
    },

    eventLoad: function () {
      var objUse = ajaxSubscribe.obj;

      $(objUse.subscribeButton).on("click", function () {
        if (window.ajaxCalling) return;
        var isMailchimp = objUse.dataMailchimp === "true";

        if (isMailchimp) {
          ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
        } else {
          ajaxSubscribe.ajaxCall(objUse.basicAction);
        }
      });
    },

    ajaxCall: function (action) {
      window.ajaxCalling = true;
      var objUse = ajaxSubscribe.obj;
      var messageDiv = objUse.subscribeMsg.html("").hide();
      $.ajax({
        url: action,
        type: "POST",
        dataType: "json",
        data: {
          subscribeEmail: objUse.subscribeEmail.val(),
        },
        success: function (responseData, textStatus, jqXHR) {
          if (responseData.status) {
            objUse.subscribeContent.fadeOut(500, function () {
              messageDiv.html(objUse.success_message).fadeIn(500);
            });
          } else {
            switch (responseData.msg) {
              case "email-required":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email is required.</strong>"
                  )
                );
                break;
              case "email-err":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email invalid.</strong>"
                  )
                );
                break;
              case "duplicate":
                messageDiv.html(
                  objUse.noticeError.replace(
                    "{msg}",
                    "Error! <strong>Email is duplicate.</strong>"
                  )
                );
                break;
              case "filewrite":
                messageDiv.html(
                  objUse.noticeInfo.replace(
                    "{msg}",
                    "Error! <strong>Mail list file is open.</strong>"
                  )
                );
                break;
              case "undefined":
                messageDiv.html(
                  objUse.noticeInfo.replace(
                    "{msg}",
                    "Error! <strong>undefined error.</strong>"
                  )
                );
                break;
              case "api-error":
                objUse.subscribeContent.fadeOut(500, function () {
                  messageDiv.html(objUse.failure_message);
                });
            }
            messageDiv.fadeIn(500);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Connection error");
        },
        complete: function (data) {
          window.ajaxCalling = false;
        },
      });
    },
  };

  var alertBox = function () {
    $(document).on("click", ".close", function (e) {
      $(this).closest(".flat-alert").remove();
      e.preventDefault();
    });
  };

  // Dom Ready
  $(function () {
    $(window).on("load resize", function () {
      retinaLogos();
    });
    headerFixed();
    // mobileNav();
    ajaxContactForm();
    ajaxSubscribe.eventLoad();
    alertBox();
  });

  // Sticky Sidebar
  const stickEl = $(".sticky-sidebar");
  const footer = $(".flat-sale-detail");

  let stickyElTop = 0;
  let footerTop = 0;

  if (stickEl.length > 0) {
    stickyElTop = stickEl.offset().top;
  }

  if (footer.length > 0) {
    footerTop = footer.offset().top;
  }

  const sticky = function () {
    const scrollTop = $(window).scrollTop();

    if (
      stickyElTop < scrollTop + 20 &&
      scrollTop + stickEl.outerHeight() < footerTop
    ) {
      stickEl.addClass("is-fixed");
    } else {
      stickEl.removeClass("is-fixed");
    }

    if (scrollTop >= 2380) {
      stickEl.addClass("is-absolute");
    } else {
      stickEl.removeClass("is-absolute");
    }
  };

  $(window).scroll(function () {
    sticky();
  });

  /// Disabled Button
  $(document).ready(function () {
    const disabledElement = document.getElementById("disabled");

    if (disabledElement) {
      disabledElement.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  });
})(jQuery);
