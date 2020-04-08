//Error Messages
const $nameError = $(
  '<p><span class="error">Please enter your name</span></p>'
).insertAfter($("#name"));
const $emailErrorRealTime = $(
  '<p><span class="error">Please provide a valid address</span></p>'
).insertAfter($("#mail"));
const $actError = $(
  '<p><span class="error">Please select an activity</span></p>'
).insertAfter($(".activities"));
const $paymentError = $(
  '<p><span class="error">Please select a payment method</span></p>'
).insertAfter($("#payment"));
const $ccnumError = $(
  '<p><span class="error">Please enter a credit card number (omit letters)</span></p>'
).insertAfter($("#cc-num"));
const $ccnumError2 = $(
  '<p><span class="error">Please enter a number 13 to 16 digits long</span></p>'
).insertAfter($("#cc-num"));
const $zipError = $(
  '<p><span class="error">Please provide a zip code</span></p>'
).insertAfter($("#zip"));
const $cvvError = $(
  '<p><span class="error">Please provide a 3 digit cvv</span></p>'
).insertAfter($("#cvv"));
$nameError.hide();
$emailErrorRealTime.hide();
$actError.hide();
$paymentError.hide();
$ccnumError.hide();
$ccnumError2.hide();
$zipError.hide();
$cvvError.hide();
$("#name").focus();
$("#paypal").hide();
$("#credit-card").hide();
$("#bitcoin").hide();
$("#other-title").hide();

//Field reset
(function ($) {
  $.fn.clearFields = function ($param) {
    $($param).val("");
    $($param).removeClass("red-border");
    $($param).next().hide();
    if ($($param).next().next().is("p")) {
      $($param).next().next().hide();
    }
    return this;
  };
})(jQuery);

//RegExps field validation
const generalRegex = /^\s*$/;
const emailRegex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
const ccnumRegex = /^\d{13,16}$/;
const zipRegex = /^\d{5}(?:-\d{4})?$/;
const cvvRegex = /^[0-9]{3}$/;

//name & email field validation
(function ($) {
  $.fn.nameValidator = function ($param) {
    if ($($param).val().match(generalRegex)) {
      $nameError.show();
      $($param).addClass("red-border");
      return false;
    } else {
      $nameError.hide();
      $($param).removeClass("red-border");
      return true;
    }
  };
})(jQuery);

(function ($) {
  $.fn.mailValidator = function ($param) {
    if (!$($param).val().match(emailRegex) || $($param).val().length === 0) {
      $emailErrorRealTime.show();
      $($param).addClass("red-border");
      return false;
    } else {
      $emailErrorRealTime.hide();
      $($param).removeClass("red-border");
      return true;
    }
  };
})(jQuery);

//activity validation
(function ($) {
  $.fn.activityValidator = function ($param) {
    if ($param === 0) {
      $actError.show();
      return false;
    }
    return true;
  };
})(jQuery);

//payment validation
(function ($) {
  $.fn.ccnumValidator = function ($param) {
    if (
      (!$($param).val().match(ccnumRegex) &&
        $($param).val().length > 0 &&
        $($param).val().length < 13) ||
      $($param).val().length > 16
    ) {
      $ccnumError.hide();
      $ccnumError2.show();
      $($param).addClass("red-border");
      return false;
    } else if (!$($param).val().match(ccnumRegex)) {
      $ccnumError2.hide();
      $ccnumError.show();
      $($param).addClass("red-border");
      return false;
    } else {
      $ccnumError.hide();
      $ccnumError2.hide();
      $($param).removeClass("red-border");
      return true;
    }
  };
})(jQuery);

(function ($) {
  $.fn.zipValidator = function ($param) {
    if (!$($param).val().match(zipRegex)) {
      $zipError.show();
      $($param).addClass("red-border");
      return false;
    } else {
      $zipError.hide();
      $($param).removeClass("red-border");
      return true;
    }
  };
})(jQuery);

(function ($) {
  $.fn.cvvValidator = function ($param) {
    if (!$($param).val().match(cvvRegex)) {
      $cvvError.show();
      $($param).addClass("red-border");
      return false;
    } else {
      $cvvError.hide();
      $($param).removeClass("red-border");
      return true;
    }
  };
})(jQuery);

//for T-shirt section
//creates 'please select..' option dependent on design dropdown value
let $tempColorOption = $("#color").prepend(
  $("<option>").val("colorPreReq").text("Please select a T-shirt theme")
);

//for activities section
let totalActivityCost = 0;

//name field event
$("#name").on("focusout", function () {
  $(this).nameValidator("#name");
});
//email field real time event
$("#mail").on("keypress keydown keyup", function () {
  $(this).mailValidator("#mail");
});
//job role event
$("#title").on("change", function () {
  if ($(this).val() === "other") {
    $("#other-title").show();
    $("#other-title").focus();
  } else {
    $("#other-title").val("");
    $("#other-title").hide();
  }
});

