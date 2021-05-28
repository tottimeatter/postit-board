import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        postItList: [],
    },
    mutations: {
        setPostItList(newList){
            store.postItList = newList;
        },
        
    },
    actions: {
        /**
         * Afegeix un nou postit a la llista mitjançant un POST a l'API
         * @param {*} postIt 
         */
        async addPostIt(postIt){
            const POST_RESPONSE = await axios.post(this.urlApi, postIt)
            if(!POST_RESPONSE.data.error){
                console.log(`POST response:`)
                console.log(POST_RESPONSE);
                store.fetchData();
            }else{
                console.error(POST_RESPONSE.data.codigo + ' ' + POST_RESPONSE.data.mensaje);
            }

        },    
        /**
        * Demana la llista de postits al backend
        */
        async fetchData(){
            const GET_RESPONSE = await axios.get(this.urlApi);
            if(!GET_RESPONSE.data.error){
                console.log(`GET response:`)
                console.log(GET_RESPONSE);
                store.commit('setPostIt', GET_RESPONSE.data.respuesta);
            } else{
                console.error(GET_RESPONSE.data.codigo + ' ' + GET_RESPONSE.data.mensaje)
            }
       },
       /**
        * Elimina el postit indicat mitjançant una petició DELETE a l'API
        * @param {postit to delete} postIt 
        */
        async deletePostIt(postIt){
            const DELETE_RESPONSE = await axios.delete(this.urlApi, {data: {id: postIt.id}});
            if(!DELETE_RESPONSE.data.error){
                console.log(`DELETE response:`)
                console.log(DELETE_RESPONSE);
                store.fetchData();
            } else{
                console.error(DELETE_RESPONSE.data.codigo + ' ' + DELETE_RESPONSE.data.mensaje);
            }
        }
    },
    modules: {},
});

export default store;