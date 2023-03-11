<?php

include_once 'Controller.php';
include_once './models/Product.php';
include_once './models/ProductFactory.php';
include_once './models/Book.php';
include_once './models/DVD.php';
include_once './models/Furniture.php';

class ProductController extends Controller
{
   

    function Get(){
        try {
            $data = $this->getJsonBody();
            $result = Product::GetProducts();
            $this->echoJsonResponse($result);
        } catch (Exception $e) {

            $this->echoJsonResponse($e);
        }
    }

       function Create(){
        try {

            $data = $this->getJsonBody();
            $productFact = new ProductFactory();
            $product = $productFact->create($data->Type, $data);
            $result = $product->CreateProduct();
            $this->echoJsonResponse($result);
        } catch (Exception $e) {

            $this->echoJsonResponse($e);
        }
    }

        function Delete(){
        try {

            $data = $this->getJsonBody();
            $SKUsArray = $data->SKUs;
            $result = Product::DeleteProducts($SKUsArray);
            $this->echoJsonResponse($result);
        } catch (Exception $e) {

            $this->echoJsonResponse($e);
        }
    }
}
