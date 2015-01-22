/*$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});
*/

//document.addEventListener("deviceready", onDeviceReady, false);
//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady () {
$(function(){
    FastClick.attach(document.body);
    window.dbo.init();
    var imgs = [];
    var imgObj = [];
    var selectPic;
    var canvas;
    var fadeimg = 1;
    var photoData;

    function resizes(){
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var canvasFooter = $("#canvasFooter");
        $("#lienzo").width('100%').height( (windowHeight - 5)  + "px");
        $("#canvas_controls").height( (windowHeight - $("#canvasFooter").height())  + "px");
        //$("body").height(device.height);
        //Le doy la altura al titulo principal
        $("#home .home_center_container").css('top', (windowHeight/2) - $(".home_center_container").height() + 'px');
        $("#nuevacreepy .home_center_container").css('top', (windowHeight/2) - $(".home_center_container").height() + 'px');
        //$('.creepyfooter').css('bottom',windowHeight - 120 + "px");
        $('.creepyfooter').css('bottom',0);
    }
    resizes();
    $(window).resize(function(){
        resizes();

        if(photoData){
            createCanvas();
        }
        if(selectPic){
            insertImg();
        }        
    });
    document.addEventListener("backbutton", function(e){
        console.log(e);
        if($.mobile.activePage.is('#home')){
            console.log("estoy en la pagina home");
            return false;    
        }
        else {
            console.log("No estoy en la pagina home");
            navigator.app.backHistory();
        }
    }, false);




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
            $.mobile.changePage("#nuevacreepy", { transition: "flip", changeHash: false });   
    });
    $('#regresarahome, .regresarahome').click(function(){
        $.mobile.changePage("#home", { transition: "flip", changeHash: false });
    });

    function openAlbum() {
        console.log('en la funcion del album');
        photoData = "img/testpics/rw.jpg";
        createCanvas();
        $.mobile.changePage( "#create", { transition: "flip", changeHash: false });
        
        /*
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
        */
    }

    function openCamera() {
        console.log('en la funcion de la camara');
        photoData = "img/testpics/paisaje.jpg";
        createCanvas();
        $.mobile.changePage( "#create", { transition: "flip", changeHash: false });
        
        /*
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
        */
    }

    //dataURL = canvas.toDataURL();

    function createCanvas(){
        var photo = new Image();
        photo.src = photoData; 
        $("#canvasContent canvas").remove();
        $(photo).on("load",function(){

            var imgW;
            var imgH;

            if(photo.width > photo.height){
                imgW = $(window).width();
                imgH = Math.round($(window).width() * photo.height/photo.width);
            }else if(photo.width < photo.height){                
                imgH = $(window).height();
                imgW = Math.round($(window).height() * photo.width/photo.height);
            }else {
                alert("es cuadrada");
            }            
            $("#canvasContent").height( imgH  + "px");
            canvas = document.createElement('canvas');
            canvas.width = imgW;
            canvas.height = imgH;
            $("#canvasContent").append(canvas);
            var lienzo = canvas.getContext("2d");
            lienzo.drawImage(photo,0,0,imgW,imgH);
        })
    }


    $( "#resizable-test" ).resizable();
    


    $("#expandimg").click(function(){
        var dw = $( "#draggable-test" ).width();
        var dh = $( "#draggable-test" ).height();
        $( "#draggable-test" ).width(dw + 10 + "px").height(dh + 10 + "px");
    });

    $("#collapseimg").click(function(){
        var dw = $( "#draggable-test" ).width();
        var dh = $( "#draggable-test" ).height();
        $( "#draggable-test" ).width(dw - 10 + "px").height(dh - 10 + "px"); 
    });

    $("#plusimg").click(function(){
        if(fadeimg < 1){
            fadeimg = fadeimg + 0.1;
            $( "#draggable-test" ).fadeTo( "fast", fadeimg, function() {});
        }        
    });

    $("#minusimg").click(function(){
        if(fadeimg > 0.2){
            fadeimg = fadeimg - 0.1;
            $( "#draggable-test" ).fadeTo( "fast", fadeimg, function() {});
        } 
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

                $.mobile.changePage("#creepygallery", { transition: "slide", changeHash: false });
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
            "left" : 0,
            "top": 0
        }
        insertImg();
        $.mobile.changePage( "#create", { transition: "slide", changeHash: false });
    });

    function insertImg(){
        $('.draggable-test').remove();
        if(imgObj.url != undefined){
            var it = $('<div class="draggable-test" id="draggable-test"><img border="0" src="'+imgObj.url +'" width="100%" /></div>');
            it.draggable({ 
                containment: $("body"),
                scroll: false,
                stop: function( event, ui ) {
                    var Stoppos = $(this).position();                    
                    imgObj.left = Stoppos.left;
                    imgObj.top = Stoppos.top;
                    //console.log(imgObj); 
                    
                }
            });
            
            it.appendTo('#canvasContent');

            
        }
        $.mobile.changePage( "#create", { transition: "slide", changeHash: false });
    }
    

    $("#guardarImg").click(function(){
        var imagen = new Image();
        imagen.src = imgObj.url;
        var lienzo = canvas.getContext("2d");
        $(imagen).on("load",function(){            
            var imgW = $("#draggable-test > img").width();
            var imgH = $("#draggable-test > img").height();;
            //console.log(imgH + " - " + imgW);
            lienzo.globalAlpha = fadeimg;
            lienzo.drawImage(imagen,imgObj.left,imgObj.top,imgW,imgH);
            console.log(lienzo);
            $("#draggable-test > img").remove();
            var imgData = canvas.toDataURL();
            window.dbo.saveImg(imgData);
            prepareMyCreepyGallery();
        });

    });

    $(".sharepic").click(function(){
        window.plugins.socialsharing.share(null, 'Android filename', selectPic, null);
    });

    $("#cancelimg").click(function(){
        $("#canvasContent canvas").remove();
        $("#draggable-test").remove();
         $.mobile.changePage( "#home", { transition: "slide", changeHash: false });
    });

    $("#gotoMyCreepyGallery, .gotoMyCreepyGallery").click(function(){
        prepareMyCreepyGallery();

    });
    

    function prepareMyCreepyGallery (){
        $("#MyCreepyGalleryContent *").remove();
        window.dbo.db.transaction(function(tx){
            tx.executeSql("SELECT * FROM mygallery",null,function(tx,results){
                //console.log(results.rows);
            if(results.rows.length > 0){
                for (var i = results.rows.length - 1; i >= 0; i--) {                    
                    var item = results.rows.item(i);
                    $('<div  img-src="'+item.uri+'" class="gallery-item-box"><img src="'+item.uri+'" class="mygalleryimg" /></div>').appendTo("#MyCreepyGalleryContent");
                };
                //iraCreepyGallery();
                $('.gallery-item-box').height($(window).width()/3);
                $.mobile.changePage("#mycreepygallery", { transition: "flip", changeHash: false });
            }else{
                alert("Aun no has creado ninguna creepyPic");
            }
        });
        },
        function(err){
            alert(err.message);
        },
        function(){

        });
    }    
    

    $('body').on('click','.gallery-item-box',function(){
        var img_src = $(this).attr('img-src');
        $('#creepyImgBox img').remove();
        $('#creepyImgBox').append('<img src="'+img_src+'" />');
        selectPic = img_src;
        $.mobile.changePage("#mycreepyimage", { transition: "flip", changeHash: false });
    })
});