

package com.example.smart.service;

import com.example.smart.model.UserSurvey;
import com.example.smart.repository.UserSurveyRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSurveyService {

    private final UserSurveyRepository repository;

    public UserSurveyService(UserSurveyRepository repository) {
        this.repository = repository;
    }

    public UserSurvey saveSurvey(UserSurvey survey) {
        return repository.save(survey);
    }

    public UserSurvey getSurveyByUserId(Long userId) {
        return repository.findTopByUserIdOrderBySurveyIdDesc(userId);
    }
}

