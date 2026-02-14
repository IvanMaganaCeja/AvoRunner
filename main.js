/**
 * Main Game Module
 * Controla el flujo principal del juego
 */

const Game = {
    canvas: document.getElementById('gameCanvas'),
    ctx: null,
    currentLevel: 1,
    gameState: 'menu', // menu, playing, levelComplete, gameOver
    score: 0,
    lives: 3,
    platforms: [],
    enemies: [],
    items: [],

    /**
     * Inicializa el juego
     */
    init() {
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.lives = 3;
        this.currentLevel = 1;
        this.setupEventListeners();
        this.showMenu();
    },

    /**
     * Configura los event listeners
     */
    setupEventListeners() {
        // Botones del menú
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('instructionsBtn').addEventListener('click', () => {
            this.showInstructions();
        });

        document.getElementById('backBtn').addEventListener('click', () => {
            this.showMenu();
        });

        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartLevel();
        });

        document.getElementById('menuBtn').addEventListener('click', () => {
            this.showMenu();
        });

        // Controles del teclado
        document.addEventListener('keydown', (e) => {
            if (this.gameState !== 'playing') return;

            switch (e.key.toLowerCase()) {
                case 'a':
                    Player.keys.left = true;
                    break;
                case 'd':
                    Player.keys.right = true;
                    break;
                case ' ':
                    Player.keys.jump = true;
                    e.preventDefault();
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch (e.key.toLowerCase()) {
                case 'a':
                    Player.keys.left = false;
                    break;
                case 'd':
                    Player.keys.right = false;
                    break;
                case ' ':
                    Player.keys.jump = false;
                    break;
            }
        });
    },

    /**
     * Muestra el menú principal
     */
    showMenu() {
        this.gameState = 'menu';
        document.getElementById('gameMenu').classList.remove('hidden');
        document.getElementById('instructionsMenu').classList.add('hidden');
        document.getElementById('levelComplete').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');
    },

    /**
     * Muestra el menú de instrucciones
     */
    showInstructions() {
        document.getElementById('gameMenu').classList.add('hidden');
        document.getElementById('instructionsMenu').classList.remove('hidden');
    },

    /**
     * Inicia el juego
     */
    startGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.lives = 3;
        this.loadLevel(1);
    },

    /**
     * Carga un nivel
     * @param {number} levelNumber - Número del nivel
     */
    loadLevel(levelNumber) {
        const levelData = getLevel(levelNumber);
        if (!levelData) return;

        this.currentLevel = levelNumber;
        this.platforms = levelData.platforms;
        this.items = levelData.items.map(item => ({ ...item }));
        this.enemies = levelData.enemies.map(enemyData => Enemy.create(enemyData.x, enemyData.y, enemyData.direction));

        Player.init(levelData.playerStart.x, levelData.playerStart.y);

        this.gameState = 'playing';
        document.getElementById('gameMenu').classList.add('hidden');
        document.getElementById('instructionsMenu').classList.add('hidden');
        document.getElementById('levelComplete').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');

        this.updateHUD();
        this.gameLoop();
    },

    /**
     * Actualiza el HUD
     */
    updateHUD() {
        document.getElementById('level').textContent = `Nivel: ${this.currentLevel}`;
        document.getElementById('score').textContent = `Puntos: ${this.score}`;
        
        let hearts = '';
        for (let i = 0; i < this.lives; i++) {
            hearts += '❤️';
        }
        document.getElementById('lives').textContent = `Vidas: ${hearts}`;
    },

    /**
     * Loop principal del juego
     */
    gameLoop() {
        if (this.gameState !== 'playing') return;

        // Actualiza lógica
        const playerStatus = Player.update();

        // Colisiones con plataformas
        let onPlatform = false;
        this.platforms.forEach(platform => {
            if (Physics.checkCollision(Player, platform)) {
                const collisionSide = Physics.resolveCollision(Player, platform);
                if (collisionSide === 'top') {
                    onPlatform = true;
                }

                // Mueve plataformas móviles
                if (platform.type === 'moving') {
                    if (platform.moveX) {
                        platform.x += platform.speed;
                        if (platform.x <= platform.minX || platform.x >= platform.maxX) {
                            platform.speed *= -1;
                        }
                    }
                    if (platform.moveY) {
                        platform.y += platform.speed;
                        if (platform.y <= platform.minY || platform.y >= platform.maxY) {
                            platform.speed *= -1;
                        }
                    }
                }
            }
        });

        // Actualiza enemigos
        this.enemies.forEach(enemy => {
            Enemy.update(enemy, this.platforms);

            // Colisión con jugador
            if (Enemy.checkPlayerCollision(enemy, Player)) {
                this.playerHit();
            }
        });

        // Recolección de items
        this.items.forEach((item, index) => {
            if (!item.collected && Physics.checkCollision(Player, item)) {
                item.collected = true;
                this.score += 100;
                this.playSound('collect');
            }
        });

        // Colisión con meta
        this.platforms.forEach(platform => {
            if (platform.type === 'goal' && Physics.checkCollision(Player, platform)) {
                this.levelComplete();
            }
        });

        // Detecta si el jugador murió
        if (playerStatus === 'dead') {
            this.playerHit();
        }

        // Dibuja
        this.draw();

        // Siguiente frame
        requestAnimationFrame(() => this.gameLoop());
    },

    /**
     * El jugador es golpeado
     */
    playerHit() {
        this.lives--;
        this.playSound('hit');

        if (this.lives <= 0) {
            this.showGameOver();
        } else {
            this.restartLevel();
        }
    },

    /**
     * Reinicia el nivel actual
     */
    restartLevel() {
        this.gameState = 'playing';
        this.loadLevel(this.currentLevel);
    },

    /**
     * Nivel completado
     */
    levelComplete() {
        this.gameState = 'levelComplete';
        this.playSound('levelComplete');

        const levelData = getLevel(this.currentLevel);
        document.getElementById('levelCompleteText').textContent = 
            `¡Completaste "${levelData.name}"!\nPuntos: ${this.score}`;
        
        document.getElementById('levelComplete').classList.remove('hidden');
    },

    /**
     * Siguiente nivel
     */
    nextLevel() {
        if (this.currentLevel < getTotalLevels()) {
            this.currentLevel++;
            this.loadLevel(this.currentLevel);
        } else {
            // Juego completado
            this.gameState = 'menu';
            alert('¡Felicidades! ¡Completaste todos los niveles!');
            this.showMenu();
        }
    },

    /**
     * Game Over
     */
    showGameOver() {
        this.gameState = 'gameOver';
        document.getElementById('gameOverText').textContent = `Puntuación final: ${this.score}`;
        document.getElementById('gameOver').classList.remove('hidden');
    },

    /**
     * Dibuja el juego
     */
    draw() {
        // Limpia canvas
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibuja plataformas
        this.platforms.forEach(platform => {
            if (platform.type === 'goal') {
                // Meta - bandera
                this.ctx.fillStyle = '#FFD700';
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                this.ctx.fillStyle = '#FF6347';
                this.ctx.fillRect(platform.x + 5, platform.y - 15, 15, 15);
            } else if (platform.type === 'moving') {
                // Plataforma móvil - más oscura
                this.ctx.fillStyle = '#A0522D';
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                // Animación de movimiento
                this.ctx.strokeStyle = '#8B4513';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
            } else {
                // Plataforma estática
                this.ctx.fillStyle = '#8B4513';
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }
        });

        // Dibuja items
        this.items.forEach(item => {
            if (!item.collected) {
                this.ctx.fillStyle = '#228B22';
                this.ctx.beginPath();
                this.ctx.arc(item.x + 5, item.y + 5, 5, 0, Math.PI * 2);
                this.ctx.fill();
                // Brillo
                this.ctx.fillStyle = '#32CD32';
                this.ctx.beginPath();
                this.ctx.arc(item.x + 3, item.y + 3, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });

        // Dibuja enemigos
        this.enemies.forEach(enemy => {
            Enemy.draw(this.ctx, enemy);
        });

        // Dibuja jugador
        Player.draw(this.ctx);

        // Actualiza HUD
        this.updateHUD();
    },

    /**
     * Reproduce sonido
     * @param {string} soundName
     */
    playSound(soundName) {
        // Sonidos mediante Web Audio API (simple beeps)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            switch (soundName) {
                case 'jump':
                    oscillator.frequency.value = 400;
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                case 'collect':
                    oscillator.frequency.value = 800;
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                case 'hit':
                    oscillator.frequency.value = 100;
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                    break;
                case 'levelComplete':
                    oscillator.frequency.value = 600;
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.5);
                    break;
            }
        } catch (e) {
            // Web Audio API no disponible
        }
    }
};

// Inicia el juego cuando se carga la página
window.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
