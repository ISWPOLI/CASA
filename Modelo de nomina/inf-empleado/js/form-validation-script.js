var Script = function () {

    $.validator.setDefaults({
        submitHandler: function() { alert("Guardado!"); }
    });

    $().ready(function() {
        // validate the comment form when it is submitted
        $("#feedback_form").validate();

        // validate signup form on keyup and submit
        $("#register_form").validate({
            rules: {
                fullname: {
                    required: true,
                    minlength: 6
                },
                 resp: {
                    required: true,
                    
                },
                 fechana: {
                    required: true,
                    
                },
                address: {
                    required: true,
                    minlength: 10
                },
                
                tarea: {
                    required: true,
                    minlength: 10
                },
                asig: {
                    required: true,
                    
                },
                 identif: {
                    required: true,
                    minlength: 10
                },
                username: {
                    required: true,
                    minlength: 5
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                topic: {
                    required: "#newsletter:checked",
                    minlength: 2
                },
                agree: "required"
            },
            messages: {                
                fullname: {
                    required: "Por favor ingrese su nombre completo.",
                    minlength: "El nombre debe tener como minimo 8 caracteres."
                },
                identif: {
                    required: "Por favor ingrese su identificación.",
                    minlength: "su identificacion no puede ser menos de 8 caracteres."
                },
                fechana: {
                    required: "Ingrese una fecha",
                 
                },
                resp: {
                    required: "Escoga a un responsable de la tarea",
                    
                },
                asig: {
                    required: "Escoga quien asigno la tarea",
                    
                },
                tarea: {
                    required: "Debe dar una descripcion de la tarea",
                    
                },
                address: {
                    required: "Ingrese una direccion.",
                    minlength: "Su dirección debe constar de al menos 10 caracteres."
                },
                username: {
                    required: "Please enter a Username.",
                    minlength: "Your username must consist of at least 5 characters long."
                },
                password: {
                    required: "Please provide a password.",
                    minlength: "Your password must be at least 5 characters long."
                },
                confirm_password: {
                    required: "Please provide a password.",
                    minlength: "Your password must be at least 5 characters long.",
                    equalTo: "Please enter the same password as above."
                },
                email: "Please enter a valid email address.",
                agree: "Por favor acepte los terminos y condiciones."
            }
        });

        // propose username by combining first- and lastname
        $("#username").focus(function() {
            var firstname = $("#firstname").val();
            var lastname = $("#lastname").val();
            if(firstname && lastname && !this.value) {
                this.value = firstname + "." + lastname;
            }
        });

        //code to hide topic selection, disable for demo
        var newsletter = $("#newsletter");
        // newsletter topics are optional, hide at first
        var inital = newsletter.is(":checked");
        var topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
        var topicInputs = topics.find("input").attr("disabled", !inital);
        // show when newsletter is checked
        newsletter.click(function() {
            topics[this.checked ? "removeClass" : "addClass"]("gray");
            topicInputs.attr("disabled", !this.checked);
        });
    });


}();