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

import fr.softeam.domain.Reponse;
import fr.softeam.repository.ExtReponseRepository;
import fr.softeam.repository.ReponseRepository;

@RestController
@RequestMapping("/api")
public class ExtReponseResource {

    private final Logger log = LoggerFactory.getLogger(ExtReponseResource.class);
        
    @Inject
    private ExtReponseRepository reponseRepository;
    
    /**
     * GET  /reponses/question/:id : get all Reponses from "id" Question.
     *
     * @param id the id of the question
     * @return the ResponseEntity with status 200 (OK) and with body the reponses, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/reponses/question/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Reponse> getAllReponsesByQuestionId(@PathVariable Long id) {
        log.debug("REST extended request to get Reponse by Question Id : {}", id);
        
        List<Reponse> reponses = reponseRepository.findByQuestionId(id);
        return reponses;
    }
    
}
