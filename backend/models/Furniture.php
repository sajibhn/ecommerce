<?php


include_once 'Product.php';

class Furniture extends Product
{
  public function __construct($data)
  {
    $this->SKU = $data->SKU;
    $this->Name = $data->Name;
    $this->Price = $data->Price;
    $this->Type = $data->Type;
    $this->TypeDetails = $data->TypeValue;
  }


  static function GetType()
  {
    return 'Furniture';
  }
}
