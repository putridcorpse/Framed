import './style.css'
import { renderNavbar } from './components/Navbar.js'
import { renderHome } from './pages/Home.js'
import { renderLogin } from './pages/Login.js'
import { renderRegister } from './pages/Register.js'
import { renderFilme } from './pages/Filme.js'
import { renderPerfil } from './pages/Perfil.js'

const app = document.getElementById('app')

function router() {
    const path = window.location.pathname

    // limpa o conteudo
    app.innerHTML = ''

    // renderiza navbar em todas as páginas
    const navbar = document.createElement('div')
    app.appendChild(navbar)
    renderNavbar(navbar)

    // conteudo principal
    const main = document.createElement('div')
    app.appendChild(main)

    if (path === '/') {
        renderHome(main)
    } else if (path === '/login') {
        renderLogin(main)
    } else if (path === '/register') {
        renderRegister(main)
    } else if (path.startsWith('/filme/')) {
        const tmdbId = path.split('/')[2]
        renderFilme(main, tmdbId)
    } else if (path.startsWith('/perfil/')) {
        const username = path.split('/')[2]
        renderPerfil(main, username)
    } else {
        main.innerHTML = '<p class="text-center text-white mt-20 text-xl">Página não encontrada</p>'
    }
}

// navega sem recarregar a página
export function navigate(path) {
    window.history.pushState({}, '', path)
    router()
}

// escuta o botão voltar do navegador
window.addEventListener('popstate', router)

// roda o roteador na inicialização
router()