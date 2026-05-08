import { detalhesFilme, marcarFilme, getReviews, criarReview, likeReview, isLoggedIn } from '../services/api.js'
import { navigate } from '../main.js'

export async function renderFilme(container, tmdbId) {
    container.innerHTML = `<p class="text-gray-400 text-center mt-20">Carregando...</p>`

    const filme = await detalhesFilme(tmdbId)
    const reviews = await getReviews(tmdbId)

    const capa = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa'

    const banner = filme.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${filme.backdrop_path}`
        : ''

    const ano = filme.release_date ? filme.release_date.split('-')[0] : ''
    const generos = filme.genres ? filme.genres.map(g => g.name).join(', ') : ''
    const diretor = filme.credits?.crew?.find(c => c.job === 'Director')?.name || 'Desconhecido'
    const elenco = filme.credits?.cast?.slice(0, 5).map(a => a.name).join(', ') || ''

    const reviewsHTML = reviews.length > 0
        ? reviews.map(r => `
            <div class="bg-gray-800 rounded-xl p-4 border border-gray-700" id="review-${r.id}">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-green-400 font-semibold">${r.user.username}</span>
                    <span class="text-yellow-400 text-sm">★ ${r.nota}</span>
                </div>
                <p class="text-gray-300 text-sm">${r.texto}</p>
                <button class="btn-like text-gray-500 text-xs mt-3 hover:text-green-400" data-id="${r.id}">
                    ♥ ${r.likes_count} curtidas
                </button>
            </div>
        `).join('')
        : '<p class="text-gray-500">Nenhuma review ainda. Seja o primeiro!</p>'

    container.innerHTML = `
        ${banner ? `
            <div class="w-full h-64 bg-cover bg-center relative" style="background-image: url('${banner}')">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent"></div>
            </div>
        ` : ''}

        <div class="max-w-5xl mx-auto px-6 py-10">
            <div class="flex gap-8 mb-10">
                <img src="${capa}" alt="${filme.title}" class="w-48 rounded-xl shadow-2xl flex-shrink-0" />
                <div>
                    <h1 class="text-white text-4xl font-bold mb-1">${filme.title}</h1>
                    <p class="text-gray-400 mb-4">${ano} · ${generos}</p>
                    <p class="text-gray-300 mb-4 leading-relaxed">${filme.overview || 'Sem sinopse disponível'}</p>
                    <p class="text-gray-400 text-sm mb-1"><span class="text-white font-semibold">Diretor:</span> ${diretor}</p>
                    <p class="text-gray-400 text-sm mb-6"><span class="text-white font-semibold">Elenco:</span> ${elenco}</p>

                    ${isLoggedIn() ? `
                        <div class="flex gap-3 flex-wrap">
                            <button class="btn-status bg-green-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-300" data-status="assistido">✓ Assistido</button>
                            <button class="btn-status bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600" data-status="quero">+ Quero assistir</button>
                            <button class="btn-status bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600" data-status="abandonei">✗ Abandonei</button>
                        </div>
                    ` : `
                        <p class="text-gray-500 text-sm"><span class="text-green-400 cursor-pointer hover:underline" id="link-login">Entre</span> para marcar este filme</p>
                    `}
                </div>
            </div>

            <div class="mb-10">
                <h2 class="text-white text-2xl font-bold mb-6">Reviews</h2>
                <div id="reviews-lista" class="flex flex-col gap-4 mb-8">${reviewsHTML}</div>

                ${isLoggedIn() ? `
                    <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
                        <h3 class="text-white font-semibold mb-4">Escrever review</h3>
                        <textarea
                            id="review-texto"
                            placeholder="O que você achou deste filme?"
                            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none h-24 mb-4"
                        ></textarea>
                        <div class="flex items-center gap-4">
                            <input
                                type="number"
                                id="review-nota"
                                placeholder="Nota (1-10)"
                                min="1" max="10"
                                class="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm w-36 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <button id="btn-review" class="bg-green-400 text-gray-900 font-bold px-6 py-2 rounded-lg hover:bg-green-300">
                                Publicar
                            </button>
                        </div>
                        <p id="review-erro" class="text-red-400 text-sm mt-2 hidden"></p>
                    </div>
                ` : ''}
            </div>
        </div>
    `

    // link login
    document.getElementById('link-login')?.addEventListener('click', () => navigate('/login'))

    // marcar filme
    document.querySelectorAll('.btn-status').forEach(btn => {
        btn.addEventListener('click', async () => {
            const status = btn.dataset.status
            await marcarFilme(tmdbId, status, null)
            btn.textContent = '✓ Salvo!'
        })
    })

    // like
    document.querySelectorAll('.btn-like').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id
            const data = await likeReview(id)
            btn.textContent = data.mensagem === 'Like adicionado'
                ? `♥ curtido`
                : `♥ curtir`
        })
    })

    // review
    document.getElementById('btn-review')?.addEventListener('click', async () => {
        const texto = document.getElementById('review-texto').value.trim()
        const nota = parseFloat(document.getElementById('review-nota').value)
        const erro = document.getElementById('review-erro')

        if (!texto || !nota || nota < 1 || nota > 10) {
            erro.textContent = 'Preencha o texto e a nota (1-10)'
            erro.classList.remove('hidden')
            return
        }

        const data = await criarReview(tmdbId, texto, nota)

        if (data.id) {
            const lista = document.getElementById('reviews-lista')
            const novaReview = document.createElement('div')
            novaReview.className = 'bg-gray-800 rounded-xl p-4 border border-gray-700'
            novaReview.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="text-green-400 font-semibold">${data.user.username}</span>
                    <span class="text-yellow-400 text-sm">★ ${data.nota}</span>
                </div>
                <p class="text-gray-300 text-sm">${data.texto}</p>
            `
            lista.prepend(novaReview)
            document.getElementById('review-texto').value = ''
            document.getElementById('review-nota').value = ''
            erro.classList.add('hidden')
        } else {
            erro.textContent = data.non_field_errors?.[0] || 'Erro ao publicar review'
            erro.classList.remove('hidden')
        }
    })
}