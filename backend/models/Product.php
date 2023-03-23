<?php

include_once './config/Database.php';

abstract class Product
{
    private $tables = 'ecommerce';

    // product properties
    public $SKU;
    public $Name;
    public $Price;
    public $Type;
    public $TypeDetails;

    abstract public static function GetType();

    // create product
    public function CreateProduct()
    {
        try {
            $database = new Database();
            $conn = $database->connect();

            // Check if SKU already exists in the database
            $query = 'SELECT * FROM ecommerce WHERE SKU = :SKU';
            $statement = $conn->prepare($query);
            $statement->bindParam(':SKU', $this->SKU);
            $statement->execute();

            if ($statement->rowCount() > 0) {
                // SKU already exists, send 404 error
                http_response_code(404);

                return ['error' => 'SKU already exists'];
            }

            // SKU does not exist, create new product
            $query = 'INSERT INTO ecommerce'.' SET 
        SKU = :SKU,
        Name= :Name,
        Price = :Price,
        Type = :Type,
        TypeValue = :TypeDetails';

            $statement = $conn->prepare($query);

            // sanitize input
            $this->SKU = htmlspecialchars(strip_tags($this->SKU));
            $this->Name = htmlspecialchars(strip_tags($this->Name));
            $this->Price = htmlspecialchars(strip_tags($this->Price));
            $this->Price = (float) $this->Price;
            $this->Type = htmlspecialchars(strip_tags($this->Type));
            $this->TypeDetails = htmlspecialchars(strip_tags($this->TypeDetails));

            // bind data
            $statement->bindParam(':SKU', $this->SKU);
            $statement->bindParam(':Name', $this->Name);
            $statement->bindParam(':Price', $this->Price, PDO::PARAM_INT);
            $statement->bindParam(':Type', $this->Type);
            $statement->bindParam(':TypeDetails', $this->TypeDetails);

            if ($statement->execute()) {
                return ['message' => 'Product Created'];
            }

            return false;
        } catch (Exception $e) {
            return $e;
        }
    }

      // get products
      public static function GetProducts()
      {
          $database = new Database();
          $conn = $database->connect();

          $query = 'Select * from ecommerce';

          $statement = $conn->prepare($query);
          $statement->execute();

          if ($statement->rowCount() > 0) {
              $productsArray = [];

              while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                  extract($row);

                  $productItem = [
                      'SKU' => $SKU,
                      'Name' => $Name,
                      'Price' => $Price,
                      'Type' => $Type,
                      'TypeValue' => $TypeValue,
                  ];

                  array_push($productsArray, $productItem);
              }

              return $productsArray;
          } else {
              return [];
          }
      }

       // delete products
       public static function DeleteProducts($SKUsArray)
       {
           $database = new Database();
           $conn = $database->connect();

           $SKUs = implode(',', array_fill(0, count($SKUsArray), '?'));

           // Create query
           $query = 'DELETE FROM ecommerce WHERE SKU IN('.$SKUs.')';

           // Prepare statement
           $statement = $conn->prepare($query);

           foreach ($SKUsArray as $k => $SKU) {
               $statement->bindValue($k + 1, $SKU)
               ;
           }

           // Execute query
           if ($statement->execute()) {
               return ['message' => 'Products Deleted'];
           }

           return ['message' => 'Products Not Deleted'];
       }
}
