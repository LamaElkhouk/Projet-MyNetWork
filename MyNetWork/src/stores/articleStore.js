import { defineStore } from "pinia"
import { ArticleApi } from "../services/articles"



export const useArticleStore = defineStore("articleStore" , {
    state : ()=> {
        return {
            article : []
        }
    },
    actions : {
        addArticles : async function(infoArticle){
                const articleApi = new ArticleApi(); 
                const article = await articleApi.create(infoArticle)
                return {message : "ok" } ;
            },
        addCommentaire : async function(infoCommentaire){
            const api = new ArticleApi();

            await api.getAll().then(articles => {
                articles.forEach(article => {
                    article.commentaires=infoCommentaire
                    console.log(article.commentaires)
                })
            })
        },
        plus : function(id){
            const api = new ArticleApi();

            api.getAll().then(articles => {
                articles.forEach(article => {
                    console.log("id"+id)
                    console.log(article.id)
                    if(article.id===id){
                        article.like+=1
                    }else{
                        console.log("mince")
                    }
                    
                })
            })
            //this.article[index].like += 1;
             //console.log("ici")
        },


    }

    })