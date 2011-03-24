function addScript(url){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = url;
	$("head").append(s);
	//document.getElementsByTagName("head")[0].appendChild(s);
}

function addCss(url){
	var s = document.createElement("link");
	s.type = "text/css";
	s.href = url;
	s.rel = "stylesheet";
	$("head").append(s);
	//document.getElementsByTagName("head")[0].appendChild(s);
}

addCss("src/facebox.css");
addCss("css/preview_style.css");
addScript("src/facebox.js");
addScript("inflection.js");

$(document).ajaxError(function(event, request, settings){
  alert("falta os ficheiros");
});

    $(document).ready(function() {

		
		
	
		
        		var targetFolder = "./export/";
        		r = window.location.pathname.split("/index.html")
            	var jsonDir = targetFolder;//r[0]+"/export/";
            	
				$.getJSON('export/data.json', function(data,s,st) {
        		
                		result = data;
						
						if(result == null){
							console.log(result);
						}else{
	        				$.each(data.pages, function(i,item){
        				        				
	        					var created = $("<div class='pages'>").appendTo('.result');
 				        		created.append('<h3>'+data.pages[i].name.humanize()+'</h3>');
 				        	
  				        		$.each(data.pages[i].states, function(ix,itemx){
 				                        
  				                	var created2 = $("<div class='states'>").appendTo(created);
  				        			created2.append('<a href="'+targetFolder+data.pages[i].name+'/'+data.pages[i].states[ix].state+'" rel="facebox"><img src="'+targetFolder+data.pages[i].name+'/'+data.pages[i].states[ix].state+'"></a>');
									created2.append('<p>'+data.pages[i].states[ix].state+'</p>');
 				        			
									
									
									
  				        		});
 				        		
								if(i == data.pages.length-1){
									$('a[rel*=facebox]').facebox(); 
 				        		}

  				        		});
        				}	
        		
        		
        		});
        

        //$(document).attr("title", result.pages[0].name);
    });
    
	
	
	
