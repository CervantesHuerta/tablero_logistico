<?php 
//require_once('sesion.php');
date_default_timezone_set('America/Mexico_City');
require_once "clsModelo.php";

require_once "wialon.php";

class mostrar extends Modelo
    {
        public function getTravelClass($id_cliente,$from,$to)
        {
            $qr = "SELECT * FROM tbl_rutas_activas WHERE fecha_fin between '$from' AND '$to' AND id_creador = $id_cliente";
            //die($qr);
            $a=[];
            $result = $this->_conn->query($qr);
            while ($row = mysqli_fetch_assoc($result)) {
                $a[]=$row;
            }
            return $a;
        }

       /*  public function save_response($response)
        {
            $qr = "INSERT INTO cydsacoc_punto4.tbl_responses VALUES (NULL,'$response',now())";
            echo $qr;
            $this->_conn->query($qr);

        } */
    }

