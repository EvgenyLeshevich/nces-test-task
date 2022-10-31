package com.evgeniy.nces.controller;

import com.evgeniy.nces.dto.CurrencyDto;
import com.evgeniy.nces.dto.CurrencyRequestDto;
import com.evgeniy.nces.service.CurrencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CurrencyController {

    private final CurrencyService currencyService;

    @GetMapping
    public List<CurrencyDto> test(CurrencyRequestDto currency) {
        return currencyService.getCurrency(currency);
    }
}
