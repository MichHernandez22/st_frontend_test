# Prueba Técnica - Desarrollador Frontend (React) 

Una aplicación moderna de gestión de usuarios construida con React, TypeScript y Pragmatic Drag & Drop que consume una API pública y permite gestionar usuarios de manera intuitiva.

## 🚀 Características Implementadas

### ✅ Requisitos Principales
- **Consumo de API pública** - Integración con Random User API
- **Estado Global** - Context API con TypeScript
- **Alta de nuevos usuarios** - Formulario completo con validación
- **Drag & Drop** - Entre listas usando Pragmatic Drag and Drop
- **Detalle del usuario** - Navegación con React Router

### 🎯 Puntos Extra Implementados
- **Persistencia local** - Los datos persisten al recargar la página
- **TypeScript** - Código completamente tipado
- **Mejoras de UX** - Loaders, animaciones, feedback visual, diseño responsive
- **Deployment** - Preparado para Vercel/Netlify

## 🛠 Tecnologías Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipado estático para mayor seguridad
- **React Router DOM** - Navegación entre páginas
- **Pragmatic Drag and Drop** - Librería moderna de drag & drop
- **Context API** - Estado global de la aplicación
- **CSS3** - Estilos modernos con Grid, Flexbox y animaciones
- **LocalStorage API** - Persistencia de datos local

## 📦 Estructura del Proyecto
src/
├── components/
│ ├── DragDropContainer/ # Componente de drag & drop
│ ├── UserCard/ # Tarjeta de usuario
│ ├── UserForm/ # Formulario de nuevo usuario
│ └── Loading/ # Componente de carga
├── contexts/
│ └── UserContext.tsx # Estado global con Context API
├── hooks/
│ └── useUsers.ts # Custom hook para consumir API
├── pages/
│ ├── Home/ # Página principal
│ └── UserDetail/ # Página de detalle
├── types/
│ └── index.ts # Definiciones TypeScript
└── styles/ # Estilos globales


## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos para ejecutar localmente

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/MichHernandez22/st_frontend_test.git
   cd st_frontend_test
   npm install
   npm run dev
   http://localhost:5173

Comandos Adicionales
# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Ejecutar linter (si está configurado)
npm run lint

🎮 Uso de la Aplicación

Gestión de Usuarios
Ver usuarios: Los usuarios cargan automáticamente desde la API
Agregar usuarios: Usa el formulario en la barra lateral
Organizar usuarios: Arrastra y suelta entre "Lista General" y "Grupo Seleccionado"
Ver detalles: Haz click en cualquier usuario para ver información completa

Características del Formulario
✅ Validación en tiempo real
✅ Campos obligatorios y opcionales
✅ Feedback visual al enviar
✅ Diseño responsive

Drag & Drop
✅ Arrastre intuitivo con feedback visual
✅ Persistencia automática de cambios
✅ Indicadores de zona de drop

🔧 Decisiones Técnicas
Estado Global: Context API vs Redux
Elección: Context API
Razón:
  Suficiente para la complejidad de esta aplicación
  Menos boilerplate que Redux
  Integración nativa con React
  Mejor para aplicaciones de tamaño medio

Drag & Drop: Pragmatic Drag and Drop vs React Beautiful DnD
Elección: Pragmatic Drag and Drop
Razón:
  Más moderno y con mayor soporte
  Mejor rendimiento
  API más limpia y directa
  Mejor soporte para React 18

TypeScript
Beneficios:
  Mayor seguridad en el desarrollo
  Mejor autocompletado
  Detección temprana de errores
  Código más mantenible

🎨 Características de UX/UI
Diseño Responsive
✅ Grid layouts flexibles

Estados de Interfaz
Error: Manejo elegante de errores
Éxito: Confirmaciones visuales
Vacío: Estados para listas vacías

Animaciones y Transiciones
✅ Transiciones suaves entre estados
✅ Animaciones de drag & drop
✅ Efectos hover y focus

Próximas Mejoras
Tests unitarios con Jest y React Testing Library
Tests de integración
CI/CD pipeline
Mobile-first approach

👨‍💻 Autor
<p>
  <strong>Ana Michelle Lopez Hernandez</strong><br>
  <a href="https://github.com/MichHernandez22" target="_blank">GitHub</a>
</p>

🔗 Enlaces
<p>
  <strong>Repositorio</strong><br>
  <a href="https://github.com/MichHernandez22/st_frontend_test.git" target="_blank">GitHub Repository</a>
</p>
<p>
  <strong>Demo</strong><br>
  <a href="https://st-frontend-test-red.vercel.app/" target="_blank">Live Demo</a>
</p>