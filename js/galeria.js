$(function () {
    img = new Array(6);
    img[0] = "img/1.jpg";
    img[1] = "img/2.jpg";
    img[2] = "img/3.jpg";
    img[3] = "img/4.jpg";
    img[4] = "img/5.jpg";
    img[5] = "img/6.jpg";
    time = 0;
    i = 0;
    function image() {
        if (time == 6) {
            time = 0;
            button();
            return false;
        } else {
            $('.image').append('<img id="imge' + i + '" src="' + img[time] + '">');
            time++;
            i++;
            image();
        }
    };
    $(document).ready(function () {
        $('.galeria').append('<img src="' + img[0] + '">');
        $('#menos').attr("disabled", true);
        image();
    });

    $('#mais').on('click', function () {
        time++;
        $('.galeria').html('<img src="' + img[time] + '">')
        if (time == 5) {
            $('#mais').attr("disabled", true);
        } else if (time == 4) {
            $('#mais').attr("disabled", false);
        } else if (time == 1) {
            $('#menos').attr("disabled", false);
        }
    });
    $('#menos').on('click', function () {
        time--;
        $('.galeria').html('<img src="' + img[time] + '">')
        if (time == 0) {
            $('#menos').attr("disabled", true);
        } else if (time == 1) {
            $('#menos').attr("disabled", false);
        } else if (time == 4) {
            $('#mais').attr("disabled", false);
        }
    });
    function button() {
        $('#imge0').on('click', function () {
            $('.galeria').html('<img src="' + img[0] + '">');
            time = 0;
            $('#menos').attr("disabled", true);
            $('#mais').attr("disabled", false);
        });
        $('#imge1').on('click', function () {
            $('.galeria').html('<img src="' + img[1] + '">');
            time = 1;
            $('#menos').attr("disabled", false);
            $('#mais').attr("disabled", false);
        });
        $('#imge2').on('click', function () {
            $('.galeria').html('<img src="' + img[2] + '">');
            time = 2;
            $('#menos').attr("disabled", false);
            $('#mais').attr("disabled", false);
        });
        $('#imge3').on('click', function () {
            $('.galeria').html('<img src="' + img[3] + '">');
            time = 3;
            $('#menos').attr("disabled", false);
            $('#mais').attr("disabled", false);
        });
        $('#imge4').on('click', function () {
            $('.galeria').html('<img src="' + img[4] + '">');
            time = 4;
            $('#menos').attr("disabled", false);
            $('#mais').attr("disabled", false);
        });
        $('#imge5').on('click', function () {
            $('.galeria').html('<img src="' + img[5] + '">');
            $('#mais').attr("disabled", true);
            $('#menos').attr("disabled", false);
            time = 5;
        });
    }
});