package org.iesvdm.videoclub.repository;

import org.iesvdm.videoclub.domain.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    public Page<Categoria> findCategoriasByNombreContainingIgnoreCase(String nombreABuscar
            , Pageable pageable);

    @Query(value="select C from Categoria C where C.nombre like %?1%",
            countQuery = "select count(*) from Categoria C where C.nombre like %?1%"
    )
    public Page<Categoria> paginacionPorNombreContenido(String nombreABuscar, Pageable pageable);

}
