package co.com.sofka.Crud;

import org.springframework.data.repository.CrudRepository;

public interface TodoRepository extends CrudRepository <Todo, Long> {

    /* Interfaz para el manejo del crud de la aplicación */

}
