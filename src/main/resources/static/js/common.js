class CommonApp {
    static DOMAIN = location.origin;
    static API_ENDPOINT = this.DOMAIN + "/api";
    static BASE_URL_PRODUCT = this.API_ENDPOINT + "/product";
    static BASE_URL_CART_PRODUCT = this.API_ENDPOINT + "/cart-product";
    static BASE_URL_AUTH = this.API_ENDPOINT + "/auth";

    static ERROR_400 = "Bad request. Check information again!";
    static ERROR_401 = "Wrong username or password. Try again!";
    static ERROR_403 = "You are not allowed here. Try again!";
    static ERROR_404 = "Page not found. Try again!";
    static ERROR_500 = "Server error. Try again!";
    static WARNING_REDIRECT = "Returning to login. Please wait.";

    static SweetAlert = class {
        static showSuccessAlert(t) {
            Swal.fire({
                icon: 'success',
                text: t,
                position: 'center',
                showConfirmButton: false,
                timer: 800,
            })
        }

        static showErrorAlert(t) {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                text: t,
                timer: 2000,
            })
        }

        static showChangeStatusDialog(status) {
            return Swal.fire({
                icon: `question`,
                text: `${status ? questionToActive : questionToDisable}`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#5a6268',
                confirmButtonText: btnAgree,
                cancelButtonText: btnDisagree,
            })
        }

        static showDeleteDialog() {
            return Swal.fire({
                icon: `warning`,
                text: deleteGroup,
                showCancelButton: true,
                confirmButtonColor: '#C21010',
                cancelButtonColor: '#5a6268',
                confirmButtonText: btnAgree,
                cancelButtonText: btnDisagree,
            })
        }

        static showTimeOut(title, text, time, action) {
            let timerInterval;
            return Swal.fire({
                title: title,
                html: `${text}<br>in <b></b> seconds.`,
                timer: time,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                        b.textContent = Math.round(Swal.getTimerLeft() / 1000)
                    }, 1000)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    action();
                }
            })
        }
    }

    static IziToast = class {
        static showSuccessAlert(t) {
            iziToast.success({
                title: 'Success',
                position: 'topRight',
                timeout: 2500,
                message: t
            });
        }

        static showErrorAlert(t) {
            iziToast.error({
                title: 'Error',
                position: 'topRight',
                timeout: 3500,
                message: t
            });
        }
    }

    static handleFailedTasks(jqXHR) {
        switch (jqXHR.status) {
            case 400:
                this.IziToast.showErrorAlert(this.ERROR_400);
                break;
            case 401:
                this.IziToast.showErrorAlert(this.ERROR_401);
                break;
            case 403:
                this.SweetAlert.showErrorAlert(this.ERROR_403);
                break;
            case 404:
                this.IziToast.showErrorAlert(this.ERROR_404);
                break;
            case 409:
                this.IziToast.showErrorAlert(jqXHR);
                break;
            default:
                this.IziToast.showErrorAlert(this.ERROR_500);
                break;
        }
    }

    static redirectToLogin(timeout) {
        setTimeout(() => {
            location.href = "/logout";
        }, timeout);
    }
}

class CartProductParam {
    constructor(productId, quantity, sizeId) {
        this.productId = productId;
        this.quantity = quantity;
        this.sizeId = sizeId;
    }
}
