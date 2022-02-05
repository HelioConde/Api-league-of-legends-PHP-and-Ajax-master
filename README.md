# Projeto utilizando a API oficial da RIOT GAMES responsavel pelo jogo League of Legends

# Exemplo de chamado PHP

    <?php
    $API_KEY = "/* Here your Riot key */";

    $url = 'https://br1.api.riotgames.com/tft/summoner/v1/summoners/by-name/'/* name in game */;

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'GET'
        CURLOPT_HTTPHEADER => [
            'X-Riot-Token:'.$API_KEY
        ],
        CURLOPT_RETURNTRANSFER => 1,
    ]);

    $resposta = json_decode(curl_exec($ch), true);
    preview($resposta);
    function preview($resposta){
        echo json_encode($resposta);
    }
    curl_close($ch);
    ?>
    
# Exemplo de chamado Ajax

    <script>
    $.ajax({
        url: '/* Page PHP */',                        
        type: 'post',
        success: function(response){
            console.log(JSON.parse(response));
        }
      })
    </script>
