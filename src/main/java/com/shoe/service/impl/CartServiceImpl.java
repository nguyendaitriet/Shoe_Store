package com.shoe.service.impl;

import com.shoe.dao.ProductDAO;
import com.shoe.dao.ProductItemDAO;
import com.shoe.dto.cart.CartProductParam;
import com.shoe.entity.Product;
import com.shoe.entity.Size;
import com.shoe.model.CartProduct;
import com.shoe.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.math.BigDecimal;
import java.util.*;

@Service
@SessionScope
public class CartServiceImpl implements CartService {

    private final ArrayList<CartProduct> cartList;

    @Autowired
    ProductDAO productDAO;

    @Autowired
    ProductItemDAO productItemDAO;

    public CartServiceImpl(ArrayList<CartProduct> cartList) {
        this.cartList = cartList;
    }

    @Override
    public List<CartProduct> getAllCartProducts() {
        modifyCartProductList(cartList);
        cartList.sort(Comparator.comparing(CartProduct::getTitle));
        return cartList;
    }

    @Override
    public void addProduct(CartProductParam cartProductParam) {

        Product product = productDAO.findById(cartProductParam.getProductId()).get();
        BigDecimal totalPrice = product.getPrice().multiply(new BigDecimal(cartProductParam.getQuantity()));
        List<Size> sizeList = productDAO.findAllSizeById(product.getId());
        int productItemId = productItemDAO.findProductItemId(cartProductParam.getProductId(), cartProductParam.getSizeId());

        CartProduct newCartProduct = new CartProduct()
                .setProductItemId(productItemId)
                .setTitle(product.getTitle())
                .setPhoto(product.getPhoto())
                .setQuantity(cartProductParam.getQuantity())
                .setPrice(product.getPrice())
                .setTotalPrice(totalPrice)
                .setSizeId(cartProductParam.getSizeId())
                .setSizeList(sizeList);

        cartList.add(newCartProduct);

    }

    //Interface Comparable: int compareTo(Object o);
    //Interface Comparator: int compare(Object o1, Object o2);
    public void modifyCartProductList(ArrayList<CartProduct> cartProductList) {
        cartProductList.sort(Comparator.comparing(CartProduct::getProductItemId));
        for (int i = 0; i < cartProductList.size() - 1; ) {
            CartProduct cartProduct1 = cartProductList.get(i);
            CartProduct cartProduct2 = cartProductList.get(i + 1);
            if (cartProduct1.equals(cartProduct2)) {
                cartProduct1.setQuantity(cartProduct1.getQuantity() + cartProduct2.getQuantity());
                cartProduct1.setTotalPrice(cartProduct1.getTotalPrice().add(cartProduct2.getTotalPrice()));
                cartProductList.remove(i + 1);
                continue;
            }
            i++;
        }

    }

    @Override
    public void removeProduct(int id) {

    }
}
