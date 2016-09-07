package fr.softeam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.softeam.domain.Question;


@SuppressWarnings("unused")
//public interface ExtQuestionRepository  extends QuestionRepository {
public interface ExtQuestionRepository extends JpaRepository<Question,Long> {
	
	List<Question> findByQuestionnaireId(Long questionnaireId);
}
