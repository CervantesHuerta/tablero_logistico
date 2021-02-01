<?php
require_once('clsMostrar.php');
$type = $_POST['type'];
$ob = new mostrar();
switch ($type) {
    case 0:
        $units = $ob->getUnitsNumbers($_POST['cliente']);
        echo json_encode($units);
        break;
    case 1:
        $dates = $ob->getMonth();
        //die(json_encode($dates));
        //$travels = $ob->getTravelClass($_POST['cliente'],$dates['start'],$dates['end']);
        $travels = $ob->getTravelClass($_POST['cliente'],'2020-08-14 07:25:11',$dates['end']);
        echo json_encode($travels);
        break;
    case 2:
        # code...
        break;
    case 3:
        # code...
        break;
    case 4:
        # code...
        break;
    case 5:
        # code...
        break;
    case 6:
        # code...
        break;
    case 7:
        # code...
        break;
    case 8:
        # code...
        break;
    case 9:
        # code...
        break;
    case 10:
        # code...
        break;
    case 11:
        # code...
        break;
    case 12:
        # code...
        break;
    case 13:
        # code...
        break;
    case 14:
        # code...
        break;
    case 15:
        # code...
        break;
    
}
?>