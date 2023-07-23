export class Validaciones {


    validarDni(dni: string): boolean {

        const formatoDni: RegExp = /^[0-9]{10}$/;
        if (formatoDni.test(dni)) {
            let digito = 0, suma = 0, resultado = 0;

            for (let i = 0; i < dni.length; i++) {
                digito = parseInt(dni.charAt(i))

                if (i % 2 == 0) {
                    digito = digito * 2;

                    if (digito > 9) {

                        digito = digito - 9;

                    }

                }

                suma = suma + digito;
            }
            if (suma % 10 != 0) {
                resultado = 10 - (suma % 10);

                if (resultado == digito) {
                    //cedula valida 
                    return true;
                } else {
                    //cedula no valida
                    return false;
                }
            } else {
                //cedula valida
                return true;
            }
        } else {
            //la cedula no contiene los 10 digitos
            return false;
        }
    }

    generarCodigoVeri(): number {
        let randomNumber = Math.floor(Math.random() * 9000) + 1000;
        return randomNumber;
    }

    validarCorreo(gmail: string): boolean {
        //  const formatoGmail: RegExp= /^\w+([\._-]?\w+)*@\w+([\._-]+\w+)*(\.\w{2,3,4}+$)/;
        const formatoGmail: RegExp = /^\w+([\._-]?\w+)*@\w+([\._-]?\w+)*(\.\w{2,4}$)/;
        if (formatoGmail.test(gmail)) {
            return true;

        } else {
            return false;

        }
    }

    validarUsuario(user: string): boolean {
        const formatoUser: RegExp = /^(?:ñ|Ñ|[a-z-A-z0-9@\-/:()&]){5,15}$/;

        if (formatoUser.test(user)) {
            return true;
        } else {
            return false;
        }
    }

    calcularEdad(fecha: Date) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    validarTelefono(telefono: string): boolean {

        if (telefono === "") {
            return true;
        } else {
            const formatoMovil: RegExp = /^[0-9]{7}([0-9]{2})?$/

            return formatoMovil.test(telefono);
        }

    }

    validarMovil(movil: string): boolean {
        const formatoMovil: RegExp = /^[0-9]{10}$/

        return formatoMovil.test(movil);
    }

    validarContrasena(pass: string): boolean {
        const formatoPass: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-/:()&@])[a-zA-Z0-9@\-/:()&]{6,12}$/
        return formatoPass.test(pass);
    }

    validarNombre(name: string) {

        const formatoName: RegExp = /^(?:ñ|Ñ|[A-Z]){3,12}(?: (?:ñ|Ñ|[A-Z]){3,12})?$/
        //da error y es suman los dos minimos porque si no hay espacio 
        //pasa a formar la segunda parte parte de la primera
        //const formatoName: RegExp = /^(?:ñ|Ñ|[A-Z]){2,12} ?(?:ñ|Ñ|[A-Z])?$/

        return formatoName.test(name);
    }


    validarApellido(lastName: string) {
        const formatoName: RegExp = /^(?:ñ|Ñ|[A-Z]){3,12} (?:ñ|Ñ|[A-Z]){3,12}$/
        return formatoName.test(lastName);
    }
}