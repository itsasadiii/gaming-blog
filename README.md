# Gaming Blog - News & Game Listings

A modern gaming blog and news site built with React, Node.js, and MongoDB. Browse the latest gaming news and discover game listings with detailed descriptions.

## 🎮 Features

- **Game Listings**: Browse games with descriptions, reviews, and ratings
- **Gaming News**: Latest gaming news and updates
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Search & Filter**: Find games by genre, platform, and rating
- **User Reviews**: Read community reviews and ratings
- **Admin Panel**: Manage games and news posts (Coming soon)

## 🏗️ Project Structure

```
gaming-blog/
├── frontend/                 # React frontend (Netlify)
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── netlify.toml          # Netlify config
├── backend/                  # Node.js backend (Heroku)
│   ├── routes/               # API routes
│   ├── models/               # Database models
│   ├── controllers/          # Business logic
│   ├── server.js             # Main server file
│   ├── .env.example
│   ├── package.json
│   ├── Procfile              # Heroku config
│   └── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Backend Setup (Heroku)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string and other config
npm run dev
```

### Frontend Setup (Netlify)

```bash
cd frontend
npm install
npm start
```

## 📦 Deployment

### Backend (Heroku)

1. Create a Heroku account at https://www.heroku.com
2. Install Heroku CLI: `npm install -g heroku`
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Set environment variables: `heroku config:set MONGODB_URI=your_uri`
6. Deploy: `git push heroku main`

### Frontend (Netlify)

1. Push frontend folder to GitHub
2. Connect repo to Netlify at https://app.netlify.com
3. Build command: `npm run build`
4. Publish directory: `build`
5. Set environment variable: `REACT_APP_API_URL=your-heroku-backend-url`

## 🔗 API Endpoints

- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get single game
- `POST /api/games` - Create game (admin)
- `PUT /api/games/:id` - Update game (admin)
- `DELETE /api/games/:id` - Delete game (admin)
- `GET /api/news` - Get news articles
- `GET /api/news/:id` - Get single article

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios (HTTP client)
- React Router (Navigation)
- Tailwind CSS (Styling)

**Backend:**
- Express.js
- MongoDB
- Mongoose
- dotenv

## 📝 Environment Variables

**Backend (.env):**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

## 📄 License

MIT

## 👨‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first.
