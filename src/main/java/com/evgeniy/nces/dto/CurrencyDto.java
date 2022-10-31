package com.evgeniy.nces.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CurrencyDto {

    @JsonProperty("Cur_ID")
    private Long id;

    @JsonProperty("Date")
    private LocalDate date;

    @JsonProperty("Cur_Abbreviation")
    private String title;

    @JsonProperty("Cur_OfficialRate")
    private BigDecimal rate;

    @JsonProperty("Cur_DateStart")
    private LocalDate dateStart;

    @JsonProperty("Cur_DateEnd")
    private LocalDate dateEnd;
}
