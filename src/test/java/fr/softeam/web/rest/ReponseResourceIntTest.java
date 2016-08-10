package fr.softeam.web.rest;

import fr.softeam.TestifyApp;
import fr.softeam.domain.Reponse;
import fr.softeam.repository.ReponseRepository;

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
 * Test class for the ReponseResource REST controller.
 *
 * @see ReponseResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TestifyApp.class)
@WebAppConfiguration
@IntegrationTest
public class ReponseResourceIntTest {

    private static final String DEFAULT_CONTENU = "AAAAA";
    private static final String UPDATED_CONTENU = "BBBBB";

    private static final Double DEFAULT_SCORE = 1D;
    private static final Double UPDATED_SCORE = 2D;

    @Inject
    private ReponseRepository reponseRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restReponseMockMvc;

    private Reponse reponse;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ReponseResource reponseResource = new ReponseResource();
        ReflectionTestUtils.setField(reponseResource, "reponseRepository", reponseRepository);
        this.restReponseMockMvc = MockMvcBuilders.standaloneSetup(reponseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        reponse = new Reponse();
        reponse.setContenu(DEFAULT_CONTENU);
        reponse.setScore(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void createReponse() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // Create the Reponse

        restReponseMockMvc.perform(post("/api/reponses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(reponse)))
                .andExpect(status().isCreated());

        // Validate the Reponse in the database
        List<Reponse> reponses = reponseRepository.findAll();
        assertThat(reponses).hasSize(databaseSizeBeforeCreate + 1);
        Reponse testReponse = reponses.get(reponses.size() - 1);
        assertThat(testReponse.getContenu()).isEqualTo(DEFAULT_CONTENU);
        assertThat(testReponse.getScore()).isEqualTo(DEFAULT_SCORE);
    }

    @Test
    @Transactional
    public void checkContenuIsRequired() throws Exception {
        int databaseSizeBeforeTest = reponseRepository.findAll().size();
        // set the field null
        reponse.setContenu(null);

        // Create the Reponse, which fails.

        restReponseMockMvc.perform(post("/api/reponses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(reponse)))
                .andExpect(status().isBadRequest());

        List<Reponse> reponses = reponseRepository.findAll();
        assertThat(reponses).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReponses() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get all the reponses
        restReponseMockMvc.perform(get("/api/reponses?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(reponse.getId().intValue())))
                .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU.toString())))
                .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE.doubleValue())));
    }

    @Test
    @Transactional
    public void getReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", reponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(reponse.getId().intValue()))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReponse() throws Exception {
        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse
        Reponse updatedReponse = new Reponse();
        updatedReponse.setId(reponse.getId());
        updatedReponse.setContenu(UPDATED_CONTENU);
        updatedReponse.setScore(UPDATED_SCORE);

        restReponseMockMvc.perform(put("/api/reponses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedReponse)))
                .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponses = reponseRepository.findAll();
        assertThat(reponses).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponses.get(reponses.size() - 1);
        assertThat(testReponse.getContenu()).isEqualTo(UPDATED_CONTENU);
        assertThat(testReponse.getScore()).isEqualTo(UPDATED_SCORE);
    }

    @Test
    @Transactional
    public void deleteReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);
        int databaseSizeBeforeDelete = reponseRepository.findAll().size();

        // Get the reponse
        restReponseMockMvc.perform(delete("/api/reponses/{id}", reponse.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Reponse> reponses = reponseRepository.findAll();
        assertThat(reponses).hasSize(databaseSizeBeforeDelete - 1);
    }
}
