package fr.softeam.repository;

import fr.softeam.domain.Question;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Question entity.
 */
@SuppressWarnings("unused")
public interface QuestionRepository extends JpaRepository<Question,Long> {
	/**
	 * Recherche de la liste des questions par l'identifiant du questionnaire.
	 * 
	 * <pre>
	 * NB: Le nom de la fonction doit respecter la règle de nommage "JPA NamedQueries".
	 * http://docs.spring.io/spring-data/jpa/docs/1.4.3.RELEASE/reference/html/jpa.repositories.html
	 * </pre>
	 * 
	 * @param id Identifiant du questionnaire
	 * @return Liste des questions du questionnaire
	 */
	List<Question> findByQuestionnaireId(Long questionnaireId);
	
}
