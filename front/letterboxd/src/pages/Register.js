import { register } from '../services/api.js'
import { navigate } from '../main.js'

export function renderRegister(container) {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center px-4">
            <div class="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-800">
                
                <h1 class="text-white text-3xl font-bold mb-2">Cadastrar</h1>
                <p class="text-gray-400 mb-8">Crie sua conta gratuitamente</p>

                <div id="erro" class="hidden bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm"></div>
                <div id="sucesso" class="hidden bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6 text-sm"></div>

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
                        <label class="text-gray-400 text-sm mb-1 block">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="seu@email.com"
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
                        id="btn-register"
                        class="w-full bg-green-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-green-300 transition mt-2"
                    >
                        Cadastrar
                    </button>
                </div>

                <p class="text-gray-500 text-sm text-center mt-6">
                    Já tem conta?
                    <span id="ir-login" class="text-green-400 cursor-pointer hover:underline">Entrar</span>
                </p>
            </div>
        </div>
    `

    document.getElementById('ir-login').addEventListener('click', () => navigate('/login'))

    document.getElementById('btn-register').addEventListener('click', async () => {
        const username = document.getElementById('username').value.trim()
        const email = document.getElementById('email').value.trim()
        const password = document.getElementById('password').value.trim()
        const erro = document.getElementById('erro')
        const sucesso = document.getElementById('sucesso')

        erro.classList.add('hidden')
        sucesso.classList.add('hidden')

        if (!username || !email || !password) {
            erro.textContent = 'Preencha todos os campos'
            erro.classList.remove('hidden')
            return
        }

        const btn = document.getElementById('btn-register')
        btn.textContent = 'Cadastrando...'
        btn.disabled = true

        const data = await register(username, email, password)

        if (data.username) {
            sucesso.textContent = 'Conta criada com sucesso! Redirecionando...'
            sucesso.classList.remove('hidden')
            setTimeout(() => navigate('/login'), 1500)
        } else {
            const mensagem = data.username?.[0] || data.email?.[0] || 'Erro ao cadastrar'
            erro.textContent = mensagem
            erro.classList.remove('hidden')
            btn.textContent = 'Cadastrar'
            btn.disabled = false
        }
    })
}