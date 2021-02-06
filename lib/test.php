<?php
   require_once('clsMostrar.php');
   $cl = new mostrar();
   
   $travels = $cl->getTravelClass(10174,'2020-08-14 07:25:11','2021-01-29 07:25:11');
   echo json_encode($travels);

   



    /* $units = $cl->getUnitsData(10142);
    echo json_encode($units); */


    /* $units = $cl->getUnitsNumbers(10142);
    echo json_encode($units); */

    /* estadísticas de rutas por dia, semana, mes e intérvalo definido */

    /* $statistics = $cl->getStatics(10142,0,0,'m',3);
    echo json_encode($statistics); */

    /* funcion para sacar el porcentaje de uso de flotilla establecido por el usuario */

    
    /* $usage=$cl->get_fleet_usage('10142');
    echo (json_encode($usage));  */
   

    /* $statistics = $cl->getStatics(10142,'2019-01-14 07:25:11','2020-12-23 07:25:11','def');
    echo json_encode($statistics); */

/*     $f=5;
    $fecha = date('Y-m-d');
    $ranges=[];
	while($f>=0){
        $fe = "-$f month";	
		$nuevafecha = strtotime ( "$fe" , strtotime ( $fecha ) ) ;
		//$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
        //echo $nuevafecha.'<br>';
        
        $ranges[]=array (
            "start" => date ('Y-m-d 00:00:00', strtotime ('first day of this month', $nuevafecha)),
            "end" => date ('Y-m-d 23:59:59', strtotime ('last day of this month', $nuevafecha))
        );

	$f=$f-1;
	

}

print_r($ranges); */

/* $f=5;
$semana=[];
while($f>=1){
            $monday = strtotime("last monday");
            $monday = date('w', $monday)==date('w') ? $monday-7*$f*86400 : $monday;
            $sunday = strtotime(date("Y-m-d",$monday)." +6 days");
            $semana[]=array (
                "inicio" => date("Y-m-d 00:00:00",$monday),
                "fin" => date("Y-m-d 23:59:59",$sunday)
            );

            $f=$f-1;
        }
        $monday = strtotime("last monday");
        $monday = date('w', $monday)==date('w') ? $monday+7*86400 : $monday;
        $sunday = strtotime(date("Y-m-d",$monday)." +6 days");
        $semana[]=array (
            "inicio" => date("Y-m-d 00:00:00",$monday),
            "fin" => date("Y-m-d 23:59:59",$sunday)
        );         


echo json_encode($semana); */




 // echo json_encode(rangeWeek('2021-01-18'));
  
  

  /* echo json_encode($semana); */



?>