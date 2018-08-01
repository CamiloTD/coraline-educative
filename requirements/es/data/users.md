
## Sistema de Usuarios

### Identificación de Usuarios
Coraline-Educative debe implementar un sistema de inicio de sesión de usuarios que cumpla los siguientes objetivos:

 - [ ] Identificar al usuario del sistema por su usuario y contraseña
 - [ ] Diferenciar funcionalidades de acuerdo al rol del usuario, pudiendo éste ser:
	 - [ ] **Administrador:** Es el responsable de administrar el sistema en general, debe ser capaz de:
		 - [ ] Instalar y Eliminar Coralines
		 - [ ] Crear y Eliminar Usuarios
		 - [ ] Leer las estadísticas de cada Usuario
	 - [ ] **Aprendiz:** Es el actor mas importante del sistema, debe ser capaz de:
		 - [ ] Unirse y retirarse de los Coraline
		 - [ ] Acceder a sus notas y estadísticas personales:
			 - [ ] Notas
			 - [ ] Actividad
			 - [ ] Puntuación 
	 - [ ] **Docente:** Encargado del aula, debe ser capaz de:
		 - [ ] Iniciar y configurar los Coraline
		 - [ ]  Administrar el [sistema de notas](https://github.com/CamiloTD/coraline-educative/blob/master/requirements/es/data/academic-notes.md) de su área
		 - [ ] Acceder a sus estadísticas personales