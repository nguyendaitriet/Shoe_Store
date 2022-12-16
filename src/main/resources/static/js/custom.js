// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

$(function () {
    page.loadData.getAllHomeProducts().then(() => {
        page.initializeControlEvent();
    })
});

let page = {
    urls: {
        getAllHomeProducts: CommonApp.BASE_URL_PRODUCT,
        getAllCartProducts: CommonApp.BASE_URL_CART_PRODUCT,
        addCartProductToList: CommonApp.BASE_URL_CART_PRODUCT + "/add",
        updateCartProductList: CommonApp.BASE_URL_CART_PRODUCT + "/update",
        removeCartProductFromList: CommonApp.BASE_URL_CART_PRODUCT + "/remove",
    },
    element: {},
    loadData: {},
    commands: {},
    dialogs: {
        element: {},
        loadData: {},
        commands: {},
        close: {},
        alertDanger: {},
        inputError: {}
    }
}

page.element.productArea = $('.product-area');
page.element.sizeOption = $('.size-option');

page.element.tempHomeProduct = $('#tempHomeProduct');
page.element.tempOption = $('#tempOption');
page.element.tempCartProduct = $('#tempCartProduct');

page.element.cartLink = $('.cart-link');
page.element.loginLink = $('.login-link');

page.dialogs.element.modalCart = $('#mdCart');
page.dialogs.element.grandTotalPrice = $('.grand-total-price');
page.dialogs.element.tbCartProductBody = $('.tb-cart-product tbody');
page.dialogs.element.btnUpdateCart = $('#btn-update-cart');
page.dialogs.commands.addCartProductToList = (cartProduct) => {
    page.dialogs.element.tbCartProductBody.append($(tempCartProduct(cartProduct.productItemId, cartProduct.sizeId,
        cartProduct.photo, cartProduct.title, cartProduct.price, cartProduct.quantity, cartProduct.totalPrice, cartProduct.productId)));
}
page.dialogs.commands.handleBtnUpdateCart = () => {
    page.dialogs.element.btnUpdateCart.on('click', () => {
        let table = document.querySelector('.tb-cart-product');
        let cartProductUpdateList = [];

        for (let i = 1, row; row = table.rows[i]; i++) {
            let cartProductParam = new CartProductParam();
            let rowSelector = $(`#${row.id}`);

            cartProductParam.productId = rowSelector.data('product');
            cartProductParam.quantity = rowSelector.find('#quantityCart').val();
            cartProductParam.sizeId = rowSelector.find('.form-control').val();

            cartProductUpdateList.push(cartProductParam);
        }
        console.log(cartProductUpdateList);

        $.ajax({
            type: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: page.urls.updateCartProductList,
            data: JSON.stringify({cartProductUpdateList})
        })
        .done(() => {
            page.dialogs.element.tbCartProductBody.html('');
            page.dialogs.loadData.getAllCartProducts();
            CommonApp.SweetAlert.showSuccessAlert('Update cart successfully!')
        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
        })
    })
}
page.dialogs.commands.handleRemoveCartProduct = () => {
    $(document).on("click", ".btn-remove-cart-product", function () {
        let productItemId = $(this).data('id');
        $.ajax({
            type: "DELETE",
            url: page.urls.removeCartProductFromList + '/' + productItemId
        })
            .done(() => {
                $(`#tr-${productItemId}`).remove();
                page.dialogs.element.grandTotalPrice.val('0');
                CommonApp.SweetAlert.showSuccessAlert('Remove product successfully!');
            })
            .fail((jqXHR) => {
                CommonApp.handleFailedTasks(jqXHR);
            })
    })
}
page.dialogs.loadData.getAllCartProducts = () => {
    $.ajax({
        type: "GET",
        url: page.urls.getAllCartProducts
    })
    .done((data) => {
        let grandTotalPrice = 0;

        $.each(data, (index, cartItem) => {
            page.dialogs.commands.addCartProductToList(cartItem);
            grandTotalPrice += cartItem.totalPrice;

            $.when(
                $.each(cartItem.sizeList, (index, item) => {
                    $(`.size-option-cart-product-${cartItem.productItemId}`).append($(tempOption(item.id, item.sizeNumber)));
                })
            ).done(() => {
                $(`.size-option-cart-product-${cartItem.productItemId}`).val(`${cartItem.sizeId}`).change();
            })
        });

        page.dialogs.element.grandTotalPrice.text(`${grandTotalPrice}$`);
    })
    .fail((jqXHR) => {
        CommonApp.handleFailedTasks(jqXHR);
    })
}
page.dialogs.close.modalCart = () => {
    $('.tb-cart-product tbody tr').remove();
}

