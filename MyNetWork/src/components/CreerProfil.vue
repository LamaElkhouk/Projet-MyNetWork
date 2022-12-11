<template>
    <h1>Créer un nouveau profil</h1>
    <form class="border p-3 bg-light">
        <div class="mb-3">
            <input type="text" @focus="show = false" class="form-control"  v-model="pseudo" placeholder="pseudo">
        </div>
        <div class="mb-3">
            <input type="email" @focus="show = false" class="form-control" v-model="email" placeholder="votre@email.fr">
        </div>
        <div class="mb-3">
            <input type="password" @focus="show = false" class="form-control"  v-model="password" placeholder="password">
        </div>
        <div class="mb-3">
            <input type="password" @focus="show = false" class="form-control"  v-model="confirmPassword" placeholder="confirmez le password">
        </div>
        <div class="mb-3">
            <input type="text" @focus="show = false" class="form-control"  v-model="urlImgProfil" placeholder="">
        </div>
        <div class="mb-3">
            <button class="btn btn-info" type="submit" @click.prevent="submit">creer compte</button>
        </div>
    </form>
    <div class="alert alert-danger" v-if="show">
        <div v-for="(message,index) in messages" v-bind:key="index" >
            {{ message }}
        </div>
    </div>

</template>

<script>
import {useUserStore} from "../stores/userStore"
import Joi from "joi";
import {useRouter} from "vue-router"
export default {
    data(){
        return{
            pseudo:"",
            email:"",
            password:"",
            confirmPassword:"",
            urlImgProfil:"",
            user:{},
            show:false,
            userStore: useUserStore(),
            router : useRouter(),
            messages:[],
        }
    },
    methods:{
        submit(){
            //verification des données du formulaire
            const validationIdentifiant = Joi.object({
                email: Joi.string().email({ tlds: { allow: false } }).required(),
                password: Joi.string().trim().min(3).required().messages({ "string.min": "le mot de passe doit contenir au moin 3 caractéres.."}),
                confirmPassword: Joi.any().equal(Joi.ref('password')).messages({ 'any.only': 'passwords does not match' }),//ne fonctionne pas donc j'ai utilisé une autre methode pour verifier si ConfirmPassword==password
                pseudo: Joi.string().trim().min(6).required().messages({ "string.min": "le pseudo doit contenir au moin 6 caractéres.." }),
                urlImgProfil: Joi.string().empty(''),  // l'utilisateur peut tres bien choisir de ne pas mettre d'image de profil
            })
            const identifiants = {
                pseudo:this.pseudo,
                email:this.email,
                password:this.password,
                urlImgProfil:this.urlImgProfil
            };
            console.log(identifiants)

            //affiche les msg d'erreurs pour la verification du formulaire => taille minimum du password , du pseudo 
            const { error } = validationIdentifiant.validate(identifiants , {abortEarly : false});
            if(error) {
                this.show=true
                const details = []
                for(let er of error.details){
                    details.push(er.message)
                    console.log("details", details)
                }
                this.messages= details;
                return ;
            }
            //sauvegarder les données dans la base json-server
            this.userStore.addUsers(identifiants).then(
                data => {
                    console.log(data.message)// revoie si tout c'est bien passé ou qu'il y'ait un message d'erreur

                    if((this.confirmPassword!=this.password)||(data.message !== "ok")){ // les mots de passes ne sont pas identique ou que le pseudo ou l'email ont deja ete utilisé
                        this.show=true; //affichage du message d'erreur
                        if(this.confirmPassword!=this.password){
                            this.messages.push("les mots de passe ne sont pas identique..")
                            this.message = [...new Set(this.messages)]
                        }
                        if(data.message !== "ok"){
                            /*trois cas => 
                                1- pseudo deja utilisé
                                2- email deja utilisé
                                3- pseudo et email deja utilisé
                            */
                            this.messages.push(data.message)
                            this.message = [...new Set(this.messages)]
                        }
                    }else{
                         this.router.push("/se-connecter");  //redirection vers l'accueil si tout c'est bien passé
                    }
                }
            );
        }
    }



}
</script>

<style>

</style>