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

    validarRuc(num:String) {          
   
        let numero = num;
      /* alert(numero); */
        let p1:number=0;
        let p2:number=0;
        let p3:number=0;
        let p4:number=0;
        let p5:number=0;
        let p6:number=0;
        let p7:number=0;
        let p8:number=0;
        let p9:number=0;
       
        var suma = 0;      
        var residuo = 0;      
        var pri = false;      
        var pub = false;            
        var nat = false;      
        var numeroProvincias = 22;                  
        var modulo = 11;
                    
        /* Verifico que el campo no contenga letras */                  
        var ok=1;
        let i=0;
        for (i=0; i<numero.length && ok==1 ; i++){
           var n = parseInt(numero.charAt(i));
           if (isNaN(n)) ok=0;
        }
        if (ok==0){
           alert("No puede ingresar caracteres en el número");         
           return false;
        }
                    
        if (numero.length < 10 ){              
           alert('El número ingresado no es válido');                  
           return false;
        }
       
        /* Los primeros dos digitos corresponden al codigo de la provincia */
        let provincia = Number(numero.substr(0,2));      
        if (provincia < 1 || provincia > numeroProvincias){           
           alert('El código de la provincia (dos primeros dígitos) es inválido');
       return false;       
        }
  
        /* Aqui almacenamos los digitos de la cedula en variables. */
        let d1  =Number( numero.substr(0,1));         
        let d2  = Number(numero.substr(1,1));         
        let d3  =Number( numero.substr(2,1));         
        let d4  = Number(numero.substr(3,1));         
        let d5  = Number(numero.substr(4,1));         
        let d6  = Number(numero.substr(5,1));         
        let d7  = Number(numero.substr(6,1));         
        let d8  = Number(numero.substr(7,1));         
        let d9  = Number(numero.substr(8,1));         
        let d10 = Number(numero.substr(9,1));                
           
        /* El tercer digito es: */                           
        /* 9 para sociedades privadas y extranjeros   */         
        /* 6 para sociedades publicas */         
        /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
  
        if (d3==7 || d3==8){           
           alert('El tercer dígito ingresado es inválido');                     
           return false;
        }         
           
        /* Solo para personas naturales (modulo 10) */         
        if (d3 < 6){           
           nat = true;            
           p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
           p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
           p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
           p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
           p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
           p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
           p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
           p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
           p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
           modulo = 10;
        }         
  
        /* Solo para sociedades publicas (modulo 11) */                  
        /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
        else if(d3 == 6){           
           pub = true;             
           p1 = d1 * 3;
           p2 = d2 * 2;
           p3 = d3 * 7;
           p4 = d4 * 6;
           p5 = d5 * 5;
           p6 = d6 * 4;
           p7 = d7 * 3;
           p8 = d8 * 2;            
           p9 = 0;            
        }         
           
        /* Solo para entidades privadas (modulo 11) */         
        else if(d3 == 9) {           
           pri = true;                                   
           p1 = d1 * 4;
           p2 = d2 * 3;
           p3 = d3 * 2;
           p4 = d4 * 7;
           p5 = d5 * 6;
           p6 = d6 * 5;
           p7 = d7 * 4;
           p8 = d8 * 3;
           p9 = d9 * 2;            
        }
                  
        suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
        residuo = suma % modulo;                                         
  
        /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
       let  digitoVerificador = residuo==0 ? 0: modulo - residuo;                
  
        /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/                         
        if (pub==true){           
           if (digitoVerificador != d9){                          
              alert('El ruc de la empresa del sector público es incorrecto.');            
              return false;
           }                  
           /* El ruc de las empresas del sector publico terminan con 0001*/         
           if ( numero.substr(9,4) != '0001' ){                    
              alert('El ruc de la empresa del sector público debe terminar con 0001');
              return false;
           }
        }         
        else if(pri == true){         
           if (digitoVerificador != d10){                          
              alert('El ruc de la empresa del sector privado es incorrecto.');
              return false;
           }         
           if ( numero.substr(10,3) != '001' ){                    
              alert('El ruc de la empresa del sector privado debe terminar con 001');
              return false;
           }
        }      
  
        else if(nat == true){         
           if (digitoVerificador != d10){                          
              alert('El número de cédula de la persona natural es incorrecto.');
              return false;
           }         
           if (numero.length >10 && numero.substr(10,3) != '001' ){                    
              alert('El ruc de la persona natural debe terminar con 001');
              return false;
           }
        }      
        return true;   
     }            
  
}