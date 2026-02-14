/**
 * Physics module
 * Maneja la física del juego: gravedad, colisiones y movimiento
 */

const Physics = {
    gravity: 0.6,
    friction: 0.85,

    /**
     * Aplica gravedad a un objeto
     * @param {Object} obj - Objeto con propiedades y, velocityY
     */
    applyGravity(obj) {
        obj.velocityY += this.gravity;
    },

    /**
     * Aplica fricción al movimiento horizontal
     * @param {Object} obj - Objeto con velocityX
     */
    applyFriction(obj) {
        obj.velocityX *= this.friction;
    },

    /**
     * Detecta colisión entre dos rectángulos (AABB)
     * @param {Object} rect1 - {x, y, width, height}
     * @param {Object} rect2 - {x, y, width, height}
     * @returns {boolean}
     */
    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    },

    /**
     * Resuelve colisión entre jugador y plataforma
     * @param {Object} player - Jugador con propiedades de posición y velocidad
     * @param {Object} platform - Plataforma con propiedades de posición
     */
    resolveCollision(player, platform) {
        const overlap = {
            top: player.y + player.height - platform.y,
            bottom: platform.y + platform.height - player.y,
            left: player.x + player.width - platform.x,
            right: platform.x + platform.width - player.x
        };

        // Encuentra el lado con menor superposición
        const minOverlap = Math.min(
            overlap.top,
            overlap.bottom,
            overlap.left,
            overlap.right
        );

        if (minOverlap === overlap.top && player.velocityY > 0) {
            // Colisión desde arriba
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.isJumping = false;
            return 'top';
        } else if (minOverlap === overlap.bottom && player.velocityY < 0) {
            // Colisión desde abajo
            player.y = platform.y + platform.height;
            player.velocityY = 0;
            return 'bottom';
        } else if (minOverlap === overlap.left && player.velocityX > 0) {
            // Colisión desde la izquierda
            player.x = platform.x - player.width;
            return 'left';
        } else if (minOverlap === overlap.right && player.velocityX < 0) {
            // Colisión desde la derecha
            player.x = platform.x + platform.width;
            return 'right';
        }
    },

    /**
     * Limita el valor máximo de velocidad
     * @param {Object} obj - Objeto con velocidad
     * @param {number} maxSpeed - Velocidad máxima
     */
    limitSpeed(obj, maxSpeed) {
        if (Math.abs(obj.velocityX) > maxSpeed) {
            obj.velocityX = (obj.velocityX > 0 ? 1 : -1) * maxSpeed;
        }
        if (Math.abs(obj.velocityY) > maxSpeed) {
            obj.velocityY = (obj.velocityY > 0 ? 1 : -1) * maxSpeed;
        }
    }
};
