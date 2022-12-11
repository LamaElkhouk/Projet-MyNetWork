<template>
    <h1>Se connecter:</h1>
    <form class="border p-3 bg-light">
        <div class="mb-3">
            <input type="email" @focus="show = false" class="form-control" v-model="email" placeholder="votre@email.fr">
        </div>
        <div class="mb-3">
            <input type="password" @focus="show = false" class="form-control"  v-model="password" placeholder="password">
        </div>
        <div class="mb-3">
            <button class="btn btn-info" type="submit" @click.prevent="submit">se connecter ! </button>
        </div>
    </form>
    <div class="alert alert-danger" v-if="show">
        <div v-for="(message,index) in messages2" v-bind:key="index" >
            {{ message }}
        </div>
        <p>Impossible de se connecter..</p>
    </div>

    <p>Veuillez cliquer <RouterLink   :to="{name:'creerProfil'}" class="text-danger">ici</RouterLink> si vous n'avez pas encore créer de compte</p>
</template>

<script>
import {useUserStore} from "../stores/userStore"
import {useRouter} from "vue-router"
import {RouterLink} from "vue-router"

import Joi from "joi";
export default {
    data(){
        return{
            email:"",
            password:"",
            user:{},
            show:false,
            userStore: useUserStore(),
            router : useRouter(),
            messages:[],
        }
    },
    components:{
        RouterLink
    },
    methods:{
        submit(){
            const validationIdentifiant = Joi.object({
                    email: Joi.string().email({ tlds: { allow: false } }).required(),
                    password: Joi.string().required(),
                })
            const identifiants = {
                email:this.email,
                password:this.password,
            };
            console.log(identifiants)
            const { error } = validationIdentifiant.validateAsync(identifiants , {abortEarly : false}).then(data => { return data});
            //affiche les msg d'erreurs
            if(error) {
                this.show = true ;
                const details = []
                for(let er of error.details){
                    details.push(er.message)
                    console.log(details)
                }
                this.messages= details;
                return ;
            }
            this.userStore.login(identifiants.email).then(data => {
                    console.log("email entrée : "+identifiants.email)
                    console.log(data)
                    if(data.message === "ok"){
                        this.router.push("/");  //redirection vers l'accueil
                    }else{
                        this.show=true;
                        console.log("impossible de se connecter..");
                    }
                }
            );
        }
    }

}
</script>

<style>

</style>