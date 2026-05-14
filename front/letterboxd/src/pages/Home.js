import { buscarFilmes, apiFetch } from '../services/api.js'
import { navigate } from '../main.js'
import { renderCardFilme } from '../components/CardFilme.js'

export async function renderHome(container) {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('q')

    container.innerHTML = `
        <div class="max-w-6xl mx-auto px-6 py-10">
            ${!query ? `
                <div class="text-center mb-12">
                    <h1 class="text-white text-5xl font-bold mb-4">Seu diário de filmes</h1>
                    <p class="text-gray-400 text-xl">Descubra, avalie e compartilhe os filmes que você ama</p>
                </div>
            ` : `
                <h2 class="text-white text-2xl font-bold mb-8">Resultados para: <span class="text-green-400">${query}</span></h2>
            `}
            <div id="filmes-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <p class="text-gray-400 col-span-full text-center">Carregando...</p>
            </div>
        </div>
    `

    const grid = document.getElementById('filmes-grid')
    let filmes = []

    if (query) {
        const data = await buscarFilmes(query)
        filmes = data.results || []
    } else {
        const data = await apiFetch('/filmes/populares/')
        filmes = data.results || []
    }

    if (filmes.length === 0) {
        grid.innerHTML = '<p class="text-gray-400 col-span-full text-center">Nenhum filme encontrado</p>'
        return
    }

    grid.innerHTML = ''
    filmes.forEach(filme => {
        const card = document.createElement('div')
        renderCardFilme(card, filme)
        grid.appendChild(card)
    })
}