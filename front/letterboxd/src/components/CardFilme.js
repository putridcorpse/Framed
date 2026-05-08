import { navigate } from '../main.js'

export function renderCardFilme(container, filme) {
    const capa = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Sem+Capa'

    const ano = filme.release_date ? filme.release_date.split('-')[0] : ''
    const nota = filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'

    container.innerHTML = `
        <div class="cursor-pointer group" id="card-${filme.id}">
            <div class="relative overflow-hidden rounded-lg">
                <img
                    src="${capa}"
                    alt="${filme.title}"
                    class="w-full object-cover rounded-lg transition group-hover:scale-105 group-hover:opacity-80"
                />
                <div class="absolute top-2 right-2 bg-black/70 text-green-400 text-xs font-bold px-2 py-1 rounded">
                    ★ ${nota}
                </div>
            </div>
            <div class="mt-2">
                <p class="text-white text-sm font-semibold truncate">${filme.title}</p>
                <p class="text-gray-500 text-xs">${ano}</p>
            </div>
        </div>
    `

    container.querySelector(`#card-${filme.id}`).addEventListener('click', () => {
        navigate(`/filme/${filme.id}`)
    })
}