package fr.softeam.repository;

import fr.softeam.domain.Evaluation;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Evaluation entity.
 */
@SuppressWarnings("unused")
public interface EvaluationRepository extends JpaRepository<Evaluation,Long> {

    @Query("select evaluation from Evaluation evaluation where evaluation.candidat.login = ?#{principal.username}")
    List<Evaluation> findByCandidatIsCurrentUser();

    @Query("select distinct evaluation from Evaluation evaluation left join fetch evaluation.reponses")
    List<Evaluation> findAllWithEagerRelationships();

    @Query("select evaluation from Evaluation evaluation left join fetch evaluation.reponses where evaluation.id =:id")
    Evaluation findOneWithEagerRelationships(@Param("id") Long id);

}
