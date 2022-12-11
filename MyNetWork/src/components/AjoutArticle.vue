<template>
    <form  class="border p-3 bg-light">
        <div class="mb-3">
            <input type="text" @focus="show = false" class="form-control"  v-model="contenu" placeholder="laisser un nouveau post">
        </div>
        <div class="mb-3">
            <input type="text" @focus="show = false" class="form-control" v-model="urlImgArticle" placeholder="url de votre image - taille conseillée 1000x200px">
        </div>

        <div class="mb-3">
            <button class="btn btn-success" type="submit" @click.prevent="submit">Laisser un nouveau post</button>
        </div>
    </form>
    <div v-if="show" class="alert alert-success">
        Le post vient d'etre ajouté ! 
        (réactualiser la page pour voir le post...)
    </div>
</template>

<script>
import {useArticleStore} from "../stores/articleStore"
import {useUserStore} from "../stores/userStore"
export default {
    data(){
        return{
            contenu:"",
            urlImgArticle:"",
            articleStore:useArticleStore(),
            userStore: useUserStore(),
            show:false
        }
    },
    methods : {
        submit(){
            //données entrée dans le formulaire
            const infoArticle = {
                contenu:this.contenu,
                urlImgArticle:this.urlImgArticle,
                like: 0,
                pseudo: this.userStore.user.pseudo,
                date: 1649277945051,
                commentaires:[]
            };
            console.log(infoArticle)
                  //sauvegarder les données dans la base json-server
            this.articleStore.addArticles(infoArticle).then(
                data => {
                    this.show=true;
                    // revoie si tout c'est bien passé ou qu'il y'ait un message d'erreur
                    console.log(data.message)
                }
            );


        }

    }

}
</script>
