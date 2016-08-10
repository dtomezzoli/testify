package fr.softeam.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.softeam.domain.Questionnaire;
import fr.softeam.repository.QuestionnaireRepository;
import fr.softeam.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Questionnaire.
 */
@RestController
@RequestMapping("/api")
public class QuestionnaireResource {

    private final Logger log = LoggerFactory.getLogger(QuestionnaireResource.class);
        
    @Inject
    private QuestionnaireRepository questionnaireRepository;
    
    /**
     * POST  /questionnaires : Create a new questionnaire.
     *
     * @param questionnaire the questionnaire to create
     * @return the ResponseEntity with status 201 (Created) and with body the new questionnaire, or with status 400 (Bad Request) if the questionnaire has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/questionnaires",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Questionnaire> createQuestionnaire(@Valid @RequestBody Questionnaire questionnaire) throws URISyntaxException {
        log.debug("REST request to save Questionnaire : {}", questionnaire);
        if (questionnaire.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("questionnaire", "idexists", "A new questionnaire cannot already have an ID")).body(null);
        }
        Questionnaire result = questionnaireRepository.save(questionnaire);
        return ResponseEntity.created(new URI("/api/questionnaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("questionnaire", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /questionnaires : Updates an existing questionnaire.
     *
     * @param questionnaire the questionnaire to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated questionnaire,
     * or with status 400 (Bad Request) if the questionnaire is not valid,
     * or with status 500 (Internal Server Error) if the questionnaire couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/questionnaires",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Questionnaire> updateQuestionnaire(@Valid @RequestBody Questionnaire questionnaire) throws URISyntaxException {
        log.debug("REST request to update Questionnaire : {}", questionnaire);
        if (questionnaire.getId() == null) {
            return createQuestionnaire(questionnaire);
        }
        Questionnaire result = questionnaireRepository.save(questionnaire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("questionnaire", questionnaire.getId().toString()))
            .body(result);
    }

    /**
     * GET  /questionnaires : get all the questionnaires.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of questionnaires in body
     */
    @RequestMapping(value = "/questionnaires",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Questionnaire> getAllQuestionnaires() {
        log.debug("REST request to get all Questionnaires");
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        return questionnaires;
    }

    /**
     * GET  /questionnaires/:id : get the "id" questionnaire.
     *
     * @param id the id of the questionnaire to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the questionnaire, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/questionnaires/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Questionnaire> getQuestionnaire(@PathVariable Long id) {
        log.debug("REST request to get Questionnaire : {}", id);
        Questionnaire questionnaire = questionnaireRepository.findOne(id);
        return Optional.ofNullable(questionnaire)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /questionnaires/:id : delete the "id" questionnaire.
     *
     * @param id the id of the questionnaire to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/questionnaires/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteQuestionnaire(@PathVariable Long id) {
        log.debug("REST request to delete Questionnaire : {}", id);
        questionnaireRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("questionnaire", id.toString())).build();
    }

}
