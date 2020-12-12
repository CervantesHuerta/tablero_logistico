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





  



  

