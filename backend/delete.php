<?php 
  // Headers
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, DELETE");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



  include_once './controllers/ProductController.php';

  $controller = new ProductController();
  $controller->Delete();
