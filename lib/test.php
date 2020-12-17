<?php
   require_once('clsMostrar.php');
   $cl = new mostrar();
   $travels = $cl->getTravelClass(10142,'2020-12-14 07:25:11','2020-12-15 07:25:11');
    echo json_encode($travels);
?>