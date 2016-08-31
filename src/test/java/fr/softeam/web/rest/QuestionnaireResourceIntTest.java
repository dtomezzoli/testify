package fr.softeam.web.rest;

import fr.softeam.TestifyApp;
import fr.softeam.domain.Questionnaire;
import fr.softeam.repository.QuestionnaireRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the QuestionnaireResource REST controller.
 *
 * @see QuestionnaireResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TestifyApp.class)
@WebAppConfiguration
@IntegrationTest
public class QuestionnaireResourceIntTest {

    private static final String DEFAULT_THEME = "AAAAA";
    private static final String UPDATED_THEME = "BBBBB";
    private static final String DEFAULT_CATEGORIE = "AAAAA";
    private static final String UPDATED_CATEGORIE = "BBBBB";

    private static final Long DEFAULT_DUREE = 1L;
    private static final Long UPDATED_DUREE = 2L;

    @Inject
    private QuestionnaireRepository questionnaireRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restQuestionnaireMockMvc;

    private Questionnaire questionnaire;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        QuestionnaireResource questionnaireResource = new QuestionnaireResource();
        ReflectionTestUtils.setField(questionnaireResource, "questionnaireRepository", questionnaireRepository);
        this.restQuestionnaireMockMvc = MockMvcBuilders.standaloneSetup(questionnaireResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        questionnaire = new Questionnaire();
        questionnaire.setTheme(DEFAULT_THEME);
        questionnaire.setCategorie(DEFAULT_CATEGORIE);
        questionnaire.setDuree(DEFAULT_DUREE);
    }

    @Test
    @Transactional
    public void createQuestionnaire() throws Exception {
        int databaseSizeBeforeCreate = questionnaireRepository.findAll().size();

        // Create the Questionnaire

        restQuestionnaireMockMvc.perform(post("/api/questionnaires")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questionnaire)))
                .andExpect(status().isCreated());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        assertThat(questionnaires).hasSize(databaseSizeBeforeCreate + 1);
        Questionnaire testQuestionnaire = questionnaires.get(questionnaires.size() - 1);
        assertThat(testQuestionnaire.getTheme()).isEqualTo(DEFAULT_THEME);
        assertThat(testQuestionnaire.getCategorie()).isEqualTo(DEFAULT_CATEGORIE);
        assertThat(testQuestionnaire.getDuree()).isEqualTo(DEFAULT_DUREE);
    }

    @Test
    @Transactional
    public void checkThemeIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionnaireRepository.findAll().size();
        // set the field null
        questionnaire.setTheme(null);

        // Create the Questionnaire, which fails.

        restQuestionnaireMockMvc.perform(post("/api/questionnaires")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questionnaire)))
                .andExpect(status().isBadRequest());

        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        assertThat(questionnaires).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDureeIsRequired() throws Exception {
        int databaseSizeBeforeTest = questionnaireRepository.findAll().size();
        // set the field null
        questionnaire.setDuree(null);

        // Create the Questionnaire, which fails.

        restQuestionnaireMockMvc.perform(post("/api/questionnaires")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questionnaire)))
                .andExpect(status().isBadRequest());

        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        assertThat(questionnaires).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuestionnaires() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        // Get all the questionnaires
        restQuestionnaireMockMvc.perform(get("/api/questionnaires?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(questionnaire.getId().intValue())))
                .andExpect(jsonPath("$.[*].theme").value(hasItem(DEFAULT_THEME.toString())))
                .andExpect(jsonPath("$.[*].categorie").value(hasItem(DEFAULT_CATEGORIE.toString())))
                .andExpect(jsonPath("$.[*].duree").value(hasItem(DEFAULT_DUREE.intValue())));
    }

    @Test
    @Transactional
    public void getQuestionnaire() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);

        // Get the questionnaire
        restQuestionnaireMockMvc.perform(get("/api/questionnaires/{id}", questionnaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(questionnaire.getId().intValue()))
            .andExpect(jsonPath("$.theme").value(DEFAULT_THEME.toString()))
            .andExpect(jsonPath("$.categorie").value(DEFAULT_CATEGORIE.toString()))
            .andExpect(jsonPath("$.duree").value(DEFAULT_DUREE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestionnaire() throws Exception {
        // Get the questionnaire
        restQuestionnaireMockMvc.perform(get("/api/questionnaires/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestionnaire() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);
        int databaseSizeBeforeUpdate = questionnaireRepository.findAll().size();

        // Update the questionnaire
        Questionnaire updatedQuestionnaire = new Questionnaire();
        updatedQuestionnaire.setId(questionnaire.getId());
        updatedQuestionnaire.setTheme(UPDATED_THEME);
        updatedQuestionnaire.setCategorie(UPDATED_CATEGORIE);
        updatedQuestionnaire.setDuree(UPDATED_DUREE);

        restQuestionnaireMockMvc.perform(put("/api/questionnaires")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedQuestionnaire)))
                .andExpect(status().isOk());

        // Validate the Questionnaire in the database
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        assertThat(questionnaires).hasSize(databaseSizeBeforeUpdate);
        Questionnaire testQuestionnaire = questionnaires.get(questionnaires.size() - 1);
        assertThat(testQuestionnaire.getTheme()).isEqualTo(UPDATED_THEME);
        assertThat(testQuestionnaire.getCategorie()).isEqualTo(UPDATED_CATEGORIE);
        assertThat(testQuestionnaire.getDuree()).isEqualTo(UPDATED_DUREE);
    }

    @Test
    @Transactional
    public void deleteQuestionnaire() throws Exception {
        // Initialize the database
        questionnaireRepository.saveAndFlush(questionnaire);
        int databaseSizeBeforeDelete = questionnaireRepository.findAll().size();

        // Get the questionnaire
        restQuestionnaireMockMvc.perform(delete("/api/questionnaires/{id}", questionnaire.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Questionnaire> questionnaires = questionnaireRepository.findAll();
        assertThat(questionnaires).hasSize(databaseSizeBeforeDelete - 1);
    }
}
