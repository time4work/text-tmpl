<template>
	<div>
		<div class="wrapper" 
			v-if='show'>

			<div class="back-link">
				<a href="/"><i class="fa fa-home"></i></a>
			</div>

			<div class="generate-button">
				<input 
					type="button" 
					class='form-control'
					value='generator'
					v-on:click='generate'>
			</div>

			<div class="popup"
				v-show='showgenerator'>
				<div class="back-side"
					v-on:click='showgenerator = false'>
				</div>
				<div class="window">
					<form id='generator-form'>
						<h2>text Generator</h2>
						<hr>
						<div class="form-check">
							<input 
								class='form-check-input'
								id="radio100"
								type="radio" 
								name="gen-type"
								value='main-key'
								required="ture"
								v-model="typepicked">
						    <label 
						    	class="form-check-label" 
						    	for="radio100">main key</label>
						</div>
				    	<input 
				    		class='form-control radio-input' 
				    		type="text" 
							required="ture"
				    		name="main-key"
							placeholder='focus_key'
				    		v-if='typepicked == "main-key"'>
						<div class="form-check">
							<input 
								class='form-check-input'
								id="radio101"
								type="radio" 
								name="gen-type"
								value='unique-key'
								required="ture"
								v-model="typepicked">
						    <label 
						    	class="form-check-label" 
						    	for="radio101">unique key</label>
						</div>
				    	<input 
				    		class='form-control radio-input' 
				    		type="text" 
				    		name="main-key"
							required="ture"
							placeholder='focus_key'
				    		v-if='typepicked == "unique-key"'>
						<hr>
						<input
							class='form-control' 
							type="text" 
							name="start-key"
							placeholder="start_key"
							required="ture">
						<hr>
						<input 
							class='form-control'
							type="submit"
							value='generate'>
					</form>
				</div>
			</div>

			<h1>{{title}}</h1>
			<hr>
			<section class="tmpl-section">
			<div class="container-fluid">
			<div class="row">
				
				<div class="col-sm-8">
					<div class="console-show">
						<ul class="output"></ul>
					</div>
					<form id="tmpl-console">
						<input 
							class='form-control' 
							type="text" 
							name="console">
					</form>
				</div>
				<div class="col-sm-4 key-table">
					<form id='key-form' 
						v-on:submit='addKey($event)'>
						<input 
							class='form-control' 
							type="text" 
							name="key" 
							required="true">
						<input 
							class='form-control' 
							type="submit" 
							value='add key'>
					</form>	
					<hr>
					<div class="key-value-show">
						<ul class="key-list">

							<li class="key-item" v-for='key in keys'>
								<form 
									class='key-value-form' 
									v-on:submit='addValue($event)'
									:key-id="key.id">
									<div class="key-delete">
										<button 
											type="button" 
											class="btn btn-danger" 
											:key-id="key.id" 
											v-on:click="deleteKey($event)">
		                                    <i class="fa fa-trash" aria-hidden="true"></i> 
		                                </button>
									</div>
									<div class="key-value">
										<span>< {{key.name}} ></span>
									</div>
									<hr>
									<div class="key-value-list">
										<ul class='value-list'>
											<li v-for='value in key.values'>
												<span>{{value.value}}</span>
												<button 
													type="button" 
													class="btn" 
													:key-id="key.id"
													:value-id="value.id"
													v-on:click="deleteKeyValue($event)">
		                                            <i class="fa fa-times" aria-hidden="true"></i> 
		                                        </button>
											</li>
										</ul>
										<p>
											<input 
												class="form-control" 
												type="text" 
												name="value"
												required="true">
											</input>
											<button 
												type="submit" 
												class="btn btn-success"> 
		                                        <i class="fa fa-plus"></i> 
		                                    </button>
										</p>
									</div>
								</form>
							</li>
						</ul>
					</div>
					<hr>
				</div>
			


			</div>
			</div>
			</section>

		</div>
		<div class="wait"
			v-else>
			<p>w8. loading info...</p>
		</div>

	</div>
</template>
<script>
import axios from 'axios';

