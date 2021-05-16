<template>
    <div class="postit">
        <div class="postit-inner" v-bind:style="[postIt.color ? {backgroundColor:postIt.color } : {backGroundColor: 'none'}]">
            <button class="close" v-on:click="deletePostIt"></button>
            <h3 class="title">{{postIt.title}}</h3>
            <p class="note">{{postIt.message}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Post-it',
    props:{
        postIt: {
            id: String,
            title: String,
            message: String,
            color: String,
        }
    },
    data(){
        return{
        }
    },
    methods: {
        /**
         * Gestiona l'esdeveniment d'eliminar el postit, en rebre el click cobre el botó de tancar
         */
        deletePostIt: function () {
            this.$emit('delete-postit', this.postIt.id);
        }
    }
}
</script>
<style>
    .postit {
        text-decoration : none;
        color : #000 ;
        display : block;
        transform : rotate(-6deg);
        text-align : left;
        margin : 15px ;
    }
    .postit-inner {
        height : 10em ;
        width : 10em ;
        background : #ffc ;
        padding : 15px ;
        box-shadow : 5px 5px 7px rgba(33, 33, 33, 0.7);
    }
    .postit:nth-child(even) {
        transform : rotate(4deg);
        position : relative;
        top : 5px ;
    }
    .postit:nth-child(3n) {
        transform : rotate(-3deg);
        position : relative;
        top : - 5px ;
    }
    .postit:nth-child(5n) {
        transform : rotate(5deg);
        position : relative;
        top : - 10px ;
    }
    .close, .close:active{
        visibility: hidden;
    }
    .close:before {
        cursor: pointer;
        content : "x" ;
        position : absolute;
        right : 10px ;
        top : 2px ;
        font-size : 20px ;
        visibility:visible;
    }
    .note {
        font-family : "Reenie Beanie" , arial, sans-serif;
        font-size : 20px ;
    }
    h3 {
        margin-top : 0 ;
        margin-bottom : 10px ;
    }
    p {
        margin-top : 0 ;
    }
</style>