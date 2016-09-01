package fr.softeam.web.rest;

import com.codahale.metrics.annotation.Timed;

import fr.softeam.domain.*;
import fr.softeam.repository.EvaluationRepository;
import fr.softeam.repository.QuestionRepository;
import fr.softeam.repository.UserRepository;
import fr.softeam.web.rest.dto.ManagedUserDTO;
import fr.softeam.web.rest.util.HeaderUtil;
import fr.softeam.web.rest.util.PaginationUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

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

    
    @RequestMapping(value = "/score",
    		method = RequestMethod.POST,
    		produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional  
    @ResponseBody
        public ScoreDto getScore(@RequestBody List<ReponseDto> reponses) throws URISyntaxException{
            int res = 0;
            log.debug("REST request to get Score : {}");
            for(ReponseDto reponseDto : reponses)
                res += calculScore(reponseDto);
            
            ScoreDto score = new ScoreDto (res);
            
            return score;
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
