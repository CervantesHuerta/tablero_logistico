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
            $m=0;
            $result = $this->_conn->query($qr);
            while ($row = mysqli_fetch_assoc($result)) {
                $id_act=$row['id_rutas_activas'];
                $id_unidades=$row['id_unidad'];
                $d[]=$id_unidades;
                
                //$m++;

                
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
                $a['units']=$d;
                

            }
            return $a;
        }
        public function get_fleet_usage($id){
            $data = [];
            $qr="SELECT percent FROM tbl_uso_flota WHERE id_cliente = $id;";
            $result = $this->_conn->query($qr);
            $percent= mysqli_fetch_assoc($result);
            $data['limit_percent']=$percent['percent'];

            $cl="SELECT id_cliente FROM tbl_clienteplataforma WHERE id_login = $id;";
            $rs = $this->_db->query($cl);
            $id_plat= mysqli_fetch_assoc($rs);
            $id_plataforma = $id_plat['id_cliente'];
            $units = "SELECT * FROM tbl_unidades WHERE id_cliente = $id_plataforma AND id_status=0 order by id_unidad desc;";
            $rss = $this->_db->query($units);
            $countU= mysqli_num_rows($rss);
            $unidades = [];
            while ($row = mysqli_fetch_assoc($rss)) {
                $unidades[]=$row;
            }
            $data['n_units']=$countU;
            $data['unidades']=$unidades;
            return $data;

        }


        public function getUnitsData($id_cliente)
        {
          $qr = "SELECT * FROM tbl_clienteplataforma WHERE id_login = $id_cliente";
          //die($qr);
          $result = $this->_db->query($qr);
         $a=[];
         $x=0;
         $units = [];
         while ($r =  mysqli_fetch_assoc($result)) {
             $id=$r['id_cliente'];
            $qrr = "SELECT * FROM tbl_unidades WHERE id_cliente =$id ;";
            $rt = $this->_db->query($qrr);
            while ($rr =mysqli_fetch_assoc($rt)) {
                if ($rr['id_status']==0) {
                    $a[$x]['id_unidad']=$rr['id_unidad'];
                    $a[$x]['nombre_unidad']=$rr['nombre'];
                    $x++;
                    }
                }
            }        
        return $a;
        }

        public function getUnitsNumbers($id_cliente)
        {
            $qr = "SELECT * FROM tbl_clienteplataforma WHERE id_login = $id_cliente";
            //die($qr);
            $result = $this->_db->query($qr);
           $a=[];
           $x=0;
           $units = [];
           $nd=0;
           while ($r =  mysqli_fetch_assoc($result)) {
               $id=$r['id_cliente'];
              $qrr = "SELECT * FROM tbl_unidades WHERE id_cliente =$id ;";
              //die($qrr);
              $rt = $this->_db->query($qrr);
              while ($rr =mysqli_fetch_assoc($rt)) {
                  if ($rr['id_status']==0) {
                  $a[$x]['id_unidad']=$rr['id_unidad'];
                  $a[$x]['nombre_unidad']=$rr['nombre'];
                  $x++;
                  }else{
                      $nd++;
                  }
                  
                  //falta clasificar las unidades de acuerdo al status que tienen.
              }
           }
          $query= "SELECT count(*)as total FROM cydsacoc_punto4.tbl_rutas_activas WHERE id_creador =$id_cliente AND id_estatus = 1";
          $rst = $this->_conn->query($query);
          $data = mysqli_fetch_assoc($rst);
  
          
          
          $units['en_ruta']= (float)$data['total'];
          $units['total']= count($a)+$nd;
          $units['disponibles']= count($a)-$units['en_ruta'];
          $units['no_disponibles']=$nd;


        
          

          $units['percent_en_ruta']=($units['en_ruta']==0)?0:round($units['en_ruta']*100/$units['total'],2);
          
          $units['percent_disponibles']=round($units['disponibles']*100/$units['total'],2);
          
          $units['percent_no_disponibles']=round($units['no_disponibles']*100/$units['total'],2);
           
          return $units;
          }
        
        public function get_week()
        {
            $semana=[];
            $monday = strtotime("last monday");
            $monday = date('w', $monday)==date('w') ? $monday+7*86400 : $monday;
            $sunday = strtotime(date("Y-m-d",$monday)." +6 days");
            $this_week_sd = date("Y-m-d 00:00:00",$monday);
            $this_week_ed = date("Y-m-d 23:59:59",$sunday);
            $semana['inicio']=date("Y-m-d",$monday);
            $semana['fin']=date("Y-m-d",$sunday);
            return $semana;

        }

        function rangeWeek ($datestr) {
            date_default_timezone_set (date_default_timezone_get());
            $dt = $datestr;
            return array (
              "start" => date ('N', $dt) == 1 ? date ('Y-m-d 00:00:00', $dt) : date ('Y-m-d 00:00:00', strtotime ('last monday', $dt)),
              "end" => date('N', $dt) == 7 ? date ('Y-m-d 23:59:59', $dt) : date ('Y-m-d 23:59:59', strtotime ('next sunday', $dt))
            );
          }

        public function getMonth()
        {
            $dt =time();
            $a= array (
                "start" => date ('Y-m-d 00:00:00', strtotime ('first day of this month', $dt)),
                "end" => date ('Y-m-d 23:59:59', strtotime ('last day of this month', $dt))
            );

            return $a;
        }


        public function getStatics($id_cliente,$from=0,$to=0,$type,$int=1)
        {
            switch ($type) {
                case 'd':
                    $tr=[];
                    $g=0;
                    if ($int<=1) {
                    $ini = date('Y-m-d 00:00:00');
                    $fin = date('Y-m-d 23:59:59');
                    $travels = $this->getTravelClass($id_cliente,$ini,$fin);
                    $tr[$g]['periodo']=$ini.' / '.$fin;
                    $tr[$g]['data']=$travels;

                    return $tr;
                    break;
                    }
                    else{
                        $var = 1;
                        $fechas = [];
                        $tr=[];
                        $j=0;
                        while ($var<=$int){
                            $stop_date = new DateTime();
                            $stop_date->format('Y-m-d 00:00:00');
                            $stop_date->modify('-'.$var.' day');
                            $fechas[$var]['inicial'] =  $stop_date->format('Y-m-d 00:00:00');
                            $fechas[$var]['final'] =  $stop_date->format('Y-m-d 23:59:00');
                            $var++;
                        }

                        foreach ($fechas as $f) {
                            $ini = $f['inicial'];
                            $fin = $f['final'];
                            $travels = $this->getTravelClass($id_cliente,$ini,$fin);
                            $tr[$j]['periodo']=$ini.' / '.$fin;
                            $tr[$j]['data']=$travels;
                            $j++;
                        }
                        return $tr;
                        break;

                    }
                    
                    break;
                case 'm':
                    if ($int<=1) {
                        $tr=[];
                        $g=0;
                        $ini=date ('Y-m-d 00:00:00', strtotime ('first day of this month'));
                        $fin=date ('Y-m-d 00:00:00', strtotime ('last day of this month'));
                        $travels = $this->getTravelClass($id_cliente,$ini,$fin);
                        $tr[$g]['periodo']=$ini.' / '.$fin;
                        $tr[$g]['data']=$travels;
                        return $tr;
                    break;
                    }else{
                        $var = 1;
                        $fechas = [];
                        $tr=[];
                        $j=0;
                        $f=$int;
                        $fecha = date('Y-m-d');
                        $ranges=[];
                        while($f>=0){
                            $fe = "-$f month";	
                            $nuevafecha = strtotime("$fe" , strtotime ($fecha));                            
                            $ranges[]=array (
                                "inicial" => date ('Y-m-d 00:00:00', strtotime ('first day of this month', $nuevafecha)),
                                "final" => date ('Y-m-d 23:59:59', strtotime ('last day of this month', $nuevafecha))
                            );
                        $f=$f-1;
                    }
                }
                foreach ($ranges as $f) {
                    $ini = $f['inicial'];
                    $fin = $f['final'];
                    $travels = $this->getTravelClass($id_cliente,$ini,$fin);
                    $tr[$j]['periodo']=$ini.' / '.$fin;
                    $tr[$j]['data']=$travels;
                    $j++;
                    
                }


                //$usage=$this->get_fleet_usage($id_cliente);
                //die (json_encode($usage));


                return $tr;
                    break;
                case 'w':

                    $tr=[];
                    $j=0;
                    $f=$int;


                    $f=$int;
                    $semana=[];
                    while($f>=1){
                        $sem=$f*604800;
                        $now=time()-$sem;
                        //$date = strtotime($now);
                        $semana[]= $this->rangeWeek($now);

                        $f=$f-1;
                    }
                    foreach ($semana as $sem) {
                        $ini=$sem['start'];
                        $fin=$sem['end'];
                        $travels = $this->getTravelClass($id_cliente,$ini,$fin); 
                        $tr[$j]['periodo']=$ini.' / '.$fin;
                        $tr[$j]['data']=$travels;
                        $j++;
                    }
                    return $tr;
                    break;
                case 'def':
                    $travels = $this->getTravelClass($id_cliente,$from,$to);
                    return $travels;
                    break;
                
                    
            }
        }

        public function getFleetUsage ($id_cliente,$from,$to)
        {
            # code...
        }



       /*  public function save_response($response)
        {
            $qr = "INSERT INTO cydsacoc_punto4.tbl_responses VALUES (NULL,'$response',now())";
            echo $qr;
            $this->_conn->query($qr);

        } */
    }

