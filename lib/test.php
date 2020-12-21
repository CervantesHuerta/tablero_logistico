<?php
   require_once('clsMostrar.php');
   $cl = new mostrar();
<<<<<<< HEAD
   $travels = $cl->getTravelClass(10142,'2019-01-14 07:25:11','2020-12-15 07:25:11');
=======
   $travels = $cl->getTravelClass(10142,'2020-10-14 07:25:11','2020-12-15 07:25:11');
>>>>>>> 92d8ca80cfdef9fe4a895c92ecf1a36ec539cb38
    echo json_encode($travels);

    /* $json = '[{"id":"1","nombre":"Jose","edad":"25","genero":"masculino","email":"josegonzales9871@gmail.com","localidad":"Madrid","telefono":"912546524"},{"id":"2","nombre":"Juan","edad":"31","genero":"masculino","email":"juanrodriguez65465@gmail.com","localidad":"Barcelona","telefono":"934654654"},{"id":"3","nombre":"Antonio","edad":"43","genero":"masculino","email":"antoni654654@gmail.com","localidad":"Valencia","telefono":"214748366"},{"id":"4","nombre":"Angelina","edad":"35","genero":"femenino","email":"angelina654456@gmail.com","localidad":"New York","telefono":"247483647"}]';


    

    $cl->save_response($json); */

?>