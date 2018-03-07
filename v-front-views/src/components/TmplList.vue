<template>
	<div>

    <div class="wrapper" 
      v-if='show'>
      <h1>{{title}}</h1>
      <a href="" v-on:click='createTmpl($event)'><span>create tmplate</span></a>

      <div class="container">
        <div class="row">
          <ul id='tmpl-list'>
            <li 
              v-for='item in list'
              class='tmpl-list-item'>
              <a :href="'tmpl/'+item._id">
                <span>{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <span>
        w8! loading...
      </span>
    </div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'TmplList',
  data () {
    return {
      title: 'Text-Template List',
      show: false,
      list: [],
    }
  },
  methods:{
  	createTmpl: async function(event){
  		if (event) event.preventDefault()

  		var name = await prompt('write name for new template');
      if(name)
    		axios.post(`${process.env.API_URL}/createtmpl/`, 
          { name : name }
  		  ).then((response)=>{
          if(response.data.msg == "ok"){
            let item = response.data.ops[0];
            this.list.push(item);
            // let ul = document.querySelector("#tmpl-list");
            // let li = document.createElement("li");
            // li.setAttribute('class', 'tmpl-list-item');
            // let a = document.createElement("a");
            // let link = 'tmpl/'+item._id;
            // a.setAttribute('href', link);
            // let name = document.createTextNode(item.name);
            // a.appendChild(name);
            // li.appendChild(a);
            // ul.appendChild(li);
          }
        });
  	},
    getTmplList: function(){
      axios.get(`${process.env.API_URL}/templates/`)
      .then((response)=>{
        console.log(response.data.list);
        var list = response.data.list;
        if(list){
          this.show = true;
          this.list = list;
          // this.appendListItems(list);
        }
      });
    },
    // appendListItems: function(list){
    //   for(var i=0; i<list.length; i++){
    //     let item = list[i];
    //     // let ul = document.getElementById("tmpl-list");
    //     let ul = document.querySelector("#tmpl-list");
    //     let li = document.createElement("li");
    //     li.setAttribute('class', 'tmpl-list-item');
    //     let a = document.createElement("a");
    //     let link = 'tmpl/'+item._id;
    //     a.setAttribute('href', link);
    //     let name = document.createTextNode(item.name);
    //     a.appendChild(name);
    //     li.appendChild(a);
    //     ul.appendChild(li);
    //   }
    // },
  },
  mounted: function(){
    this.getTmplList();
  },
}
</script>

<style >
  #tmpl-list {
      text-align: left;
  }
</style>
