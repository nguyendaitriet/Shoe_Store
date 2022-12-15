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
        addCartProductToList: CommonApp.BASE_URL_CART_PRODUCT + "/add"
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

let homeProduct = {
    id: {},
    title: {},
    photo: {},
    price: {},
    sizeList: {}
}

page.element.productArea = $('.product-area');
page.element.sizeOption = $('.size-option');

page.element.tempHomeProduct = $('#tempHomeProduct');
page.element.tempOption = $('#tempOption');
page.element.tempCartProduct = $('#tempCartProduct');

page.element.cartLink = $('.cart-link');

page.dialogs.element.modalCart = $('#mdCart');
page.dialogs.element.tbCartProductBody = $('.tb-cart-product tbody');
page.dialogs.commands.addCartProductToList = (cartProduct) => {
    page.dialogs.element.tbCartProductBody.append($(tempCartProduct(cartProduct.productId, cartProduct.sizeId,
        cartProduct.photo, cartProduct.title,cartProduct.price, cartProduct.quantity, cartProduct.totalPrice)));
}
page.dialogs.loadData.getAllCartProducts = () => {
    $.ajax({
        type: "GET",
        url: page.urls.getAllCartProducts
    })
    .done((data) => {

        $.each(data, (index, cartItem) => {
            page.dialogs.commands.addCartProductToList(cartItem);

            // $.each(productItem.sizeList, (index, item) => {
            //     $(`.size-option-${productItem.id}`).append($(tempOption(item.id, item.sizeNumber)));
            // })
        });
    })
    .fail(() => {
        // App.SweetAlert.showErrorAlert("Drug list not found!");
        alert('Error');
    })
}
page.dialogs.close.modalCart = () => {
    $('.tb-cart-product tbody tr').remove();
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
        .fail(() => {
            // App.SweetAlert.showErrorAlert("Drug list not found!");
            alert('Error');
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

page.commands.handleAddToCartBtn = () => {
    $(document).on("click", ".add_cart_btn", function () {
        let id = $(this).data("id");
        let cartProductParam = {
            productId: {},
            quantity: {},
            sizeId: {}
        }
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
        .done((data) => {
            alert('Success');

        })
        .fail(() => {
            // App.SweetAlert.showErrorAlert("Drug list not found!");
            alert('Error');
        })

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
}