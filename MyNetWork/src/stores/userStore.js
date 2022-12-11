import { defineStore } from "pinia"
import { UserApi } from "../services/utilisateurs"

export const useUserStore = defineStore("userStore" , {
    state : () => {
        return {
            user : {}
        }
    },
    actions : {
        addUsers : async function(identifiant){
            const userApi = new UserApi(); 
            // vérifier si il y a pas déjà un user qui a déjà utilisé cet email 
            const verif = await userApi.existe(identifiant.email,identifiant.pseudo)
            const verif2 = await userApi.existeEmail(identifiant.email)
            const verif3 = await userApi.existePseudo(identifiant.pseudo)
            if(!verif){
                return {message : "l'email et ce pseudo sont déjà utilisés"}
            }
            else if(!verif2){
                return {message : "l'email est déjà utilisé"}
            }else if(!verif3){
                return {message : "Ce pseudo est déjà utilisé"}
            }
            else{
                const user = await userApi.create(identifiant)

                // remplir notre state 
                this.user = {
                    email : user.email ,
                    pseudo:user.pseudo,
                    isLogged : null 
                } ; 

                return {message : "ok" } ;

            } 
            
        },

        login : async function(identifiants){
            const api = new UserApi();
            const verif = await api.existeEmail(identifiants)
            if (verif) return {message: "utilisateur inexistant"}
            let returnMessage = {message: "utilisateur inexistant"};

            await api.getAll().then(users => {
                users.forEach(user => {
                    if(user.email === identifiants) {
                        console.log("EMAIL IDENTIQUE!!!");
                        console.log("pwd : "+user.password);
                        console.log("pseudo : "+user.pseudo);
                        this.user = {
                            email: identifiants,//email
                            pseudo:user.pseudo,
                            isLogged: true
                        }
                        returnMessage = {message : "ok" } ;


                        /*if(user.password === identifiants.password){
                            this.user = {
                                email: identifiants.email,
                                pseudo:identifiants.pseudo,
                                isLogged: true
                            }
                            return {message : "ok" } ;
                        } else {
                            return {message : "wrong password" } ;
                        }*/
                    }
                });
            });
            console.log(returnMessage);
            return returnMessage ;
        },

        logout : async function(){
            const api = new UserApi();

            console.log("logout");

            
                this.user.isLogged = null; 

                console.log("logout reussit ! ")
        },

    }
})