package fr.softeam.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.softeam.domain.ChoixReponse;
import fr.softeam.repository.ChoixReponseRepository;
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
 * REST controller for managing ChoixReponse.
 */
@RestController
@RequestMapping("/api")
public class ChoixReponseResource {

    private final Logger log = LoggerFactory.getLogger(ChoixReponseResource.class);
        
    @Inject
    private ChoixReponseRepository choixReponseRepository;
    
    /**
     * POST  /choix-reponses : Create a new choixReponse.
     *
     * @param choixReponse the choixReponse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new choixReponse, or with status 400 (Bad Request) if the choixReponse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/choix-reponses",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ChoixReponse> createChoixReponse(@RequestBody ChoixReponse choixReponse) throws URISyntaxException {
        log.debug("REST request to save ChoixReponse : {}", choixReponse);
        if (choixReponse.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("choixReponse", "idexists", "A new choixReponse cannot already have an ID")).body(null);
        }
        ChoixReponse result = choixReponseRepository.save(choixReponse);
        return ResponseEntity.created(new URI("/api/choix-reponses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("choixReponse", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /choix-reponses : Updates an existing choixReponse.
     *
     * @param choixReponse the choixReponse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated choixReponse,
     * or with status 400 (Bad Request) if the choixReponse is not valid,
     * or with status 500 (Internal Server Error) if the choixReponse couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/choix-reponses",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ChoixReponse> updateChoixReponse(@RequestBody ChoixReponse choixReponse) throws URISyntaxException {
        log.debug("REST request to update ChoixReponse : {}", choixReponse);
        if (choixReponse.getId() == null) {
            return createChoixReponse(choixReponse);
        }
        ChoixReponse result = choixReponseRepository.save(choixReponse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("choixReponse", choixReponse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /choix-reponses : get all the choixReponses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of choixReponses in body
     */
    @RequestMapping(value = "/choix-reponses",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<ChoixReponse> getAllChoixReponses() {
        log.debug("REST request to get all ChoixReponses");
        List<ChoixReponse> choixReponses = choixReponseRepository.findAll();
        return choixReponses;
    }

    /**
     * GET  /choix-reponses/:id : get the "id" choixReponse.
     *
     * @param id the id of the choixReponse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the choixReponse, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/choix-reponses/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ChoixReponse> getChoixReponse(@PathVariable Long id) {
        log.debug("REST request to get ChoixReponse : {}", id);
        ChoixReponse choixReponse = choixReponseRepository.findOne(id);
        return Optional.ofNullable(choixReponse)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /choix-reponses/:id : delete the "id" choixReponse.
     *
     * @param id the id of the choixReponse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/choix-reponses/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteChoixReponse(@PathVariable Long id) {
        log.debug("REST request to delete ChoixReponse : {}", id);
        choixReponseRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("choixReponse", id.toString())).build();
    }

}
