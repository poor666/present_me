assetsURL = "http://www.whodesign.com/core_present/";
InflectionJS = {
	id_suffix: new RegExp('(_ids|_id)$', 'g'),
	underbar: new RegExp('_', 'g')
}

if (!String.prototype.humanize)
{
    String.prototype.humanize = function(lowFirstLetter)
    {
        var str = this.toLowerCase();
        str = str.replace(InflectionJS.id_suffix, '');
        str = str.replace(InflectionJS.underbar, ' ');
        if (!lowFirstLetter)
        {
            str = str.capitalize();
        }
        return str;
    };
}

if (!String.prototype.capitalize)
{
    String.prototype.capitalize = function()
    {
        var str = this.toLowerCase();
        str = str.substring(0, 1).toUpperCase() + str.substring(1);
        return str;
    };
}

// function addScript(url){
// 	var s = document.createElement("script");
// 	s.type = "text/javascript";
// 	s.src = url;
// 	$("head").append(s);
// 	//document.getElementsByTagName("head")[0].appendChild(s);
// }

function addCss(url){
	var s = document.createElement("link");
	s.type = "text/css";
	s.href = url;
	s.rel = "stylesheet";
	$("head").append(s);
	//document.getElementsByTagName("head")[0].appendChild(s);
}


function addScript(sScriptSrc, oCallback) {
	var oHead = document.getElementsByTagName('head')[0];
	var oScript = document.createElement('script');
	oScript.type = 'text/javascript';
	oScript.src = sScriptSrc;
	// most browsers
	oScript.onload = oCallback;
	// IE 6 & 7
	oScript.onreadystatechange = function() {
		if (this.readyState == 'complete') {
			oCallback();
		}
	}
	oHead.appendChild(oScript);
}

function loadComplete(){
	countLoad--;

	if(countLoad == 0){
		start();
	}
	
}


$(document).ajaxError(function(event, request, settings){
  alert("falta os ficheiros");
});
	
	
    $(document).ready(function() {
			countLoad = 1;
			addScript(assetsURL+"src/facebox.js",loadComplete);
			addCss(assetsURL+"src/facebox.css");
			addCss(assetsURL+"css/preview_style.css");

    });
    
	
	function start(){
		
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
		        			//created2.append('<a href="'+targetFolder+data.pages[i].name+'/'+data.pages[i].states[ix].state+'" rel="facebox"><img src="'+targetFolder+data.pages[i].name+'/'+data.pages[i].states[ix].state+'"></a>');
							created2.append('<a href="index.html#/'+data.pages[i].name+'/'+data.pages[i].states[ix].state.substring(0,data.pages[i].states[ix].state.length-4).replace("_"+"+")+'"><img src="'+targetFolder+data.pages[i].name+'/'+data.pages[i].states[ix].state+'"></a>');
		
		//index.html#/New+arrivals/Watch
		
		
							var nameFile = data.pages[i].states[ix].state;
							var nf = nameFile.substring(0,nameFile.length-4);
							created2.append('<p>'+nf.humanize()+'</p>');
		        			
							
							
							
		        		});
		        		
						if(i == data.pages.length-1){
							$('a[rel*=facebox]').facebox(); 
		        		}

		        		});
				}	
		
		
		});
		
	};
	
