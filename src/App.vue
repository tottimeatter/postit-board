<template>
  <div id="app">
    <section class="header">
      <img class="logo">
      <title class="app-name">Post-It Board</title>
    </section>
    <section class="column-left">
      <board v-on:delete-postit="deletePostit($event)" :postItList="postItList"></board>
    </section>
    <section class="column-right">
      <post-it-form v-on:add-postit="addPostIt($event)"></post-it-form>
    </section>
  </div>
</template>

<script>
import Board from './components/Board.vue'
import PostItForm from './components/PostItForm.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Board,
    PostItForm
    
  },
  data(){
    return{
      postItList: [],
      urlApi: 'http://localhost:3000/postit'
    }
  },
  created() {
    this.fetchData();
  },
  methods:{
    /**
     * Demana la llista de postits al backend
     */
    async fetchData(){
      const GET_RESPONSE = await axios.get(this.urlApi);
      if(!GET_RESPONSE.data.error){
        console.log(`GET response:`)
        console.log(GET_RESPONSE)
        this.postItList = GET_RESPONSE.data.respuesta;
      } else{
        console.error(GET_RESPONSE.data.codigo + ' ' + GET_RESPONSE.data.mensaje)
      }
    },
    /**
     * Elimina el postit de la llista segons el seu id
     */
    deletePostit: async function(id){
      const DELETE_RESPONSE = await axios.delete(this.urlApi, {data: {id: id}});
      if(!DELETE_RESPONSE.data.error){
        console.log(`DELETE response:`)
        console.log(DELETE_RESPONSE);
        this.fetchData();
      } else{
        console.error(DELETE_RESPONSE.data.codigo + ' ' + DELETE_RESPONSE.data.mensaje);
      }
    },
    /**
     * Afegeix un nou postit a la llista 
     */
    addPostIt: async function(postit){
        const POST_RESPONSE = await axios.post(this.urlApi, postit)
        if(!POST_RESPONSE.data.error){
          console.log(`POST response:`)
          console.log(POST_RESPONSE);
          this.fetchData();
        }else{
          console.error(POST_RESPONSE.data.codigo + ' ' + POST_RESPONSE.data.mensaje);
        }
    }
  }
}
</script>

<style>
#app {
  font-family : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align : center;
  color : #2c3e50 ;
  display : flex;
  flex-wrap : wrap;
  height : 100% ;
}
.header {
  width : 100% ;
  padding : 15px ;
  display : flex;
  align-items : center;
}
.header .logo {
  max-height : 50px ;
}
.header .app-name {
  margin-left : 25px ;
  font-weight : bold;
  font-size : 20px ;
}
.column-left {
  width : 80% ;
}
.column-right {
  width : 20% ;
}
</style>
