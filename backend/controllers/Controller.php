<?php

abstract class Controller
{
  public function getJsonBody()
  {
    return json_decode(file_get_contents("php://input"));
  }

  public function echoJsonResponse($data)
  {
    echo json_encode($data);
  }

  abstract function Create();
  abstract function Get();
  abstract function Delete();
}
