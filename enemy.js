/**
 * Enemy module
 * Define enemigos y sus comportamientos
 */

const Enemy = {
    /**
     * Crea un nuevo enemigo (Tostadora)
     * @param {number} x - Posición X
     * @param {number} y - Posición Y
     * @param {number} direction - Dirección de movimiento (1 o -1)
     * @returns {Object} Objeto enemigo
     */
    create(x, y, direction = 1) {
        return {
            x: x,
            y: y,
            width: 32,
            height: 32,
            velocityX: 2 * direction,
            velocityY: 0,
            direction: direction,
            type: 'toaster',
            shootTimer: 0,
            shootInterval: 60,
            projectiles: [],
            alive: true
        };
    },

    /**
     * Actualiza el enemigo
     * @param {Object} enemy - Enemigo a actualizar
     * @param {Array} platforms - Array de plataformas para colisión
     */
    update(enemy, platforms) {
        if (!enemy.alive) return;

        // Movimiento
        enemy.x += enemy.velocityX;

        // Patrulla - da vuelta en los límites
        if (enemy.x < 0 || enemy.x + enemy.width > 800) {
            enemy.velocityX *= -1;
            enemy.direction *= -1;
        }

        // Dispara pan
        enemy.shootTimer++;
        if (enemy.shootTimer >= enemy.shootInterval) {
            this.shoot(enemy);
            enemy.shootTimer = 0;
        }

        // Actualiza proyectiles
        enemy.projectiles = enemy.projectiles.filter(projectile => {
            projectile.x += projectile.velocityX;
            projectile.y += projectile.velocityY;
            Physics.applyGravity(projectile);

            // Elimina proyectiles fuera de pantalla
            return projectile.x > -50 && projectile.x < 850 && projectile.y < 650;
        });
    },

    /**
     * Dispara un proyectil
     * @param {Object} enemy - Enemigo que dispara
     */
    shoot(enemy) {
        const projectile = {
            x: enemy.x + enemy.width / 2,
            y: enemy.y + 10,
            width: 8,
            height: 8,
            velocityX: 4 * enemy.direction,
            velocityY: 0,
            type: 'bread'
        };
        enemy.projectiles.push(projectile);
    },

    /**
     * Dibuja el enemigo
     * @param {CanvasRenderingContext2D} ctx - Contexto del canvas
     * @param {Object} enemy - Enemigo a dibujar
     */
    draw(ctx, enemy) {
        if (!enemy.alive) return;

        // Tostadora
        ctx.fillStyle = '#8B4513'; // Color café
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Ranura de la tostadora
        ctx.fillStyle = '#000000';
        ctx.fillRect(enemy.x + 6, enemy.y + 4, 20, 12);

        // Ojos
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(enemy.x + 8, enemy.y + 2, 4, 4);
        ctx.fillRect(enemy.x + 20, enemy.y + 2, 4, 4);

        // Dibuja proyectiles
        enemy.projectiles.forEach(projectile => {
            ctx.fillStyle = '#D2691E'; // Color pan tostado
            ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
        });
    },

    /**
     * Verifica colisión con el jugador
     * @param {Object} enemy - Enemigo
     * @param {Object} player - Jugador
     * @returns {boolean}
     */
    checkPlayerCollision(enemy, player) {
        // Colisión con el enemigo
        if (Physics.checkCollision(player, enemy)) {
            return true;
        }

        // Colisión con proyectiles
        return enemy.projectiles.some(projectile =>
            Physics.checkCollision(player, projectile)
        );
    }
};
