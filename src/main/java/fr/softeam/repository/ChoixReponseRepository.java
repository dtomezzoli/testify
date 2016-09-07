package fr.softeam.repository;

import fr.softeam.domain.ChoixReponse;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ChoixReponse entity.
 */
@SuppressWarnings("unused")
public interface ChoixReponseRepository extends JpaRepository<ChoixReponse,Long> {

}
