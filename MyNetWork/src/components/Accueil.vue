<template>


    <h1 v-if="userStore.user.isLogged">Bienvenue {{ userStore.user.pseudo}}</h1>
    <h1 v-else> Bienvenue visiteur</h1>
    <div v-if="userStore.user.isLogged" class="container">
        <AjoutArticle/>
    </div>
    <div class="container" v-for="(article,index) in articles" v-bind:key="index">
        <Suspense>
            <template #default>
            <article class="border w-100">
                <div class="d-flex justify-content-between  m-2">
                    <div>
                        {{article.pseudo}}
                    </div>
                    <div>
                        Posté le {{ dateFr[index]}}
                    </div>
                </div>
                <img class="w-100" :src="article.urlImgArticle" alt="article.urlImgArticle" >
                <p>{{article.contenu}}</p>

                <div class="d-flex flex-row bg-light">
                    {{article.id}}
                    <div class="m-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>
                        <button class="btn btn-dark btn-sm" @click="articleStore.plus(article.id)">+</button>
                        <button style="margin-left:0.5rem;" class="btn btn-primary ml-1">
                            {{article.like}}
                        </button> 

                    </div>
                    <div class="m-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                        </svg>
                        <button style="margin-left:0.5rem;" class="btn btn-success">
                            {{ nbCommentaires[index]}}
                        </button>
                    </div>
                </div>
                <h3>Commentaires :</h3>
                <div v-for="(info,index2) in article.commentaires" v-bind:key="index2">
                    <div class="d-flex flex-column m-2 border">
                        <div class="d-flex justify-content-between p-1">
                            <div style="font-weight:bold">{{info.pseudo}}</div>
                            <div style="font-weight:bold">{{dateCommentaire[index][index2]}}</div>
                        </div>
                        <div class="p-1">
                            {{info.contenu}}
                        </div>
                    </div>
                </div>
                <AjoutCommentaire v-if="userStore.user.isLogged"/>
            </article>
            </template>
            <template #fallback>
                données en cours de chargement
            </template>
        </Suspense>
    </div>
</template>

<script>
import {ArticleApi} from "../services/articles"
import {Suspense} from "vue";
import {useUserStore} from "../stores/userStore"
import {useArticleStore} from "../stores/articleStore"
import AjoutArticle from "./AjoutArticle.vue"
import AjoutCommentaire from"./AjoutCommentaire.vue"


export default {
    data(){
        return{
            articles:[],
            urlImgArticle:"",
            contenu:"",
            userStore: useUserStore(),
            articleStore:useArticleStore()
        }
    },
    components:{
        Suspense,
        AjoutArticle,
        AjoutCommentaire
    },
    mounted: function(){
        const api = new ArticleApi()
        api.getAll().then(data=>{
            this.articles = data
        })
    },
    computed : {
        dateFr : function(){ 
            return this.articles.map(article => {
                return `${ new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short'}).format(article.date) }`
            })
        },
        dateCommentaire : function(){ 
            return this.articles.map(article =>{
                return article.commentaires.map(info => {
                    return `${ new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short'}).format(info.dt) }`
                })
            }) 
        },
        nbCommentaires : function(){
            return this.articles.map(article => {
                return article.commentaires.length
            })        
        },
        ajoutLike : function(id){
            return this.articles.map(article => {
                return article.like++
            }) 
        }
    },
    methodes : {
        submit(){
            //données entrée dans le formulaire
            const infoArticle = {
                urlImgArticle:this.urlImgProfil,
                contenue:this.contenu,
            };
            console.log(infoArticle)
                  //sauvegarder les données dans la base json-server
            this.articleStore.addArticles(infoArticle).then(
                data => {
                    // revoie si tout c'est bien passé ou qu'il y'ait un message d'erreur
                    console.log(data.message)
                }
            );
        },
        addLike(){
            console.log("ajoute 1..")
            /*this.articleStore.plus().then(
                data => {
                    console.log(data.message)
                }
            );*/


        }
    }
}
</script>

<style>

</style>