/**
 * Level module
 * Define los niveles del juego
 */

const Levels = [
    // Nivel 1: Tutorial
    {
        number: 1,
        name: 'Tutorial',
        playerStart: { x: 50, y: 500 },
        platforms: [
            // Suelo
            { x: 0, y: 550, width: 800, height: 50, type: 'static' },
            // Plataformas simples
            { x: 150, y: 450, width: 150, height: 20, type: 'static' },
            { x: 400, y: 380, width: 150, height: 20, type: 'static' },
            { x: 650, y: 300, width: 150, height: 20, type: 'static' },
            // Meta
            { x: 700, y: 250, width: 60, height: 20, type: 'goal' }
        ],
        items: [
            { x: 180, y: 420, type: 'seed', collected: false },
            { x: 430, y: 350, type: 'seed', collected: false },
            { x: 680, y: 270, type: 'seed', collected: false }
        ],
        enemies: [],
        description: 'Salta a través de las plataformas'
    },

    // Nivel 2: Plataformas móviles
    {
        number: 2,
        name: 'Plataformas móviles',
        playerStart: { x: 50, y: 500 },
        platforms: [
            // Suelo
            { x: 0, y: 550, width: 800, height: 50, type: 'static' },
            // Plataformas estáticas
            { x: 150, y: 450, width: 120, height: 20, type: 'static' },
            // Plataformas móviles
            {
                x: 350,
                y: 380,
                width: 120,
                height: 20,
                type: 'moving',
                moveX: true,
                moveY: false,
                minX: 300,
                maxX: 450,
                speed: 2
            },
            {
                x: 550,
                y: 300,
                width: 120,
                height: 20,
                type: 'moving',
                moveX: false,
                moveY: true,
                minY: 250,
                maxY: 350,
                speed: 1.5
            },
            // Meta
            { x: 700, y: 220, width: 60, height: 20, type: 'goal' }
        ],
        items: [
            { x: 180, y: 420, type: 'seed', collected: false },
            { x: 410, y: 350, type: 'seed', collected: false },
            { x: 610, y: 270, type: 'seed', collected: false }
        ],
        enemies: [],
        description: 'Cuidado con las plataformas móviles'
    },

    // Nivel 3: Con enemigos
    {
        number: 3,
        name: 'Invasión de Tostadoras',
        playerStart: { x: 50, y: 500 },
        platforms: [
            // Suelo
            { x: 0, y: 550, width: 800, height: 50, type: 'static' },
            // Plataformas
            { x: 150, y: 450, width: 100, height: 20, type: 'static' },
            { x: 300, y: 380, width: 100, height: 20, type: 'static' },
            { x: 450, y: 310, width: 100, height: 20, type: 'static' },
            { x: 600, y: 240, width: 100, height: 20, type: 'static' },
            // Meta
            { x: 680, y: 190, width: 80, height: 20, type: 'goal' }
        ],
        items: [
            { x: 200, y: 420, type: 'seed', collected: false },
            { x: 350, y: 350, type: 'seed', collected: false },
            { x: 500, y: 280, type: 'seed', collected: false }
        ],
        enemies: [
            { x: 200, y: 400, direction: 1 },
            { x: 500, y: 300, direction: -1 }
        ],
        description: '¡Evita a las tostadoras!'
    }
];

/**
 * Obtiene un nivel por número
 * @param {number} levelNumber - Número de nivel (1-indexed)
 * @returns {Object} Datos del nivel
 */
function getLevel(levelNumber) {
    if (levelNumber > 0 && levelNumber <= Levels.length) {
        return Levels[levelNumber - 1];
    }
    return null;
}

/**
 * Obtiene el número total de niveles
 * @returns {number}
 */
function getTotalLevels() {
    return Levels.length;
}
