package fr.softeam.repository;

import fr.softeam.domain.Question;
import fr.softeam.domain.Reponse;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Reponse entity.
 */
@SuppressWarnings("unused")
public interface ReponseRepository extends JpaRepository<Reponse,Long> {

	/**
	 * Recherche de la liste des reponses par l'identifiant de la question.
	 * 
	 * <pre>
	 * NB: Le nom de la fonction doit respecter la règle de nommage "JPA NamedQueries".
	 * http://docs.spring.io/spring-data/jpa/docs/1.4.3.RELEASE/reference/html/jpa.repositories.html
	 * </pre>
	 * 
	 * @param id Identifiant de la question
	 * @return Liste des réponses de la question
	 */
	List<Reponse> findByQuestionId(Long questionId);
}
