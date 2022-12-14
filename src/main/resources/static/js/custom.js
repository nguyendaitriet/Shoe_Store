// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

$(function () {
    page.loadData.getAllHomeProducts();
    page.initializeControlEvent();
});

let page = {
    urls: {
        getAllHomeProducts: CommonApp.BASE_URL_PRODUCT,
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

page.loadData.getAllHomeProducts = () => {
    return $.ajax({
        type: "GET",
        url: page.urls.getAllHomeProducts
    })
        .done((data) => {

            $.each(data, (index, productItem) => {
                page.commands.addHomeProduct(productItem);
                $.each(productItem.sizeList, (index, item) => {
                    console.log(item)
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
    page.element.productArea.prepend($(tempHomeProduct(homeProduct.id, homeProduct.title, homeProduct.photo, homeProduct.price)));
}

page.commands.handlePlusQuantity = () => {
    $(document).on('click', '.plus', function () {
        $qty = $(this).parent().find('.qty');
        qty = parseInt($qty.val()) + 1;
        $qty.val(qty);
    })
}

page.commands.handleMinusQuantity = () => {
    $(document).on('click', '.plus', function () {
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

page.initializeControlEvent = () => {
    page.commands.handleCartLink();
    page.commands.handlePlusQuantity();
    page.commands.handleMinusQuantity();
}