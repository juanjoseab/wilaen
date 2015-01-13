/*$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});
*/
$(function(){
    function resizes(){
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var canvasFooter = $("#canvasFooter");
        $("#lienzo").width('100%').height( (windowHeight - 5)  + "px");
    }
    resizes();
    $('#openAlbumLink').click(function(){
        console.info('se disparo openAlbum');
        openAlbum();            
    });

    function openAlbum() {
        console.log('en la funcion de la camara');

        /*
        photo.addEventListener("load",function(){
            lienzo.drawImage(photo,0,0);    
        });
        */
        //$.mobile.changePage( "#create", { transition: "flip", changeHash: false });
        
        navigator.camera.getPicture(function(imageData){
            var photo = new Image();
            photo.src = imageData; //imageData;
            //console.log(photo);
            $("#canvasContent canvas").remove();            
            var canvas = document.createElement('canvas');            
            canvas.width = $(window).width();
            canvas.height = $(window).height();
            $("#canvasContent").append(canvas);
            //console.info(canvas);
            var lienzo = canvas.getContext("2d");

            $(photo).on("load",function(){            
                var imgW = $(window).width();
                console.log("ancho canvas " + canvas.width);
                console.log(" medidas foto" + photo.width + " - " + photo.height);
                var imgH = Math.round(canvas.width * photo.height/photo.width);
                console.log(imgH + " - " + imgW);

                lienzo.drawImage(photo,0,0,imgW,imgH);
            })
            $.mobile.changePage( "#create", { transition: "flip", changeHash: false });
            //alert(imageData);
        }, function(error){console.log(error);}, 
            {quality: 70,  
                targetWidth: 500, 
                targetHeight: 500,
                sourceType: 0,
                destinationType: 1,
        });
    }



})