const BASE_URL = "http://127.0.0.1:8000/api"

function getToken() {
    return localStorage.getItem("access_token")
}

export async function apiFetch(endpoint, options = {}) {
    const token = getToken()
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...options.headers
        }
    })
    return res.json()
}

export async function register(username, email, password) {
    return apiFetch('/auth/register/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
    })
}

export async function login(username, password) {
    const data = await apiFetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    })
    if (data.access) {
        localStorage.setItem("access_token", data.access)
        localStorage.setItem("refresh_token", data.refresh)
    }
    return data
}

export function logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    window.location.href = "/"
}

export function isLoggedIn() {
    return !!getToken()
}

export async function buscarFilmes(query) {
    return apiFetch(`/filmes/buscar/?q=${query}`)
}

export async function detalhesFilme(tmdbId) {
    return apiFetch(`/filmes/${tmdbId}/`)
}

export async function marcarFilme(tmdbId, status, nota) {
    return apiFetch(`/filmes/${tmdbId}/marcar/`, {
        method: 'POST',
        body: JSON.stringify({ status, nota })
    })
}

export async function meusFilmes() {
    return apiFetch('/filmes/meus/')
}

export async function getReviews(tmdbId) {
    return apiFetch(`/reviews/filme/${tmdbId}/`)
}

export async function criarReview(tmdbId, texto, nota) {
    return apiFetch(`/reviews/filme/${tmdbId}/`, {
        method: 'POST',
        body: JSON.stringify({ texto, nota })
    })
}

export async function likeReview(reviewId) {
    return apiFetch(`/reviews/${reviewId}/like/`, { method: 'POST' })
}

export async function meuPerfil() {
    return apiFetch('/auth/perfil/')
}

export async function perfilPublico(username) {
    return apiFetch(`/auth/perfil/${username}/`)
}