package fr.softeam.repository;

import fr.softeam.domain.Candidat;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Candidat entity.
 */
@SuppressWarnings("unused")
public interface CandidatRepository extends JpaRepository<Candidat,Long> {

}
