function addScript(url){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = url;
	$("head").append(s);
}

function addCss(url){
	var s = document.createElement("link");
	s.type = "text/css";
	s.href = url;
	s.rel = "stylesheet";
	$("head").append(s);
}


addCss("css/show_style.css");
addScript("inflection.js");


$.address.change(function(event) {
    // do something depending on the event.value property, e.g.
    // $('#content').load(event.value + '.xml');
	 //console.log(event);
	//alert(event.value);
	
	if(event.value != "/"){
		
	}else{

	}
	

	
});

$.address.init(function(event) {

});

function makePresentation(arr){
	var vector = result.pages[arr[count].page];
	var created = $("<div class='page'>").appendTo('#main');
	created.append('<a href="#" rel="#"><img src="export/'+vector.name+'/'+vector.states[arr[count].state].state+'"></a>');
	
	$(document).attr("title", vector.name.humanize() +', '+vector.states[arr[count].state].state.humanize().slice(0,-4) + " - " + result.setup.title );
	$.address.value(vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4));
	count++;	
}

function rotatePresentation(arr,e){

	var vector = result.pages[arr[count].page];
	
	eimg = $('.page img')
	eimg[0].src = "export/"+vector.name+"/"+vector.states[arr[count].state].state;
	
	ahref = $('.page a');
	ahref.attr('href',vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4));
	ahref.attr('rel','address:'+vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4) );
		
	$(document).attr("title", vector.name.humanize() +', '+vector.states[arr[count].state].state.humanize().slice(0,-4) + " - " + result.setup.title );

  	$.address.value(vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4));
	count++;
	
}


$(document).ajaxError(function(event, request, settings){
  alert("falta os ficheiros");
});

    $(document).ready(function() {

		
		
		startPage();
		
        		
        

    });
    	


function startPage(){
	
	var targetFolder = "./export/";
	r = window.location.pathname.split("/index.html")
	
	$.getJSON('export/data.json', function(data,s,st) {
	
    		result = data;
			
			if(result == null){
				//console.log(result);
			}else{
				
				show = new Array();
				
				$.each(data.pages, function(i,item){
			        $.each(data.pages[i].states, function(ix,itemx){
							show.push({page:i,state:ix});
					});
				});
				
				
				
			};	
			
			
			count = 0;
			
			makePresentation(show);
			$(document).attr("title", data.setup.title);
			

			$("a").click(function () {
				if(show.length == count){count = 0;}
				rotatePresentation(show,this);
			});
			
			 $('a').address(function() {  
				 return $(this).attr('href').replace(/^#/, '');  
			 });
			
			
	});
	
}


