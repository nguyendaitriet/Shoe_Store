page.dialogs.element.formLogin.validate({
    onkeyup: function (element) {
        $(element).valid()
    },
    onclick: false,
    onfocusout: false,
    rules: {
        username: {
            required: true,
            email: true
        },
        password: {
            required: true
        },
    },
    messages: {
        username: {
            required: 'This field is required.',
            email: 'Please enter correct email format.'
        },
        password: {
            required: 'This field is required.'
        },
    },
    submitHandler: function () {
        page.dialogs.commands.login();
    }
})

page.dialogs.element.formRegister.validate({
    onkeyup: function (element) {
        $(element).valid()
    },
    onclick: false,
    onfocusout: false,
    rules: {
        fullNameCre: {
            required: true
        },
        usernameCre: {
            required: true,
            email: true
        },
        passwordCre: {
            required: true
        },
        passwordConfirm: {
            required: true,
            equalTo: '#password-create'
        },
    },
    messages: {
        fullNameCre: {
            required: 'This field is required.'
        },
        usernameCre: {
            required: 'This field is required.',
            email: 'Please enter correct email format.'
        },
        passwordCre: {
            required: 'This field is required.'
        },
        passwordConfirm: {
            required: 'This field is required.',
            equalTo: 'Please enter the same password.'
        },
    },
    submitHandler: function () {
        page.dialogs.commands.register();
    }
})