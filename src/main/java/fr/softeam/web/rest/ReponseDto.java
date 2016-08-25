package fr.softeam.web.rest;

import java.util.List;

public class ReponseDto {
    private Long questionId;
    private List<Long> reponses;

    public ReponseDto() {
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public List<Long> getReponses() {
        return reponses;
    }

    public void setReponses(List<Long> reponses) {
        this.reponses = reponses;
    }
}
