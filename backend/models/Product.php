<?php 


    include_once './config/Database.php';

    abstract class Product{
    private $tables = 'ecommerce';

    //product properties
    public $SKU;
    public $Name;
    public $Price;
    public $Type;
    public $TypeDetails;


    static abstract function GetType();

    public static function GetProducts(){
        $database = new Database();
        $conn = $database->connect();

        $query = 'Select * from ecommerce';

        $statement = $conn->prepare($query);
        $statement->execute();

        if ($statement->rowCount() > 0) {
            $productsArray = array();

            while($row = $statement->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $productItem = array(
                    'SKU' => $SKU,
                    'Name' => $Name,
                    'Price' => $Price,
                    'Type' => $Type,
                    'TypeValue' => $TypeValue,
                );

                array_push($productsArray, $productItem);
                }

                return $productsArray;
        }else{
            return array();
        };

    }
}
