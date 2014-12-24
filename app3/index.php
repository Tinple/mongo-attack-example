<!DOCTYPE HTML>
<html>
<head>
	<title>dududu</title>
	<link rel="stylesheet" href="./css/normalize.css">
	<style>

	.yue {
		font: 400 18px/1.62 "Georgia", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", sans-serif;
		color: #444443;
	}

	.avatar-micro {
	    width: 128px;
	    height: 128px;
	    border-radius: 50%;
	    vertical-align: top;
	    border: 4px solid #CDD1A0;
	}

	#search input[type="text"] {
	    background: url('./img/search-white.png') no-repeat 10px 6px #444;
	    border: 0 none;
	    font: bold 12px Arial,Helvetica,Sans-serif;
	    color: #777;
	    width: 200px;
	    padding: 6px 25px 6px 45px;
	    -webkit-border-radius: 20px;
	    -moz-border-radius: 20px;
	    border-radius: 20px;
	    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
	    -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
	    -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
	    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;
	    -webkit-transition: all 0.7s ease 0s;
	    -moz-transition: all 0.7s ease 0s;
	    -o-transition: all 0.7s ease 0s;
	    transition: all 0.7s ease 0s;
	}

	#search input[type="text"]:focus {
	    width: 200px;
	}

	.container {
		width: 720px;
		margin: 0 auto;
	}

	.collection {
		float: left;
		width: 128px;
		padding: 56px 56px; 
	}

	.clearfix:before, .clearfix:after { content: "\0020"; display: block; height: 0; overflow: hidden; }  
	.clearfix:after { clear: both; }  
	.clearfix { zoom: 1; }  

	form {
		padding: 0 180px 0 240px;
	}

	p {
		text-align: center;
		font-size: 18px;
	}
	</style>
</head>
<body>
	<div class="container yue">
		<div class="collection">
			<img src="./img/benzina.jpeg" title="Yuuki Asuna" alt="Yuuki Asuna, Asuna" class="avatar-micro">
		</div>
		<div class="collection">
			<img src="./img/tongren.jpeg" title="Kirigaya Kazuto" alt="Kirigaya Kazuto, Kirito" class="avatar-micro">
		</div>
		<div class="collection">
			<img src="./img/paojie.jpeg" title="Misaka Mikoto" alt="Misaka Mikoto, Railgun" class="avatar-micro">
		</div>
		<div class="collection">
			<img src="./img/saber.jpeg" title="SaberLily" alt="SaberLily, saber" class="avatar-micro">
		</div>
		<div class="collection">
			<img src="./img/jinshanshan.jpeg" title="Gilgamesh" alt="Gilgamesh, King" class="avatar-micro">
		</div>
		<div class="collection">
			<img src="./img/xiaoniao.jpeg" title="Takanashi Rikka" alt="Takanashi Rikka, Rikka" class="avatar-micro">
		</div>
		<div class="clearfix"></div>
		<form method="get" id="search">
			<input type="text" size="40" name="q" placeholder="search for fun">
		</form>
	</div>
</body>
</html>

<?php
	$m = new MongoClient("mongodb://127.0.0.1:27017");
	$db = $m->cartoon;
	$collection = $db->characters;
	$q = (isset($_GET['q']) ? $_GET['q'] : null);

	if ($q) {
		$q = filter($q);
	  	$js = 'function(){if(this.name =='.'\''.$q.'\''.'||this.nick=='.'\''.$q.'\''.')return true;}';
	    $cursor = $collection->find(array('$where' => $js));
		foreach($cursor as $doc) {
            echo '<p>';
            echo $doc["name"] . ', aka ' . $doc["nick"] . '.';
            echo '</p>';
        }

	}

	function filter($s) {
		return preg_replace('/while|for|do|eval/i', '', $s);
	}
?>