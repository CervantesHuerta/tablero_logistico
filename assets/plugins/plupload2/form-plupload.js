$(document).ready(function() {
  	var id=$("#idtkt").val();
    $("#uploader").pluploadQueue({
       runtimes : 'html5,flash,silverlight,html4',
       url : "lib/banco.php?tipo=18",
       //chunk_size : '1mb',
       sortable : true,
       rename : true,
        buttons : {browse:true,start:true,stop:true},
       //dragdrop: true,
       filters : {
            max_file_size : '8mb',
        
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"},
                { title: "Document files", extensions: "txt,doc,docx,xls,xlsx,ppt,pptx,pps,odt,ods,odp,sxw,sxc,sxi,wpd,pdf,rtf,csv,tsv" },
                {title : "Zip files", extensions : "zip"}
            ]
        },
        init : {
			UploadComplete: function(up, files) {
				$("#plupload_require2").val("1");
			},
			FilesAdded: function(up, files) {
				$("#plupload_require2").val("0");
			}
    	},
		
		    /*resize: {
            width : 200,
            height : 100,
            quality : 90,
            crop: true 
        },*/
 		    flash_swf_url : '/admin1/assets/plugins/plupload/js/Moxie.swf',
        silverlight_xap_url : '/admin1/assets/plugins/plupload/js/Moxie.xap'
    });

});