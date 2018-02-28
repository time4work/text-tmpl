<template>
	<div>
		<h1>{{title}}</h1>
		<a href="" v-on:click='createTmpl($event)'><span>create tmplate</span></a>

		<ul>
			<li></li>
		</ul>
	</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'TmplList',
  data () {
    return {
      title: 'Text-Template List'
    }
  },
  methods:{
  	createTmpl: async function(event){
  		if (event) event.preventDefault()

  		var name = await prompt('write name for new template');
  		axios.post(`${process.env.API_URL}/createtmpl/`, {
			body: { name : name }
		})
  	},
  }
}
</script>

<style >

</style>
