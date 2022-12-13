// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

jQuery(function($) {
    $('.plus').click(function() {
        $qty = $(this).parent().find('.qty');
        qty = parseInt($qty.val()) + 1;
        $qty.val(qty);
    });
    $('.minus').click(function() {
        $qty = $(this).parent().find('.qty');
        qty = parseInt($qty.val()) - 1;
        if (qty < 0)
            qty = 0;
        $qty.val(qty);
    });
});