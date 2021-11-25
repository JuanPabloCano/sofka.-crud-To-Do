package co.com.sofka.Crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Anotación para unir el front y el back en el mismo puerto
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "api/todos") // Anotación que devuelve todos los datos
    public Iterable<Todo> list() {
        return service.list();
    }

    @PostMapping(value = "api/todo") // Anotación que guarda todos los datos
    public Todo save(@RequestBody Todo todo) {
        return service.save(todo);
    }

    @PutMapping(value = "api/todo") // Anotación que actualiza los datos
    public Todo update(@RequestBody Todo todo){
        if (todo.getId() != null){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todo") // Anotación que elimina los datos por su Id
    public void delete(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo") // Anotación que devuelve todos los datos por su Id
    public Todo get(@PathVariable("id") Long id) {
        return service.get(id);
    }
}