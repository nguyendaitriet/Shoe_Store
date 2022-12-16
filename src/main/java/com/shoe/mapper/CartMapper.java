package com.shoe.mapper;

import com.shoe.dao.ProductDAO;
import com.shoe.dao.ProductItemDAO;
import com.shoe.dto.cart.CartProductParam;
import com.shoe.entity.Product;
import com.shoe.entity.Size;
import com.shoe.model.CartProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CartMapper {
    @Autowired
    private ProductItemDAO productItemDAO;
    @Autowired
    private ProductDAO productDAO;

    public CartProduct toCartProduct(CartProductParam cartProductParam) {
        Product product = productDAO.findById(cartProductParam.getProductId()).get();
        BigDecimal totalPrice = product.getPrice().multiply(new BigDecimal(cartProductParam.getQuantity()));
        List<Size> sizeList = productDAO.findAllSizeById(product.getId());
        int productItemId = productItemDAO.findProductItemId(cartProductParam.getProductId(), cartProductParam.getSizeId());

        return new CartProduct()
                .setProductItemId(productItemId)
                .setTitle(product.getTitle())
                .setPhoto(product.getPhoto())
                .setQuantity(cartProductParam.getQuantity())
                .setPrice(product.getPrice())
                .setTotalPrice(totalPrice)
                .setSizeId(cartProductParam.getSizeId())
                .setSizeList(sizeList)
                .setProductId(product.getId());
    }
}
