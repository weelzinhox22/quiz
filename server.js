const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados (única declaração)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Servir arquivos estáticos
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota do quiz
app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

// Rota para salvar pontuação
app.post('/api/scores', async (req, res) => {
    const { name, score } = req.body;
    
    try {
        await pool.query(
            'INSERT INTO scores (name, score) VALUES ($1, $2)',
            [name, score]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
        res.status(500).json({ error: 'Erro ao salvar pontuação' });
    }
});

// Rota para buscar top 50
app.get('/api/scores', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT name, score FROM scores ORDER BY score DESC LIMIT 50'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar pontuações:', error);
        res.status(500).json({ error: 'Erro ao buscar pontuações' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});