package fr.softeam.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.softeam.domain.Evaluation;
import fr.softeam.repository.EvaluationRepository;
import fr.softeam.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Evaluation.
 */
@RestController
@RequestMapping("/api")
public class EvaluationResource {

    private final Logger log = LoggerFactory.getLogger(EvaluationResource.class);
        
    @Inject
    private EvaluationRepository evaluationRepository;
    
    /**
     * POST  /evaluations : Create a new evaluation.
     *
     * @param evaluation the evaluation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluation, or with status 400 (Bad Request) if the evaluation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/evaluations",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Evaluation> createEvaluation(@RequestBody Evaluation evaluation) throws URISyntaxException {
        log.debug("REST request to save Evaluation : {}", evaluation);
        if (evaluation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("evaluation", "idexists", "A new evaluation cannot already have an ID")).body(null);
        }
        Evaluation result = evaluationRepository.save(evaluation);
        return ResponseEntity.created(new URI("/api/evaluations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("evaluation", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluations : Updates an existing evaluation.
     *
     * @param evaluation the evaluation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluation,
     * or with status 400 (Bad Request) if the evaluation is not valid,
     * or with status 500 (Internal Server Error) if the evaluation couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/evaluations",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Evaluation> updateEvaluation(@RequestBody Evaluation evaluation) throws URISyntaxException {
        log.debug("REST request to update Evaluation : {}", evaluation);
        if (evaluation.getId() == null) {
            return createEvaluation(evaluation);
        }
        Evaluation result = evaluationRepository.save(evaluation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("evaluation", evaluation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluations : get all the evaluations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of evaluations in body
     */
    @RequestMapping(value = "/evaluations",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Evaluation> getAllEvaluations() {
        log.debug("REST request to get all Evaluations");
        List<Evaluation> evaluations = evaluationRepository.findAll();
        return evaluations;
    }

    /**
     * GET  /evaluations/:id : get the "id" evaluation.
     *
     * @param id the id of the evaluation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluation, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/evaluations/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Evaluation> getEvaluation(@PathVariable Long id) {
        log.debug("REST request to get Evaluation : {}", id);
        Evaluation evaluation = evaluationRepository.findOne(id);
        return Optional.ofNullable(evaluation)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /evaluations/:id : delete the "id" evaluation.
     *
     * @param id the id of the evaluation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/evaluations/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        log.debug("REST request to delete Evaluation : {}", id);
        evaluationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("evaluation", id.toString())).build();
    }

}
