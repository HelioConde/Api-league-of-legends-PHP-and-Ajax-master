$(function () {
    function carregaPaginas(nomeDaPagina) {
        $.ajax({
            url: 'view/' + nomeDaPagina + '.html',
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (pag) {
                $('#view').html(pag);
                $('#carregando').hide();
            }
        });
    }
    function carregaPaginaAmigos(id) {
        $.ajax({
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function () {
                friend1 = JSON.parse(localStorage.getItem('tbAmigos'))
                friend2 = JSON.parse(friend1[id])
                $('#IconeAA').html('<img src="http://ddragon.leagueoflegends.com/cdn/' + version + '/img/profileicon/' + friend2.profileIconId + '.png">')
                $('#nomeAA').html(friend2.name)
                $('#levelAA').html(friend2.summonerLevel)
            },
            error: function () {
                console.log('Erro na parte de usuario')
            }
        });
        if ($('#IconeAA').html() == ""){
            carregaPaginaAmigos()
        }
    }
    function carregaPaginaElo(id) {
        friend1 = JSON.parse(localStorage.getItem('tbAmigos'))
        friend2 = JSON.parse(friend1[id])
        $.ajax({
            url: "php/tier.php",
            type: 'POST',
            data: {
                login: friend2.id,
                local: "br1"
            },
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (resp) {
                localStorage.setItem('tierAmigo', resp);
                eloA = JSON.parse(localStorage.getItem('tierAmigo'));
                if (eloA[0].queueType == undefined) {
                    return false;
                } else if (eloA[0].queueType == "RANKED_SOLO_5x5") {
                    $('.queue').html(eloA[0].queueType)
                    $('.eloAA').html(eloA[0].tier)
                    $('.posicaoAA').html(eloA[0].rank)
                    $('.pontosA').html(eloA[0].leaguePoints)
                } else if (eloA[1].queueType == "RANKED_SOLO_5x5") {
                    $('.queue').html(eloA[1].queueType)
                    $('.eloAA').html(eloA[1].tier)
                    $('.posicaoAA').html(eloA[1].rank)
                    $('.pontosA').html(eloA[1].leaguePoints)
                }
                elo();
            },
            error: function () {
                console.log('Erro na parte de usuario')
            }
        });

        function elo() {
            if ($('.eloAA').html() == "SILVER") { // mostra o icone de acordo com a posição no rank
                $('.eloIconeAA').html('<img src="icon/silver.png">');
            } else if ($('.eloAA').html() == "GOLD") {
                $('.eloIconeAA').html('<img src="icon/gold.png">');
            } else if ($('.eloAA').html() == "BRONZE") {
                $('.eloIconeAA').html('<img src="icon/bronze.png">');
            } else if ($('.eloAA').html() == "diamond") {
                $('.eloIconeAA').html('<img src="icon/diamond.png">');
            } else if ($('.eloAA').html() == "master") {
                $('.eloIconeAA').html('<img src="icon/master.png">');
            } else {
                $('.eloIconeAA').html('<img src="icon/default.png">');
            }

            if ($('.queue').html() == 'RANKED_SOLO_5x5') {
                $('.queue').html("Ranqueada Solo")
            } else if
            ($('.queue').html() == 'RANKED_FLEX_SR') {
                $('.queue').html("Ranqueada Flex")
            }

        }
    }
    //
    function imgPersonagem(id) {
        friend1 = JSON.parse(localStorage.getItem('tbAmigos'))
        friend2 = JSON.parse(friend1[id])
        $.ajax({
            url: "php/championM.php",
            type: 'POST',
            data: {
                login: friend2.id,
                local: "br1"
            },
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (champA) {
                localStorage.setItem('champion', champA);
                championA = JSON.parse(localStorage.getItem('champion'));
                $('#art').html('<img src="http://www.stelar7.no/cdragon/latest/uncentered-splash-art/' + championA[0].championId + '/0.png">');
                $('#style').html('<link rel="stylesheet" href="css/amigos.css">')
                $('#carregando').hide();
            },
            error: function () {
                console.log('Erro na parte de usuario')
            }
        });
    }
    setTimeout(function () {
        carregaPaginas('home');
        myPageAmigos();
    }, 2000);
    $('#perfil').on(`click`, function () {
        carregaPaginas('perfil');
    });
    $('#home').on(`click`, function () {
        carregaPaginas('home');
    });
    $('#contatos').on(`click`, function () {
        carregaPaginas('contatos');
    });
    $('#galeria').on(`click`, function () {
        carregaPaginas('galeria');
    });
    $('#atualizacoes').on(`click`, function () {
        carregaPaginas('atualizacoes');
    });

    function myPageAmigos() {
        $('.amigos').on(`click`, function () {
            carregaPaginas('amigos');
            carregaPaginaAmigos($(this).attr('alt'))
            carregaPaginaElo($(this).attr('alt'))
            imgPersonagem($(this).attr('alt'));
        })
    }
});