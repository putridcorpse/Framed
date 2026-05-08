import { meuPerfil, meusFilmes, isLoggedIn } from '../services/api.js'
import { navigate } from '../main.js'

export async function renderPerfil(container, userId) {
    container.innerHTML = `<p class="text-gray-400 text-center mt-20">Carregando...</p>`

    if (!isLoggedIn()) {
        navigate('/login')
        return
    }

    const user = await meuPerfil()
    const filmes = await meusFilmes()

    const assistidos = filmes.filter(f => f.status === 'assistido')
    const quero = filmes.filter(f => f.status === 'quero')
    const abandonei = filmes.filter(f => f.status === 'abandonei')

    const filmesHTML = (lista) => lista.length > 0
        ? lista.map(f => `
            <div class="cursor-pointer group" onclick="window.history.pushState({},'','/filme/${f.movie.tmdb_id}'); window.dispatchEvent(new Event('popstate'))">
                <img
                    src="${f.movie.capa}"
                    alt="${f.movie.titulo}"
                    class="w-full rounded-lg group-hover:opacity-80 transition"
                />
                <p class="text-white text-xs mt-1 truncate">${f.movie.titulo}</p>
            </div>
        `).join('')
        : '<p class="text-gray-500 text-sm col-span-full">Nenhum filme aqui ainda</p>'

    container.innerHTML = `
        <div class="max-w-5xl mx-auto px-6 py-10">
            <div class="flex items-center gap-6 mb-10">
                <div class="w-20 h-20 rounded-full bg-green-400 flex items-center justify-center text-gray-900 text-3xl font-bold">
                    ${user.username?.[0]?.toUpperCase()}
                </div>
                <div>
                    <h1 class="text-white text-3xl font-bold">${user.username}</h1>
                    <p class="text-gray-400">${user.email}</p>
                    ${user.bio ? `<p class="text-gray-300 mt-1">${user.bio}</p>` : ''}
                </div>
            </div>

            <div class="grid grid-cols-3 gap-6 mb-10 text-center">
                <div class="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p class="text-green-400 text-3xl font-bold">${assistidos.length}</p>
                    <p class="text-gray-400 text-sm">Assistidos</p>
                </div>
                <div class="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p class="text-green-400 text-3xl font-bold">${quero.length}</p>
                    <p class="text-gray-400 text-sm">Quero assistir</p>
                </div>
                <div class="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p class="text-green-400 text-3xl font-bold">${abandonei.length}</p>
                    <p class="text-gray-400 text-sm">Abandonados</p>
                </div>
            </div>

            <div class="mb-10">
                <h2 class="text-white text-xl font-bold mb-4">Assistidos</h2>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">${filmesHTML(assistidos)}</div>
            </div>

            <div class="mb-10">
                <h2 class="text-white text-xl font-bold mb-4">Quero assistir</h2>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">${filmesHTML(quero)}</div>
            </div>

            <div>
                <h2 class="text-white text-xl font-bold mb-4">Abandonados</h2>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">${filmesHTML(abandonei)}</div>
            </div>
        </div>
    `
}