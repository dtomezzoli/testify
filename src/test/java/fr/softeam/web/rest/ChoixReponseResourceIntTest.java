package fr.softeam.web.rest;

import fr.softeam.TestifyApp;
import fr.softeam.domain.ChoixReponse;
import fr.softeam.repository.ChoixReponseRepository;

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
 * Test class for the ChoixReponseResource REST controller.
 *
 * @see ChoixReponseResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TestifyApp.class)
@WebAppConfiguration
@IntegrationTest
public class ChoixReponseResourceIntTest {


    @Inject
    private ChoixReponseRepository choixReponseRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restChoixReponseMockMvc;

    private ChoixReponse choixReponse;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ChoixReponseResource choixReponseResource = new ChoixReponseResource();
        ReflectionTestUtils.setField(choixReponseResource, "choixReponseRepository", choixReponseRepository);
        this.restChoixReponseMockMvc = MockMvcBuilders.standaloneSetup(choixReponseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        choixReponse = new ChoixReponse();
    }

    @Test
    @Transactional
    public void createChoixReponse() throws Exception {
        int databaseSizeBeforeCreate = choixReponseRepository.findAll().size();

        // Create the ChoixReponse

        restChoixReponseMockMvc.perform(post("/api/choix-reponses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(choixReponse)))
                .andExpect(status().isCreated());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponses = choixReponseRepository.findAll();
        assertThat(choixReponses).hasSize(databaseSizeBeforeCreate + 1);
        ChoixReponse testChoixReponse = choixReponses.get(choixReponses.size() - 1);
    }

    @Test
    @Transactional
    public void getAllChoixReponses() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        // Get all the choixReponses
        restChoixReponseMockMvc.perform(get("/api/choix-reponses?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(choixReponse.getId().intValue())));
    }

    @Test
    @Transactional
    public void getChoixReponse() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);

        // Get the choixReponse
        restChoixReponseMockMvc.perform(get("/api/choix-reponses/{id}", choixReponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(choixReponse.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingChoixReponse() throws Exception {
        // Get the choixReponse
        restChoixReponseMockMvc.perform(get("/api/choix-reponses/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChoixReponse() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);
        int databaseSizeBeforeUpdate = choixReponseRepository.findAll().size();

        // Update the choixReponse
        ChoixReponse updatedChoixReponse = new ChoixReponse();
        updatedChoixReponse.setId(choixReponse.getId());

        restChoixReponseMockMvc.perform(put("/api/choix-reponses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedChoixReponse)))
                .andExpect(status().isOk());

        // Validate the ChoixReponse in the database
        List<ChoixReponse> choixReponses = choixReponseRepository.findAll();
        assertThat(choixReponses).hasSize(databaseSizeBeforeUpdate);
        ChoixReponse testChoixReponse = choixReponses.get(choixReponses.size() - 1);
    }

    @Test
    @Transactional
    public void deleteChoixReponse() throws Exception {
        // Initialize the database
        choixReponseRepository.saveAndFlush(choixReponse);
        int databaseSizeBeforeDelete = choixReponseRepository.findAll().size();

        // Get the choixReponse
        restChoixReponseMockMvc.perform(delete("/api/choix-reponses/{id}", choixReponse.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<ChoixReponse> choixReponses = choixReponseRepository.findAll();
        assertThat(choixReponses).hasSize(databaseSizeBeforeDelete - 1);
    }
}