export default {
	name: 'TmplPage',
	data () {
		return {
			title: '',
			keys: [],
			// tmpl: {},
			showgenerator : false,
			show : false,
			typepicked: null,
		}
	},
  	methods:{
  		init: function(){
			var vm = this;


			this.getTmplObj(()=>{
				this.$el.querySelector('#tmpl-console .form-control')
					.addEventListener('keypress', function(event){
					// console.log(event);
					if(event.keyCode == 13){
						if (event.preventDefault) event.preventDefault();

						var msg = event.target.value;
						// event.target.value = '';
						console.log(msg);

						var tmpl = vm.parseTmplObj(vm.keys);
						console.log("tmpl.test_key2");
						console.log(tmpl.test_key2);
						console.log("tmpl.test_key2.length");
						console.log(tmpl.test_key2.length);
						let result = vm.templateParse2(msg, tmpl);
						console.log(result);

						let output = vm.$el.querySelector('.console-show ul.output');

						var li = document.createElement('li');
						li.appendChild(document.createTextNode(' - result: '));
						output.append(li);

						var li2 = document.createElement('li');
						li2.appendChild(document.createTextNode(result));
						output.append(li2);

						var li3 = document.createElement('li');
						output.append(li3);
					}
				}, false);
			});

  		},
  		generate: function(){
  			this.showgenerator= true;
  		},
		addKey: function(event){
			if (event.preventDefault) event.preventDefault();
			var name = event.target.querySelector('input[name="key"]').value;
			event.target.querySelector('input[name="key"]').value = '';
			if(name)
				axios.post(`${process.env.API_URL}/template/add-key`,
				{
					tmpl : this.$route.params.id,
					name: name
				}).then((response)=>{
					console.log(response.data);
					if(response.data.msg == 'ok'){
						let id = response.data.id;
						let name = response.data.name;
						this.keys.push({
							id: id,
							name: name,
							values: [],
						});
					}
				});
		},
		addValue: function(event){
			if (event.preventDefault) event.preventDefault();
			console.log(event);
			var keyID = event.target.getAttribute("key-id");
			var value = event
				.target
				.querySelector('input[name="value"]')
				.value;
			event.target
				.querySelector('input[name="value"]')
				.value = '';
			if(value)
				axios.post(`${process.env.API_URL}/template/key/add-value`,
				{
					tmpl : this.$route.params.id,
					key : keyID,
					value: value
				}).then((response)=>{
					console.log(response.data);
					if(response.data.msg == 'ok'){
						let id = response.data.id;
						let value = response.data.value;
						console.log(keyID);

						var elementPos = this.keys.map(function(x) {return x.id; }).indexOf(parseInt(keyID));
						console.log(elementPos);
						console.log(this.keys[elementPos]);
						console.log(this.keys);
						this.keys[elementPos].values.push({
							id: id,
							value: value
						});
					}
				});
		},
		getTmplObj: function(callback){
			axios.post(`${process.env.API_URL}/template/`,
			{
				id : this.$route.params.id
			}).then((response)=>{
				console.log(response.data);
				if(response.data.obj){
					this.title = response.data.obj.name;
					this.keys = response.data.obj.keys;
					this.show = true;
					// this.tmpl = this.parseTmplObj(this.keys);
					setTimeout(()=>{
						if(callback) callback();
					},1000);
				}
			});
		},
		// TMPL FUNCTIONS
	    parseTmplObj: function(keys){
	        var tmpl = {};

	        Array.prototype.forEach.call(keys,function(elem) {
				var key = elem.name;
				tmpl[key] = elem.values.map((item)=>{
					return item.value;
				});
	        });
	        return tmpl;
	    },
		// TMPL FUNCTIONS
		templateParse2: function(e, obj){
			var regexp = /<\w*>/ig;
			let li = document.createElement('li');
			li.appendChild(document.createTextNode(' - element:  '));
			li.appendChild(document.createTextNode(e));
			this.$el.querySelector('.console-show ul.output')
				.append( li );

	        if ( Array.isArray(e) ){
	            if(e.length == 0){
	                return null;
	            }
	            else{
	                let promis = null;
	                do{
	                    let min = 0,
	                        max = e.length-1;
	                    let rand = min + Math.floor(Math.random() * (max + 1 - min));
	                    promis = this.templateParse2( e[rand], obj);
	                    e.splice(rand,1);
	                }while(!promis && e.length)
	                if(!promis) return null;
	                return promis;
	            }
	        }
	        else{
	            if( /<\w*>/i.test(e) ){
	                let result = '';
	                let last_pos = 0;
	                let foo;
	                while ( foo = regexp.exec(e)) {
	                    result += e.substring(last_pos,foo.index);
	                    
	                    let ind = foo[0].replace(/[<>]*/g,'');
	                    result += this.templateParse2( obj[ind], obj);
	                    last_pos = regexp.lastIndex;
	                }
	                result += e.substring(last_pos,e.length);
	                return result;
	            }else{
	                return e;
	            }
	        }
		},
		// templateParse3: function(e, obj){
		// 	var regexp = /<\w*>/ig;
		// 	let li = document.createElement('li');
		// 	li.appendChild(document.createTextNode(' - element:  '));
		// 	li.appendChild(document.createTextNode(e));
		// 	this.$el.querySelector('.console-show ul.output')
		// 		.append( li );

	 //        if ( Array.isArray(e) ){
	 //            if(e.length == 0){
	 //                return null;
	 //            }
	 //            else{
	 //                let promis = null;
	 //                do{
	 //                    let min = 0,
	 //                        max = e.length-1;
	 //                    let rand = min + Math.floor(Math.random() * (max + 1 - min));
	 //                    promis = this.templateParse2( e[rand], obj);
	 //                    e.splice(rand,1);
	 //                }while(!promis && e.length)
	 //                if(!promis) return null;
	 //                return promis;
	 //            }
	 //        }
	 //        else{
	 //            if( /<\w*>/i.test(e) ){
	 //                let result = '';
	 //                let last_pos = 0;
	 //                let foo;
	 //                while ( foo = regexp.exec(e)) {
	 //                    result += e.substring(last_pos,foo.index);
	                    
	 //                    let ind = foo[0].replace(/[<>]*/g,'');
	 //                    result += this.templateParse2( obj[ind], obj);
	 //                    last_pos = regexp.lastIndex;
	 //                }
	 //                result += e.substring(last_pos,e.length);
	 //                return result;
	 //            }else{
	 //                return e;
	 //            }
	 //        }
		// }
	},
	mounted: function(){
		this.init();
	},
}
</script>

<style >
	
</style>
