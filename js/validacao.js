$(function () {

    $('#formContatos').submit(function () {
        var erro = 0;
        if ($('#nameV').val().search(' ') == -1) {
            $('#erroNome').html('<span style="color:red">Digite o nome e o sobrenome</span>');
            erro++;
        } else {
            $('#erroNome').html('')
        }
        if ($('#emailV').val().search('@') == -1) {
            $('#erroEmail').html('<span style="color:red">Digite um email valido</span>')
            erro++;
        } else if ($('#emailV').val().search('.com') == -1) {
            $('#erroEmail').html('<span style="color:red">Digite um email valido</span>')
            erro++;
        } else {
            $('#erroEmail').html('')
        }
        if ($('#titleV').val().length <= 5) {
            $('#erroTitle').html('<span style="color:red">Digite um titulo pelo menos 5 caracteris</span>')
            erro++;
        } else {
            $('#erroTitle').html('')
        }
        if ($('#assuntV').val().length <= 5) {
            $('#erroAssunt').html('<span style="color:red">Digite um assunto pelo menos 5 caracteris</span>')
            erro++;
        } else {
            $('#erroAssunt').html('')
        }
        if (erro == 0) {
            cadastrarContatos();
        } else {
            $('.dialog').fadeIn('fast', function () {
                $('.ajaxmsg').html(
                    '<strong> Confira os campos! </strong>' +
                    '<button id="okNick">Ok</button>'
                ).fadeIn('slow');
                $('#okNick').on('click', function () {
                    $('.ajaxmsg').fadeOut();
                    $('.dialog').fadeOut();
                });
            });
            return false;
        };
    });
    function cadastrarContatos() {
        event.preventDefault();
        let contato = {
            nome: $('#nameV').val(),
            emailV: $('#emailV').val(),
            titleV: $('#titleV').val(),
            assuntV: $('#assuntV').val()
        };
        var tbContato;
        if (localStorage.getItem('tbContato')) {
            tbContato = JSON.parse(localStorage.getItem('tbContato'));
        } else {
            tbContato = [];
        }
        tbContato.push(contato);
        localStorage.setItem('tbContato', JSON.stringify(tbContato));
        $('#nameV, #emailV, #titleV, #assuntV').val('');
        $('.dialog').fadeIn('fast', function () {
            $('.ajaxmsg').html(
                '<strong> mensagem enviada com sucesso! </strong>' +
                '<button id="okNick">Ok</button>'
            ).fadeIn('slow');
            $('#okNick').on('click', function () {
                $('.ajaxmsg').fadeOut();
                $('.dialog').fadeOut();
            });
        });
    };
});
