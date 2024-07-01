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
    return this.indexOf(search+'')>=0;
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
	return ((this?(this.replace?$('<div></div>').html(this.replace(/<br\s*\/?>/mg,"\n")).text():this):'')+'').toString().trim();
};
String.prototype.path = function(object){ 
	return this.split('/').reduce((t,i)=>t?(t[i]?t[i]:''):'',object);
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
    return this.map((v)=>v+'').indexOf(search+'')>=0;
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
window.STDin = {
	server:'',
	credentials:{},
	prompt:function(settings){
		/* 
			Returns: 
				DOM Element
			confirm:Options
				title : Window title : default 'Confirmar'
				message : Window message : default ''
			confirm:Events 
				close: Cuando se cierra la ventana
				resolve: Cuando se presiona el botón aceptar
				reject: Cuando se presiona el botón aceptar
		*/
		var settings = $.extend({},{
			title:'alert-message',
			subtitle:'system-message',
			message:'',

			label:'Ingrese un valor',
			placeholder:'Valor',
			modifiers:[],
			type:"text",

			cancelable:true,

			destructive:false,
			closable:false,
			accept:'accept',
			reject:'reject',
		},settings);
		let modal = [
			'<std-form>',
				'<std-input>',
					'<label>',STDin.translate(settings.subtitle).nl2br(),'</label>',
					'<p>',STDin.translate(settings.message).nl2br(),'</p>',
				'</std-input>',
				'<std-input ',settings.modifiers.join(' '),'>',
					'<label>',STDin.translate(settings.label).nl2br(),'</label>',
					'<input class="stdin-prompt-value-holder" type="',settings.type,'" placeholder="',STDin.translate(settings.placeholder),'" />',
				'</std-input>',
				'<std-inputs>',
					(
						settings.cancelable?[
							'<std-input>',
								'<input type="button" value="',STDin.translate(settings.reject),'" />',
							'</std-input>'
						].join(''):''
					),
					'<std-input>',
						'<input',(settings.destructive?' destructive':''),' type="submit" value="',STDin.translate(settings.accept),'" />',
					'</std-input>',
				'</std-inputs>',
			'</std-form>'
		].$().modal(settings);
		modal.find('[type=button]').on('click',function(e){
			e.preventDefault();
			modal.close();
			modal.trigger('reject');
		});
		modal.find('[type=submit]').on('click',function(e){
			e.preventDefault();
			modal.close();
			modal.trigger('resolve',[$(this).parents('std-form').find('.stdin-prompt-value-holder').val()]).trigger('accept');
		}).get(0).focus();
		return modal;
	},
	alert:function(settings){
		/* 
			Returns: 
				DOM Element
			confirm:Options
				title : Window title : default 'Confirmar'
				message : Window message : default ''
			confirm:Events 
				close: Cuando se cierra la ventana
				accept: Cuando se presiona el botón aceptar
		*/
		var settings = $.extend({},{
			title:'alert-message',
			subtitle:'system-message',
			message:'',
			destructive:false,
			closable:false,
			accept:'accept'
		},settings);
		let modal = [
			'<std-form>',
				'<std-input>',
					'<label>',STDin.translate(settings.subtitle).nl2br(),'</label>',
					'<p>',STDin.translate(settings.message).nl2br(),'</p>',
				'</std-input>',
				'<std-input>',
					'<input',(settings.destructive?' destructive':''),' type="submit" value="',STDin.translate(settings.accept),'" />',
				'</std-input>',
			'</std-form>'
		].$().modal(settings);
		modal.find('[type=submit]').on('click',function(e){
			e.preventDefault();
			modal.close();
			modal.trigger('accept');
		}).get(0).focus();
		return modal;
	},
	confirm:function(settings){
		/* 
			Returns: 
				DOM Element
			confirm:Options
				title : Window title : default 'Confirmar'
				message : Window message : default ''
			confirm:Events 
				close: Cuando se cierra la ventana
				resolve: Cuando se presiona el botón aceptar
				accept: Cuando se presiona el botón aceptar
				reject: Cuando se presiona el botón aceptar
		*/
		var settings = $.extend({},{
			title:'alert-message',
			subtitle:'system-message',
			message:'',
			destructive:false,
			closable:false,
			accept:'accept',
			reject:'reject',
		},settings);
		let modal = [
			'<std-form>',
				'<std-input>',
					'<label>',STDin.translate(settings.subtitle).nl2br(),'</label>',
					'<p>',STDin.translate(settings.message).nl2br(),'</p>',
				'</std-input>',
				'<std-inputs>',
					'<std-input>',
						'<input type="button" value="',STDin.translate(settings.reject),'" />',
					'</std-input>',
					'<std-input>',
						'<input',(settings.destructive?' destructive':''),' type="submit" value="',STDin.translate(settings.accept),'" />',
					'</std-input>',
				'</std-inputs>',
			'</std-form>'
		].$().modal(settings);
		modal.find('[type=button]').on('click',function(e){
			e.preventDefault();
			modal.close();
			modal.trigger('resolve',[false]).trigger('reject');
		}).get(0).focus();
		modal.find('[type=submit]').on('click',function(e){
			e.preventDefault();
			modal.close();
			modal.trigger('resolve',[true]).trigger('accept');
		}).get(0).focus();
		return modal;
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
      	let modal = [
      		'<std-toplayer spinner>',
				(showProgressBar?'<std-progress-bar><b></b></std-progress-bar>':''),
			'</std-toplayer>'
      	].$().appendTo('body');
      	setTimeout(()=>{
			modal.attr('visible','');
		},2);
		return modal;
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
		var settings = $.extend({},STDin.defaultBridgeOptions,options);
		if(!(settings.data instanceof FormData)){
			settings.data = $.extend({},settings.data);
			var formDataCollector = new FormData();
			$.each(settings.data,function(k,d){
				formDataCollector.append(k,d);
			});
			settings.data = formDataCollector;
		}
		settings.hasFiles = Array.from(settings.data.values()).filter((value)=>value.name?true:false).length>0;
		if(settings.loader){
			var loaderElement = STDin.loader(settings.hasFiles);
		}
		return new Promise((resolve,reject)=>{
			const ajaxSetup = {
				type:settings.method,
				url:STDin.server+'/bridge/'+path+'/',
				data:settings.data,
				cache: false,
			    contentType: false,
			    processData: false,
				beforeSend:(request)=>{
					Object.keys(STDin.credentials).forEach((credentialKey)=>{
						request.setRequestHeader('Auth',credentialKey+' ' + STDin.credentials[credentialKey]);
					});
					Object.keys(settings.headers).forEach((headerKey)=>{
						request.setRequestHeader(headerKey,settings.headers[headerKey]);
					});
				    request.withCredentials = 'true';
				},
				xhr:()=>{
	                var xhr = new window.XMLHttpRequest();
					if(settings.hasFiles && settings.loader){
		                xhr.upload.addEventListener('progress',(evt)=>{
			                loaderElement.progress((evt.loaded/evt.total)*100);
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
				if(settings.loader){
					loaderElement.remove();
				}
			});
		}); 
	}
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
$.fn.progress = function(progress){
	return this.each((i,progressBar)=>{
		$(progressBar).find('std-progress-bar > *').css('width',progress+'%');
	});
};
$.fn.close = function(){
	return this.each((i,modal)=>{
		modal = $(modal);
		if(modal.prop('tagName').toLowerCase()=='std-toplayer'){
			modal.removeAttr('visible');
			setTimeout(()=>{
				modal.remove();
			},301);	
		}else{
			modal.parents('std-toplayer').close();
		}
	});
};
$.fn.modal = function(options){
	/* 	
		Options:
			title:string => Make title appears
			closer: selector to close window on click
		Events 
			close: on modal closes (removed from DOM)
	*/
	var settings = $.extend({},{
		title:false,
		closable:true,
		closeSelector:'.std-modal-close',
	},options);
	return this.each((i,content)=>{
		var content = $(content);
		var modal = [
			'<std-toplayer>',
				'<std-modal-wrap>',
					'<std-modal>',
						(
							(settings.title!==false||settings.closable)?[
								'<std-modal-head>',
									'<span>',STDin.translate(settings.title?settings.title:''),'</span>',
									(settings.closable?'<a href="#">✕</a>':''),
								'</std-modal-head>',
							].join(''):''
						),
						'<std-modal-content></std-modal-content>',
					'</std-modal>',
				'</std-modal-wrap>',
			'</std-toplayer>'
		].$();
		content.appendTo(modal.find('std-modal-content'));
		modal.find(settings.closeSelector+',std-modal-head > a').on('click',function(e){
			e.preventDefault();
			$(this).parents('std-toplayer').close();
		});
		modal.appendTo('body');
		setTimeout(()=>{
			modal.attr('visible','');
		},2);
		modal.input();
	});
};
$.fn.dropdown = function(){
	return this.each(function(i,input){
		input = $(input);
		// Element for select simple or collection in correct name input
		if(input.hasAttr('collection')){
			// Crear lista de destino
			['<std-items></std-items>'].$().insertAfter(input);
		}else{
			['<input type="hidden" dropdown-value />'].$().attr('name',input.attr('name')).insertAfter(input);
		}
		if(input.hasAttr('filterable')){
			let searchPromise = eval(input.attr('filterable'));
			if(searchPromise){
				input.on('keyup',function(){
					let stdInput = $(this).parent().removeAttr('loading');
					clearTimeout($(this).data('search-timer'));
					$(this).data('search-timer',setTimeout(()=>{
						$(this).trigger('search');
					},500));
				}).on('search',()=>{
					let stdInput = $(this).parent().attr('loading','');
					searchPromise($(this).val()).then((result)=>{
						input.data('options',result).trigger('stdinput-update-list');
					}).finally(()=>stdInput.removeAttr('loading'));
				});
				input.parents('std-input').on('mouseleave',function(){
					$(this).find('[dropdown]').val();
				});
			}else{
				input.on('keydown',()=>false);
			}
		}else{
			input.on('keydown',()=>false);
		}
		input.attr('dropdown-name',input.attr('name')).removeAttr('name');
		// Actualiza la lista disponible de opciones
			input.on('stdinput-update-list',function(e){
				e.stopPropagation();
				let insertable = $(this).hasAttr('insertable');
				let options = $(this).data('options');
					options = Array.isArray(options)?options:[];
				let stdOptions = $(this).next('std-options');
				if(stdOptions.length==0){
					stdOptions = ['<std-options></std-options>'].$().insertAfter($(this));
				}
				stdOptions.find('std-option').remove();
				if(insertable){
					let insertableValue = $(this).val().normalize();
					if(insertableValue!=''){
						['<std-option></std-option>'].$().text(insertableValue).data('option',{
							value:insertableValue,
							text:insertableValue,
							inserted:true
						}).appendTo(stdOptions);
					}
				}
				options.forEach((option)=>{
					['<std-option></std-option>'].$().text(option.text.normalize()).data('option',option).appendTo(stdOptions);
				});
				stdOptions.find('std-option').on('click',function(e){
					e.preventDefault();
					let dropdown = $(this).parent().siblings('[dropdown]');
					let beforeSelect = eval(dropdown.attr('beforeSelect'));
					if(beforeSelect){
						let stdInput = dropdown.parent().attr('loading','');
						beforeSelect($(this).data('option'))
							.then((option)=>{
								dropdown.data('option',$(this).data('option')).trigger('stdinput-add-option');
							})
							.finally(()=>stdInput.removeAttr('loading'));
					}else{
						dropdown.data('option',$(this).data('option')).trigger('stdinput-add-option');
					}
				});
			});
		// selecciona una opcion al hacer click
			input.on('stdinput-add-option',function(e){
				e.stopPropagation();
				let option = $(this).data('option');
				let options = $(this).data('options');
					options = options?options:[];
				if(option){
					if($(this).hasAttr('collection')){
						// Agregar elemento a la lista de destino
						let deletable = $(this).hasAttr('deletable');
						let stdItems = $(this).siblings('std-items');
						if(
							$(this).hasAttr('unique')
							&&
							Object.keys(stdItems.find('std-item input').toArray()
								.map((input)=>$(input).val())
								.reduce((object,value)=>{
									object[value] = 1;
									return object;
								},{}))
							.contains(option.value)
						){
							return;
						}
						let item = ['<std-item',(deletable?' deletable':''),'></std-item>'].$().appendTo(stdItems);
								   ['<span></span>'].$().text(option.text.normalize()).appendTo(item);
								   ['<input type="hidden" />'].$().attr('name',$(this).attr('dropdown-name')+'[]').val(option.value).appendTo(item);
						if(deletable){
							item.on('click',function(e){
								e.preventDefault();
								let dropdown = $(this).parent().siblings('[dropdown]');
								let beforeDelete = eval(dropdown.attr('beforeDelete'));
								if(beforeDelete){
									let stdInput = dropdown.parent().attr('loading','');
									beforeDelete($(this).data('option'))
										.then(()=>{
											$(this).remove();
										})
										.finally(()=>stdInput.removeAttr('loading'));
								}else{
									$(this).remove();
								}
							});
						}
					}else{
						// setear el valor de texto y value en los inputs creados
						$(this).siblings('[dropdown-value]').val(option.value);
						$(this).val(option.text);
					}
				}
			});
		return input;
	});
};
$.fn.input = function(){
	return this.each(function(i,stdInput){
		stdInput = $(stdInput);
		if(stdInput.prop('tagName').toLowerCase()=='std-input'){
			if(!stdInput.hasAttr('std-started')){
				stdInput.attr('std-started','');

				stdInput.find('select').on('update',function(){
					$(this).next('label').html('<b>'+$(this).find('option:selected').text().normalize()+'</b>');
				}).on('change',function(){
					$(this).trigger('update');
				}).trigger('update');

				stdInput.find('[type=file]').on('update',function(){
					$(this).next('label').html('<b>'+$(this).val().replaceAll('\\','/').split('/').pop()+'</b>');
				}).on('change',function(){
					$(this).trigger('update');
				}).trigger('update');

				let input = stdInput.find('input');
				if(input.hasAttr('dropdown')){
					input.dropdown();
				}
			}
			return stdInput;
		}else{
			return stdInput.find('std-input').input();
		}
	});
};
$(()=>{ $('body').input(); });