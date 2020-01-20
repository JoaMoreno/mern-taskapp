# mern-taskapp
### Screenshot
![Screenshot_116](https://user-images.githubusercontent.com/57602106/72226781-a8ef7d00-3573-11ea-9827-003b41aadcb0.png)
### Frontend
> BUGS:
- [ ] **`BUG`** Al eliminar queda el nombre del proyecto anterior
- [x] `FIXED` Responsive TaskList
  - [ ] **`BUG`** overflow generado por la taskList en panel izquierdo
- [x] `FIXED` Conseguir el project_id desde PROPS onMount / error no id create task
- [x] `FIXED` !!Optimizar!! onChangeProjectName esta actualizando TasksList
- [x] `FIXED` EL Subtask Tiene que estar dentro de Tasks
- [x] `FIXED` !!Optimizar!! Crear en routes.js get only one !! / getTasks() / else {}

> TAREAS:
- [x] `DONE` Completar boton add Task
- [x] `DONE` Completar boton add SubTask
- [x] `DONE` Funcionalidad toggle class circle-done/danger/none / Task status
  - [x] `DONE` Funcionalidad Status toggle Complete/incomplete / Task
  - [x] `DONE` Funcionalidad checkbox / Subtask
- [ ] Agregar plugin add Date (fechas limites)
- [ ] Funcionalidad set state / CreatedAt
- [x] `DONE` Funcionalidad deleteTask & deleteSubTask
- [ ] Method PUT subtask
- [ ] Add PUT method to statusTask()

### Backend
> TAREAS:
- [ ] Agregar la peticion PUT para guardar el estado en statusTask()
### In design
![preview-taskapp](https://user-images.githubusercontent.com/57602106/72286199-6b4a2d00-3623-11ea-8783-a693f67cc89d.jpg)
