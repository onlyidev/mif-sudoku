export function showToast(msg, delay = 3000) {
    $("#toast").click(() => $("#toast").slideUp());
    if (delay === Infinity) {
        $("#toast").text(msg).slideDown();
    } else
        $("#toast").text(msg).slideDown().delay(delay).fadeOut();
}