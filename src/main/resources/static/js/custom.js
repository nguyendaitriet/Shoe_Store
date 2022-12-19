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
        login: CommonApp.BASE_URL_AUTH + "/signIn",
        register: CommonApp.BASE_URL_AUTH + "/signUp",
        getAllHomeProducts: CommonApp.BASE_URL_PRODUCT,
        getAllCartProducts: CommonApp.BASE_URL_CART_PRODUCT,
        addCartProductToList: CommonApp.BASE_URL_CART_PRODUCT + "/add",
        updateCartProductList: CommonApp.BASE_URL_CART_PRODUCT + "/update",
        removeCartProductFromList: CommonApp.BASE_URL_CART_PRODUCT + "/remove",
        createNewOrder: CommonApp.BASE_URL_ORDER + "/create",
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
page.element.currentUsername = $('#currentUsername');

page.element.cartLink = $('.cart-link');
page.element.loginLink = $('.login-link');
page.element.accountLink = $('.account-link');

//Cart modal
page.dialogs.element.modalCart = $('#mdCart');
page.dialogs.element.grandTotalPrice = $('.grand-total-price');
page.dialogs.element.tbCartProductBody = $('.tb-cart-product tbody');
page.dialogs.element.btnUpdateCart = $('#btn-update-cart');
page.dialogs.element.btnCheckOut = $('#btn-checkout');
page.dialogs.element.formOrderInfo = $('#frm-order-info');
page.dialogs.element.orderFullName = $('#order-full-name');
page.dialogs.element.orderPhoneNumber = $('#order-phone-number');
page.dialogs.element.orderAddress = $('#order-address');
page.dialogs.commands.getCartProductUpdateList = () => {
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
    return cartProductUpdateList;
}
page.dialogs.commands.addCartProductToList = (cartProduct) => {
    page.dialogs.element.tbCartProductBody.append($(tempCartProduct(cartProduct.productItemId, cartProduct.sizeId,
        cartProduct.photo, cartProduct.title, cartProduct.price, cartProduct.quantity, cartProduct.totalPrice, cartProduct.productId)));
}
page.dialogs.commands.handleBtnUpdateCart = () => {
    page.dialogs.element.btnUpdateCart.on('click', () => {
        let cartProductUpdateList = page.dialogs.commands.getCartProductUpdateList();
        if (cartProductUpdateList.length === 0) {
            CommonApp.IziToast.showErrorAlert('There is no product in your cart!')
            return;
        }
        $.ajax({
            type: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
page.dialogs.commands.handleBtnRemoveCartProduct = () => {
    $(document).on("click", ".btn-remove-cart-product", function () {
        let productItemId = $(this).data('id');
        $.ajax({
            type: "DELETE",
            url: page.urls.removeCartProductFromList + '/' + productItemId
        })
            .done(() => {
                page.dialogs.element.tbCartProductBody.html('');
                page.dialogs.loadData.getAllCartProducts();
                CommonApp.SweetAlert.showSuccessAlert('Remove product successfully!');
            })
            .fail((jqXHR) => {
                CommonApp.handleFailedTasks(jqXHR);
            })
    })
}
page.dialogs.commands.checkOut = () => {
    let orderInfoParam = {
        cartProductUpdateList: [],
        userInfoParam: {
            fullName: {},
            phoneNumber: {},
            address: {},
        }
    }
    orderInfoParam.cartProductUpdateList = page.dialogs.commands.getCartProductUpdateList();
    if (orderInfoParam.cartProductUpdateList.length === 0) {
        CommonApp.IziToast.showErrorAlert('There is no product in your cart!')
        return;
    }
    orderInfoParam.userInfoParam.fullName = page.dialogs.element.orderFullName.val().trim();
    orderInfoParam.userInfoParam.phoneNumber = page.dialogs.element.orderPhoneNumber.val().trim();
    orderInfoParam.userInfoParam.address = page.dialogs.element.orderAddress.val().trim();
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        url: page.urls.createNewOrder,
        data: JSON.stringify(orderInfoParam)
    })
        .done(() => {
            page.dialogs.element.modalCart.modal('hide');
            CommonApp.SweetAlert.showSuccessAlert('Successful payment!')
        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
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
            let roundGrandTotalPrice = Math.round((grandTotalPrice + Number.EPSILON) * 100) / 100;
            page.dialogs.element.grandTotalPrice.text(`${roundGrandTotalPrice}$`);
        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
        })
}
page.dialogs.close.modalCart = () => {
    page.dialogs.element.grandTotalPrice.text('0$');
    $('.tb-cart-product tbody tr').remove();
}

//Login modal
page.dialogs.element.modalLogin = $('#md-login');
page.dialogs.element.formLogin = $('#frm-login');
page.dialogs.element.username = $('#username');
page.dialogs.element.password = $('#password');
page.dialogs.element.btnLogin = $('#btn-login');
page.dialogs.commands.login = () => {
    let loginParam = {
        username: {},
        password: {}
    };
    loginParam.username = page.dialogs.element.username.val().trim();
    loginParam.password = page.dialogs.element.password.val();

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'text',
        url: page.urls.login,
        data: JSON.stringify(loginParam)
    })
        .done((jqXHR) => {
            CommonApp.IziToast.showSuccessAlert('Login successfully!');
            page.element.currentUsername.text(`Hello, ${jqXHR}`);
            page.element.loginLink.attr('hidden', true);
            page.element.accountLink.attr('hidden', false);
            page.dialogs.element.modalLogin.modal('hide');

        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
        })
}
page.dialogs.close.modalLogin = () => {
    page.dialogs.element.formLogin[0].reset();
    page.dialogs.element.formLogin.validate().resetForm();
    page.dialogs.element.formLogin.find("input.error").removeClass("error");
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}

//Register modal
page.dialogs.element.modalRegister = $('#md-register');
page.dialogs.element.formRegister = $('#frm-register');
page.dialogs.element.usernameCre = $('#username-create');
page.dialogs.element.passwordCre = $('#password-create');
page.dialogs.element.fullNameCre = $('#full-name-create');
page.dialogs.element.btnRegister = $('#btn-register');
page.dialogs.commands.register = () => {
    let signUpParam = {
        fullName: {},
        username: {},
        password: {}
    };

    signUpParam.fullName = page.dialogs.element.fullNameCre.val().trim();
    signUpParam.username = page.dialogs.element.usernameCre.val().trim();
    signUpParam.password = page.dialogs.element.passwordCre.val();

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'text',
        url: page.urls.register,
        data: JSON.stringify(signUpParam)
    })
        .done((jqXHR) => {
            CommonApp.IziToast.showSuccessAlert(jqXHR);
            page.dialogs.element.username.val(signUpParam.username);
            page.dialogs.element.password.val(signUpParam.password);
            page.dialogs.element.modalRegister.modal('hide');
            page.dialogs.element.modalLogin.modal('show');
        })
        .fail((jqXHR) => {
            CommonApp.handleFailedTasks(jqXHR);
        })
}
page.dialogs.close.modalRegister = () => {
    page.dialogs.element.formRegister[0].reset();
    page.dialogs.element.formRegister.validate().resetForm();
    page.dialogs.element.formRegister.find("input.error").removeClass("error");
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}

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

page.commands.handleLoginLink = () => {
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
    page.commands.handleLoginLink();
    page.commands.handleAddToCartBtn();
    page.commands.handlePlusQuantity();
    page.commands.handleMinusQuantity();

    page.dialogs.element.btnLogin.on('click', () => {
        page.dialogs.element.formLogin.submit();
    })
    page.dialogs.element.modalLogin.on("hidden.bs.modal", function () {
        page.dialogs.close.modalLogin();
    });

    page.dialogs.element.btnRegister.on('click', () => {
        page.dialogs.element.formRegister.submit();
    })
    page.dialogs.element.modalRegister.on("hidden.bs.modal", function () {
        page.dialogs.close.modalRegister();
    });

    page.dialogs.commands.handleBtnRemoveCartProduct();
    page.dialogs.commands.handleBtnUpdateCart();
    page.dialogs.element.btnCheckOut.on('click', () => {
        page.dialogs.element.formOrderInfo.submit();
    })
    page.dialogs.element.modalCart.on("hidden.bs.modal", function () {
        page.dialogs.close.modalCart();
    });

}