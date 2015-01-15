window.dbo = {
	db : window.openDatabase("Database", "1.0", "dbtx", 200000),
	init : function (){	
		this.db.transaction(this.checkDB, this.errorCB, this.successCB);
	},
	checkDB : function(tx){
		 tx.executeSql("SELECT * FROM sqlite_master WHERE type='table' AND name='img'",null,function(tx,results){
		 	//console.log(results);
		 	if(results.rows.length > 0) {
		 		//console.log("tengo rows");
		 	}else{
		 		//console.log("no tengo rows");
		 		window.dbo.db.transaction(function(tr){
		 			console.log("ejecutanto statements");
		 			tr.executeSql('CREATE TABLE IF NOT EXISTS mygallery (id unique, uri);');
				    tr.executeSql('CREATE TABLE IF NOT EXISTS img (id unique, name, uri);');
				    tr.executeSql('INSERT INTO img (id, name, uri) VALUES (1, "Ovni", "img/pics/ovni.png");');
				    tr.executeSql('INSERT INTO img (id, name, uri) VALUES (2, "Creepy Chica", "img/pics/aro.png");');
				    tr.executeSql('INSERT INTO img (id, name, uri) VALUES (3, "Samara", "img/pics/aro2.png");');
				    console.log("fin de los  statements");
				}, function(trerr){
					console.log(trerr.message);
					return false;
				}, function(tr){
					console.log(tr);
					return true;
				});
				
		 	}
		 });

		  /*tx.executeSql("SELECT * FROM sqlite_master WHERE type='table' AND name='mygallery'",null,function(tx,results){
		 	//console.log(results);
		 	if(results.rows.length > 0) {		 		
		 	}else{
		 		window.dbo.db.transaction(function(tr){
				    tr.executeSql('CREATE TABLE IF NOT EXISTS mygallery (id unique, uri)');				    
				}, function(trerr){					
					
				}, function(tr){					
					
				});
				
		 	}
		 });*/


	},	
	errorCB : function (err) {
		console.log(err.message);
		return false;
	    //alert("Error processing SQL: " + err);
	},
	successCB : function () {
	    //alert("success!");
	    return true;
	}

}
//alert(0);
//window.db.populateDB();
