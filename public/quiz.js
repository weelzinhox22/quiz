// Array de questões
const questions = [
    {
        question: "Qual lado da face é afetado na Paralisia de Bell?",
        options: [
            "Sempre o lado direito",
            "Sempre o lado esquerdo",
            "Pode afetar qualquer lado",
            "Sempre bilateral"
        ],
        correct: 2
    },
    {
        question: "Qual é o nervo afetado na paralisia facial?",
        options: [
            "Nervo Trigêmeo",
            "Nervo Facial (VII par craniano)",
            "Nervo Óptico",
            "Nervo Vago"
        ],
        correct: 1
    },
    {
        question: "Qual destes NÃO é um sintoma comum da paralisia facial?",
        options: [
            "Dificuldade para fechar o olho",
            "Desvio da boca",
            "Perda de audição",
            "Dificuldade para sorrir"
        ],
        correct: 2
    },
    {
        question: "Qual é o tratamento inicial mais comum para a paralisia facial?",
        options: [
            "Cirurgia imediata",
            "Corticosteroides",
            "Apenas repouso",
            "Exercícios intensos"
        ],
        correct: 1
    },
    {
        question: "Quanto tempo geralmente dura a recuperação da paralisia facial?",
        options: [
            "24 horas",
            "1 semana",
            "3 a 6 meses",
            "Sempre permanente"
        ],
        correct: 2
    },
    {
        question: "Qual faixa etária é mais comumente afetada pela paralisia facial?",
        options: [
            "Crianças (0-12 anos)",
            "Adolescentes (13-19 anos)",
            "Adultos (20-60 anos)",
            "Idosos (acima de 60 anos)"
        ],
        correct: 2
    },
    {
        question: "Qual condição pode aumentar o risco de paralisia facial?",
        options: [
            "Diabetes",
            "Asma",
            "Artrite",
            "Rinite"
        ],
        correct: 0
    },
    {
        question: "Por que é importante proteger o olho afetado na paralisia facial?",
        options: [
            "Apenas questão estética",
            "Prevenir ressecamento e lesões",
            "Melhorar a visão",
            "Não há necessidade de proteção"
        ],
        correct: 1
    },
    {
        question: "Qual especialista médico geralmente trata a paralisia facial?",
        options: [
            "Cardiologista",
            "Neurologista",
            "Ortopedista",
            "Pediatra"
        ],
        correct: 1
    },
    {
        question: "Qual exame pode ser necessário para diagnosticar a causa da paralisia facial?",
        options: [
            "Raio-X do crânio",
            "Ressonância Magnética",
            "Ultrassom abdominal",
            "Exame de sangue apenas"
        ],
        correct: 1
    },
    {
        question: "Qual é a principal causa da Paralisia de Bell?",
        options: [
            "Trauma físico",
            "Causa desconhecida (idiopática)",
            "Infecção bacteriana",
            "Deficiência vitamínica"
        ],
        correct: 1
    },
    {
        question: "Qual destes é um exercício facial recomendado durante a recuperação?",
        options: [
            "Manter o rosto imóvel",
            "Exercícios de mímica facial suaves",
            "Massagem profunda",
            "Exercícios com peso"
        ],
        correct: 1
    },
    {
        question: "Em qual situação deve-se procurar atendimento médico imediato?",
        options: [
            "Após 1 semana dos sintomas",
            "Quando houver dor",
            "Nas primeiras 72 horas do início dos sintomas",
            "Apenas se houver febre"
        ],
        correct: 2
    },
    {
        question: "Qual é a importância da fisioterapia no tratamento?",
        options: [
            "Não é necessária",
            "Ajuda na recuperação dos movimentos faciais",
            "Apenas para casos graves",
            "Só após 6 meses"
        ],
        correct: 1
    },
    {
        question: "Como a paralisia facial pode afetar a alimentação?",
        options: [
            "Não afeta",
            "Pode causar dificuldade para mastigar e escape de alimentos",
            "Apenas afeta líquidos",
            "Aumenta o apetite"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let scores = JSON.parse(localStorage.getItem('quizScores')) || [];

// Função para iniciar o quiz
function startQuizWithPlayer() {
    console.log("Iniciando quiz...");
    const playerName = document.getElementById('player-name').value.trim();
    
    if (!playerName) {
        alert('Por favor, digite seu nome para começar!');
        return;
    }

    console.log("Nome do jogador:", playerName);
    document.getElementById('player-registration').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

// Atualiza a função existente de showQuestion
function showQuestion() {
    console.log("Mostrando questão:", currentQuestion + 1);
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    // Atualiza a barra de progresso
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    console.log("Resposta selecionada:", selectedIndex);
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option-btn');

    options.forEach(option => option.disabled = true);
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    console.log("Mostrando resultado final");
    const playerName = document.getElementById('player-name').value;
    const percentage = Math.round((score / questions.length) * 100);
    
    console.log("Jogador:", playerName);
    console.log("Pontuação:", percentage + "%");

    // Atualiza a tela
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').textContent = `${percentage}%`;

    // Salva a pontuação
    salvarPontuacao(playerName, percentage);
}

// Função para salvar pontuação
function salvarPontuacao(nome, pontos) {
    console.log("Salvando pontuação...");
    console.log("Nome:", nome);
    console.log("Pontos:", pontos);

    // Recupera pontuações existentes
    let scores = [];
    try {
        const savedScores = localStorage.getItem('quizScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
            console.log("Pontuações existentes:", scores);
        }
    } catch (error) {
        console.error('Erro ao carregar pontuações:', error);
    }

    // Adiciona nova pontuação
    scores.push({ name: nome, score: pontos });
    
    // Ordena e mantém top 50
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 50);

    // Salva no localStorage
    try {
        localStorage.setItem('quizScores', JSON.stringify(scores));
        console.log("Pontuações salvas com sucesso!");
        console.log("Total de pontuações:", scores.length);
    } catch (error) {
        console.error('Erro ao salvar pontuações:', error);
    }

    // Atualiza o ranking
    atualizarRanking();
}

// Função para atualizar o ranking
function atualizarRanking() {
    console.log("Atualizando ranking...");
    const leaderboard = document.getElementById('leaderboard');
    
    if (!leaderboard) {
        console.error("Elemento 'leaderboard' não encontrado!");
        return;
    }

    // Recupera pontuações
    let scores = [];
    try {
        const savedScores = localStorage.getItem('quizScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
            console.log("Pontuações carregadas:", scores);
        }
    } catch (error) {
        console.error('Erro ao carregar pontuações:', error);
    }

    // Cria HTML do ranking
    if (scores.length === 0) {
        leaderboard.innerHTML = '<p>Nenhuma pontuação registrada ainda.</p>';
        console.log("Nenhuma pontuação para mostrar");
        return;
    }

    const rankingHTML = scores.map((score, index) => `
        <div class="leaderboard-entry ${index < 3 ? 'top-three' : ''}">
            <div class="rank">${index + 1}</div>
            <div class="player-info">
                <span class="player-name">${score.name}</span>
                <span class="player-score">${score.score}%</span>
            </div>
            ${index < 3 ? `<div class="medal">${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>` : ''}
        </div>
    `).join('');

    leaderboard.innerHTML = rankingHTML;
    console.log("Ranking atualizado com sucesso!");
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada");
    document.getElementById('quiz-content').style.display = 'none';
    atualizarRanking();
    console.log("Inicialização completa");
});

function restartQuiz() {
    document.getElementById('player-registration').style.display = 'block';
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('player-name').value = '';
}

// Função para testar
function testarRanking() {
    console.log("Adicionando pontuações de teste...");
    const testScores = [
        { name: "João", score: 100 },
        { name: "Maria", score: 90 },
        { name: "Pedro", score: 80 }
    ];
    localStorage.setItem('quizScores', JSON.stringify(testScores));
    atualizarRanking();
    console.log("Pontuações de teste adicionadas!");
}

// Função para limpar
function limparRanking() {
    console.log("Limpando ranking...");
    localStorage.removeItem('quizScores');
    atualizarRanking();
    console.log("Ranking limpo!");
}