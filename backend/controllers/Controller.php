<?php

abstract class Controller
{
    public function getJsonBody()
    {
        return json_decode(file_get_contents('php://input'));
    }

    public function echoJsonResponse($data)
    {
        echo json_encode($data);
    }

    abstract public function Create();

    abstract public function Get();

    abstract public function Delete();
}
