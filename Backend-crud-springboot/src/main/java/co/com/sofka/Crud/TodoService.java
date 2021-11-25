package co.com.sofka.Crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    // La clase servicio controla los métodos de la clase repository

    @Autowired
    private TodoRepository repository;

    public Iterable<Todo> list(){
        return repository.findAll();
    }

    public Todo save(Todo todo){
        return repository.save(todo);
    }

    public void delete(Long id){
        repository.delete(get(id));
    }

    public Todo get(Long id){
        return repository.findById(id).orElseThrow();
    }
}

