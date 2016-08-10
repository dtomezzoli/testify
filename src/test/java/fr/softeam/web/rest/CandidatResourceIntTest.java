package fr.softeam.web.rest;

import fr.softeam.TestifyApp;
import fr.softeam.domain.Candidat;
import fr.softeam.repository.CandidatRepository;

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
 * Test class for the CandidatResource REST controller.
 *
 * @see CandidatResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TestifyApp.class)
@WebAppConfiguration
@IntegrationTest
public class CandidatResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAA";
    private static final String UPDATED_NOM = "BBBBB";
    private static final String DEFAULT_PRENOM = "AAAAA";
    private static final String UPDATED_PRENOM = "BBBBB";
    private static final String DEFAULT_EMAIL = "AAAAA";
    private static final String UPDATED_EMAIL = "BBBBB";

    @Inject
    private CandidatRepository candidatRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCandidatMockMvc;

    private Candidat candidat;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CandidatResource candidatResource = new CandidatResource();
        ReflectionTestUtils.setField(candidatResource, "candidatRepository", candidatRepository);
        this.restCandidatMockMvc = MockMvcBuilders.standaloneSetup(candidatResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        candidat = new Candidat();
        candidat.setNom(DEFAULT_NOM);
        candidat.setPrenom(DEFAULT_PRENOM);
        candidat.setEmail(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createCandidat() throws Exception {
        int databaseSizeBeforeCreate = candidatRepository.findAll().size();

        // Create the Candidat

        restCandidatMockMvc.perform(post("/api/candidats")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(candidat)))
                .andExpect(status().isCreated());

        // Validate the Candidat in the database
        List<Candidat> candidats = candidatRepository.findAll();
        assertThat(candidats).hasSize(databaseSizeBeforeCreate + 1);
        Candidat testCandidat = candidats.get(candidats.size() - 1);
        assertThat(testCandidat.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testCandidat.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testCandidat.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setNom(null);

        // Create the Candidat, which fails.

        restCandidatMockMvc.perform(post("/api/candidats")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(candidat)))
                .andExpect(status().isBadRequest());

        List<Candidat> candidats = candidatRepository.findAll();
        assertThat(candidats).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setPrenom(null);

        // Create the Candidat, which fails.

        restCandidatMockMvc.perform(post("/api/candidats")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(candidat)))
                .andExpect(status().isBadRequest());

        List<Candidat> candidats = candidatRepository.findAll();
        assertThat(candidats).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setEmail(null);

        // Create the Candidat, which fails.

        restCandidatMockMvc.perform(post("/api/candidats")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(candidat)))
                .andExpect(status().isBadRequest());

        List<Candidat> candidats = candidatRepository.findAll();
        assertThat(candidats).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCandidats() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);

        // Get all the candidats
        restCandidatMockMvc.perform(get("/api/candidats?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(candidat.getId().intValue())))
                .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
                .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
                .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getCandidat() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);

        // Get the candidat
        restCandidatMockMvc.perform(get("/api/candidats/{id}", candidat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(candidat.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCandidat() throws Exception {
        // Get the candidat
        restCandidatMockMvc.perform(get("/api/candidats/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCandidat() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);
        int databaseSizeBeforeUpdate = candidatRepository.findAll().size();

        // Update the candidat
        Candidat updatedCandidat = new Candidat();
        updatedCandidat.setId(candidat.getId());
        updatedCandidat.setNom(UPDATED_NOM);
        updatedCandidat.setPrenom(UPDATED_PRENOM);
        updatedCandidat.setEmail(UPDATED_EMAIL);

        restCandidatMockMvc.perform(put("/api/candidats")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedCandidat)))
                .andExpect(status().isOk());

        // Validate the Candidat in the database
        List<Candidat> candidats = candidatRepository.findAll();
        assertThat(candidats).hasSize(databaseSizeBeforeUpdate);
        Candidat testCandidat = candidats.get(candidats.size() - 1);
        assertThat(testCandidat.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCandidat.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testCandidat.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void deleteCandidat() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);
        int databaseSizeBeforeDelete = candidatRepository.findAll().size();

        // Get the candidat
        restCandidatMockMvc.perform(delete("/api/candidats/{id}", candidat.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Candidat> candidats = candidatRepository.findAll();
        assertThat(candidats).hasSize(databaseSizeBeforeDelete - 1);
    }
}
