<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


include_once './controllers/ProductController.php';

$controller = new ProductController();
$controller->Get();
