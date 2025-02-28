const questions = [
    {
        question: "Qual lado da face é afetado na Paralisia de Bell?",
        image: "images/facial-sides.jpg",
        icon: "fas fa-face-meh",
        options: [
            "Sempre o lado direito",
            "Sempre o lado esquerdo",
            "Pode afetar qualquer lado",
            "Sempre bilateral"
        ],
        correct: 2,
        explanation: "A Paralisia de Bell pode afetar qualquer lado da face, sendo unilateral na maioria dos casos."
    },
    {
        question: "Qual destes sintomas é um sinal de alerta importante?",
        icon: "fas fa-exclamation-triangle",
        options: [
            "Dor atrás da orelha",
            "Espirros frequentes",
            "Coceira no nariz",
            "Fadiga leve"
        ],
        correct: 0,
        explanation: "Dor atrás da orelha pode indicar comprometimento mais sério do nervo facial."
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
        question: "Qual é o tempo médio de recuperação na maioria dos casos?",
        options: [
            "1 semana",
            "2 a 3 meses",
            "1 ano",
            "É permanente"
        ],
        correct: 1
    },
    {
        question: "Qual tratamento é fundamental na recuperação?",
        options: [
            "Cirurgia imediata",
            "Apenas medicamentos",
            "Fisioterapia",
            "Repouso absoluto"
        ],
        correct: 2
    },
    {
        question: "Qual fator pode aumentar o risco de paralisia facial?",
        options: [
            "Exposição ao frio",
            "Exercício físico",
            "Alimentação saudável",
            "Sono adequado"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;

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
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const scoreElement = document.getElementById('score');
    const percentage = (score / questions.length) * 100;
    scoreElement.textContent = `${percentage}%`;

    const resultDetails = document.getElementById('result-details');
    let message = '';
    if (percentage === 100) {
        message = 'Excelente! Você é um especialista!';
    } else if (percentage >= 70) {
        message = 'Muito bom! Você tem um ótimo conhecimento!';
    } else if (percentage >= 50) {
        message = 'Bom trabalho! Mas ainda há espaço para melhorar.';
    } else {
        message = 'Continue estudando! O conhecimento é importante.';
    }
    resultDetails.textContent = message;
}

function restartQuiz() {
    startQuiz();
}

// Iniciar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', startQuiz);

// Função para salvar pontuação
async function saveScore(playerName, score) {
    try {
        const { data, error } = await supabase
            .from('quiz_scores')
            .insert([
                { 
                    player_name: playerName,
                    score: score,
                    date: new Date()
                }
            ]);
        
        if (error) throw error;
        await updateLeaderboard();
    } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
    }
}

// Função para atualizar o ranking
async function updateLeaderboard() {
    try {
        const { data, error } = await supabase
            .from('quiz_scores')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;

        const leaderboard = document.getElementById('leaderboard');
        leaderboard.innerHTML = data.map((entry, index) => `
            <div class="leaderboard-entry ${index < 3 ? 'top-three' : ''}">
                <div class="rank">${index + 1}</div>
                <div class="player-info">
                    <span class="player-name">${entry.player_name}</span>
                    <span class="player-score">${entry.score}%</span>
                </div>
                <div class="medal">
                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao atualizar ranking:', error);
    }
} 