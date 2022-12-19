package com.shoe.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoParam {
    private String fullName;
    private String phoneNumber;
    private String address;
}
