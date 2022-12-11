export class ArticleApi{
    url = "http://localhost:3004/articles"

    async getAll(){
        try{
            const response= await fetch(this.url);
            const data=await response.json();
            return data
        }catch(ex){
            console.log(ex)
        }
    }
    async getOne(id){
        try{
            const reponse = await fetch(`${this.url}/${id}`);
            const data = await reponse.json()
            return data
        }catch(ex){
            console.log(ex)
        }
    }

    async create(article){
        try{
            const options = {
                method : "POST",
                body : JSON.stringify({...article}),
                headers : {
                    "content-type" : "application/json"
                }
            }
            const reponse = await fetch(this.url, options)
            const data = await reponse.json();
            return data ;
        }catch(ex){
            console.log(ex)
        }
    }
}