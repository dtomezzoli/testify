package fr.softeam.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.softeam.domain.Reponse;
import fr.softeam.repository.ReponseRepository;
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
 * REST controller for managing Reponse.
 */
@RestController
@RequestMapping("/api")
public class ReponseResource {

    private final Logger log = LoggerFactory.getLogger(ReponseResource.class);
        
    @Inject
    private ReponseRepository reponseRepository;
    
    /**
     * POST  /reponses : Create a new reponse.
     *
     * @param reponse the reponse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reponse, or with status 400 (Bad Request) if the reponse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/reponses",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Reponse> createReponse(@Valid @RequestBody Reponse reponse) throws URISyntaxException {
        log.debug("REST request to save Reponse : {}", reponse);
        if (reponse.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("reponse", "idexists", "A new reponse cannot already have an ID")).body(null);
        }
        Reponse result = reponseRepository.save(reponse);
        return ResponseEntity.created(new URI("/api/reponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("reponse", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reponses : Updates an existing reponse.
     *
     * @param reponse the reponse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reponse,
     * or with status 400 (Bad Request) if the reponse is not valid,
     * or with status 500 (Internal Server Error) if the reponse couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/reponses",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Reponse> updateReponse(@Valid @RequestBody Reponse reponse) throws URISyntaxException {
        log.debug("REST request to update Reponse : {}", reponse);
        if (reponse.getId() == null) {
            return createReponse(reponse);
        }
        Reponse result = reponseRepository.save(reponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("reponse", reponse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reponses : get all the reponses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reponses in body
     */
    @RequestMapping(value = "/reponses",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Reponse> getAllReponses() {
        log.debug("REST request to get all Reponses");
        List<Reponse> reponses = reponseRepository.findAll();
        return reponses;
    }

       

    
    /**
     * GET  /reponses/:id : get the "id" reponse.
     *
     * @param id the id of the reponse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reponse, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/reponses/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Reponse> getReponse(@PathVariable Long id) {
        log.debug("REST request to get Reponse : {}", id);
        Reponse reponse = reponseRepository.findOne(id);
        return Optional.ofNullable(reponse)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /reponses/:id : delete the "id" reponse.
     *
     * @param id the id of the reponse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/reponses/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteReponse(@PathVariable Long id) {
        log.debug("REST request to delete Reponse : {}", id);
        reponseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("reponse", id.toString())).build();
    }

}
