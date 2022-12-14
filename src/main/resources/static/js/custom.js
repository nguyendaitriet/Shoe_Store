// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

$(function() {
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
    title:{},
    photo:{},
    price:{}
}

page.element.productArea = $('.product-area');
page.element.tempHomeProduct = $('#tempHomeProduct');
page.element.plusQuantity = $

page.loadData.getAllHomeProducts = () => {
    return $.ajax({
        type: "GET",
        url: page.urls.getAllHomeProducts
    })
        .done((data) => {

            $.each(data, (index, item) => {
                homeProduct = item;
                page.commands.addHomeProduct();
            });

        })
        .fail(() => {
            // App.SweetAlert.showErrorAlert("Drug list not found!");
            alert('Error');
        })
}

let tempHomeProduct = $.validator.format($.trim(page.element.tempHomeProduct.val().toString()));

page.commands.addHomeProduct = () => {
    page.element.productArea.prepend($(tempHomeProduct(homeProduct.title, homeProduct.photo, homeProduct.price)));
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

page.initializeControlEvent = () => {
    page.commands.handlePlusQuantity();
    page.commands.handleMinusQuantity();
}