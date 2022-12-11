import {createRouter, createWebHistory} from "vue-router"
import Accueil from "./components/Accueil.vue"
import CreerProfil from "./components/CreerProfil.vue"
import Connexion from "./components/Connexion.vue"
import NotFound from "./components/NotFound.vue"

const router = createRouter({
    history:createWebHistory(),
    routes:[
        { path : "/", name:"accueil",component:Accueil},
        { path : "/creer-profil", name:"creerProfil", component:CreerProfil},
        { path : "/se-connecter", name:"connexion", component:Connexion},
        { path:"/:pathMatch(.*)*", name:"NotFound",component:NotFound}
    ]
})

export default router;