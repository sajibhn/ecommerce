<?php 

include_once 'Book.php';
include_once 'DVD.php';
include_once 'Furniture.php';
class ProductFactory
{

  protected $products;

  function __construct()
  {
    $this->products = [Book::GetType() => Book::class,
    DVD::GetType() => DVD::class,
    Furniture::GetType() => Furniture::class];
  }

  function create($type, $data)
  {
    if (!array_key_exists($type, $this->products))
      throw new Exception("Invalid product type: '$type'");

    $product_class = $this->products[$type];
    return new $product_class($data);
  }
}