page.dialogs.element.modalLogin = $('#md-login');

page.dialogs.element.modalRegister = $('#md-register');

page.loadData.getAllHomeProducts = () => {
    return $.ajax({
        type: "GET",
        url: page.urls.getAllHomeProducts
    })
        .done((data) => {

            $.each(data, (index, productItem) => {
                page.commands.addHomeProduct(productItem);

                $.each(productItem.sizeList, (index, item) => {
                    $(`.size-option-${productItem.id}`).append($(tempOption(item.id, item.sizeNumber)));
                })
            });

        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
        })
}

let tempHomeProduct = $.validator.format($.trim(page.element.tempHomeProduct.val().toString()));
let tempOption = $.validator.format($.trim(page.element.tempOption.val().toString()));
let tempCartProduct = $.validator.format($.trim(page.element.tempCartProduct.val().toString()));

page.commands.addHomeProduct = (homeProduct) => {
    page.element.productArea.append($(tempHomeProduct(homeProduct.id, homeProduct.title, homeProduct.photo, homeProduct.price)));
}

page.commands.handlePlusQuantity = () => {
    $(document).on('click', '.plus', function () {
        $qty = $(this).parent().find('.qty');
        qty = parseInt($qty.val()) + 1;
        $qty.val(qty);
    })
}

page.commands.handleMinusQuantity = () => {
    $(document).on('click', '.minus', function () {
        $qty = $(this).parent().find('.qty');
        qty = parseInt($qty.val()) - 1;
        if (qty < 0) qty = 0;
        $qty.val(qty);
    })
}

page.commands.handleCartLink = () => {
    page.element.cartLink.on('click', () => {
        page.dialogs.element.modalCart.modal('show');
        page.dialogs.loadData.getAllCartProducts();
    })
}

page.commands.handleCartLink = () => {
    page.element.loginLink.on('click', () => {
        page.dialogs.element.modalLogin.modal('show');
    })
}

page.commands.handleAddToCartBtn = () => {
    $(document).on("click", ".add_cart_btn", function () {
        let id = $(this).data("id");
        let cartProductParam = new CartProductParam();
        cartProductParam.productId = id;
        cartProductParam.quantity = $(`#quantity-${id}`).val();
        cartProductParam.sizeId = $(`.size-option-${id}`).find(":selected").val();

        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: page.urls.addCartProductToList,
            data: JSON.stringify(cartProductParam)
        })
        .done(() => {
            CommonApp.SweetAlert.showSuccessAlert('Add to cart successfully!')
        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
        })

        $(`#quantity-${id}`).val(1);
        $(`.size-option-${id}`).prop("selectedIndex", 1).change();
    });
}

page.initializeControlEvent = () => {
    page.commands.handleCartLink();
    page.commands.handleAddToCartBtn();
    page.commands.handlePlusQuantity();
    page.commands.handleMinusQuantity();
    page.dialogs.element.modalCart.on("hidden.bs.modal", function () {
        page.dialogs.close.modalCart();
    });
    page.dialogs.commands.handleRemoveCartProduct();
    page.dialogs.commands.handleBtnUpdateCart();
}