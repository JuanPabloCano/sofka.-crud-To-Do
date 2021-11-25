package co.com.sofka.Crud;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter //Getters y Setters de la libreria Lombok para evitar el código repetitivo
public class Todo {

    // Se crean las variables para los datos necesarios con su respectivo encapsulamiento
    @Id
    @GeneratedValue  //Genera automáticamente el valor del Id
    private Long id;
    private String name;
    private boolean isCompleted;
}
