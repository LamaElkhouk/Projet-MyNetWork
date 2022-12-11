export class UserApi{
    url = "http://localhost:3004/utilisateurs"
    async create(identifiants){
        try{
            const options = {
                method : "POST",
                body : JSON.stringify({...identifiants}),
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

    async existe(email,pseudo){
        try{
            const reponse = await fetch(`http://localhost:3004/utilisateurs?email=${email}&&pseudo=${pseudo}`)
            const data = await reponse.json();
            // si existe [{}]
            // si email non pris existe []
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }
    async existeEmail(email){
        try{
            const reponse = await fetch(`http://localhost:3004/utilisateurs?email=${email}`)
            console.log(reponse)
            const data = await reponse.json();
            // si existe [{}]
            // si email non pris existe []
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }

    async existePseudo(pseudo){
        try{
            const reponse = await fetch(`http://localhost:3004/utilisateurs?pseudo=${pseudo}`)
            const data = await reponse.json();
            // si existe [{}]
            // si email non pris existe []
            return data.length === 0 ? true : false ;
        }catch(ex){
            console.log(ex)
        }
    }

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



}