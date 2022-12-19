package com.shoe.dto.order;

import com.shoe.dto.cart.CartProductParam;
import com.shoe.dto.user.UserInfoParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderInfoParam {
    private ArrayList<CartProductParam> cartProductUpdateList;
    private UserInfoParam userInfoParam;
}
