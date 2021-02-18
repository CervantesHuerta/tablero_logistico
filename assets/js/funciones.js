/*$(document).ready(function(){
  alert("AQUI");
$('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
              alert("Ready");
              console.log(modal, trigger);
            },
            complete: function() { alert('Closed'); } // Callback for Modal close
          });        

)};*/

/*var revision=0;

 $(function () {                      

        $(document).ready(function() {

          //getAlertas();

          load(1);          

          $('select').material_select();                    

          $('.modal').modal();          

        });



        $("#tab1").click(function(e) {

        revision=0;

        load(1);

          console.log(revision);

          });

        $("#tab2").click(function(e) {

        revision=1;

        load(1);

        console.log(revision);

          });

        $("#tab3").click(function(e) {

        revision=2;

        load(1);

        console.log(revision);

          });

     });  */



 /* setInterval(function () {

        obtenerAlertas();

      }, 900000);*/



  /*function load(page){

    var numReg=10;

    if (document.getElementById('numeroReg')!=null)

    {

      numReg=document.getElementById('numeroReg').value;

    }

    var filtro='';

    if(document.getElementById('filtro')!=null)

    {

      filtro=document.getElementById('filtro').value;

    }

   

    var parametros = {"action":"ajax","page":page,"numReg":numReg,"filtro":filtro,"revision":revision};

    //$("#divTabla").fadeIn('slow');

    $.ajax({

      url:'lib/alertas.php',

      data: parametros,

      beforeSend: function(objeto){

        $("#divTabla").html("<center><i class='fa fa-spinner fa-pulse fa-3x fa-fw purple-saktesi-dark-text center'></i><span class='sr-only'></span></center>");

      },

      success:function(data){        

        $("#divTabla").html(data);

      }

    })

  }*/





  function obtenerAlertas()

  {

    $.ajax({

                data:  {operacion:0},

                url:   'lib/operacionesDiagnostico.php',

                type:  'post',

                beforeSend: function(objeto){

                  //$("#btnRefresh").html("<i class='fa fa-refresh fa-spin fa-3x fa-fw'></i>");          

                },

                success:  function (response) {

                  //$("#btnRefresh").html("<i class='fa fa-refresh' aria-hidden='true'></i>");
                  $('#modalCargando').modal('close');

                  dataTable.ajax.reload();

                }             

        });



  }



  /*function mostrarModal(ID, nombre,imagen,tel,fecha,solucion,coment,revision,idAlerta)

  {       

        $.ajax({

                data:  {ID: ID,

                        nombre: nombre,

                        imagen: imagen,

                        tel: tel,

                        fecha: fecha,

			solucion: solucion,

                        coment: coment,

                        revision: revision,

                        idAlerta: idAlerta

                      },

                url:   'vistas/modalSensores.php',

                type:  'post',

                success:  function (response) {



                        $("#modal1").html(response);

                        $('#modal1').modal('open');
			$('#coment1').focus();

                        $('select').material_select();

                        $('textarea').trigger('autoresize');

          

                }             

        });

  }*/



  function modalEliminarAlerta(idAlerta)

  {       

        $.ajax({           

                data:  {idAlerta: idAlerta},

                url:   'vistas/modalEliminarAlerta.php',

                type:  'post',

                success:  function (response) {

                        $("#modalDelete1").html(response);

                        $('#modalDelete1').modal('open');                                  

                }             

        });

  }



