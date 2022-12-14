package com.shoe.controller.api;

import com.shoe.dto.cart.CartProductParam;
import com.shoe.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart-product")
public class CartProductAPI {
    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCartProductList() {
        return new ResponseEntity<>(cartService.getAllCartProducts(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCartProductToList(@RequestBody CartProductParam cartProductParam) {
        cartService.addProduct(cartProductParam);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
