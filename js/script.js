load();

function load() {
    if (localStorage.getItem('lolnick') == null) {
        $('#main').append('<div id="logo"><img src="img/logo.png"></div>')
        $('#nav').append(`
    <input type="text" id="nick" name="nick">
        <select name="" id="regiao">
            <option value="RU">RU</option>
            <option value="KR">KR</option>
            <option value="BR1" selected="true">BR</option>
            <option value="OC1">OC</option>
            <option value="JP1">JP</option>
            <option value="NA1">NA</option>
            <option value="EUN1">EUN</option>
            <option value="EUW1">EUW</option>
            <option value="TR1">TR</option>
            <option value="LA1">LA</option>
            <option value="LA2">LA</option>
        </select>
        <button id="enviar"><i class="fas fa-chevron-right"></i></button>
    `);
        $('#loading').hide();
        $('#loadingP').hide();
        enviar();
    } else {
        $('#nav').append(`
    <span id="bemV">Bem vindo </span><span id="nicka">${localStorage.getItem('lolnick')}</span>
    <button id="deletar" alt="Deletar" class="deletar"><i class="far fa-times-circle"></i></button>
    <button id="atualizar"><i class="fas fa-sync-alt"></i></button>
    <button id="amigos"><i class="fas fa-bars"></i></button>
`);
        atualizar();
        amigos();
        deletar();
        perfil();
        chamarCrud();
        perfilA();
    };
};

function enviar() {
    $("#enviar").on('click', function () {
        localStorage.setItem('lolnick', $("#nick").val());
        localStorage.setItem('regiao', $("#regiao").val());
        $('#nav').html("")
        $('#main').html("")
        load();
        perfil();
    });
};

function deletar() {
    $("#deletar").on('click', function () {
        localStorage.removeItem('lolnick');
        sessionStorage.removeItem('player');
        sessionStorage.removeItem('tier')
        $('#nav').html("")
        $('#main').html("")
        $('#mainA').html("")
        load();
    });
};

function amigos() {
    $("#amigos").on('click', function () {
        $('#nav').append(`
            <span class="friend"><input type="text" id="friend" name="friend" placeholder="Nome"></span>
    `);
        $("#amigos").attr('disabled', true)
        crudFriend();
    });
};

function chamarCrud() {
    tbfriends = JSON.parse(localStorage.getItem('tbfriends'));
    if (tbfriends == null) {
        $('.AMG').hide();
    }
    $('.AMG').html(''); //Zera o html
    for (obj in tbfriends) {
        let linha = tbfriends[obj];
        $('.AMG').append('<td alt="' + obj + '"> ' + linha.friend + '<button class="deletarA" alt="' + obj + '"><i class="far fa-times-circle"></i></button></td></td>');
        //fim da linha da table
    };
    deletarA()
};

function deletarA() {
    $('.deletarA').on('click', function () {
        let linha = $(this).attr('alt');
        tbfriends.splice(linha, 1);
        localStorage.setItem('tbfriends', JSON.stringify(tbfriends));

        chamarCrud();
    });
};

function crudFriend() {
    $("#friend").on('blur', function () {
        if ($('#friend').val() == "") {
            $("#amigos").attr('disabled', false);
            $('.friend').html("")
        } else {
            event.preventDefault();
            let friend = $('#friend').val();
            let contato = {
                friend: friend,
            }
            var tbfriends;
            if (localStorage.getItem('tbfriends')) {
                tbfriends = JSON.parse(localStorage.getItem('tbfriends'));
            } else {
                tbfriends = [];
            }
            tbfriends.push(contato);
            localStorage.setItem('tbfriends', JSON.stringify(tbfriends));
            $("#amigos").attr('disabled', false);
            $('.friend').html("")
            $('.AMG').html('');
            $('.AMG').show();
            chamarCrud();
            perfilA();
        }
    });
}

function atualizar() {
    $("#atualizar").on('click', function () {
        sessionStorage.removeItem('player')
        sessionStorage.removeItem('tier')
        $('#nav').html("")
        $('#main').html("")
        load();
        perfil();
    });
};

