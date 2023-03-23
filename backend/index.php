<?php

// Handle the preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-http-method-override');
    // header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    header('HTTP/1.1 200 OK');
    exit;
}

// Handle the actual request
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE');
// header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-http-method-override');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=UTF-8');
// Include necessary files
include_once './controllers/ProductController.php';

$controller = new ProductController();

// Handle the request

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $controller->Get();
        break;
    case 'POST':
        if (isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']) && $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] == 'DELETE') {
            $controller->Delete();
        } else {
            $controller->Create();
        }
        break;
    default:
        header('HTTP/1.1 405 Method Not Allowed');
        header('Allow: GET, POST');
        break;
}
