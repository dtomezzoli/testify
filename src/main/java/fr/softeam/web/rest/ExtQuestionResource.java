package fr.softeam.web.rest;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import fr.softeam.domain.Question;
import fr.softeam.repository.ExtQuestionRepository;
import fr.softeam.repository.QuestionRepository;

@RestController
@RequestMapping("/api")
public class ExtQuestionResource {
	private final Logger log = LoggerFactory.getLogger(ExtQuestionResource.class);
    
    @Inject
    private ExtQuestionRepository questionRepository;
    
    /**
     * GET  /questions/questionnaire/:id : get all the question from "id" questionnaire.
     *
     * @param id the id of the question to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the question, or with status 404 (Not Found)
     * "/questions/questionnaire/{id}"
     */
    @RequestMapping(value = "/questions/questionnaire/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Question> getAllQuestionsByQuestionnaireId(@PathVariable Long id) {
        log.debug("REST extended request to get Question by Questionnaire Id : {}", id);
       
        List<Question> questions = questionRepository.findByQuestionnaireId(id);
        return questions;
    }	
}
