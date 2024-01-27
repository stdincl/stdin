String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
};
String.prototype.nl2br = function() {
    return this.replaceAll('\n','<br />');
};
String.prototype.toFilterable = function() {
    return (this).normalize().replaceAll(' ','').toLowerCase().replaceAll('á','a').replaceAll('é','e').replaceAll('í','i').replaceAll('ó','o').replaceAll('ú','u').replaceAll('ñ','n');
};
String.prototype.contains = function(search) {
    return this.indexOf(search)>=0;
};
String.prototype.toDate = function(){
	var d = this.split('-');
		d[0] = parseInt(d[0],10);
		d[1] = parseInt(d[1],10);
		d[2] = parseInt(d[2],10);

		d[0] = isNaN(d[0])?0:d[0];
		d[1] = isNaN(d[1])?0:(d[1]-1);
		d[2] = isNaN(d[2])?0:d[2]; 

	var isInvalidDate = (
		d[0]<=0
		||
		d[1]<=-1
		||
		d[2]<=0
	);
	return isInvalidDate?new Date():new Date(d[0],d[1],d[2]);
};
String.prototype.toURLFriendly = function(){
	return this.toLowerCase().replaceAll('á','a').replaceAll('é','e').replaceAll('í','i').replaceAll('ó','o').replaceAll('ú','u').replaceAll('ñ','n').replaceAll('ç','c').replaceAll(' ','-').replace(/[^a-z0-9-]/gi, '');
};
String.prototype.getExtension = function(){ 
	return (/(?:\.([^.]+))?$/).exec(this)[1];
};
String.prototype.normalize = function(){ 
	if(this===0){return '0';}
	if(this===false){return 'false';}
	if(this===true){return 'true';}
	return ((this?(this.replace?$('<div></div>').html(this.replace(/<br\s*\/?>/mg,"\n")).text():this):'')+'').toString();
};
Array.prototype.mapID = function(varName,property) {
    return varName + this.map(function(e){ return '['+e[property]+']'; }).join('');
};
Array.prototype.clone = function() {
	return this.slice(0);
};
Array.prototype.paginate = function(rpp,p){
	p--;
	return this.clone().slice(p * rpp, (p + 1) * rpp);
};
Array.prototype.contains = function(search) {
    return this.indexOf(search)>=0;
};
Array.prototype.swap = function(index_A, index_B) {
    var input = this; 
    var temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
};
Array.prototype.random = function(){
	return this.sort(function(){
	  return 0.5 - Math.random();
	});
};
Array.prototype.$ = function(){
	return $(this.join(''));
};
Array.prototype.slider = function(){
    var pop = [
        '<div class="stdin-full">',
            '<div class="stdin-full-slider owl-carousel"></div>',
            '<div class="stdin-full-slider-close fa fa-times"></div>',
        '</div>'
    ].$();
    var ioFullSliderList = pop.find('.stdin-full-slider');
    $.each(this,function(i,imageURL){
        ['<div class="stdin-full-slider-image" style="background-image:url(\''+imageURL+'\');"></div>'].$().appendTo(ioFullSliderList);
    });
    ioFullSliderList.owlCarousel({
        nav:this.length>1,
        items:1
    });
    pop.appendTo('body');
    pop.find('.stdin-full-slider-close').on('click',function(e){
        e.preventDefault();
        pop.removeClass('open');
        setTimeout(function(){
            pop.remove();
        },301)
    });
    setTimeout(function(){
        pop.addClass('open');
    },10);
};
Array.prototype.normalize = function(){ 
	return this.toString().normalize();
};
Number.prototype.replaceAll = function(search,replacement){
	return (this.valueOf()+"").replaceAll(search,replacement);
};
Number.prototype.toFilterable = function(){
	return (this.valueOf()+"").toFilterable();
};
Number.prototype.nl2br = function(){
	return (this.valueOf()+"").nl2br();
};
Number.prototype.round = function(decimals){
	decimals = decimals?decimals:0;
	return Math.round(this.valueOf()*Math.pow(10,decimals))/Math.pow(10,decimals);
};
Number.prototype.toPercent = function(totalPercent,decimals){
	totalPercent = totalPercent?totalPercent:1;
	return ((this.valueOf()*100)/totalPercent).round(decimals);
};
Number.prototype.toDate = function(){
	return new Date(this.valueOf());
};
Number.prototype.normalize = function(){ 
	return this.toString().normalize();
};
Date.prototype.toDate = function(){
	return this.toDateString().toDate();
};
Date.prototype.toDateString = function(){
	var m = this.getMonth()+1; 
		m = [(m<10?'0':''),m].join('');
	var d = this.getDate();
		d = [(d<10?'0':''),d].join('');
	return [this.getFullYear(),m,d].join('-');
};
Date.prototype.diffDays = function(otherDate){ 
	return ((otherDate.toDate().getTime()-this.getTime())/(1000 * 3600 * 24))+1;
};
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}; 
Date.prototype.normalize = function(){ 
	return this.toString().normalize();
};
$.fn.hasAttr = function(name) {  
	return this.attr(name) !== undefined && this.attr(name) !== false;
};
$.fn.fill = function(data){
	return this.each(function(i,f){
		f = $(f);
		$.each(data,function(name,value){
			var i = f.find('[name='+name+']');
			if(
				i.attr('type')=='checkbox'
				||
				i.attr('type')=='radio'
			){
				i.prop('checked',(
					value=='1'
					||
					value==1
					||
					value===true
					||
					value=='on'
				));
			}else{
				i.val((value).toString().normalize());
			}
		});
		f.find('select,[type=file]').trigger('update');
	});
};
$.fn.stdinUpdateListeners = function(){
	return this.each(function(i,f){
		return $(f).on('update',function(){
			var t = '&nbsp;';
			var d = $(this).attr('placeholder')?$(this).attr('placeholder'):'Seleccionar';
			if($(this).prop("tagName").toLowerCase()=='select'){
				t = $(this).find('option:selected').html();
			}else{
				t = $(this).val();
				t = t.replaceAll('\\','/');
				t = t.split('/');
				t = t[t.length-1];
			}
			t = t==undefined?d:t;
			$(this).next('*').html((t=='&nbsp;'||t=='')?d:t);
		}).on('change',function(){
			$(this).trigger('update');
		}).trigger('update');
	});
};
$.fn.close = function(){
	return this.trigger('stdin-modal-close');
};
const BridgePromisePlaceholder = function(){
	this.thens = [];
	this.catchs = [];
	this.finallys = [];
	this.then = function(fn){ this.thens.push(fn); return this; };
	this.catch = function(fn){ this.catchs.push(fn); return this; };
	this.finally = function(fn){ this.finallys.push(fn); return this; };
};
$.fn.bridge = function(path,options){
	var bridge = new BridgePromisePlaceholder();
	$(this).on('submit',function(e){
		e.preventDefault();
		var optionsOverride = $.extend({},STDin.defaultBridgeOptions,options);
		optionsOverride.data = new FormData(this);
		var connection = STDin.bridge(path,optionsOverride);
		bridge.thens.forEach((fn)=>connection.then(fn));
		bridge.catchs.forEach((fn)=>connection.catch(fn));
		bridge.finallys.forEach((fn)=>connection.finally(fn));
		return false;
	});
	return bridge;
};
$.fn.modal = function(options){
	/* 	
		Options:
			closer: selector to close window on click
		Events 
			close: on modal closes (removed from DOM),
			hide: on modal is hidded (not removed from DOM),
			show: on modal is showed
	*/
	var settings = $.extend({},{
		closer:'.stdin-modal-close-button',
	},options);
	return this.each((i,element)=>{
		var _self = $(element);
		var w = [
			'<div class="stdin-modal stdin-disabled">',
				'<div class="stdin-modal-content">',
				'</div>',
			'</div>'
		].$().on('stdin-modal-show',function(){
			_self.trigger('show');
			setTimeout(()=>{
				$(this).removeClass('stdin-disabled');
			},2);
		}).on('stdin-modal-hide',function(){
			_self.trigger('hide');
			$(this).addClass('stdin-disabled');
		}).on('stdin-modal-close',function(){
			$(this).addClass('stdin-disabled');
			_self.trigger('close');
			setTimeout(()=>{
				w.remove();
			},300);
		});
		_self.appendTo(w.find('.stdin-modal-content'));
		_self.find(settings.closer).on('click',(e)=>{
			e.preventDefault();
			w.trigger('stdin-modal-close');
		});
		w.appendTo('body');
		w.trigger('stdin-modal-show');
	});
};
window.STDin = {
	server:'',
	credentials:{},
	alert:function(options){
		var settings = $.extend({},{
			title:'Mensaje',
			message:''
		},typeof options==='string'?{
			title:'Alert',
			message:options
		}:options);
		/* 
			Returns: 
				DOM Element
			Options:
				title
				message
			Events 
				[$.fn.modal..]events
		*/
		var w = [
			'<div class="stdin-card">',
				'<div class="stdin-card-head">',
					'<div class="stdin-title">',
						STDin.translate(settings.title),
					'</div>',
				'</div>',
				'<div class="stdin-card-body">',
					'<div class="stdin-data"><p>',STDin.translate(settings.message).nl2br(),'</p></div>',
				'</div>',
				'<div class="stdin-card-foot">',
					'<div class="stdin-input stdin-primary">',
						'<input type="button" class="stdin-modal-close-button" value="',STDin.translate('done').nl2br(),'" />',
					'</div>',
				'</div>',
			'</div>'
		].$().modal();
		w.find('.stdin-modal-close-button').get(0).focus();
		return w;
	},
	confirm:function(options){
		/* 
			Returns: 
				DOM Element
			confirm:Options
				title : Window title : default 'Confirmar'
				message : Window message : default ''
			confirm:Events 
				[$.fn.modal..]events
				resolve(e:event, accept:bool): on resolve message
				cancel: on cancel message
				accept: on accept message
		*/
		var settings = $.extend({},{
			title:'Confirmar',
			message:'',
			accept:'Aceptar',
			cancel:'Cancelar'
		},typeof options==='string'?{
			message:options
		}:options);
		var w = [
			'<div class="stdin-card">',
				'<div class="stdin-card-head">',
					'<div class="stdin-title">',
						STDin.translate(settings.title),
					'</div>',
				'</div>',
				'<div class="stdin-card-body">',
					'<div class="stdin-data"><p>',STDin.translate(settings.message).nl2br(),'</p></div>',
				'</div>',
				'<div class="stdin-card-foot">',
					'<div class="stdin-row">',
						'<div class="stdin-cell">',
							'<div class="stdin-input">',
								'<input type="button" class="stdin-modal-cancel-button" value="',STDin.translate(settings.cancel).nl2br(),'" />',
							'</div>',
						'</div>',
						'<div class="stdin-cell">',
							'<div class="stdin-input stdin-primary">',
								'<input type="button" class="stdin-modal-accept-button" value="',STDin.translate(settings.accept).nl2br(),'" />',
							'</div>',
						'</div>',
					'</div>',
				'</div>',
			'</div>'
		].$().modal();
		w.find('.stdin-modal-cancel-button').on('click',function(e){
			e.preventDefault();
			w.trigger('cancel').trigger('resolve',[false]).close();
		}).get(0).focus();
		w.find('.stdin-modal-accept-button').on('click',function(e){
			e.preventDefault();
			w.trigger('accept').trigger('resolve',[true]).close();
		});
		return w;
	},
	moneyGlobal:function(n){
		n = parseFloat(n);
		var c = (n+0.0).toFixed(2).split('.')[1];
			c = c=='00'?0:c.length;
		return n.toFixed(c).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replaceAll(',','[*]').replaceAll('.',',').replaceAll('[*]','.');
	},
	money:function(n, c, d, t) {
		var c = isNaN(c = Math.abs(c)) ? 0 : c,
		d = d == undefined ? "," : d,
		t = t == undefined ? "." : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	},
	isMobile:function(){ 
		return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	},
	option:function(value,text){
		return ['<option value="',value,'">',text,'</option>'].$();
	},
	location:function(href){ 
		STDin.loader();
		location.href = href;
	},
	reload:function(){ 
		STDin.loader();
		location.reload();
	},
    loader:function(showProgressBar){
    	showProgressBar = showProgressBar?true:false;
      	return [
      		'<div class="stdin-loader">',
				'<b class="fa fa-spinner fa-3x fa-pulse"></b>',
				(showProgressBar?'<div class="stdin-loading-bar"><div class="stdin-loading-progress"></div></div>':''),
			'</div>'
      	].$().on('progress',function(e,progress){
      		$(this).find('.stdin-loading-progress').css('width',progress+'%');
      	}).appendTo('body');
    },
	translate:function(c){
		c = (c+'').toString();
		window.lang = window.lang?window.lang:{};
		return (window.lang[c]?window.lang[c]:c).normalize();
	},
	defaultBridgeOptions:{
		method:'POST',
		loader:true,
		headers:{},
		data:{}
	},
	bridge:function(path,options){
		/* 
			Options 
				loader: bool : Shows loader
				method: POST GET PULL ... http method
				headers: {},
				data:{}
			Returns Promise
		*/
		this.path = path;
		this.settings = $.extend({},STDin.defaultBridgeOptions,options);
		if(!(this.settings.data instanceof FormData)){
			this.settings.data = $.extend({},this.settings.data);
			var formDataCollector = new FormData();
			$.each(this.settings.data,function(k,d){
				formDataCollector.append(k,d);
			});
			this.settings.data = formDataCollector;
		}
		this.settings.hasFiles = Array.from(this.settings.data.values()).filter((value)=>value.name?true:false).length>0;
		if(this.settings.loader){
			var loaderElement = STDin.loader(this.settings.hasFiles);
		}
		return new Promise((resolve,reject)=>{
			const ajaxSetup = {
				type:this.settings.method,
				url:STDin.server+'/bridge/'+this.path+'/',
				data:this.settings.data,
				cache: false,
			    contentType: false,
			    processData: false,
				beforeSend:(request)=>{
				    request.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
					request.setRequestHeader('cache-control', 'max-age=0');
					request.setRequestHeader('expires', '0');
					request.setRequestHeader('expires', 'Tue, 01 Jan 1981 1:00:00 GMT');
					request.setRequestHeader('pragma', 'no-cache');
					Object.keys(STDin.credentials).forEach((credentialKey)=>{
						request.setRequestHeader('Auth',credentialKey+' ' + STDin.credentials[credentialKey]);
					});
					Object.keys(this.settings.headers).forEach((headerKey)=>{
						request.setRequestHeader(headerKey,this.settings.headers[headerKey]);
					});
				    request.withCredentials = 'true';
				},
				xhr:()=>{
	                var xhr = new window.XMLHttpRequest();
					if(this.settings.hasFiles && this.settings.loader){
		                xhr.upload.addEventListener('progress',(evt)=>{
			                loaderElement.trigger('progress',[((evt.loaded/evt.total)*100)]);
		                },false);
					}
	                return xhr;
	            },
			};
			$.ajax(ajaxSetup).done((response)=>{
				resolve(response);
			}).fail((response)=>{ 
				if(!response.responseJSON){
					response = {
						responseJSON:{
							error:STDin.translate('.service-unavailable'),
							error_code:'.service-unavailable'
						}
					};
				}
				reject(response.responseJSON);
			}).always(()=>{
				if(this.settings.loader){
					loaderElement.remove();
				}
			});
		}); 
	}
};
$(()=>{
	$('.stdin-input select,.stdin-input [type=file]').stdinUpdateListeners();
	/*
		Pollyfills
		stdin-floating-label
	*/
		$([
			'[type=text]',
			'[type=password]',
			'textarea',
		].map((element)=>{
			return '.stdin-input.stdin-floating-label '+element;
		}).join(',')).on('stdin-focus',function(){
			$(this).parents('.stdin-input').addClass('stdin-state-focused');
			$(this).attr('placeholder-backup',$(this).attr('placeholder'));
			$(this).attr('placeholder','');
		}).on('focus',function(){
			$(this).trigger('stdin-focus');
		}).on('stdin-unfocus',function(){
			$(this).parents('.stdin-input').removeClass('stdin-state-focused');
			$(this).attr('placeholder',$(this).attr('placeholder-backup'));
			$(this).removeAttr('placeholder-backup');
		}).on('blur',function(){
			$(this).trigger('stdin-unfocus');
		});
		$([
			'[type=file]',
			'select',
		].map((element)=>{
			return '.stdin-input.stdin-floating-label '+element;
		}).join(',')).parents('.stdin-input').addClass('stdin-state-focused');
});