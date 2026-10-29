/*
 * Datos centralizados del portafolio.
 * Las rutas de imágenes son relativas a index.html y se mantienen separadas por proyecto.
 */
window.PORTFOLIO_PROJECTS = [
  {
    id: "taskflow",
    number: "01",
    category: "BACKEND · API REST",
    title: "TaskFlow — Plataforma de Gestión de Tareas",
    shortDescription: "Aplicación web para gestionar tareas personales mediante una API REST, persistencia en PostgreSQL y una interfaz web conectada al backend.",
    description: "TaskFlow permite organizar tareas personales con operaciones CRUD. El backend está desarrollado con FastAPI y PostgreSQL, y el frontend utiliza HTML, CSS y JavaScript. Docker Compose permite ejecutar los servicios en contenedores.",
    cover: "assets/img/projects/taskflow/cover.png",
    coverAlt: "Pantalla principal de TaskFlow, plataforma de gestión de tareas",
    repository: "https://github.com/overrun1026/ProyectoApiDeTareasPersonales",
    demo: "",
    stack: ["Python", "FastAPI", "REST API", "PostgreSQL", "Docker", "Docker Compose", "HTML5", "CSS3", "JavaScript", "pytest"],
    features: ["Crear, consultar, actualizar y eliminar tareas", "API REST documentada mediante OpenAPI", "Persistencia de datos en PostgreSQL", "Frontend conectado a la API", "Servicios ejecutados con Docker Compose", "Pruebas automatizadas con pytest"],
    architecture: "Frontend web → API REST con FastAPI → PostgreSQL. Docker Compose permite levantar los servicios del proyecto en un entorno reproducible.",
    images: [
      {src:"assets/img/projects/taskflow/dashboard.png",alt:"Panel principal de TaskFlow",caption:"Panel principal"},
      {src:"assets/img/projects/taskflow/listado-tareas.png",alt:"Listado y organización de tareas",caption:"Listado de tareas"},
      {src:"assets/img/projects/taskflow/crear-tarea.png",alt:"Formulario para crear o editar una tarea",caption:"Crear y editar tareas"},
      {src:"assets/img/projects/taskflow/resumen-tareas.png",alt:"Resumen de tareas por estado",caption:"Resumen de tareas"}
    ]
  },
  {
    id: "inventario",
    number: "02",
    category: "APLICACIÓN WEB · DOCKER",
    title: "Sistema de inventario con Docker Compose",
    shortDescription: "Aplicación web de inventario con backend en Python, base de datos PostgreSQL y servicios organizados para ejecutarse mediante Docker Compose.",
    description: "Sistema web para administrar información de inventario desde una interfaz conectada a un backend Python. PostgreSQL almacena los datos y Docker Compose coordina los servicios de la aplicación.",
    cover: "assets/img/projects/inventario/cover.png",
    coverAlt: "Pantalla principal del sistema de inventario",
    repository: "https://github.com/overrun1026/App-Inventario-DockerCompose",
    demo: "",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQL", "HTML5", "CSS3", "JavaScript", "Docker", "Docker Compose", "GitHub Actions"],
    features: ["Gestión de registros de inventario", "Persistencia en PostgreSQL", "Interfaz web conectada al backend", "Servicios configurados con Docker Compose", "Volumen persistente para la base de datos", "Flujo de construcción de imagen con GitHub Actions"],
    architecture: "Interfaz web → backend Python/FastAPI → PostgreSQL. Docker Compose define los servicios y la persistencia de la base de datos.",
    images: [
      {src:"assets/img/projects/inventario/listado-inventario.png",alt:"Listado de elementos del inventario",caption:"Listado de inventario"},
      {src:"assets/img/projects/inventario/crear-producto.png",alt:"Formulario de creación de un elemento",caption:"Crear producto"},
      {src:"assets/img/projects/inventario/editar-producto.png",alt:"Formulario para editar un elemento",caption:"Editar producto"},
      {src:"assets/img/projects/inventario/base-datos.png",alt:"Vista o configuración de la base de datos",caption:"Persistencia de datos"},
      {src:"assets/img/projects/inventario/docker-servicios.png",alt:"Servicios del proyecto ejecutándose en contenedores",caption:"Eliminar Tarea"}
    ]
  },
  {
    id: "helpdesk",
    number: "03",
    category: "BACKEND · NODE.JS",
    title: "HelpDesk — Sistema de Gestión de Tickets",
    shortDescription: "Sistema de soporte técnico para gestionar tickets, usuarios, categorías, comentarios y notificaciones, con autenticación y permisos por roles.",
    description: "HelpDesk organiza solicitudes de soporte técnico y su seguimiento. El backend está construido con Node.js y Express, usa PostgreSQL y separa rutas, controladores, servicios y repositorios. Incluye autenticación JWT, autorización por roles, validación de solicitudes y documentación OpenAPI.",
    cover: "assets/img/projects/helpdesk/cover.png",
    coverAlt: "Pantalla principal de HelpDesk, sistema de gestión de tickets",
    repository: "https://github.com/overrun1026/ProyectoGestorDeTickets",
    demo: "",
    stack: ["Node.js", "Express", "REST API", "PostgreSQL", "JWT", "bcryptjs", "RBAC", "OpenAPI", "Docker", "Docker Compose", "Nginx"],
    features: ["Registro, inicio y cierre de sesión", "Autenticación mediante JWT", "Control de acceso por roles", "Creación y seguimiento de tickets", "Categorías y comentarios", "Historial y notificaciones", "Validación de solicitudes y paginación", "Servicios preparados con Docker Compose"],
    architecture: "Frontend web → API REST con Express → servicios y repositorios → PostgreSQL. Middleware dedicado aplica autenticación, autorización y validación de solicitudes.",
    images: [
      {src:"assets/img/projects/helpdesk/login.png",alt:"Pantalla de inicio de sesión de HelpDesk",caption:"Inicio de sesión"},
      {src:"assets/img/projects/helpdesk/dashboard.png",alt:"Panel principal de HelpDesk",caption:"Panel principal"},
      {src:"assets/img/projects/helpdesk/listado-tickets.png",alt:"Listado de tickets de soporte",caption:"Listado de tickets"},
      {src:"assets/img/projects/helpdesk/detalle-ticket.png",alt:"Detalle y estado de un ticket",caption:"Detalle del ticket"},
      {src:"assets/img/projects/helpdesk/comentarios.png",alt:"Comentarios asociados a un ticket",caption:"Comentarios"},
      {src:"assets/img/projects/helpdesk/notificaciones.png",alt:"Centro de notificaciones de HelpDesk",caption:"Notificaciones"},
      {src:"assets/img/projects/helpdesk/usuarios.png",alt:"Gestión de usuarios",caption:"Usuarios administrador"},
      {src:"assets/img/projects/helpdesk/categorias.png",alt:"Gestión de categorías de tickets",caption:"Categorías administrador"},
      {src:"assets/img/projects/helpdesk/historial-ticket.png",alt:"Historial de cambios de un ticket",caption:"Historial"},
      {src:"assets/img/projects/helpdesk/permisos-roles.png",alt:"Permisos y roles de acceso",caption:"Categorías usuarios"},
      {src:"assets/img/projects/helpdesk/docker-servicios.png",alt:"Servicios del sistema desplegados con Docker Compose",caption:"Resumen General"}
    ]
  },
  {
    id: "finora",
    number: "04",
    category: "BACKEND · FINANZAS PERSONALES",
    title: "Finora — Gestor de Finanzas Personales",
    shortDescription: "Aplicación para registrar ingresos y gastos, organizar presupuestos, definir metas de ahorro y consultar informes financieros.",
    description: "Finora ayuda a organizar las finanzas personales mediante módulos de transacciones, categorías, presupuestos, metas de ahorro e informes. La API está desarrollada con FastAPI, SQLAlchemy y PostgreSQL; Alembic gestiona las migraciones y Docker Compose coordina backend, base de datos y frontend.",
    cover: "assets/img/projects/finora/cover.png",
    coverAlt: "Panel principal de Finora, aplicación de finanzas personales",
    repository: "https://github.com/overrun1026/Proyecto-Finora-Finanzas",
    demo: "",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "HTML5", "CSS3", "JavaScript", "Nginx", "Docker", "Docker Compose", "Git", "GitHub"],
    features: ["Registro de ingresos y gastos", "Organización mediante categorías", "Administración de presupuestos", "Metas de ahorro", "Resumen financiero", "Informes mensuales y gastos por categoría", "Migraciones de base de datos con Alembic", "Servicios coordinados con Docker Compose"],
    architecture: "Frontend web servido con Nginx → API REST con FastAPI → capa de servicios y modelos SQLAlchemy → PostgreSQL. Alembic gestiona las migraciones de esquema.",
    images: [
      {src:"assets/img/projects/finora/dashboard.png",alt:"Dashboard financiero de Finora",caption:"Panel financiero"},
      {src:"assets/img/projects/finora/transacciones.png",alt:"Listado de transacciones financieras",caption:"Transacciones"},
      {src:"assets/img/projects/finora/categorias.png",alt:"Categorías de ingresos y gastos",caption:"Categorías"},
      {src:"assets/img/projects/finora/presupuestos.png",alt:"Gestión de presupuestos",caption:"Presupuestos"},
      {src:"assets/img/projects/finora/metas-ahorro.png",alt:"Metas de ahorro",caption:"Metas de ahorro"},
      {src:"assets/img/projects/finora/informes-mensuales.png",alt:"Informes mensuales de finanzas",caption:"Informes mensuales"},
      {src:"assets/img/projects/finora/gastos-categoria.png",alt:"Análisis de gastos por categoría",caption:"Creación de nueva meta de ahorro"},
      {src:"assets/img/projects/finora/resumen-financiero.png",alt:"Resumen financiero personal",caption:"Creación de nuevo presupuesto"},
      {src:"assets/img/projects/finora/docker-servicios.png",alt:"Servicios de Finora ejecutándose con Docker Compose",caption:"Creación de nueva transacción"}
    ]
  }
];
