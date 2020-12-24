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
            $d=[];
            $i=0;
            $j=0;
            $k=0;
            $l=0;
            $result = $this->_conn->query($qr);
            while ($row = mysqli_fetch_assoc($result)) {
                $id_act=$row['id_rutas_activas'];
                $qr2 ="SELECT * FROM tbl_valores_reales WHERE id_ruta = $id_act";
                $r = $this->_conn->query($qr2);
                //die(json_encode($rr));
                while ($rr = mysqli_fetch_assoc($r)) {

                    if (strtotime($rr['hora_real'])<strtotime($row['fecha_fin'])) {
                        
                        $a['a_tiempo'][$j]['esperados']=$row;
                        $a['a_tiempo'][$j]['reales']= $rr;
                        $j++;
                    }
                    elseif (strtotime($rr['hora_real'])>strtotime($row['fecha_fin'])) {
                        $a['retrasados'][$i]['esperados']=$row;
                        $a['retrasados'][$i]['reales']= $rr;
                        $i++;
                    }
                   
                    
                }
                if ($row['id_estatus']==1 && strtotime($row['fecha_inicio'])> time() ) {
                    $a['en_espera'][$k]['esperados']=$row;
                    $k++;
                }elseif ($row['id_estatus']==1 && strtotime($row['fecha_inicio']) < time()) {
                    $a['en_curso'][$l]['esperados']=$row;
                    $l++;
                }
                $a['c_a_tiempo']=count($a['a_tiempo']);
                $a['c_retrasados']=count($a['retrasados']);
                $a['c_en_curso']=count($a['en_curso']);
            }
            return $a;
        }
        public function getUnitsData($id_cliente)
        {
          $qr = "SELECT * FROM tbl_clienteplataforma WHERE id_login = $id_cliente";
          //die($qr);
          $result = $this->_db->query($qr);
         $a=[];
         while ($r =  mysqli_fetch_assoc($result)) {
             $id=$r['id_cliente'];
            $qrr = "SELECT * FROM tbl_unidades WHERE id_cliente =$id ;";
            $rt = $this->_db->query($qrr);
            while ($rr =mysqli_fetch_assoc($rt)) {
                $a[]=$rr;
                //falta clasificar las unidades de acuerdo al status que tienen.
            }
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

