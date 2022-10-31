package com.evgeniy.nces.service;

import com.evgeniy.nces.dto.CurrencyDto;
import com.evgeniy.nces.dto.CurrencyRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final RestTemplate restTemplate;

    @Value("${url.path}")
    private String URL;

    public List<CurrencyDto> getCurrency(CurrencyRequestDto currency) {
        List<CurrencyDto> body = getAllCurrencyFromNBRB();

        List<CurrencyDto> collect = body != null ? body.stream()
                .filter(i -> i.getTitle().equalsIgnoreCase(currency.getTitle()))
                .collect(Collectors.toList()) : null;

        List<CurrencyDto> currencyDtoList = new ArrayList<>();

        for (CurrencyDto currencyDto :
                Objects.requireNonNull(collect)) {

            LocalDate startDate = currency.getStartDate();
            while (startDate.toEpochDay() < currencyDto.getDateEnd().toEpochDay()) {

                ResponseEntity<List<CurrencyDto>> responseEntity = restTemplate.exchange(
                        URL + currencyDto.getId()
                                + "?startDate=" + startDate
                                + "&endDate=" + currency.getEndDate() + "",
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<>() {
                        }
                );
                if (!Objects.requireNonNull(responseEntity.getBody()).isEmpty()) {
                    currencyDtoList.addAll(responseEntity.getBody());
                }

                startDate = startDate.plusYears(1);
            }
        }

        return currencyDtoList.stream().distinct().collect(Collectors.toList());
    }

    private List<CurrencyDto> getAllCurrencyFromNBRB() {
        ResponseEntity<List<CurrencyDto>> responseEntity = restTemplate.exchange(
                "https://www.nbrb.by/api/exrates/currencies",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                }
        );
        return responseEntity.getBody();
    }
}
