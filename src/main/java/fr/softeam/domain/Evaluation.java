package fr.softeam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Evaluation.
 */
@Entity
@Table(name = "evaluation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "debut")
    private ZonedDateTime debut;

    @Column(name = "fin")
    private ZonedDateTime fin;

    @Column(name = "score")
    private Double score;

    @ManyToOne
    private User candidat;

    @ManyToOne
    private Questionnaire questionnaire;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDebut() {
        return debut;
    }

    public void setDebut(ZonedDateTime debut) {
        this.debut = debut;
    }

    public ZonedDateTime getFin() {
        return fin;
    }

    public void setFin(ZonedDateTime fin) {
        this.fin = fin;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public User getCandidat() {
        return candidat;
    }

    public void setCandidat(User user) {
        this.candidat = user;
    }

    public Questionnaire getQuestionnaire() {
        return questionnaire;
    }

    public void setQuestionnaire(Questionnaire questionnaire) {
        this.questionnaire = questionnaire;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Evaluation evaluation = (Evaluation) o;
        if(evaluation.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, evaluation.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Evaluation{" +
            "id=" + id +
            ", debut='" + debut + "'" +
            ", fin='" + fin + "'" +
            ", score='" + score + "'" +
            '}';
    }
}
