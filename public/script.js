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
    // Seleciona todos os headers mobile que devem ter comportamento de toggle
    const mobileHeaders = document.querySelectorAll('.section-header-mobile');

    mobileHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Encontra o conteúdo associado (próximo elemento após o header)
            const content = this.nextElementSibling;
            
            // Toggle da classe active no header
            this.classList.toggle('active');
            
            // Toggle da classe show no conteúdo
            if (content) {
                content.classList.toggle('show');
                
                // Animação suave de altura
                if (content.classList.contains('show')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = "0";
                }
            }

            // Rotaciona a seta
            const arrow = this.querySelector('.fa-chevron-down');
            if (arrow) {
                arrow.style.transform = this.classList.contains('active') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0)';
            }
        });
    });
}); 