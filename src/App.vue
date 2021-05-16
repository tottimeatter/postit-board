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

export default {
  name: 'App',
  components: {
    Board,
    PostItForm
    
  },
  data(){
    return{
      postItList: []
    }
  },
  methods:{
    /**
     * Elimina el postit de la llista segons el seu id
     */
    deletePostit: function(id){
      let position = -1;
      for(let p of this.postItList){
        if(p.id === id){
          position = this.postItList.indexOf(p);
          break;
        }
      }
      this.postItList.splice(position, 1);
      console.log(`App: deleted postit ${id}`);
    },
    /**
     * Afegeix un nou postit a la llista 
     */
    addPostIt: function(postit){
      this.postItList.push(postit);
      console.log(`App: added postit ${postit.id}`)
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
