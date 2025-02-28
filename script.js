document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de entrada dos cards
function revealCards() {
    const cards = document.querySelectorAll('.card');
    const windowHeight = window.innerHeight;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < windowHeight - 50) {
            card.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealCards);
window.addEventListener('load', revealCards);

// Controle do botão expansível da equipe
document.addEventListener('DOMContentLoaded', function() {
    const teamTrigger = document.getElementById('teamTrigger');
    const teamSection = document.getElementById('teamSection');

    if (teamTrigger && teamSection) {
        teamTrigger.addEventListener('click', function() {
            teamSection.classList.toggle('show');
            this.classList.toggle('active');
            
            // Atualiza o texto do botão
            const buttonText = this.querySelector('span');
            if (teamSection.classList.contains('show')) {
                buttonText.textContent = 'Ocultar Equipe';
            } else {
                buttonText.textContent = 'Ver Equipe';
            }
        });
    }
});

// Fecha a seção da equipe se clicar fora dela no mobile
document.addEventListener('click', function(event) {
    const teamTrigger = document.getElementById('teamTrigger');
    const teamSection = document.getElementById('teamSection');
    
    if (window.innerWidth <= 768) {  // Só executa no mobile
        if (!teamSection.contains(event.target) && 
            !teamTrigger.contains(event.target) && 
            teamSection.classList.contains('show')) {
            teamSection.classList.remove('show');
            teamTrigger.classList.remove('active');
            teamTrigger.querySelector('span').textContent = 'Ver Equipe';
        }
    }
});

// Configuração do Three.js
function init3DModel() {
    const container = document.getElementById('3d-model-container');
    
    // Configuração da cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fa);

    // Câmera
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Loader para o modelo 3D
    const loader = new THREE.GLTFLoader();
    let model;

    // Carrega o modelo 3D
    loader.load(
        'caminho/para/seu/modelo.glb', // Você precisará de um modelo 3D do nervo facial
        function (gltf) {
            model = gltf.scene;
            scene.add(model);

            // Ajusta a posição e escala do modelo
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% carregado');
        },
        function (error) {
            console.error('Erro ao carregar o modelo:', error);
        }
    );

    // Animação
    function animate() {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.005; // Rotação automática suave
        }
        renderer.render(scene, camera);
    }

    // Controles de rotação
    const rotateLeft = document.getElementById('rotate-left');
    const rotateRight = document.getElementById('rotate-right');

    rotateLeft.addEventListener('click', () => {
        if (model) {
            model.rotation.y += 0.5;
        }
    });

    rotateRight.addEventListener('click', () => {
        if (model) {
            model.rotation.y -= 0.5;
        }
    });

    // Responsividade
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    animate();
}

// Inicializa o modelo 3D quando a página carregar
document.addEventListener('DOMContentLoaded', init3DModel);

// Controle da seção de Sintomas
document.addEventListener('DOMContentLoaded', function() {
    // Sintomas
    const symptomsHeader = document.querySelector('.symptoms-section .section-header-mobile');
    const symptomsContent = document.getElementById('symptomsContent');

    if (symptomsHeader && symptomsContent) {
        symptomsHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            symptomsContent.classList.toggle('show');
        });
    }

    // Causas
    const causesHeader = document.querySelector('.causes-section .section-header-mobile');
    const causesContent = document.getElementById('causesContent');

    if (causesHeader && causesContent) {
        causesHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            causesContent.classList.toggle('show');
        });
    }

    // A Doença
    const introHeader = document.querySelector('.intro-section .section-header-mobile');
    const introContent = document.getElementById('introContent');

    if (introHeader && introContent) {
        introHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            introContent.classList.toggle('show');
        });
    }

    // Classificação
    const classificationHeader = document.querySelector('.classification-section .section-header-mobile');
    const classificationContent = document.getElementById('classificationContent');

    if (classificationHeader && classificationContent) {
        classificationHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            classificationContent.classList.toggle('show');
        });
    }
}); 