<template>
    <form  class="border p-3 bg-light">
        <div class="mb-3">
            <input type="text" @focus="show = false" class="form-control"  v-model="contenu" placeholder="laisser un commentaire">
        </div>
        <div class="mb-3">
            <button class="btn btn-success" type="submit" @click.prevent="submit">ajouter un commentaire</button>
        </div>
    </form>
</template>

<script>
import {useArticleStore} from "../stores/articleStore"
import {useUserStore} from "../stores/userStore"
export default {
    data(){
        return{
            contenu:[],
            articleStore:useArticleStore(),
            userStore: useUserStore(),
        }
    },
    methods : {
        submit(){
            //données entrée dans le formulaire
            const infoCommentaire = {
                contenu:this.contenu,
                pseudo: this.userStore.user.pseudo,
                dt: 1649277945051
            };

            console.log(infoCommentaire)
                  //sauvegarder les données dans la base json-server
            this.articleStore.addCommentaire(infoCommentaire).then(
                data => {
                    // revoie si tout c'est bien passé ou qu'il y'ait un message d'erreur
                    console.log(data)
                }
            );


        }

    }

}
</script>
