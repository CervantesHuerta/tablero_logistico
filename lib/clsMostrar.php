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
            $a=[];
            $result = $this->_conn->query($qr);
            while ($rw = mysqli_fetch_assoc($result)) {
                $a[]=$rw;
            }
            return $a;
        }
    }

