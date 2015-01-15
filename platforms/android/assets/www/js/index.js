/*$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});
*/

//document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady () {
$(function(){
    window.dbo.init();
    var imgs = [];
    var imgObj = [];
    var canvas;

    function resizes(){
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var canvasFooter = $("#canvasFooter");
        $("#lienzo").width('100%').height( (windowHeight - 5)  + "px");
        $("#canvasContent").height( (windowHeight - 5)  + "px");
    }
    resizes();
    $('#openAlbum').click(function(){
        console.info('se disparo openAlbum');
        openAlbum();            
    });

    $('#openCamera').click(function(){
        console.info('se disparo openAlbum');
        openCamera();            
    });
    function iraHome(){
        $.mobile.changePage("#home", { transition: "flip", changeHash: false });
    }

     function iraCreepyGallery(){
        $.mobile.changePage("#creepygallery", { transition: "flip", changeHash: false });
    }

    

    

    function goToPage(idpage){
        $.mobile.changePage(idpage, { transition: "flip", changeHash: false });
    }

    $('#nuevaCreepyPic').click(function(){
        $(this).parent().hide();
        $(".footer-create").show();
    });
    $('#regresarahome').click(function(){
        $(this).parent().hide();
        $(".footer-init").show();
    });

    function openAlbum() {
        console.log('en la funcion del album');
        navigator.camera.getPicture(function(imageData){
            createCanvas(imageData);
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

    function openCamera() {
        console.log('en la funcion de la camara');
        navigator.camera.getPicture(function(imageData){
            createCanvas(imageData);
            $.mobile.changePage( "#create", { transition: "flip", changeHash: false });
            //alert(imageData);
        }, function(error){console.log(error);}, 
            {quality: 70,  
                targetWidth: 500, 
                targetHeight: 500,
                sourceType: 1,
                destinationType: 1,
        });
    }

    function createCanvas(imageData){
        var photo = new Image();
        photo.src = imageData; 
        $("#canvasContent canvas").remove();            
        canvas = document.createElement('canvas');            
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        $("#canvasContent").append(canvas);
        var lienzo = canvas.getContext("2d");
        $(photo).on("load",function(){            
            var imgW = $(window).width();
            console.log("ancho canvas " + canvas.width);
            console.log(" medidas foto" + photo.width + " - " + photo.height);
            var imgH = Math.round(canvas.width * photo.height/photo.width);
            console.log(imgH + " - " + imgW);
            lienzo.drawImage(photo,0,0,imgW,imgH);
        })
    }

    function addCreepyImg(imgUrl){

    }

    $( "#draggable-test" ).draggable({ 
        containment: "parent",
        stop: function( event, ui ) {
            var Stoppos = $(this).position();
            var $newPosX = Stoppos.left;
            var $newPosY = Stoppos.top;
            $("#infoLeft").text("Left: " + $newPosX);
            $("#infoTop").text("Top: " + $newPosY);
        }
    });

    $( "#resizable-test" ).resizable();
    

    $('#canvasContent').mousedown(function(event) {
        if(event.which == 3){
            var dw = $( "#draggable-test" ).width();
            var dh = $( "#draggable-test" ).height();
            $( "#draggable-test" ).width(dw + 10 + "px").height(dh + 10 + "px");
        }
        if(event.which == 2){
            var dw = $( "#draggable-test" ).width();
            var dh = $( "#draggable-test" ).height();
            $( "#draggable-test" ).width(dw - 10 + "px").height(dh - 10 + "px");   
        }

        $("#infoH").text("H: " + $("#draggable-test" ).height());
        $("#infoW").text("W: " + $( "#draggable-test" ).width());
        return;
    });

    $("#openCreepyAlbum").click(function(){
        $("#CreepyGalleryContent div").remove();
        window.dbo.db.transaction(function(tx){
            tx.executeSql("SELECT * FROM img",null,function(tx,results){
                //console.log(results.rows);
            if(results.rows.length > 0){
                for (var i = results.rows.length - 1; i >= 0; i--) {                    
                    var item = results.rows.item(i);
                    $('<div class="ui-block-b creepy-galleryitem" bg-rel="'+item.uri+'" id-rel="'+item.id+'" style="background-image:url('+item.uri+') !important;"><span>'+item.name+'</span></div>').appendTo("#CreepyGalleryContent");
                };
                //iraCreepyGallery();
                $.mobile.changePage("#creepygallery", { transition: "flip", changeHash: false });
            }
        });
        },
        function(err){
            alert(err.message);
        },
        function(){

        });
        //ui-grid-b

    });

    $("body").on('click','.creepy-galleryitem',function(){
        var t = $(this);
        if(imgObj.url != undefined && imgObj.url == $(this).attr('bg-rel') ){
            t.addClass('item-selected');
            return;
        }
        imgObj = {
            "url" : $(this).attr('bg-rel'),
        }
        console.log(imgObj);
    });

    $("#selectImgs").click(function(){
        $('.draggable-test').remove();
        if(imgObj){
            var it = $('<div class="draggable-test" id="draggable-test"><img border="0" src="'+imgObj.url +'" width="100%" /></div>');
            it.draggable({ 
                containment: "parent",
                stop: function( event, ui ) {
                    var Stoppos = $(this).position();
                    // position of the draggable minus position of the droppable
                    // relative to the document
                    var $newPosX = Stoppos.left;
                    var $newPosY = Stoppos.top;
                    $("#infoLeft").text("Left: " + $newPosX);
                    $("#infoTop").text("Top: " + $newPosY);
                }
            });
            it.appendTo('#canvasContent');

            $.mobile.changePage( "#create", { transition: "flip", changeHash: false });
        }
    })
    
    
});

