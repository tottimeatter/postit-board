<template>
    <form class="form">
        <div class="form__element">
            <label>Title:</label>
            <input v-model="title" name="title" type="text">
        </div>
        <div class="form__element">
            <label>Message:</label>
            <input v-model="message" name="message" type="text">
        </div>
        <div class="form__element">
            <label>Custom color:</label>
            <input v-model="custom" name="custom" type="checkbox">
        </div>
        <div class="form__element">
            <label>Color:</label>
            <input v-model="color" name="color" type="color">
        </div>
        <div class="form__element">
            <input v-on:click="createPostIt" name="submit" type="button" value="Add">
        </div>
    </form>
</template>

<script>
    import {v4 as uuidv4 } from 'uuid';
    export default {
        name: 'PostItForm',
        data() {
            return {
                title:'',
                message : '',
                custom : '',
                color:'#000000',
            }
        },
        methods: {
            /**
             * Gestiona l'esdeveniment de creació d'un nou postit a través del formulari.
             */
            createPostIt: function(){
                // Creació del nou objecte postIt
                let postIt;                
                if(this.custom){
                    postIt = {
                        id: uuidv4(),
                        title: this.title,
                        message: this.message,
                        custom: this.custom,
                        color: this.color
                    }
                } else{
                    postIt = {
                        id: uuidv4(),
                        title: this.title,
                        message: this.message,
                        custom: this.custom
                    }
                }
                // Emetre l'esdeveniment de creació del nou postit
                this.$emit('add-postit', postIt);
                // Reestablir el formulari a l'estat original
                this.title = '';
                this.message = '';
                this.custom = '';
                this.color = '#000000';
            }
        }
    }
</script>

<style scoped>
ul {
    list-style-type : none;
    padding : 0 ;
}
li {
    display : inline-block;
    margin : 0 10px ;
}
.form {
    padding : 15px ;
}
.form {
    padding : 15px ;
}
.form__element {
    display : flex;
    flex-direction : column;
    margin-bottom : 15px ;
    text-align : left;
}
.form__element label {
    margin-bottom : 10px ;
    font-weight:bold;
}
</style>