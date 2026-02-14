/**
 * Player module
 * Define al protagonista Avo y sus mecánicas
 */

const Player = {
    // Posición y dimensiones
    x: 50,
    y: 300,
    width: 32,
    height: 32,

    // Velocidad y movimiento
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    maxSpeed: 8,
    jumpPower: 12,

    // Estado
    isJumping: false,
    isFalling: false,
    direction: 1, // 1 = derecha, -1 = izquierda
    animation: 'idle',
    animationFrame: 0,
    animationSpeed: 0.1,

    // Controles
    keys: {
        left: false,
        right: false,
        jump: false
    },

    /**
     * Inicializa el jugador
     * @param {number} startX - Posición X inicial
     * @param {number} startY - Posición Y inicial
     */
    init(startX = 50, startY = 300) {
        this.x = startX;
        this.y = startY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isJumping = false;
        this.isFalling = false;
        this.direction = 1;
        this.animation = 'idle';
        this.animationFrame = 0;
    },

    /**
     * Actualiza el estado del jugador
     */
    update() {
        // Aplica física
        Physics.applyGravity(this);
        Physics.applyFriction(this);
        Physics.limitSpeed(this, this.maxSpeed);

        // Movimiento horizontal
        if (this.keys.left) {
            this.velocityX = -this.speed;
            this.direction = -1;
            this.animation = 'run';
        } else if (this.keys.right) {
            this.velocityX = this.speed;
            this.direction = 1;
            this.animation = 'run';
        } else if (!this.isJumping) {
            this.animation = 'idle';
        }

        // Salto
        if (this.keys.jump && !this.isJumping) {
            this.velocityY = -this.jumpPower;
            this.isJumping = true;
            this.animation = 'jump';
            this.playSound('jump');
        }

        // Actualiza posición
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Límites del mapa
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > 800) this.x = 800 - this.width;

        // Game Over si cae fuera de pantalla
        if (this.y > 600) {
            return 'dead';
        }

        // Actualiza animación
        this.updateAnimation();

        return 'alive';
    },

    /**
     * Actualiza la animación del jugador
     */
    updateAnimation() {
        this.animationFrame += this.animationSpeed;

        if (this.animation === 'run') {
            if (this.animationFrame > 4) {
                this.animationFrame = 0;
            }
        } else if (this.animation === 'jump') {
            // Mantén la animación de salto mientras esté en el aire
            if (!this.isJumping) {
                this.animation = 'idle';
                this.animationFrame = 0;
            }
        } else {
            // Idle
            this.animationFrame += 0.02;
            if (this.animationFrame > 2) {
                this.animationFrame = 0;
            }
        }
    },

    /**
     * Dibuja al jugador
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y);
        ctx.scale(this.direction, 1);

        // Color del aguacate
        ctx.fillStyle = '#6B8E23';
        
        // Cuerpo
        ctx.fillRect(-12, 0, 24, 24);
        
        // Cabeza
        ctx.fillStyle = '#7BA825';
        ctx.fillRect(-10, -10, 20, 10);
        
        // Ojos
        ctx.fillStyle = '#000000';
        ctx.fillRect(-4, -6, 2, 2);
        ctx.fillRect(2, -6, 2, 2);

        // Piernas - Animación de carrera
        ctx.strokeStyle = '#5A7A1F';
        ctx.lineWidth = 2;

        if (this.animation === 'run') {
            const legOffset = Math.sin(this.animationFrame * Math.PI) * 4;
            // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(-4, 24);
            ctx.lineTo(-4, 24 + 6 + legOffset);
            ctx.stroke();
            // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(4, 24);
            ctx.lineTo(4, 24 + 6 - legOffset);
            ctx.stroke();
        } else {
            // Idle o salto
            ctx.beginPath();
            ctx.moveTo(-4, 24);
            ctx.lineTo(-4, 30);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(4, 24);
            ctx.lineTo(4, 30);
            ctx.stroke();
        }

        ctx.restore();

        // Debug hitbox (opcional)
        if (false) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    },

    /**
     * Reproduce sonido (placeholder)
     * @param {string} soundName - Nombre del sonido
     */
    playSound(soundName) {
        // Implementar con Web Audio API en el futuro
        // console.log(`Sound: ${soundName}`);
    }
};
