assetsURL = "http://dl.dropbox.com/u/1205299/present.me/";

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


addCss(assetsURL+"css/show_style.css");
//addScript(assetsURL+"inflection.js");


function loadBigViewer(imageURL)
{
	//$('img.loader').show();
	$('#overlay').css('visibility','visible');
	
	$('.page img:not(.loader)').remove();
	
	var _im = $("<img>");
	_im.hide();
	_im.bind("load", function() {
		//$('img.loader').hide();
		$('#overlay').css('visibility','hidden');
		$(this).show();
	});

	$('.page a').append(_im);
	_im.attr('src', imageURL);

}


function rotatePresentation(arr){

	
		var vector = result.pages[arr[count].page];
		
		var srcIMG = "export/"+vector.name+"/"+vector.states[arr[count].state].state;
		loadBigViewer(srcIMG);
		
		
		$("body").css('background-image', 'url('+"export/"+vector.background.image+')');
		$("body").css('background-repeat', vector.background.repeat);
		
		ahref = $('.page a');
		ahref.attr('href',vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4));
		ahref.attr('rel','address:'+vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4) );
			
		$(document).attr("title", vector.name.humanize() +', '+vector.states[arr[count].state].state.humanize().slice(0,-4) + " - " + result.setup.title.humanize() );
		$.address.value(vector.name.humanize()+'/'+vector.states[arr[count].state].state.humanize().slice(0,-4));
		count++;
		//count = findPage(fileInit).i;
}


$(document).ajaxError(function(event, request, settings){
  alert("falta os ficheiros");
});


$.address.externalChange(function(event) {
	_url = event.value.split("/");
	fileInit = {pasta:_url[1],file:_url[2]}
	
	if(typeof show == "object"){
		count = findPage(fileInit).i;
		rotatePresentation(show);
	}else{
		//alert("NO");
	}

	
});

$.address.change(function(event) {
	_url = event.value.split("/");
	fileInit = {pasta:_url[1],file:_url[2]}
});



//*************   READY   ****************

    $(document).ready(function() {
		
		$.address.init(function(event) {
			_url = event.value.split("/");
			fileInit = {pasta:_url[1],file:_url[2]};
			startPage();
		});
		
		

    });

//*************   *READY*   ****************
    	

function startPage(){
	
	r = window.location.pathname.split("/index.html")

	$.getJSON('export/data.json', function(data,s,st) {
	
    		result = data;

			
			if(result == null){
				//console.log(result);
			}else{
				
				show = new Array();
				$.each(data.pages, function(i,item){
			        $.each(data.pages[i].states, function(ix,itemx){
							show.push({page:i,state:ix,pageLabel:data.pages[i].name,stateLabel:data.pages[i].states[ix].state});
					});
				});
			
				if( typeof(fileInit.pasta) == "string" && typeof(fileInit.file) == "string" ){
					count = findPage(fileInit).i;
				}else{
					count = 0;
				}

			
				var vector = result.pages[show[count].page];
				var created = $("<div class='page'>").appendTo('#main');
				//created.append('<a href="#" rel="#"><img src="export/'+vector.name+'/'+vector.states[show[count].state].state+'"></a>');
				created.append('<a href="#" rel="#"><img></a>');
			
			
				$(document).attr("title", vector.name.humanize() +', '+vector.states[show[count].state].state.humanize().slice(0,-4) + " - " + result.setup.title );
				$.address.value(vector.name.humanize()+'/'+vector.states[show[count].state].state.humanize().slice(0,-4));
				//count++;
			

				$("a").click(function () {
					if(show.length == count){count = 0;}
					rotatePresentation(show);
				});
			
				 $('a').address(function() {  
					 return $(this).attr('href').replace(/^#/, '');  
				 });
			
				
				rotatePresentation(show);
				//startWork();
			
			};
			
	});
	
}


function findPage(ob){
	
	
	var res = new Array();
	$.each(show, function(i, item){
		if(ob.pasta.humanize() == item.pageLabel.humanize()){
			res.push(item);
		}
		
	});
	
	$.each(res, function(i, item){
	
		if(ob.file.humanize() == item.stateLabel.humanize().slice(0,-4)){
			obFInal = {page:item.page,state:item.state};
		}
		
	});
	
	
	
	$.each(show, function(i, item){
		
		if((item.page==obFInal.page) &&  (item.state == obFInal.state)){
			obFInal.i = i;
		}
		
		
	});
	
	return obFInal;
	
}

