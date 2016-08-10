package fr.softeam.repository;

import fr.softeam.domain.Reponse;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Reponse entity.
 */
@SuppressWarnings("unused")
public interface ReponseRepository extends JpaRepository<Reponse,Long> {

}
