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

page.element.cartLink = $('.cart-link');

page.dialogs.element.modalCart = $('#mdCart');
page.dialogs.element.tbCartProduct = $('#tb-cart-product')

page.loadData.getAllHomeProducts = () => {
    return $.ajax({
        type: "GET",
        url: page.urls.getAllHomeProducts
    })
        .done((data) => {
            console.log(data);

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
        console.log(cartProductParam);
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

            $.ajax({
                type: "GET",
                url: page.urls.getAllCartProducts
            })
                .done((data) => {
                    console.log(data);
                })
                .fail(() => {
                    // App.SweetAlert.showErrorAlert("Drug list not found!");
                    alert('Error');
                })
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

}