function perfilMatch() {
    $.ajax({
        url: "php/summoner.php",
        type: 'POST',
        data: {
            login: JSON.parse(sessionStorage.getItem('player')).accountId + '?endIndex=3',
            local: localStorage.getItem('regiao'),
            get: 'getMatchList',
        },
        beforeSend: function () {
            $('#loading').show();
        },
        beforeSend: function () {
        },
        success: function (tabsA) {
            gameid1 = JSON.parse(tabsA).matches[0].gameId
            $.ajax({
                url: "php/summoner.php",
                type: 'POST',
                data: {
                    login: gameid1,
                    local: localStorage.getItem('regiao'),
                    get: 'getMatch',
                },
                async: false,
                success: function (matchlist) {
                    $.ajax({
                        url: "view/match.html",
                        success: function (pag) {
                            $('#mainA').html(pag);
                            part = JSON.parse(matchlist).participants
                            partI = JSON.parse(matchlist).participantIdentities
                            if (JSON.parse(matchlist).gameMode == "ARAM") {
                                $("#partida #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map12.png">')
                                $("#partida #modo").append(JSON.parse(matchlist).gameMode)
                            } else if (JSON.parse(matchlist).gameMode == "CLASSIC") {
                                $("#partida #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png">')
                                $("#partida #modo").append(JSON.parse(matchlist).gameMode)
                            }
                            $("#partida #true table tbody").append('<td colspan="3"><div id="vitoria">Vitoria</div></td>')
                            $("#partida #false table tbody").append('<td colspan="3"><div id="derrota">Derrota</div></td>')
                            for (obj in part) {
                                if (part[obj].stats.win == true) {
                                    $("#partida #true table tbody").append('<tr>')
                                    $("#partida #true table tbody").append('<td><div id="nomeMatch">' + partI[obj].player.summonerName + '</div></td>')
                                    $("#partida #true table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                    $("#partida #true table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                    $("#partida #true table tbody").append('</tr>')
                                }
                                if (part[obj].stats.win == false) {
                                    $("#partida #false table tbody").append('<tr>')
                                    $("#partida #false table tbody").append('<td><span id="nomeMatch">' + partI[obj].player.summonerName + '</span></td>')
                                    $("#partida #false table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                    $("#partida #false table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                    $("#partida #false table tbody").append('</tr>')
                                }

                            }
                        }
                    })
                }
            })

            gameid2 = JSON.parse(tabsA).matches[1].gameId
            $.ajax({
                url: "php/summoner.php",
                type: 'POST',
                data: {
                    login: gameid2,
                    local: localStorage.getItem('regiao'),
                    get: 'getMatch',
                },
                async: false,
                success: function (matchlist2) {
                    $.ajax({
                        url: "view/match.html",
                        success: function () {
                            part = JSON.parse(matchlist2).participants
                            partI = JSON.parse(matchlist2).participantIdentities
                            if (JSON.parse(matchlist2).gameMode == "ARAM") {
                                $("#partida2 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map12.png">')
                                $("#partida2 #modo").append(JSON.parse(matchlist2).gameMode)
                            } else if (JSON.parse(matchlist2).gameMode == "CLASSIC") {
                                $("#partida2 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png">')
                                $("#partida2 #modo").append(JSON.parse(matchlist2).gameMode)
                            }
                            $("#partida2 #true table tbody").append('<td colspan="3"><div id="vitoria">Vitoria</div></td>')
                            $("#partida2 #false table tbody").append('<td colspan="3"><div id="derrota">Derrota</div></td>')
                            for (obj in part) {
                                if (part[obj].stats.win == true) {
                                    $("#partida2 #true table tbody").append('<tr>')
                                    $("#partida2 #true table tbody").append('<td><div id="nomeMatch">' + partI[obj].player.summonerName + '</div></td>')
                                    $("#partida2 #true table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                    $("#partida2 #true table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                    $("#partida2 #true table tbody").append('</tr>')
                                }
                                if (part[obj].stats.win == false) {
                                    $("#partida2 #false table tbody").append('<tr>')
                                    $("#partida2 #false table tbody").append('<td><span id="nomeMatch">' + partI[obj].player.summonerName + '</span></td>')
                                    $("#partida2 #false table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                    $("#partida2 #false table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                    $("#partida2 #false table tbody").append('</tr>')
                                }
                            }
                        }
                    })

                }

            })
            gameid3 = JSON.parse(tabsA).matches[2].gameId
            $.ajax({
                url: "php/summoner.php",
                type: 'POST',
                data: {
                    login: gameid3,
                    local: localStorage.getItem('regiao'),
                    get: 'getMatch',
                },
                async: false,
                success: function (matchlist3) {
                    $.ajax({
                        url: "view/match.html",
                        success: function () {
                            part = JSON.parse(matchlist3).participants
                            partI = JSON.parse(matchlist3).participantIdentities
                            if (JSON.parse(matchlist3).gameMode == "ARAM") {
                                $("#partida3 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map12.png">')
                                $("#partida3 #modo").append(JSON.parse(matchlist3).gameMode)
                            } else if (JSON.parse(matchlist3).gameMode == "CLASSIC") {
                                $("#partida3 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png">')
                                $("#partida3 #modo").append(JSON.parse(matchlist3).gameMode)
                            }
                            $("#partida3 #true table tbody").append('<td colspan="3"><div id="vitoria">Vitoria</div></td>')
                            $("#partida3 #false table tbody").append('<td colspan="3"><div id="derrota">Derrota</div></td>')
                            for (obj in part) {
                                if (part[obj].stats.win == true) {
                                    $("#partida3 #true table tbody").append('<tr>')
                                    $("#partida3 #true table tbody").append('<td><div id="nomeMatch">' + partI[obj].player.summonerName + '</div></td>')
                                    $("#partida3 #true table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                    $("#partida3 #true table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                    $("#partida3 #true table tbody").append('</tr>')
                                }
                                if (part[obj].stats.win == false) {
                                    $("#partida3 #false table tbody").append('<tr>')
                                    $("#partida3 #false table tbody").append('<td><span id="nomeMatch">' + partI[obj].player.summonerName + '</span></td>')
                                    $("#partida3 #false table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                    $("#partida3 #false table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                    $("#partida3 #false table tbody").append('</tr>')
                                }
                            }
                        }
                    })
                    $('#loading').hide()
                }
            })
        }

    })
}


function perfil() {
    $.ajax({
        url: "php/summoner.php",
        type: 'POST',
        data: {
            login: localStorage.getItem('lolnick'),
            local: localStorage.getItem('regiao'),
            get: 'getSummonerByName',
        },
        beforeSend: function () {
            $('#loadingP').show();
        },
        success: function (tabs) {
            if (sessionStorage.getItem('player') == null) {
                sessionStorage.setItem('player', tabs);
            } else {
                setTimeout(timesetP, 2000)
                function timesetP() {
                    response = JSON.parse(sessionStorage.getItem('player'));
                    $('#main').append(`
                            <div class= "player">
                            <div id="level">Level ${response.summonerLevel}</div>
                            <div id="icone"><img src="https://ddragon.leagueoflegends.com/cdn/8.19.1/img/profileicon/${response.profileIconId}.png">
                                <div id="nome" alt="${response.id}">${response.name}</span>
                            </div>
                 `)
                }
                ranked();
            }
        },
        error: function () {
            console.log('Erro na parte do perfil :(')
        }
    });
};
function ranked() {
    $.ajax({
        url: "php/summoner.php",
        type: 'POST',
        data: {
            login: JSON.parse(sessionStorage.getItem('player')).id,
            local: localStorage.getItem('regiao'),
            get: 'getLeaguePosition',
        },
        beforeSend: function () {

        },
        success: function (ranked) {
            $('.elo').html("")
            if (sessionStorage.getItem('tier') == null) {
                sessionStorage.setItem('tier', ranked);
            } else {
                setTimeout(timeset, 1000)
                elo = JSON.parse(sessionStorage.getItem('tier'));
                function timeset() {

                    if (elo[0] == undefined) {
                    } else {
                        console.log(elo[0].queueType + '0')
                        if (elo[0].queueType == "RANKED_SOLO_5x5") {
                            queueType = "SOLO/DUO"
                        } else if (elo[0].queueType == "RANKED_FLEX_SR") {
                            queueType = "5V5 FLEX"
                        } else if (elo[0].queueType == "RANKED_FLEX_TT") {
                            queueType = "3V3 FLEX"
                        } else {
                            queueType = "UNRANKED"
                        };
                        $('#main').append(`
            <div class="elo">
                <div class="iconTier"><img src="icon/${elo[0].tier}.png"></div>
                <div class="queueType">${queueType}</div>
                <span class="tier">${elo[0].tier}</span>
                <span class="rank">${elo[0].rank}</span>
                <div class="leaguePoints">${elo[0].leaguePoints} PDL</div>
            </div>
                `)
                    }
                    if (elo[1] == undefined) {
                    } else {
                        console.log(elo[1].queueType + '1')
                        if (elo[1].queueType == "RANKED_SOLO_5x5") {
                            queueType1 = "SOLO/DUO"
                        } else if (elo[1].queueType == "RANKED_FLEX_SR") {
                            queueType1 = "5V5 FLEX"
                        } else if (elo[1].queueType == "RANKED_FLEX_TT") {
                            queueType1 = "3V3 FLEX"
                        } else {
                            queueType1 = "UNRANKED"
                        };
                        $('#main').append(`
            <div class="elo">
                <div class="iconTier1"><img src="icon/${elo[1].tier}.png"></div>
                <div class="queueType">${queueType1}</div>
                <span class="tier1">${elo[1].tier}</span>
                <span class="rank1">${elo[1].rank}</span>
                <div class="leaguePoints1">${elo[1].leaguePoints} PDL</div>
            </div>
                `)
                    }
                    if (elo[2] == undefined) {
                    } else {
                        console.log(elo[2].queueType + '2')
                        if (elo[2].queueType == "RANKED_SOLO_5x5") {
                            queueType2 = "SOLO/DUO"
                        } else if (elo[2].queueType == "RANKED_FLEX_SR") {
                            queueType2 = "5V5 FLEX"
                        } else if (elo[2].queueType == "RANKED_FLEX_TT") {
                            queueType2 = "3V3 FLEX"
                        } else {
                            queueType2 = "UNRANKED"
                        };
                        $('#main').append(`
                    <div class="elo">
                        <div class="iconTier2"><img src="icon/${elo[2].tier}.png"></div>
                        <div class="queueType">${queueType2}</div>
                        <span class="tier2">${elo[2].tier}</span>
                        <span class="rank2">${elo[2].rank}</span>
                        <div class="leaguePoints2">${elo[2].leaguePoints} PDL</div>
                    </div>
                `)
                    }
                    $('#loadingP').hide();
                    perfilMatch()
                }
            }
        },
        error: function () {
            console.log('Erro na parte do perfil :(')
        }
    });
};

function perfilA() {
    $('.AMG td').on('click', function () {
        let time = $(this).attr('alt')
        friendlist = JSON.parse(localStorage.getItem('tbfriends'))[time].friend
        $.ajax({
            url: "php/summoner.php",
            type: 'POST',
            data: {
                login: friendlist,
                local: localStorage.getItem('regiao'),
                get: 'getSummonerByName',
            },
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (tabsA) {
                setTimeout(timesetPA, 2000)
                let perfilA = JSON.parse(tabsA)
                function timesetPA() {
                    $('#mainA').html("")
                    $('#mainA').append(`
                <button id="fechar" alt="fechar" class="fechar"><i class="far fa-times-circle"></i></button>
                <div class="player">
                    <div id="level">Level ${perfilA.summonerLevel}</div>
                    <div id="icone"><img src="https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${perfilA.profileIconId}.png">
                    <div id="nome" alt="${perfilA.id}">${perfilA.name}</span>
                </div>
                    `)
                    fechar();
                }
                $.ajax({
                    url: "php/summoner.php",
                    type: 'POST',
                    data: {
                        login: JSON.parse(tabsA).id,
                        local: localStorage.getItem('regiao'),
                        get: 'getLeaguePosition',
                    },
                    beforeSend: function () {

                    },
                    success: function (rankedA) {
                        setTimeout(timesetRA, 2000)
                        eloA = JSON.parse(rankedA)
                        function timesetRA() {
                            if (eloA[0] == undefined) {
                            } else {
                                if (eloA[0].queueType == "RANKED_SOLO_5x5") {
                                    queueType = "RANQUEADA SOLO"
                                } else if (eloA[0].queueType == "RANKED_FLEX_SR") {
                                    queueType = "RANQUEADA FLEX"
                                } else {
                                };

                                $('#mainA').append(`
                        <div class="elo">
                            <div class="iconTier"><img src="icon/${eloA[0].tier}.png"></div>
                            <div class="queueType">${queueType}</div>
                            <span class="tier">${eloA[0].tier}</span>
                            <span class="rank">${eloA[0].rank}</span>
                            <div class="leaguePoints1">${eloA[0].leaguePoints} PDL</div>
                        </div>
                        `)
                            }
                            if (eloA[1] == undefined) {
                            } else {
                                if (eloA[1].queueType == "RANKED_SOLO_5x5") {
                                    queueType1 = "RANQUEADA SOLO"
                                } else if (eloA[1].queueType == "RANKED_FLEX_SR") {
                                    queueType1 = "RANQUEADA FLEX"
                                } else {
                                };
                                $('#mainA').append(`
                <div class="elo">
                <div class="iconTier1"><img src="icon/${eloA[1].tier}.png"></div>
                <div class="queueType">${queueType1}</div>
                <span class="tier1">${eloA[1].tier}</span>
                <span class="rank1">${eloA[1].rank}</span>
                <div class="leaguePoints1">${eloA[1].leaguePoints} PDL</div>
                </div>
                `)
                            }
                            if (eloA[2] == undefined) {
                            } else {
                                if (eloA[2].queueType == "RANKED_SOLO_5x5") {
                                    queueType2 = "RANQUEADA SOLO"
                                } else if (eloA[2].queueType == "RANKED_FLEX_SR") {
                                    queueType2 = "RANQUEADA FLEX"
                                } else {
                                };
                                $('#mainA').append(`
                <div class="elo">
                <div class="iconTier1"><img src="icon/${eloA[2].tier}.png"></div>
                <div class="queueType">${queueType2}</div>
                <span class="tier2">${eloA[2].tier}</span>
                <span class="rank2">${eloA[2].rank}</span>
                <div class="leaguePoints1">${eloA[2].leaguePoints} PDL</div>
                </div>
                `)
                            }

                        }
                    }
                })
                setTimeout(timesetMA, 2000)
                function timesetMA() {
                    $.ajax({
                        url: "php/summoner.php",
                        type: 'POST',
                        data: {
                            login: JSON.parse(tabsA).accountId + '?endIndex=3',
                            local: localStorage.getItem('regiao'),
                            get: 'getMatchList',
                        },
                        beforeSend: function () {
                        },
                        success: function (tabsAm) {
                            gameidA1 = JSON.parse(tabsAm).matches[1].gameId
                            $.ajax({
                                url: "php/summoner.php",
                                type: 'POST',
                                data: {
                                    login: gameidA1,
                                    local: localStorage.getItem('regiao'),
                                    get: 'getMatch',
                                },
                                async: false,
                                success: function (matchlistA) {
                                    $.ajax({
                                        url: "view/match.html",
                                        success: function (pag) {
                                            $('#mainA').append(pag);
                                            parta = JSON.parse(matchlistA).participants
                                            partaI = JSON.parse(matchlistA).participantIdentities
                                            if (JSON.parse(matchlistA).gameMode == "ARAM") {
                                                $("#partida #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map12.png">')
                                                $("#partida #modo").append(JSON.parse(matchlistA).gameMode)
                                            } else if (JSON.parse(matchlistA).gameMode == "CLASSIC") {
                                                $("#partida #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png">')
                                                $("#partida #modo").append(JSON.parse(matchlistA).gameMode)
                                            }
                                            $("#partida #true table tbody").append('<td colspan="3"><div id="vitoria">Vitoria</div></td>')
                                            $("#partida #false table tbody").append('<td colspan="3"><div id="derrota">Derrota</div></td>')
                                            for (obj in parta) {
                                                if (parta[obj].stats.win == true) {
                                                    $("#partida #true table tbody").append('<tr>')
                                                    $("#partida #true table tbody").append('<td><div id="nomeMatch">' + partaI[obj].player.summonerName + '</div></td>')
                                                    $("#partida #true table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + parta[obj].championId + '.png"></div></td>')
                                                    $("#partida #true table tbody").append('<td><div id="pontosMatch">' + parta[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                                    $("#partida #true table tbody").append('</tr>')
                                                }
                                                if (parta[obj].stats.win == false) {
                                                    $("#partida #false table tbody").append('<tr>')
                                                    $("#partida #false table tbody").append('<td><span id="nomeMatch">' + partaI[obj].player.summonerName + '</span></td>')
                                                    $("#partida #false table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + parta[obj].championId + '.png"></div></td>')
                                                    $("#partida #false table tbody").append('<td><div id="pontosMatch">' + parta[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                                    $("#partida #false table tbody").append('</tr>')
                                                }

                                            }
                                        }
                                    })
                                }
                            })

                            gameida2 = JSON.parse(tabsAm).matches[2].gameId
                            $.ajax({
                                url: "php/summoner.php",
                                type: 'POST',
                                data: {
                                    login: gameida2,
                                    local: localStorage.getItem('regiao'),
                                    get: 'getMatch',
                                },
                                async: false,
                                success: function (matchlista2) {
                                    $.ajax({
                                        url: "view/match.html",
                                        success: function () {
                                            part = JSON.parse(matchlista2).participants
                                            partI = JSON.parse(matchlista2).participantIdentities
                                            if (JSON.parse(matchlista2).gameMode == "ARAM") {
                                                $("#partida2 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map12.png">')
                                                $("#partida2 #modo").append(JSON.parse(matchlista2).gameMode)
                                            } else if (JSON.parse(matchlista2).gameMode == "CLASSIC") {
                                                $("#partida2 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png">')
                                                $("#partida2 #modo").append(JSON.parse(matchlista2).gameMode)
                                            }
                                            $("#partida2 #true table tbody").append('<td colspan="3"><div id="vitoria">Vitoria</div></td>')
                                            $("#partida2 #false table tbody").append('<td colspan="3"><div id="derrota">Derrota</div></td>')
                                            for (obj in part) {
                                                if (part[obj].stats.win == true) {
                                                    $("#partida2 #true table tbody").append('<tr>')
                                                    $("#partida2 #true table tbody").append('<td><div id="nomeMatch">' + partI[obj].player.summonerName + '</div></td>')
                                                    $("#partida2 #true table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                                    $("#partida2 #true table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                                    $("#partida2 #true table tbody").append('</tr>')
                                                }
                                                if (part[obj].stats.win == false) {
                                                    $("#partida2 #false table tbody").append('<tr>')
                                                    $("#partida2 #false table tbody").append('<td><span id="nomeMatch">' + partI[obj].player.summonerName + '</span></td>')
                                                    $("#partida2 #false table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                                    $("#partida2 #false table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                                    $("#partida2 #false table tbody").append('</tr>')
                                                }
                                            }
                                        }
                                    })

                                }

                            })
                            gameida3 = JSON.parse(tabsAm).matches[0].gameId
                            $.ajax({
                                url: "php/summoner.php",
                                type: 'POST',
                                data: {
                                    login: gameida3,
                                    local: localStorage.getItem('regiao'),
                                    get: 'getMatch',
                                },
                                async: false,
                                success: function (matchlista3) {
                                    $.ajax({
                                        url: "view/match.html",
                                        success: function () {
                                            part = JSON.parse(matchlista3).participants
                                            partI = JSON.parse(matchlista3).participantIdentities
                                            if (JSON.parse(matchlista3).gameMode == "ARAM") {
                                                $("#partida3 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map12.png">')
                                                $("#partida3 #modo").append(JSON.parse(matchlista3).gameMode)
                                            } else if (JSON.parse(matchlista3).gameMode == "CLASSIC") {
                                                $("#partida3 #modo").append('<img src="http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png">')
                                                $("#partida3 #modo").append(JSON.parse(matchlista3).gameMode)
                                            }
                                            $("#partida3 #true table tbody").append('<td colspan="3"><div id="vitoria">Vitoria</div></td>')
                                            $("#partida3 #false table tbody").append('<td colspan="3"><div id="derrota">Derrota</div></td>')
                                            for (obj in part) {
                                                if (part[obj].stats.win == true) {
                                                    $("#partida3 #true table tbody").append('<tr>')
                                                    $("#partida3 #true table tbody").append('<td><div id="nomeMatch">' + partI[obj].player.summonerName + '</div></td>')
                                                    $("#partida3 #true table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                                    $("#partida3 #true table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                                    $("#partida3 #true table tbody").append('</tr>')
                                                }
                                                if (part[obj].stats.win == false) {
                                                    $("#partida3 #false table tbody").append('<tr>')
                                                    $("#partida3 #false table tbody").append('<td><span id="nomeMatch">' + partI[obj].player.summonerName + '</span></td>')
                                                    $("#partida3 #false table tbody").append('<td><div id="imgMatch"><img src="iconIMG/' + part[obj].championId + '.png"></div></td>')
                                                    $("#partida3 #false table tbody").append('<td><div id="pontosMatch">' + part[obj].stats.kills + '/' + part[obj].stats.deaths + '/' + part[obj].stats.assists + '</div></td>')
                                                    $("#partida3 #false table tbody").append('</tr>')
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                    $('#loading').hide();
                }
            }
        })
    })
};
function fechar() {
    $('#fechar').on('click', function () {
        $('#mainA').html("")
        perfilMatch();
    })
}

$(document).ready(function () {
    img = new Array(6);
    img[0] = "img/1.jpg";
    img[1] = "img/2.jpg";
    img[2] = "img/3.jpg";
    img[3] = "img/4.jpg";
    img[4] = "img/5.jpg";
    img[5] = "img/6.jpg";
    var number = Math.floor(Math.random(
    ) * 6)
    $('header').append('<style>body{background-image: url(' + img[number] + '); background-size:100%; background-attachment: fixed;}</style>')
});
