$(document).ready(function() {
    //$('#ca-container').contentcarousel();
    $('#ca-container').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
        {
            breakpoint: 1299,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                arrows: false,
                dots: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true
            }
        },
        {
            breakpoint: 478,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        }]
    });
    if ($(window).width() <= 1299) {
        $('.partn-ul').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 4,
            responsive: [
            {
                breakpoint: 1299,
                settings: {
                    arrows: false,
                    centerMode: false,
                    centerPadding: '40px',
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: false,
                    centerPadding: '40px',
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 520,
                settings: {
                    arrows: false,
                    centerMode: false,
                    centerPadding: '40px',
                    slidesToShow: 1,
                    dots: true
                }
            }]
        });
    }
    $("#main-menu").on("click", "a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href');
        var top;
        switch (id) {
            case '#description':
                top = $(id).offset().top - 125;
                if ($(window).width() <= 1200) {
                    top = $(id).offset().top - 105;
                }
            break;
            case '#abbility':
                top = $(id).offset().top - 125;
                if ($(window).width() <= 1200) {
                    top = $(id).offset().top - 120;
                }
            break;
            case '#rates':
                top = $(id).offset().top - 65;
                if ($(window).width() <= 1200) {
                    top = $(id).offset().top - 60;
                }
            break;
            case '#reviews':
                top = $(id).offset().top - 65;
                if ($(window).width() <= 1200) {
                    top = $(id).offset().top - 60;
                }
            break;
            case '#partners':
                top = $(id).offset().top - 65;
                if ($(window).width() <= 1200) {
                    top = $(id).offset().top - 60;
                }
            break;
            case '#contacts':
                top = $(id).offset().top - 65;
            break;
            default:
                top = $(id).offset().top;
            break
        }
        if ($(window).width() <= 1200) {
            $("#main-menu").css({width: "0"});
        }
        $('body,html').animate({scrollTop: top}, 1700);
    });
    var logo_big = $("#top-logo").width();
    var logo_sm = logo_big - logo_big * 30 / 100;
    if ($(window).width() > 1299) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 50) {
                $("#top-t").css({"background-color": "#dce0e3"});
                $("#top-logo").stop().animate({width: logo_sm}, 500);
                $("#main-menu").stop().animate({margin: "40px 0 0 30px"}, 500);
                $("#call-top").css({display: "inline-block", position: "relative"});
                $(".phone").stop().animate({"margin-top": "12px"}, 500);
                $("#call-top").stop().animate({top: "8px"}, 500);
            } else {
                $("#top-t").css({"background-color": "transparent"});
                $("#top-logo").stop().animate({width: logo_big}, 500);
                $("#main-menu").stop().animate({margin: "70px 0 0 105px"}, 500);
                $("#call-top").css({display: "block", position: "static"});
                $(".phone").stop().animate({"margin-top": "22px"}, 500);
            }
        });
    }
    
    var order_modal = document.getElementById('order-modal');
    var call_modal = document.getElementById('call-modal');
    var response_modal = document.getElementById('response-modal');
    var btn_std = document.getElementById("order-std-btn");
    var btn_prm = document.getElementById("order-prm-btn");
    var btn_lux = document.getElementById("order-lux-btn");
    var btn_call = document.getElementById("call-top");
    var span = document.getElementsByClassName("close")[0];
    var span_1 = document.getElementsByClassName("close")[1];
    var span_2 = document.getElementsByClassName("close")[2];
    btn_std.onclick = function() {
        order_modal.style.display = "block";
    }
    btn_prm.onclick = function() {
        order_modal.style.display = "block";
    }
    btn_lux.onclick = function() {
        order_modal.style.display = "block";
    }
    btn_call.onclick = function() {
        call_modal.style.display = "block";
    }
    span.onclick = function() {
        order_modal.style.display = "none";
    }
    span_1.onclick = function() {
        call_modal.style.display = "none";
    }
    span_2.onclick = function() {
        response_modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == call_modal || event.target == order_modal || event.target == response_modal) {
            call_modal.style.display = "none";
            order_modal.style.display = "none";
            response_modal.style.display = "none";
        }
    }
    $("#breef-dwl-btn").click(function() {
        location.href = "aiva24_brief.docx";
    });
    $("[name=phone]").mask("+7 (999) 999-99-99");
    
    $("[name=send_data]").submit(function() {
        var form = $(this);
        var error = false;
        
        form.find('input').each(function() {
            if (this.name !== 'submit') {
                if ($(this).val() == '') {
                    $(this).addClass("error");
                    $(this).css({"background-color": "#f9e3e6", "color": "#d63d18", "border": "1px solid #d63d18"});
                    error = true;
                }
            }
        });
        if (!error) {
            var data = form.serialize();
            $.ajax({
                type: 'POST',
                url: 'php/form.php',
                dataType: 'json',
                data: data,
                success: function(data)  {
                    if (data['error']) {
                        alert(data['error']);
                    } else {
                        order_modal.style.display = "none";
                        call_modal.style.display = "none";
                        form.find('input').each(function() {
                            if (this.name !== 'submit') {
                                $(this).val("");
                            }
                        });
                        response_modal.style.display = "block";
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
        return false;
    });
    
    $(".send_input, .send_input_modal").on("input", function() {
        console.log($(this));
        if ($(this).val().length > 0 && $(this).hasClass("error")) {
            $(this).removeClass("error");
            $(this).css({"background-color": "#fff", "color": "#666666", "border": "1px solid #5a308d"});
        } else if ($(this).val().length == 0) {
            $(this).addClass("error");
            $(this).css({"background-color": "#f9e3e6", "color": "#d63d18", "border": "1px solid #d63d18"});
        }
    });
    $("[name=phone]").on("keypress", function() {
        $(this).removeClass("error");
        $(this).css({"background-color": "#fff", "color": "#666666", "border": "1px solid #5a308d"});
    })
    
    $("#hamb").click(function() {
        $("#main-menu").css({width: "180px"});
    });
    $("#closebtn").click(function() {
        $("#main-menu").css({width: "0"});
    });
    
});