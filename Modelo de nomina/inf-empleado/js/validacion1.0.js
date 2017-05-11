/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.mostrarError = function(elemento, mensaje) {
    elemento.html(mensaje);
    elemento.show();
    return false;
};
$.fn.validarFormulario = function(opciones) {
    var rta = true;
    $("#" + $(this).attr("id") + " :input[itemForm]").each(function() {
        if (!$("input[itemForm=" + $(this).attr("itemForm") + "]").validarCampo()) {
            rta = false;
        }
    });
    return rta;
};
$.fn.cargarValidarFormulario = function(opciones) {
    $(".errorValidacion").hide();

    $("#" + $(this).attr("id") + " :input[itemForm]").each(function() {
        $("input[itemForm=" + $(this).attr("itemForm") + "]").keyup(function() {
            $(this).validarCampo();
        });
    });
};

$.fn.validarCampo = function(opciones) {
    var defaults = {
        mensajes: {
            min: "El campo debe tener como mínimo ",
            max: "El campo no puede tener más de ",
            numeros: "El campo solo admite números.",
            letras: "El campo solo admite letras.",
            telFijo: "El Nº telefónico debe tener:<br>> Mínimo 7 dígitos.<br>> Máximo 9 con el indicativo.",
            telMovil: "El Nº telefónico debe tener 10 dígitos.",
            fecha: "La fecha debe tener el siguiente formato:<br>dd/mm/aaaa",
            email: "Dirección de correo no valida.",
            contra: "Las contraseña no coinciden",
            requerido: "El campo no puede estar vacio."
        }
    };
    var opciones = $.extend(defaults, opciones);

    var valor = this.val();
    $(this).next().remove();
    $(this).after('<span class="errorValidacion"></span>');
    var elementoError = this.next();
    elementoError.show();
    if (this.attr("requerido")) {
        if (valor === "") {
            var tag = $(this).get(0).tagName.toLowerCase();
            if (tag === "select"
                    || (tag === "input"
                            && (this.attr("type") === "checkbox"
                                    || this.attr("type") === "radio"))) {
                return $.mostrarError(elementoError, "Debe seleccionar alguna opcción.");
            } else {
                return $.mostrarError(elementoError, defaults.mensajes.requerido);
            }
        }
    }
    if (valor !== "") {
        if (this.attr("numeros")) {
            if (!/^\d+$/.test(valor)) {
                return $.mostrarError(elementoError, defaults.mensajes.numeros);
            }
        }
        if (this.attr("letras")) {
            if (!/^[a-zA-z]+$/.test(valor)) {
                return $.mostrarError(elementoError, defaults.mensajes.letras);
            }
        }
        if (this.attr("telFijo")) {
            if (!/^\d{7,9}$/.test(valor)) {
                return $.mostrarError(elementoError, defaults.mensajes.telFijo);
            }
        }
        if (this.attr("telMovil")) {
            if (!/^\d{10}$/.test(valor)) {
                return $.mostrarError(elementoError, defaults.mensajes.telMovil);
            }
        }
        if (this.attr("fecha")) {
            if (!/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4}){1}$/.test(valor)) {
                return $.mostrarError(elementoError, defaults.mensajes.fecha);
            } else {
                var temp = valor.split("/");
                var dia = parseInt(temp[0]);
                var mes = parseInt(temp[1]);
                var año = parseInt(temp[2]);
                if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || (año > 99 && año < 1850)) {
                    return $.mostrarError(elementoError, "Fecha no válida. Verifique la fecha.");
                }
            }
        }
        if (this.attr("email")) {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)) {
                return $.mostrarError(elementoError, defaults.mensajes.email);
            }
        }
        if (this.attr("min") !== 0) {
            if (valor.length < this.attr("min")) {
                return $.mostrarError(elementoError, defaults.mensajes.min + this.attr("min") + " caracteres.");
            }
        }
        if (this.attr("max") !== 0) {
            if (valor.length > this.attr("max")) {
                return $.mostrarError(elementoError, defaults.mensajes.max + this.attr("max") + " caracteres.");
            }
        }
        if (this.attr("contra")) {
            if ($(this).parent().parent().children().children("input[type=password]:first").val() !== valor) {
                return $.mostrarError(elementoError, defaults.mensajes.contra);
            }
        }
    }


    if ($.isFunction(opciones.onComplete)) {
        opciones.onComplete.call();
    }
    elementoError.hide();
    return true;
};

