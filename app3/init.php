<?php

// connect
$m = new MongoClient();

// select a database
$db = $m->cartoon;
// select a collection (analogous to a relational database's table)
$collection = $db->characters;

$document = array( 
	"name" => 'Kirigaya Kazuto', 
	"nick" => 'Kirito'
);

$collection->insert($document);

$document = array( 
	"name" => 'Yuuki Asuna', 
	"nick" => 'Asuna'
);

$collection->insert($document);

$document = array( 
	"name" => 'Takanashi Rikka', 
	"nick" => 'Rikka'
);

$collection->insert($document);

$document = array( 
	"name" => 'Misaka Mikoto', 
	"nick" => 'Railgun'
);

$collection->insert($document);

$document = array( 
	"name" => 'Gilgamesh', 
	"nick" => 'King'
);

$collection->insert($document);

$document = array( 
	"name" => 'SaberLily', 
	"nick" => 'Saber'
);

$collection->insert($document);

$collection = $db->attackme;

$document = array( 
	"yoooFlaaaaaag" => 'hctf{Oh_y0u_f1nd_1t!}' 
);

$collection->insert($document);
?>