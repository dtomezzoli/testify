package fr.softeam.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.softeam.domain.*;
import fr.softeam.repository.EvaluationRepository;
import fr.softeam.repository.QuestionRepository;
import fr.softeam.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ScoreResource {

    private final Logger log = LoggerFactory.getLogger(ReponseResource.class);

    @Inject
    private QuestionRepository questionRepository;

    @Inject
    private UserRepository userRepository;

    @Inject
    private EvaluationRepository evaluationRepository;

    @RequestMapping(value = "/score/{id}",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional
    public int getScore(@PathVariable Long id, @RequestBody List<ReponseDto> reponses){
        int res = 0;
        log.debug("REST request to get Reponse : {}", id);
        for(ReponseDto reponseDto : reponses)
            res += calculScore(reponseDto);
        return res;
    }

    private int calculScore(ReponseDto reponseDto){
        int res = 0;
        Question question = questionRepository.findOne(reponseDto.getQuestionId());
        for(Reponse reponse : question.getReponses()){
            if(reponseDto.getReponses().contains(reponse.getId())){
                res += reponse.getScore();
            }
        }

        return res;
    }
}
