package fr.softeam.repository;

import fr.softeam.domain.Evaluation;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Evaluation entity.
 */
@SuppressWarnings("unused")
public interface EvaluationRepository extends JpaRepository<Evaluation,Long> {

    @Query("select evaluation from Evaluation evaluation where evaluation.candidat.login = ?#{principal.username}")
    List<Evaluation> findByCandidatIsCurrentUser();

}
