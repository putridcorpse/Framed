# 🎬 Framed

A Letterboxd-inspired app — discover, rate and share the movies you love.

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![Django](https://img.shields.io/badge/Django-6.0-green)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-cyan)

---

## ✨ Features

- User registration and login with JWT authentication
- Movie search powered by TMDB
- Movie detail page with overview, cast and director
- Mark movies as **Watched**, **Want to watch** or **Dropped**
- Write and read reviews with a score from 1 to 10
- Like other users' reviews
- Public user profiles

---

## 🛠️ Tech Stack

**Backend**
- Python + Django + Django REST Framework
- SimpleJWT for authentication
- SQLite (development)

**Frontend**
- Vite + Vanilla JavaScript
- Tailwind CSS

**External API**
- [TMDB (The Movie Database)](https://www.themoviedb.org/)

---

## 🔑 How to get your TMDB API Key

1. Go to [themoviedb.org](https://www.themoviedb.org/) and create a free account
2. Navigate to **Settings → API** (or go directly to: https://www.themoviedb.org/settings/api)
3. Click **Create** and select the **Developer** type
4. Fill out the form (personal use is fine)
5. Copy the **API Key (v3 auth)** — that's the one we'll use

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/putridcorpse/framed.git
cd framed
```

---

### 2. Set up the backend (Django)

```bash
# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the project root:

```env
SECRET_KEY=your-django-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
TMDB_API_KEY=your-tmdb-api-key-here
```

> 💡 To generate a secure SECRET_KEY, run:
> ```bash
> python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
> ```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000`

---

### 3. Set up the frontend (Vite)

```bash
cd frontend  # or your frontend folder name
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

### 4. Open the app

Visit **http://localhost:5173** in your browser, create an account and start tracking movies!

---

## 📁 Project Structure

```
framed/
├── core/               # Django settings
├── users/              # Authentication app
├── movies/             # Movies app
├── reviews/            # Reviews app
├── frontend/
│   ├── src/
│   │   ├── pages/      # Pages (Home, Movie, Login...)
│   │   ├── components/ # Reusable components
│   │   └── services/   # api.js — backend calls
│   └── index.html
├── .env                # Environment variables (never commit this!)
├── .gitignore
└── requirements.txt
```

---

## 🔒 Security

- Never commit your `.env` file to git
- In production, set `DEBUG=False` and update `ALLOWED_HOSTS` with your real domain
- Always use a unique and strong `SECRET_KEY` in production
- Keep your TMDB API key server-side only — never expose it in frontend code

---

## 📝 License

MIT