//t-shirt section
//first option in design has value 'select theme' for ease of access
$("#design option:first").val("select theme");
$("#color option[value='colorPreReq']").attr("selected", "");
$tempColorOption.attr("disabled", "");

//target's value reads 'select theme'? hide color label and input
$("#colors-js-puns").hide();
$("#design").on("change", function () {
  if ($(this).val() === "select theme") {
    $("select option[value='tomato']").removeAttr("selected");
    $("select option[value='cornflowerblue']").removeAttr("selected");
    $tempColorOption = $("#color")
      .prepend(
        $("<option>").val("colorPreReq").text("Please select a T-shirt theme")
      )
      .val("select theme")
      .attr("selcted", "");
    $("#color option[value='colorPreReq']").attr("selected", "");
    $tempColorOption.attr("disabled", "");
    $("#colors-js-puns").hide();
  } else if ($(this).val() === "js puns") {
    $("#color").removeAttr("disabled");
    $("select option[value='colorPreReq']").remove();

    $("select option[value='tomato']").removeAttr("selected").hide();
    $("select option[value='steelblue']").hide();
    $("select option[value='dimgrey']").hide();

    $("select option[value='cornflowerblue']").attr("selected", "").show();
    $("select option[value='darkslategrey']").show();
    $("select option[value='gold']").show();

    $("#colors-js-puns").show();
  } else if ($(this).val() === "heart js") {
    $("#color").removeAttr("disabled");
    $("select option[value='colorPreReq']").remove();

    $("select option[value='cornflowerblue']").removeAttr("selected").hide();
    $("select option[value='darkslategrey']").hide();
    $("select option[value='gold']").hide();

    $("select option[value='tomato']").attr("selected", "").show();
    $("select option[value='steelblue']").show();
    $("select option[value='dimgrey']").show();

    $("#colors-js-puns").show();
  }
});

//activities section
$(".activities").append(
  '<strong><p id="costDisplay">Total: $' + totalActivityCost + "<p></strong>"
);
$("input:checkbox")
  //reset checkboxes on refresh
  .prop("checked", false)
  .on("change", function () {
    let $activityCost = $(this).attr("data-cost");
    let activityCostRawNumber = Number($activityCost.replace(/[^0-9.-]+/g, ""));
    const $dayAndTime = $(this).attr("data-day-and-time");
    //disable conflicting activities
    if ($(this).prop("checked")) {
      $actError.hide();
      $("input:checkbox:not(:checked)").each(function () {
        $(this).attr("data-day-and-time") == $dayAndTime
          ? $(this).prop("disabled", true)
          : "";
      });
      totalActivityCost += activityCostRawNumber;
    } else if ($(this).prop("checked", false)) {
      $("input:checkbox:not(:checked)").each(function () {
        $(this).attr("data-day-and-time") == $dayAndTime
          ? $(this).prop("disabled", false)
          : "";
      });
      totalActivityCost -= activityCostRawNumber;
    }
    //replace p element for "Total" updates
    $("#costDisplay").remove();
    $(".activities").append(
      '<strong><p id="costDisplay">Total: $' +
        totalActivityCost +
        "</p></strong>"
    );
  });

//payment section
$("select option[value='select method']").remove();
$("#credit-card").show();
//cc payment event handlers
$("#cc-num").on("focusout", function () {
  $(this).ccnumValidator("#cc-num");
});
$("#zip").on("focusout", function () {
  $(this).zipValidator("#zip");
});
$("#cvv").on("focusout", function () {
  $(this).cvvValidator("#cvv");
});

//payment method dropdown events
$("#payment").on("click", function () {
  $paymentError.hide();
  if ($(this).val() === "PayPal") {
    $(this).clearFields("#cc-num, #zip, #cvv");
    $("#bitcoin").hide();
    $("#credit-card").hide();
    $("#paypal").show();
  } else if ($(this).val() === "Bitcoin") {
    $(this).clearFields("#cc-num, #zip, #cvv");
    $("#paypal").hide();
    $("#credit-card").hide();
    $("#bitcoin").show();
  } else if ($(this).val() === "Credit Card" || $("#credit-card").show()) {
    $("#paypal").hide();
    $("#bitcoin").hide();
    $("#credit-card").show();
  }
});

//check and submit
$("form").on("submit", function (e) {
  var nameResult = $(this).nameValidator("#name");
  var mailResult = $(this).mailValidator("#mail");
  var actResult = $(this).activityValidator(totalActivityCost);
  if ($("#payment").val() === "Credit Card") {
    var ccnumResult = $(this).ccnumValidator("#cc-num");
    var zipResult = $(this).zipValidator("#zip");
    var cvvResult = $(this).cvvValidator("#cvv");
  }
  if (
    nameResult == false ||
    mailResult == false ||
    ccnumResult == false ||
    zipResult == false ||
    cvvResult == false
  ) {
    e.preventDefault();
    alert("Please complete highlighted sections");
    return false;
  }
  //for multiple inputs and no highlight, this specific error is spelled out in the alert
  if (actResult == false) {
    e.preventDefault();
    alert("Please select an activity");
    return false;
  }
});
