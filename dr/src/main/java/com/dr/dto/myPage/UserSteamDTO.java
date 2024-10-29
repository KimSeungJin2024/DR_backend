package com.dr.dto.myPage;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserSteamDTO {
    private String recipeTitle;
    private String userNickname;
    private String photoLocal;
}