import { isLoggedIn, logout } from '../services/api.js'
import { navigate } from '../main.js'

export function renderNavbar(container) {
    const loggedIn = isLoggedIn()

    container.innerHTML = `
        <nav class="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div class="max-w-6xl mx-auto flex items-center justify-between">
                
                <a href="/" class="text-green-400 text-2xl font-bold tracking-tight cursor-pointer" id="nav-logo">
                    🎬 Letterboxd
                </a>

                <div class="flex items-center gap-4">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Buscar filmes..."
                        class="bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-64"
                    />

                    ${loggedIn ? `
                        <button id="nav-perfil" class="text-gray-300 hover:text-white text-sm">Perfil</button>
                        <button id="nav-logout" class="text-red-400 hover:text-red-300 text-sm">Sair</button>
                    ` : `
                        <button id="nav-login" class="text-gray-300 hover:text-white text-sm">Entrar</button>
                        <button id="nav-register" class="bg-green-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-300">Cadastrar</button>
                    `}
                </div>
            </div>
        </nav>
    `

    // eventos
    document.getElementById('nav-logo').addEventListener('click', (e) => {
        e.preventDefault()
        navigate('/')
    })

    const searchInput = document.getElementById('search-input')
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            navigate(`/?q=${searchInput.value.trim()}`)
        }
    })

    if (loggedIn) {
        document.getElementById('nav-perfil').addEventListener('click', async () => {
            const token = localStorage.getItem('access_token')
            const payload = JSON.parse(atob(token.split('.')[1]))
            navigate(`/perfil/${payload.user_id}`)
        })
        document.getElementById('nav-logout').addEventListener('click', logout)
    } else {
        document.getElementById('nav-login').addEventListener('click', () => navigate('/login'))
        document.getElementById('nav-register').addEventListener('click', () => navigate('/register'))
    }
}