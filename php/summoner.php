<?php
include('php-riot-api.php');
include('FileSystemCache.php');

//testing classes
$login = $_POST['login'];
$local = $_POST['local'];
$get = $_POST['get'];
$api = new riotapi($local, new FileSystemCache('cache/'));

// $r = $api->getChampion();
// $r = $api->getChampion(true);
// $r = $api->getChampionMastery(23516141);
// $r = $api->getChampionMastery(23516141,1);
// $r = $api->getCurrentGame(23516141);
// $api->setPlatform("na1");
// $r = $api->getStatic("champions", 1, "locale=fr_FR&tags=image&tags=spells");
// $api->setPlatform("euw1");
// $r = $api->getMatch(2898677684);
// $r = $api->getMatch(2898677684,false);
// $r = $api->getTimeline(2898677684);
// $r = $api->getMatchList(27695644);
// $params = array(
	// "queue"=>array(4,8),
	// "beginTime"=>1439294958000
// );
// $r = $api->getMatchList(27695644, $params);
// $r = $api->getRecentMatchList(27695644);
// $r = $api->getLeague(24120767);
// $r = $api->getLeaguePosition(24120767);
// $r = $api->getChallenger();
// $r = $api->getMaster();


$test = $api->$get($login);
preview($test);
function preview($tabs){
    echo json_encode($tabs);
}

?>