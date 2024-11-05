# Tu Amigo Íntimo

**Tu Amigo Íntimo** es una aplicación web gratuita impulsada por IA diseñada para brindar asistencia emocional a personas que enfrentan situaciones difíciles. Actúa como un compañero comprensivo, ayudando a los usuarios a gestionar y expresar sus emociones de manera segura y constructiva.

---

## Índice

1. [Requisitos Funcionales](#requisitos-funcionales)
2. [Requisitos No Funcionales](#requisitos-no-funcionales)
3. [Documentación del Proyecto](#documentación-del-proyecto)
   1. [Introducción](#introducción)
   2. [Arquitectura del Sistema](#arquitectura-del-sistema)
   3. [Casos de Uso](#casos-de-uso)
   4. [Flujo de Interacción del Usuario](#flujo-de-interacción-del-usuario)
4. [Desarrollo y Prototipo](#desarrollo-y-prototipo)
5. [Pruebas](#pruebas)
6. [Plan de Lanzamiento](#plan-de-lanzamiento)
7. [Contribuciones](#contribuciones)
8. [Licencia](#licencia)
9. [Creador](#creador)

---

## Requisitos Funcionales

1. **Registro de usuarios**:
   - Sistema de registro y autenticación de usuarios (con email/contraseña y autenticación segura).
   - Opción de perfiles anónimos para mantener la privacidad.

2. **Asistente de apoyo emocional (IA)**:
   - Chat interactivo impulsado por IA para asistir al usuario en tiempo real.
   - Personalización del diálogo para abordar distintos estados emocionales como tristeza, frustración, confusión, entre otros.
   - Capacidad para sugerir ejercicios de mindfulness, meditación, o reflexiones diarias.
   - Respuestas compasivas y sin juicios que guíen al usuario a través de sus emociones de manera segura.

3. **Gestión de emociones y seguimiento**:
   - Diario emocional para registrar emociones y pensamientos.
   - Seguimiento del progreso emocional y recomendaciones personalizadas basadas en la interacción.
   - Sugerencias de contenido o actividades según el estado emocional registrado.

4. **Lista de metas y objetivos emocionales**:
   - Herramienta para establecer metas emocionales (como mejorar la autoestima, controlar la ansiedad, etc.).
   - Sistema de seguimiento para ver el avance en cada meta.

5. **Actividades adicionales**:
   - Minijuegos con mensajes de apoyo según los niveles completados, cada uno representando una emoción o etapa emocional.
   - Actividades para mejorar el bienestar, como ejercicios de respiración y afirmaciones.

6. **Panel de configuración**:
   - Personalización del asistente (tono de las respuestas, frecuencia de notificaciones, recordatorios).
   - Configuración de privacidad para garantizar la seguridad de los datos.

---

## Requisitos No Funcionales

1. **Escalabilidad**:
   - La aplicación debe soportar múltiples usuarios simultáneamente sin afectar el rendimiento.

2. **Seguridad y privacidad**:
   - Almacenamiento seguro de datos personales y confidenciales.
   - Cumplimiento de normas de privacidad (como RGPD, si se planea expandir fuera de Colombia).

3. **Rendimiento**:
   - La aplicación debe ser rápida y sin demoras en la interacción con la IA.

4. **Accesibilidad**:
   - Diseño inclusivo para personas con discapacidades, asegurando el acceso a todas las funciones.

5. **Compatibilidad y Responsividad**:
   - Compatible en múltiples dispositivos (web, móvil).
   - Diseño responsivo para adaptarse a diferentes tamaños de pantalla.

---

## Documentación del Proyecto

### Introducción

- **Nombre del Proyecto**: Tu Amigo Íntimo
- **Descripción**: Una aplicación impulsada por IA que proporciona apoyo emocional a las personas, ayudándolas a gestionar sus emociones de manera constructiva y sin juicio.
- **Objetivo**: Crear un espacio seguro donde los usuarios puedan compartir y manejar sus emociones sin miedo a ser juzgados ni dañar a otros.

### Arquitectura del Sistema

1. **Frontend**:
   - **Framework**: React para la interfaz de usuario.
   - **Librerías**:
     - SVG y Canvas para visualización gráfica.
     - Three.js para crear minijuegos 3D representativos de emociones.
   - **Estilos**: Tailwind CSS o CSS-in-JS (styled-components).

2. **Backend**:
   - **Lenguaje**: Node.js con Express.
   - **API de IA**: Integración con OpenAI para interacción emocional personalizada.

3. **Base de Datos**:
   - **MongoDB** o **Firebase** para el almacenamiento de datos de usuarios y su progreso.

4. **Autenticación y Seguridad**:
   - **JWT** para autenticación segura.
   - **HTTPS y cifrado** para garantizar la privacidad de los datos.

### Casos de Uso

1. **Interacción con el asistente**:
   - El usuario inicia una conversación con la IA, que responde de acuerdo con el estado emocional del usuario.

2. **Registro de emociones y diario**:
   - El usuario registra sus emociones y pensamientos, recibiendo recomendaciones basadas en estos.

3. **Gestión de metas emocionales**:
   - El usuario establece y sigue sus objetivos emocionales con el apoyo de la IA.

4. **Minijuego de emociones**:
   - El usuario juega niveles que representan distintas emociones y recibe mensajes de apoyo.

### Flujo de Interacción del Usuario

1. **Inicio de sesión o registro**: El usuario se registra o entra de manera anónima.
2. **Interacción con la IA**: La IA responde basándose en las entradas emocionales del usuario.
3. **Acceso a herramientas emocionales**: El usuario consulta su diario emocional, actividades y minijuegos.
4. **Revisión del progreso**: El usuario revisa sus metas y el estado de su bienestar emocional.

---

## Desarrollo y Prototipo

1. **Fase 1**: Diseño de la interfaz y creación de las funcionalidades básicas del chat con IA.
2. **Fase 2**: Implementación del sistema de registro de emociones y diario emocional.
3. **Fase 3**: Desarrollo de minijuegos y personalización del asistente.
4. **Fase 4**: Integración de funcionalidades adicionales y optimización del rendimiento.

---

## Pruebas

- **Pruebas unitarias**: Verificar el funcionamiento de módulos individuales.
- **Pruebas de integración**: Asegurar que todos los componentes trabajen correctamente en conjunto.
- **Pruebas de usabilidad**: Con usuarios beta para asegurar la facilidad de uso y efectividad de la aplicación.

---

## Plan de Lanzamiento

1. **Versión Beta**: Lanzamiento para un grupo reducido de usuarios con feedback para optimizar funciones.
2. **Lanzamiento Completo**: Publicación abierta al público con soporte técnico y mejoras continuas basadas en la retroalimentación de los usuarios.

---

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama para tu contribución.
3. Realiza los cambios y asegúrate de que todos los tests pasen.
4. Abre un pull request describiendo los cambios realizados.

---

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## Creador

Este proyecto fue creado por **DevCat**. Puedes seguirme en [GitHub](https://github.com/DevCat) para ver otros proyectos y contribuciones.
