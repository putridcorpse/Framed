import { login } from '../services/api.js'
import { navigate } from '../main.js'

export function renderLogin(container) {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-800">
                
                <h1 class="text-white text-3xl font-bold mb-2">Entrar</h1>
                <p class="text-gray-400 mb-8">Bem vindo de volta</p>

                <div id="erro" class="hidden bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm"></div>

                <div class="flex flex-col gap-4">
                    <div>
                        <label class="text-gray-400 text-sm mb-1 block">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="seu_usuario"
                            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label class="text-gray-400 text-sm mb-1 block">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        id="btn-login"
                        class="w-full bg-green-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-green-300 transition mt-2"
                    >
                        Entrar
                    </button>
                </div>

                <p class="text-gray-500 text-sm text-center mt-6">
                    Não tem conta?
                    <span id="ir-register" class="text-green-400 cursor-pointer hover:underline">Cadastre-se</span>
                </p>
            </div>
        </div>
    `

    document.getElementById('ir-register').addEventListener('click', () => navigate('/register'))

    document.getElementById('btn-login').addEventListener('click', async () => {
        const username = document.getElementById('username').value.trim()
        const password = document.getElementById('password').value.trim()
        const erro = document.getElementById('erro')

        if (!username || !password) {
            erro.textContent = 'Preencha todos os campos'
            erro.classList.remove('hidden')
            return
        }

        const btn = document.getElementById('btn-login')
        btn.textContent = 'Entrando...'
        btn.disabled = true

        const data = await login(username, password)

        if (data.access) {
            navigate('/')
        } else {
            erro.textContent = 'Usuário ou senha incorretos'
            erro.classList.remove('hidden')
            btn.textContent = 'Entrar'
            btn.disabled = false
        }
    })
}
