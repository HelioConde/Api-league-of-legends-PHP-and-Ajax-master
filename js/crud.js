$(function () {
    var tbAmigos;
    var edicao = false;

    function listarContatos() {
        tbAmigos = JSON.parse(localStorage.getItem('tbAmigos')); //ler os amigos
    };
    function amigos() {
        $('#lista table tbody').html(''); //reseta a pagina
        for (obj in tbAmigos) {
            timea = 0;
            $.ajax({
                success: function () {
                    afriend = JSON.parse(localStorage.getItem('tbAmigos'))
                    response = JSON.parse(afriend[timea])
                    $('#lista table tbody').append('<td id="iconeA"><a class="amigos" href="#" title="' + response.id + '" alt="' + [timea] + '"><img src="http://ddragon.leagueoflegends.com/cdn/' + version + '/img/profileicon/' + response.profileIconId + '.png"></a></td>');
                    $('#lista table tbody').append('<td id="friend"><a class="amigos" href="#" title="' + response.id + '" alt="' + [timea] + '">' + response.name + '</a></td>');
                    $('#lista table tbody').append('<td id="levelA"><a class="amigos" href="#" title="' + response.id + '" alt="' + [timea] + '">' + "Level " + response.summonerLevel + '</a></td>');
                    $('#lista table tbody').append('<td id="deletarA"><button class="deletar" id="deletar" alt="' + response.id + '"><i class="fas fa-times"></i></button></a></td>');
                    $('#lista table tbody').append('<tr>');
                    timea++;
                    del()
                },
                error: function () {
                    console.log('Erro na parte de usuario')
                }
            });
        };
    };
    //deletar pela id
    function del(){
        deleta();
        return false;
    }
    function deleta() {
        $('.deletar').on('click', function () {
            let delet = $(this).attr('alt');
            $('.dialog').fadeIn('fast', function () {
                $('.ajaxmsg').html(
                    '<strong> Deletar esse amigo? </strong>' +
                    '<button id="sim">Sim</button>' +
                    '<button id="nao">Não</button>'
                ).fadeIn('slow');
                $('#sim').on('click', function () {
                    tbAmigos = JSON.parse(localStorage.getItem('tbAmigos'));
                    for (linha in tbAmigos) {
                        console.log(JSON.parse(tbAmigos[linha]).id)
                        console.log(JSON.parse(tbAmigos[linha]).id == delet)
                        if (JSON.parse(tbAmigos[linha]).id == delet) {
                            tbAmigos.splice(linha, 1);
                        }
                    }
                    localStorage.setItem('tbAmigos', JSON.stringify(tbAmigos));
                    $('.ajaxmsg').html(
                        '<strong> Amigo Deletado com sucesso! </strong>' +
                        '<button id="ok">Ok</button>'
                    ).fadeIn('slow');
                    $('#ok').on('click', function () {
                        $('.dialog').hide();
                        location.reload();
                    });
                });
                $('#nao').on('click', function () {
                    $('.dialog').hide();
                    location.reload();
                });
            });
        });
    };
    listarContatos();
    amigos();
    deleta();
    function consultaApi() {
        $.ajax({
            url: "php/summoner.php",
            type: 'POST',
            data: {
                login: $('#add').val(),
                local: "br1"
            },
            success: function (friend) {
                event.preventDefault();
                let contato = friend;
                var tbAmigos;
                if (localStorage.getItem('tbAmigos')) {
                    tbAmigos = JSON.parse(localStorage.getItem('tbAmigos'));
                } else {
                    tbAmigos = [];
                }
                tbAmigos.push(contato);
                localStorage.setItem('tbAmigos', JSON.stringify(tbAmigos));
                $('#add').val('');
                $('.dialog').fadeIn('fast', function () {
                    $('.ajaxmsg').html(
                        '<strong> Amigo Adicionado com sucesso! </strong>' +
                        '<button id="okNick">Ok</button>'
                    ).fadeIn('slow');
                    $('#okNick').on('click', function () {
                        $('.ajaxmsg').fadeOut();
                        $('.dialog').fadeOut();
                        amigos();
                        location.reload();
                    });
                });
            },
            error: function () {
                console.log('Erro na parte de usuario')
            }
        });
    };

    function cadastrarContatos() { // cadastra no local storage
        consultaApi()
    };

    $('#formCadastro').submit(function () {
        event.preventDefault();
        if (edicao === false) {
            cadastrarContatos();
        } else {
            editarContatos(edicao); //edicao contem o nmero da linha
        };
    });

    if (tbAmigos === null) { // se não tiver nada na tbAmigos ele limpa e deixa a lista oculta
        tbAmigos = [];
        $('#lista').hide();
    };
});