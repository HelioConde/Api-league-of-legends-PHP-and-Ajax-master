$(function () {
    perfil();
    function perfil() { // perfil principal
        $.ajax({
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function () {
                responsePerfil = JSON.parse(localStorage.getItem('player'));
                $('#carregando').hide();
                $('#levelPerfil').html("Level " + responsePerfil.summonerLevel);
                $('#nomePerfil').html(responsePerfil.name);
                $('#iconePerfil').html('<img src="http://ddragon.leagueoflegends.com/cdn/' + version + '/img/profileicon/' + responsePerfil.profileIconId + '.png">');
                tier();
            },
            error: function () {
                console.log('Erro na parte do perfil')
            }
        });
    }
    function tier() { //chamado da api onde mostra os pontos
        $.ajax({
            success: function () {
                eloPerfil = JSON.parse(localStorage.getItem('tier'));
                    $('.main').append(`
                    <div class="eloM">
                            <span class="eloIconeAA"></span>
                            <span class="ranqueado">
                            <span class="queue">${eloPerfil[0].queueType}</span>
                            </span>
                            <br>
                            <span class="eloAA">${eloPerfil[0].tier}</span>
                            <span class="posicaoAA">${eloPerfil[0].rank}</span>
                            <br>
                            <span class="pontosA">PDL ${eloPerfil[0].leaguePoints}</span>
                            <br>
                            </div>
                `);
                elo();
                imgPersonagem();
            },
            error: function () {
                $('.queuePerfil').append("Sem liga")
            }

        })
    }

    function imgPersonagem() {
        $.ajax({
            url: "php/championM.php",
            type: 'POST',
            data: {
                login: JSON.parse(localStorage.getItem('player')).id,
                local: "br1"
            },
            async: false,
            beforeSend: function () {
                $('#carregando').show();
            },
            success: function (champM) {
                    localStorage.setItem('champion', champM);
                    championM = JSON.parse(localStorage.getItem('champion'));
                    $('.main').append('<div id="art"><img src="http://www.stelar7.no/cdragon/latest/uncentered-splash-art/' + championM[0].championId + '/0.png"></div>');
                    $('#carregando').hide();
                    return false;
            },
            error: function () {
                console.log('Erro na parte de usuario')
            }
        });
    }
    function elo() {
        if ($('.eloAA:eq(0)').html() == "SILVER") { // mostra o icone de acordo com a posição no rank
            $('.eloIconeAA:eq(0)').html('<img src="icon/silver.png">');
        } else if ($('.eloAA:eq(0)').html() == "PLATINUM") {
            $('.eloIconeAA:eq(0)').html('<img src="icon/PLATINUM.png">');
        } else if ($('.eloAA:eq(0)').html() == "GOLD") {
            $('.eloIconeAA:eq(0)').html('<img src="icon/gold.png">');
        } else if ($('.eloAA:eq(0)').html() == "BRONZE") {
            $('.eloIconeAA:eq(0)').html('<img src="icon/bronze.png">');
        } else if ($('.eloAA:eq(0)').html() == "diamond") {
            $('.eloIconeAA:eq(0)').html('<img src="icon/diamond.png">');
        } else if ($('.eloAA:eq(0)').html() == "master") {
            $('.eloIconeAA:eq(0)').html('<img src="icon/master.png">');
        } else {
            $('.eloIconeAA:eq(0)').html('<img src="icon/default.png">');
        }

        if ($('.eloAA:eq(1)').html() == "SILVER") { // mostra o icone de acordo com a posição no rank
            $('.eloIconeAA:eq(1)').html('<img src="icon/silver.png">');
        } else if ($('.eloAA:eq(1)').html() == "GOLD") {
            $('.eloIconeAA:eq(1)').html('<img src="icon/gold.png">');
        } else if ($('.eloAA:eq(1)').html() == "BRONZE") {
            $('.eloIconeAA:eq(1)').html('<img src="icon/bronze.png">');
        } else if ($('.eloAA:eq(1)').html() == "diamond") {
            $('.eloIconeAA:eq(1)').html('<img src="icon/diamond.png">');
        } else if ($('.eloAA:eq(1)').html() == "master") {
            $('.eloIconeAA:eq(1)').html('<img src="icon/master.png">');
        } else {
            $('.eloIconeAA:eq(1)').html('<img src="icon/default.png">');
        }

        if ($('.ranqueado:eq(2) span').html() == 'RANKED_SOLO_5x5') {
            $('.ranqueado:eq(2) span').html("Ranqueada Solo")
        } else if
        ($('.ranqueado:eq(2) span').html() == 'RANKED_FLEX_SR') {
            $('.ranqueado:eq(2) span').html("Ranqueada Flex")
        }
        if ($('.ranqueado:eq(1) span').html() == 'RANKED_SOLO_5x5') {
            $('.ranqueado:eq(1) span').html("Ranqueada Solo")
        } else if
        ($('.ranqueado:eq(1) span').html() == 'RANKED_FLEX_SR') {
            $('.ranqueado:eq(1) span').html("Ranqueada Flex")
        }
    }
});