function modalAnalisisBLINT(jerarquia,idUsuario)

  {       

        $.ajax({           

                data:  {jerarquia:jerarquia,idUsuario:idUsuario},

                url:   'vistas/analisisBLINT.php',

                type:  'post',
                beforeSend:function(){
                  $("#modalAnalisisBLINT").html("<center><i class='fa fa-spinner fa-pulse fa-3x fa-fw purple-saktesi-dark-text center-align' style='margin-top:40%;'></i><span class='sr-only'></span></center>");
                },
                success:  function (response) {

                        $("#modalAnalisisBLINT").html(response);

                        //$('#modalAnalisisBLINT').modal('open');
                         //$('body').addClass('modal-open');                                                       

                }             

        });
  }



  function guardarComentario(comentario,revision,idAlerta,coment1, revi1)

  {



    coment=document.getElementById('coment1').value;

    revi=document.getElementById(revision).value;

    $.ajax({

                data:  {

                        comentario:coment,

                        revision:revi,

                        idAlerta:idAlerta,

                        operacion: 1

                      },

                url:   'lib/operacionesDiagnostico.php',

                type:  'post',

                success:  function (response) {
                  if(coment1!=coment||revi1!=revi)
                  {
                    dataTable.ajax.reload();
                  }

                                      

                  $('#modal1').modal('close');
                  $('body').removeClass('modal-open');


                }             

    });

  }



  function cambiarEstatusUnidad(estatusUnidad,idAlerta)

  {

    $.ajax({

                data:  {

                        estatusUnidad:estatusUnidad,

                        idAlerta:idAlerta,

                        operacion: 2

                      },

                url:   'lib/operacionesDiagnostico.php',

                type:  'post',

                success:  function (response) {

                   dataTable.ajax.reload();                                  

                }             

    });

  }

  function eliminarAlerta(idAlerta)

  {

    $.ajax({

                data:  {

                        idAlerta:idAlerta,

                        operacion: 3

                      },

                url:   'lib/operacionesDiagnostico.php',

                type:  'post',

                success:  function (response){

                  $('#modalDelete1').modal('close');

                  dataTable.ajax.reload();                                   

                }             

    });

  }



  function desbloqueoBlint()

  {

    $.ajax({

                data:  {},

                url:   'lib/desbloqueoBlint.php',

                type:  'post',

                beforeSend: function(objet)

                {

                  $('#btnDesBLINT').attr("disabled", true);

                  $('#btnDesBLINT').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i> Enviado...');



                },

                success:  function (response) {

                  $('#btnDesBLINT').attr("disabled", false);

                  $('#btnDesBLINT').html('<i class="fa fa-check" aria-hidden="true" ></i> Enviar');

                  $('#modalEmail').modal('close');

                }             

    });

  }
  
  $(function () {

    let call = "type=0&cliente=10142";

    $.ajax({type: "POST",
      url: "lib/handler.php",
      data:call,
      success: function(data){

        var data = JSON.parse(data);
        $("#doughnutChart").drawDoughnutChart([
          { title: "Unidades en Ruta", value: data['en_ruta'], color: "#702061", value2: data['percent_en_ruta']},
          { title: "Unidades Disponibles", value: data['disponibles'], color: "#a53f90", value2:data['percent_disponibles']},
          { title: "Unidades no Disponibles", value: data['no_disponibles'], color: "#a0a09f",value2:data['percent_no_disponibles']}
        ]);

        let numbers='<h2 >Unidades en ruta</h2><br><h2 style="margin-top: -20px; color: #702061; -webkit-text-stroke: medium; margin-bottom: -20px;">'+data['en_ruta']+'</h2><br><h2 >Unidades disponibles</h2><br><h2 style="margin-top: -20px; color: #a53f90; -webkit-text-stroke: medium; margin-bottom: -20px;">'+data['disponibles']+'</h2><br><h2 >Unidades no disponibles</h2><br><h2 style="margin-top: -20px; color: #a0a09f; -webkit-text-stroke: medium; margin-bottom: -20px;">'+data['no_disponibles']+'</h2><br>';
        $('#loader_fastlane').hide();
        $('#fast-data').addClass('animate__fadeIn');
        $("#numbers").append(numbers);
        $("#graphDetail").append('<i class="fa fa-area-chart" style="cursor:pointer"  data-toggle="modal" data-target="#statistics"></i>');
        $("#logo_cliente").append('<img class="img-responsive center-block" style="margin-top: 20%;" src="assets/images/logo_tracusa.png">');
        
        

      }

    });

    $('#statistics').on('shown.bs.modal', function (e) {
     $('#datos_estadisticos').html('<div class="row" id="barras"><div class="col-md-12 col-lg-12><div class="row"><div class="col-lg-12 col-md-12"><div class="panel panel-white"><div class="panel-body"><div style="text-align:center;" id="loader_fastlane"> <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><br> <strong style="color: #690965;">Cargando...</strong></div><div class="row animate__animated" id="fast-data"><div class="col-lg-4" id="logo_cliente"></div><div class="col-lg-4"><div id="doughnutChart" class="chart"></div></div><div class="col-lg-4"><div class="iconia" style="text-align: right;" id="graphDetail"></div><div id="numbers"></div></div></div></div></div></div></div></div></div><div class="col-lg-8 col-md-8"><div><div class="" id="columna_limite_uso"><div style="text-align:center;"> <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><br> <strong style="color: #690965;">Cargando...</strong></div></div></div></div><div class="col-lg-4 col-md-4"><div class="row"><div><div class="" id="retrasados"><div style="text-align:center;"> <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><br> <strong style="color: #690965;">Cargando...</strong></div></div></div></div><div class="row"><div><div class="" id="retrasados"><div style="text-align:center;"> <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><br> <strong style="color: #690965;">Cargando...</strong></div></div></div></div></div><div class="row" id="incidencias"><div class="col-md-offset-1 col-md-10"><div class="row"><div class="col-lg-12 col-md-12"><div class="panel info-box panel-white"><div class="panel-body"><div class="info-box-stats" style="max-width:70%;"> <span class="counter">2793</span><span class="font-size:24px;">/</span> <span class="counter">2855</span> <span style="height:100%;" class="info-box-title">Total Unidades/Total Contratadas </span></div><div class="info-box-icon" style="text-align: right;"> <i class="fa fa-truck"></i><br> <b>Disponibles:62</b></div><div class="info-box-progress"><div class="progress progress-xs progress-squared bs-n"><div class="progress-bar progress-bar-success" title="2793 unidades de 2855 contratadas" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 97.828371278459%"></div></div></div></div></div></div></div></div></div>');
    })
    
    //<script>$("#statistics").on("click",function(){$("#datos_estadisticos").html("hola") });</script>
    $.ajax({
      url:"lib/handler.php",
      data:{type:1,cliente:10142},
      type:"POST",
      success:function(data_rutas){
        var data_rutas = JSON.parse(data_rutas);


        if (typeof data_rutas['retrasados'] !== 'undefined') {
          // your code here
          for (let i = 0; i < data_rutas['retrasados'].length; i++) {
            if (i==0) {
              var ret='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Au class=col-md-6 style="padding-top:8px;">RETRASADOS</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group>';
            }
            ret+='<div class=list-group-item data-type=1 data-id='+data_rutas['retrasados'][i].esperados.id_unidad+'><div class=unidad><div class="uni-columna uni-columna-1"><img src="https://hst-api.wialon.com'+data_rutas['retrasados'][i].esperados.imagen_unidad+'?b=30" style="max-width:30px;max-height:30px;"></div><div class="uni-columna uni-columna-2" style="padding-left: 12px;"><div class=nm_unidad>'+data_rutas['retrasados'][i].esperados.nombre_unidad+'</div><div class=uni_telefono>123456789</div></div><div class="uni-columna uni-columna-3"><div class="col-sm-12 green-icon"><i class="material-icons dp48">my_location</i> <i style="float:right;" class="material-icons dp48">location_on</i></div><div class="col-sm-12"><div class="progress "><div class="progress-bar" style="width:100%;"><div class="progress-value"> 100% <br><i class="material-icons dp48">local_shipping</i></div></div></div></div></div></div></div>';
            if (i==data_rutas['retrasados'].lenght) {
              ret=+'</div></div></div>';            
            }
          }
        }else{
          ret='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Au class=col-md-6 style="padding-top:8px;">RETRASADOS</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group><br><br>SIN DATOS';
        }


        if (typeof data_rutas['a_tiempo'] !== 'undefined') {

          for (let i = 0; i < data_rutas['a_tiempo'].length; i++) {
            if (i==0) {
              var a_tiempo='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Op class=col-md-6 style="padding-top:8px;">A TIEMPO</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group>';
            }
            a_tiempo+='<div class=list-group-item data-type=1 data-id='+data_rutas['a_tiempo'][i].esperados.id_unidad+'><div class=unidad><div class="uni-columna uni-columna-1"><img src="https://hst-api.wialon.com'+data_rutas['a_tiempo'][i].esperados.imagen_unidad+'?b=30" style="max-width:30px;max-height:30px;"></div><div class="uni-columna uni-columna-2" style="padding-left: 12px;"><div class=nm_unidad>'+data_rutas['a_tiempo'][i].esperados.nombre_unidad+'</div><div class=uni_telefono>123456789</div></div><div class="uni-columna uni-columna-3"><div class=alertas><i class="fntll fntll-gps" data-toggle=tooltip style="color:#ddd;" data-placement=bottom title="" data-original-title=Satelites></i><i class="fntll fntll-ignition" data-toggle=tooltip style="color:#ddd;" data-placement=bottom title="" data-original-title="Tiempo sin reportar"></i></div><div class=tiempo></div></div></div></div>';
            if (i==data_rutas['a_tiempo'].lenght) {
              a_tiempo=+'</div></div></div>';            
            }
          }

        }else{
          a_tiempo='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Op class=col-md-6 style="padding-top:8px;">A TIEMPO</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group><br><br>SIN DATOS';
        }
        

        if (typeof data_rutas['en_espera'] !== 'undefined') {

          for (let i = 0; i < data_rutas['en_espera'].length; i++) {
            if (i==0) {
              var en_espera='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Au class=col-md-6 style="padding-top:8px; color:#b3d0e4;">EN ESPERA</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group>';
            }
            en_espera+='<div class=list-group-item data-type=1 data-id='+data_rutas['en_espera'][i].esperados.id_unidad+'><div class=unidad><div class="uni-columna uni-columna-1"><img src="https://hst-api.wialon.com'+data_rutas['en_espera'][i].esperados.imagen_unidad+'?b=30" style="max-width:30px;max-height:30px;"></div><div class="uni-columna uni-columna-2" style="padding-left: 12px;"><div class=nm_unidad>'+data_rutas['en_espera'][i].esperados.nombre_unidad+'</div><div class=uni_telefono>123456789</div></div><div class="uni-columna uni-columna-3"><div class=alertas><i class="fntll fntll-gps" data-toggle=tooltip style="color:#ddd;" data-placement=bottom title="" data-original-title=Satelites></i><i class="fntll fntll-ignition" data-toggle=tooltip style="color:#ddd;" data-placement=bottom title="" data-original-title="Tiempo sin reportar"></i></div><div class=tiempo></div></div></div></div>';
            if (i==data_rutas['en_espera'].lenght) {
              en_espera=+'</div></div></div>';            
            }
          }

        }else{
          en_espera='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Au class=col-md-6 style="padding-top:8px;color:#b3d0e4;">EN ESPERA</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group><br><br>SIN DATOS';
        }


        if (typeof data_rutas['tarde'] !== 'undefined') {

          for (let i = 0; i < data_rutas['tarde'].length; i++) {
            if (i==0) {
              var tarde='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Fll class=col-md-6 style="padding-top:8px;">TARDE</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group>';
            }
            tarde+='<div class=list-group-item data-type=1 data-id='+data_rutas['tarde'][i].esperados.id_unidad+'><div class=unidad><div class="uni-columna uni-columna-1"><img src="https://hst-api.wialon.com'+data_rutas['tarde'][i].esperados.imagen_unidad+'?b=30" style="max-width:30px;max-height:30px;"></div><div class="uni-columna uni-columna-2" style="padding-left: 12px;"><div class=nm_unidad>'+data_rutas['tarde'][i].esperados.nombre_unidad+'</div><div class=uni_telefono>123456789</div></div><div class="uni-columna uni-columna-3"><div class="col-sm-12 green-icon"><i class="material-icons dp48">my_location</i> <i style="float:right;" class="material-icons dp48">location_on</i></div></div>';
            if (i==data_rutas['tarde'].lenght) {
              tarde=+'</div></div></div>';            
            }
          }

        }else{
          tarde='<div class=panel><div class=panel-heading><h4><div class=row><div class=col-sm-12><div id=title-Fll class=col-md-6 style="padding-top:8px;">TARDE</div><div class="input-group m-b-sm col-md-6"><input type=text name=srch1 id=srch1 class="form-control busquedas" placeholder="Buscar..."><span class=input-group-addon><i class="fa fa-search" aria-hidden=true></i></span></div></div></div></h4></div><div class="panel-body panel-columnas" style="height:600px;max-height:600px;"><div id=unts_bien class=list-group><br><br>SIN DATOS';
        }






        $('#retrasados').html(ret);
        
        $('#a_tiempo').html(a_tiempo);
        
        $('#tarde').html(tarde);
        
        $('#on_hold').html(en_espera);

      }
    });


    
  });
  /*!
   * jquery.drawDoughnutChart.js
   * Version: 0.4.1(Beta)
   * Inspired by Chart.js(http://www.chartjs.org/)
   *
   * Copyright 2014 hiro
   * https://github.com/githiro/drawDoughnutChart
   * Released under the MIT license.
   *
   */
  (function ($, undefined) {
    $.fn.drawDoughnutChart = function (data, options) {
      var $this = this,
        W = $this.width(),
        H = $this.height(),
        centerX = W / 2,
        centerY = H / 2,
        cos = Math.cos,
        sin = Math.sin,
        PI = Math.PI,
        settings = $.extend(
          {
            segmentShowStroke: false,
            percentageInnerCutout: 65,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 1,
            baseColor: "rgba(0,0,0,0.5)",
            baseOffset: 1,
            edgeOffset: 40, //offset from edge of $this
            //percentageInnerCutout : 75,
            animation: true,
            animationSteps: 40,
            animationEasing: "easeInOutExpo",
            animateRotate: true,
            tipOffsetX: -8,
            tipOffsetY: -45,
            tipClass: "doughnutTip",
            summaryClass: "doughnutSummary",
            summaryTitle: "TOTAL",
            summaryTitleClass: "doughnutSummaryTitle",
            summaryNumberClass: "doughnutSummaryNumber",
            beforeDraw: function () {},
            afterDrawed: function () {},
            onPathEnter: function (e, data) {},
            onPathLeave: function (e, data) {}
          },
          options
        ),
        animationOptions = {
          linear: function (t) {
            return t;
          },
          easeInOutExpo: function (t) {
            var v = t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
            return v > 1 ? 1 : v;
          }
        },
        requestAnimFrame = (function () {
          return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            }
          );
        })();
  
      settings.beforeDraw.call($this);
  
      var $svg = $(
          '<svg width="' +
            W +
            '" height="' +
            H +
            '" viewBox="0 0 ' +
            W +
            " " +
            H +
            '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'
        ).appendTo($this),
        $paths = [],
        easingFunction = animationOptions[settings.animationEasing],
        doughnutRadius = Min([H / 2, W / 2]) - settings.edgeOffset,
        cutoutRadius = doughnutRadius * (settings.percentageInnerCutout / 100),
        segmentTotal = 0;
  
      //Draw base doughnut
      var baseDoughnutRadius = doughnutRadius + settings.baseOffset,
        baseCutoutRadius = cutoutRadius - settings.baseOffset;
      $(document.createElementNS("http://www.w3.org/2000/svg", "path"))
        .attr({
          d: getHollowCirclePath(baseDoughnutRadius, baseCutoutRadius),
          fill: settings.baseColor
        })
        .appendTo($svg);
  
      //Set up pie segments wrapper
      var $pathGroup = $(
        document.createElementNS("http://www.w3.org/2000/svg", "g")
      );
      $pathGroup.attr({ opacity: 0 }).appendTo($svg);
  
      //Set up tooltip
      var $tip = $('<div class="' + settings.tipClass + '" />')
          .appendTo("body")
          .hide(),
        tipW = $tip.width(),
        tipH = $tip.height();
  
      //Set up center text area
      var summarySize = (cutoutRadius - (doughnutRadius - cutoutRadius)) * 2,
        $summary = $('<div class="' + settings.summaryClass + '" />')
          .appendTo($this)
          .css({
            width: summarySize + "px",
            height: summarySize + "px",
            "margin-left": -(summarySize / 2) + "px",
            "margin-top": -(summarySize / 2) + "px"
          });
      var $summaryTitle = $(
        '<p class="' +
          settings.summaryTitleClass +
          '">' +
          settings.summaryTitle +
          "</p>"
      ).appendTo($summary);
      var $summaryNumber = $(
        '<p class="' + settings.summaryNumberClass + '"></p>'
      )
        .appendTo($summary)
        .css({ opacity: 0 });
  
      for (var i = 0, len = data.length; i < len; i++) {
        segmentTotal += data[i].value;
        $paths[i] = $(
          document.createElementNS("http://www.w3.org/2000/svg", "path")
        )
          .attr({
            "stroke-width": settings.segmentStrokeWidth,
            stroke: settings.segmentStrokeColor,
            fill: data[i].color,
            "data-order": i
          })
          .appendTo($pathGroup)
          .on("mouseenter", pathMouseEnter)
          .on("mouseleave", pathMouseLeave)
          .on("mousemove", pathMouseMove);
      }
  
      //Animation start
      animationLoop(drawPieSegments);
  
      //Functions
      function getHollowCirclePath(doughnutRadius, cutoutRadius) {
        //Calculate values for the path.
        //We needn't calculate startRadius, segmentAngle and endRadius, because base doughnut doesn't animate.
        var startRadius = -1.57, // -Math.PI/2
          segmentAngle = 6.2831, // 1 * ((99.9999/100) * (PI*2)),
          endRadius = 4.7131, // startRadius + segmentAngle
          startX = centerX + cos(startRadius) * doughnutRadius,
          startY = centerY + sin(startRadius) * doughnutRadius,
          endX2 = centerX + cos(startRadius) * cutoutRadius,
          endY2 = centerY + sin(startRadius) * cutoutRadius,
          endX = centerX + cos(endRadius) * doughnutRadius,
          endY = centerY + sin(endRadius) * doughnutRadius,
          startX2 = centerX + cos(endRadius) * cutoutRadius,
          startY2 = centerY + sin(endRadius) * cutoutRadius;
        var cmd = [
          "M",
          startX,
          startY,
          "A",
          doughnutRadius,
          doughnutRadius,
          0,
          1,
          1,
          endX,
          endY, //Draw outer circle
          "Z", //Close path
          "M",
          startX2,
          startY2, //Move pointer
          "A",
          cutoutRadius,
          cutoutRadius,
          0,
          1,
          0,
          endX2,
          endY2, //Draw inner circle
          "Z"
        ];
        cmd = cmd.join(" ");
        return cmd;
      }
      //funcion para presentar porcentajes en tooltips de gráfica de dona representado por value2 en el array de confs de gráfica
      function pathMouseEnter(e) {
        var order = $(this).data().order;
        $tip.text(data[order].title + ": " + data[order].value2+'%').fadeIn(200);
        settings.onPathEnter.apply($(this), [e, data]);
      }
      function pathMouseLeave(e) {
        $tip.hide();
        settings.onPathLeave.apply($(this), [e, data]);
      }
      function pathMouseMove(e) {
        $tip.css({
          top: e.pageY + settings.tipOffsetY,
          left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
        });
      }
      function drawPieSegments(animationDecimal) {
        var startRadius = -PI / 2, //-90 degree
          rotateAnimation = 1;
        if (settings.animation && settings.animateRotate)
          rotateAnimation = animationDecimal; //count up between0~1
  
        drawDoughnutText(animationDecimal, segmentTotal);
  
        $pathGroup.attr("opacity", animationDecimal);
  
        //If data have only one value, we draw hollow circle(#1).
        if (
          data.length === 1 &&
          4.7122 <
            rotateAnimation * ((data[0].value / segmentTotal) * (PI * 2)) +
              startRadius
        ) {
          $paths[0].attr("d", getHollowCirclePath(doughnutRadius, cutoutRadius));
          return;
        }
        for (var i = 0, len = data.length; i < len; i++) {
          var segmentAngle =
              rotateAnimation * ((data[i].value / segmentTotal) * (PI * 2)),
            endRadius = startRadius + segmentAngle,
            largeArc = (endRadius - startRadius) % (PI * 2) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * doughnutRadius,
            startY = centerY + sin(startRadius) * doughnutRadius,
            endX2 = centerX + cos(startRadius) * cutoutRadius,
            endY2 = centerY + sin(startRadius) * cutoutRadius,
            endX = centerX + cos(endRadius) * doughnutRadius,
            endY = centerY + sin(endRadius) * doughnutRadius,
            startX2 = centerX + cos(endRadius) * cutoutRadius,
            startY2 = centerY + sin(endRadius) * cutoutRadius;
          var cmd = [
            "M",
            startX,
            startY, //Move pointer
            "A",
            doughnutRadius,
            doughnutRadius,
            0,
            largeArc,
            1,
            endX,
            endY, //Draw outer arc path
            "L",
            startX2,
            startY2, //Draw line path(this line connects outer and innner arc paths)
            "A",
            cutoutRadius,
            cutoutRadius,
            0,
            largeArc,
            0,
            endX2,
            endY2, //Draw inner arc path
            "Z" //Cloth path
          ];
          $paths[i].attr("d", cmd.join(" "));
          startRadius += segmentAngle;
        }
      }
      function drawDoughnutText(animationDecimal, segmentTotal) {
        $summaryNumber
          .css({ opacity: animationDecimal })
          .text((segmentTotal * animationDecimal).toFixed(0));
      }
      function animateFrame(cnt, drawData) {
        var easeAdjustedAnimationPercent = settings.animation
          ? CapValue(easingFunction(cnt), null, 0)
          : 1;
        drawData(easeAdjustedAnimationPercent);
      }
      function animationLoop(drawData) {
        var animFrameAmount = settings.animation
            ? 1 / CapValue(settings.animationSteps, Number.MAX_VALUE, 1)
            : 1,
          cnt = settings.animation ? 0 : 1;
        requestAnimFrame(function () {
          cnt += animFrameAmount;
          animateFrame(cnt, drawData);
          if (cnt <= 1) {
            requestAnimFrame(arguments.callee);
          } else {
            settings.afterDrawed.call($this);
          }
        });
      }
      function Max(arr) {
        return Math.max.apply(null, arr);
      }
      function Min(arr) {
        return Math.min.apply(null, arr);
      }
      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function CapValue(valueToCap, maxValue, minValue) {
        if (isNumber(maxValue) && valueToCap > maxValue) return maxValue;
        if (isNumber(minValue) && valueToCap < minValue) return minValue;
        return valueToCap;
      }
      return $this;
    };
  })(jQuery);

  /* $('#graphDetail').on('click',function(){
    alert('Hola kbron');
  }); */
  





  



  

