package fr.softeam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.softeam.domain.Reponse;

public interface ExtReponseRepository extends JpaRepository<Reponse, Long>{
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
