$(function () {

    if (localStorage.getItem('lolnick') == null) { // se no local storage não tiver o nick vai chamar a função abaixo
        $('.dialog').fadeIn('fast', function () { 
            $('.ajaxmsg').html(
                '<strong class="txtDialog">Qual Seu nick?  </strong>' +
                '<input type="text" id="nick">' +
                '<button id="enviar">Enviar</button>'
            ).fadeIn('slow');
        });
        $('#enviar').on('click', function () {
            var nick = $("#nick").val();
            localStorage.setItem('lolnick', nick);
            $('.ajaxmsg').html('')
            $('.dialog').fadeIn('fast', function () {
                $('.ajaxmsg').html(
                    '<strong>Bem Vindo  ' + localStorage.getItem('lolnick') + '</strong>' +
                    '<button id="okNick">Ok</button>'
                ).fadeIn('slow');
            });
            $('#okNick').on('click', function () {
                $('.dialog').fadeOut('fast');
                location.reload();
            });
        });
    } else { // se no local storage tiver nick ele vai fechar o dialogo
        $('.dialog').fadeOut('fast');
        nick2 = localStorage.getItem('lolnick'); //ler o que ta dentro do localStorage lolnick
        $("#nome").html(nick2) // vai escrever o nick
    }
});