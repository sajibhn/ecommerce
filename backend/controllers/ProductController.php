<?php

include_once 'Controller.php';
include_once './models/Product.php';
include_once './models/ProductFactory.php';
include_once './models/Book.php';
include_once './models/DVD.php';
include_once './models/Furniture.php';

class ProductController extends Controller
{
   

    function Get()
    {
        try {
            $data = $this->getJsonBody();
            $result = Product::GetProducts();
            $this->echoJsonResponse($result);
        } catch (Exception $e) {

            $this->echoJsonResponse($e);
        }
    }
}
