<template>
    <div class="board" v-if="postItList.length > 0">
        <post-it v-on:delete-postit="postItClosed($event)" v-for="postIt in postItList" v-bind:key="postIt.id" :postIt="postIt"></post-it>
    </div>
    <div class="board empty" v-else>
        <h3>Afegeix un postIt per començar!</h3>
    </div>
</template>

<script>
import PostIt from './PostIt.vue'
export default {
    components: { PostIt },
    name: 'Board',
    props:{
        postItList: Array,
    },
    data(){
        return{
        }
    },
    methods: {
        /**
         * Gestiona l'esdeveniment d'eliminar un postit, enviant-lo al component pare App
         */
        postItClosed: function(id){
            this.$emit('delete-postit', id);
        }
    }
}
</script>

<style scoped>
.board {
    background-color : #464344 ;
    border : 10px solid #a5792a ;
    height : 100% ;
    padding : 25px ;
    display : flex;
    flex-wrap : wrap;
    justify-content : space-around;
}
.empty.board{
    align-items: center;
    color: rgb(219, 219, 219);
}

</style>