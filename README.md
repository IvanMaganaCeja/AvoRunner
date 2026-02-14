# 🥑 AvoRunner - 2D Platformer Game

¡Bienvenido a AvoRunner! Un juego de plataformas 2D donde controlas a Avo, un adorable aguacate, para superar desafiantes niveles, recolectar semillas y derrotar a las tostadoras.

## 📋 Descripción

AvoRunner es un juego de plataformas estilo retro desarrollado con HTML5, CSS y JavaScript puro. Sin frameworks, sin dependencias externas, solo código limpio y funcional.

### Características Principales

✨ **3 Niveles Progresivos**
- Nivel 1: Tutorial con plataformas simples
- Nivel 2: Plataformas móviles desafiantes
- Nivel 3: ¡Invasión de Tostadoras!

🎮 **Mecánicas de Juego**
- Movimiento y salto con física realista
- Colisión AABB (colisión de rectángulos)
- Plataformas estáticas y móviles
- Sistema de recolección de items
- Enemigos inteligentes con IA
- Sistema de vidas (3 vidas por intento)

🎨 **Diseño Visual**
- Estilo pixel-art simple
- Colores vivos y temática de frutas
- Animaciones suaves
- Interfaz intuitiva

🔊 **Audio**
- Efectos de sonido mediante Web Audio API
- Sonido al saltar, recolectar items y completar niveles

## 🎮 Controles

| Acción | Tecla |
|--------|-------|
| Mover Izquierda | `A` |
| Mover Derecha | `D` |
| Saltar | `ESPACIO` |

## 🚀 Cómo Ejecutarlo

### Opción 1: Localmente

1. Clona el repositorio:
```bash
git clone https://github.com/IvanMaganaCeja/avo-runner.git
cd avo-runner
```

2. Abre `index.html` en tu navegador:
```bash
# En macOS
open index.html

# En Linux
xdg-open index.html

# O simplemente arrastra el archivo al navegador
```

### Opción 2: GitHub Pages

1. Habilita GitHub Pages en los settings del repositorio
2. Selecciona `main` como rama de publicación
3. Accede a: `https://tu-usuario.github.io/avo-runner`

## 📁 Estructura del Proyecto

```
avo-runner/
├── index.html              # Archivo HTML principal
├── style.css               # Estilos CSS
├── README.md               # Este archivo
├── js/
│   ├── main.js            # Game loop y controlador principal
│   ├── player.js          # Lógica del jugador (Avo)
│   ├── enemy.js           # Lógica de enemigos
│   ├── level.js           # Definición de niveles
│   └── physics.js         # Motor de física
└── assets/
    ├── sprites/           # Gráficos (futuros)
    └── sounds/            # Archivos de audio (futuros)
```

## 🎯 Objetivos del Juego

1. **Superar Plataformas**: Salta entre plataformas para llegar a la meta
2. **Recolectar Semillas** (🌱): Cada semilla = +100 puntos
3. **Evitar Enemigos**: ¡Las tostadoras disparan pan!
4. **Alcanzar la Meta**: Llega a la bandera para completar el nivel

## 🕹️ Mecánicas Detalladas

### Física del Jugador
- **Gravedad**: 0.6 px/frame²
- **Velocidad de Salto**: -12 px/frame
- **Velocidad Máxima**: 8 px/frame
- **Fricción**: 0.85 (ralentización suave)

### Enemigos (Tostadoras)
- Patrullan horizontalmente
- Disparan proyectiles de pan cada 60 frames
- Cambian dirección al llegar a los bordes
- Contacto = perder una vida

### Niveles

#### Nivel 1: Tutorial
- Plataformas sencillas
- Sin enemigos
- Ideal para aprender los controles

#### Nivel 2: Plataformas Móviles
- Plataformas que se mueven horizontal y verticalmente
- Mayor dificultad de timing
- Sin enemigos

#### Nivel 3: Invasión de Tostadoras
- Enemigos activos disparando
- Plataformas variadas
- Máximo desafío

## 💻 Tecnologías

- **HTML5**: Estructura y Canvas API
- **CSS3**: Estilos y animaciones
- **JavaScript (ES6+)**: Lógica del juego
- **Web Audio API**: Efectos de sonido

## 📝 Ejemplos de Código

### Crear un Enemigo
```javascript
const enemy = Enemy.create(200, 400, 1);
// Crea una tostadora en posición (200, 400) moviéndose a la derecha
```

### Definir un Nivel
```javascript
{
    platforms: [
        { x: 0, y: 550, width: 800, height: 50, type: 'static' },
        { x: 150, y: 450, width: 150, height: 20, type: 'static' }
    ],
    items: [
        { x: 180, y: 420, type: 'seed', collected: false }
    ],
    enemies: [
        { x: 200, y: 400, direction: 1 }
    ]
}
```

## 🎨 Personalización

### Cambiar Colores

En `js/player.js`:
```javascript
ctx.fillStyle = '#6B8E23'; // Color del cuerpo
ctx.fillStyle = '#7BA825'; // Color de la cabeza
```

En `js/enemy.js`:
```javascript
ctx.fillStyle = '#8B4513'; // Color de la tostadora
```

### Ajustar Dificultad

En `js/physics.js`:
```javascript
gravity: 0.6,        // Aumenta para más peso
friction: 0.85       // Disminuye para más deslizamiento
```

En `js/player.js`:
```javascript
jumpPower: 12,       // Aumenta para saltos más altos
speed: 5             // Velocidad de movimiento
```

## 📸 Capturas de Pantalla

### Menú Principal
```
┌──────────────────────────────────┐
│                                  │
│    🥑 AvoRunner 🥑              │
│  ¡Ayuda a Avo a superar         │
│   todos los niveles!            │
│                                  │
│  [Comenzar Juego] [Controles]   │
│                                  │
└──────────────────────────────────┘
```

### Pantalla de Juego
```
Nivel: 1 | Puntos: 0 | Vidas: ❤️❤️❤️
┌──────────────────────────────────┐
│    🌱                       🚩    │
│                                  │
│      ┌─────────┐   ┌─────┐      │
│      │         │   │     │      │
│  ┌───┤   🥑    ├───┤     ├──┐   │
│  │   │         │   │     │  │   │
│  │   └─────────┘   └─────┘  │   │
│  │ ╭─────╮              ╭────╯   │
│  │ │ ⚡⚡ │              │        │
│  │ ╰─────╯              │        │
│  └──────────────────────┘        │
└──────────────────────────────────┘
```

## 🐛 Debugging

Para ver hitboxes (colisiones), edita `js/player.js`:
```javascript
if (false) {  // Cambia a true para ver hitboxes
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para reportar bugs o sugerir mejoras:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Añade mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📖 Ideas Futuras

- 🎵 Música de fondo
- 🎨 Más niveles y enemigos variados
- 💾 Sistema de guardado de progreso
- 📱 Soporte para móviles (controles táctiles)
- 🏆 Tabla de puntuaciones global
- ✨ Efectos visuales mejorados
- 🎬 Cinemáticas y diálogos

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2024 Ivan Magana Ceja

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 🙏 Créditos

- **Desarrollador**: Ivan Magana Ceja
- **Inspiración**: Juegos clásicos de plataformas
- **Tecnología**: HTML5 Canvas, Web Audio API
- **Comunidad**: GitHub & Desarrollo Web

## 📞 Contacto

- GitHub: [@IvanMaganaCeja](https://github.com/IvanMaganaCeja)
- Email: navy@aliadohub.site

---

**¿Te gusta el juego? ⭐ Dale una estrella en GitHub!**

Hecho con ❤️ y mucho código limpio.

