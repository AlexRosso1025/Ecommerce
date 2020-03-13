var listadoProducto= [];
var listadoUsuarios= [];
var listadoPedidos= [];
var listadoProductosPedido = [];
var productList ={};
var userList ={};
var carList ={};

function menu (){
    let band = true;
    do{
        let opcion=parseInt(prompt('Ingrese Opcion -> \n1.Usuarios\n2.Productos\n3.Pedidos\n4.Salir'));
        switch(opcion){
            case 1:
                band = menuUsuarios();
                break;
            case 2:
                band =  menuProductos();
                break;
            case 3:
                band =  menuPedidos();
                break;
            case 4:
                alert("Salida Segura");
                band=false;
                break;
            default:
                alert("opcion inválida");
                break;
        }
    }while(band!=false && opcion!=4);  
}

function menuProductos(){
    do{
        var nuevaOpcion = parseInt(prompt('*****PRODUCTOS*****\n1.Crear Producto\n2.Listar Productos\n3.Volver'));
        switch(nuevaOpcion){
            case 1:
                let nombre = prompt("Ingrese nombre");
                let precio = parseInt(prompt("Ingrese Precio"));
                productList = new Producto(nombre,precio);
                agregarProducto(productList);
                break;
            case 2:
                listarProductos();
                break;
            case 3:
                menu();
                break;
            default:
                alert('Opción inválida')
                break;
        }
    }while(nuevaOpcion!=3) 
    return true;
}

function menuUsuarios(){
    do{
        var nuevaOpcion = parseInt(prompt('*****USUARIOS*****\n1.Crear Usuario\n2.Listar Usuarios\n3.Salir'));
        switch(nuevaOpcion){
            case 1:
                let nombre = prompt("Ingrese nombre");
                let apellido = prompt("Ingrese apellido");
                let email = prompt("Ingrese Email");
                let telefono = prompt("Ingrese telefono");
                userList = new Usuario(nombre,apellido,email,telefono);
                agregarUsuario(userList);
                break;
            case 2:
                listarUsuarios();
                break;
            case 3:
                menu();
                break;
            default:
                alert('Opción inválida')
                break;
        }
    }while(nuevaOpcion!=3)
    return true;
}

function menuPedidos(){
    do{
        var nuevaOpcion = parseInt(prompt('*****PEDIDOS*****\n1.Crear Pedido\n2.Listar Pedidos\n3.Salir'));
        switch(nuevaOpcion){
            case 1:
                listarUsuarios();
                let indexUsuario = prompt("Seleccione Index Usuario");
                let usuario = listadoUsuarios[indexUsuario];
                console.log(usuario);
                do{
                    estaOpcion=parseInt(prompt('*****PRODUCTOS DEL PEDIDOS*****\n1.Ingresar Producto\n2.Salir'));
                    if(estaOpcion==1){
                        listarProductos();
                        let indexProducto = prompt("Seleccione Index Producto");
                        let producto = listadoProducto[indexProducto];
                        agregarProductoCarrito(producto);
                    }
                }while(estaOpcion!=2);
                pedido = new Pedido(usuario,totalProductosPedido());
                agregarPedido(pedido);
                break;
            case 2:
                listarPedidos();
                break;
            case 3:
                menu();
                break;
            default:
                alert('Opción inválida')
                break;
        }
    }while(nuevaOpcion!=3)
    return true;
}

function agregarProductoCarrito(producto){
    listadoProductosPedido.push(producto)
}

function totalProductosPedido(){
    return listadoProductosPedido;
}

function agregarProducto(producto){
    listadoProducto.push(producto);
}

function listarProductos(){
    let itemProducto;
    let resultado = '';
    for(i in listadoProducto){
        itemProducto=listadoProducto[i];
        resultado+="["+i+"] "+ "- Nombre: "+itemProducto.nombre + " - Precio: " + itemProducto.precio + "\n";
    }
    alert(resultado);
}

function agregarUsuario(usuario){
    listadoUsuarios.push(usuario);
}

function listarUsuarios(){
    let itemUsuario;
    let resultado = '';
    for(i in listadoUsuarios){
        itemUsuario=listadoUsuarios[i];
        resultado+="["+i+"] "+ "-Nombre: "+itemUsuario.nombre + " -Apellido: " + itemUsuario.apellido 
        + "-Email: "+itemUsuario.email + " -Telefono: " + itemUsuario.telefono + "\n";
    }
    alert(resultado);
}

function agregarPedido(pedido){
    listadoPedidos.push(pedido);
}

function listarPedidos(){
    let itemPedido;
    let itemProductoPedido;
    let resultadoPedido = '';
    let resultado = '';
    let suma =0;
    for(i in listadoPedidos){
        itemPedido=listadoPedidos[i];
        for(j in itemPedido.productos){
            itemProductoPedido=itemPedido.productos[j];
            resultadoPedido+= "["+j+"] " + "-Nombre: " + itemProductoPedido.nombre + " -Precio " + itemProductoPedido.precio;
            suma += parseInt(itemProductoPedido.precio);
        }
        
        resultado+= "["+i+"] "+ "-Usuario: "+itemPedido.usuario.nombre + " -Productos: " + resultadoPedido+" -Total: " + suma +"\n"; 
    }
    alert(resultado);
}


class Producto{
    constructor(nombre,precio){
        this.nombre=nombre;
        this.precio=precio;
    }
}

class Usuario{
    constructor(nombre,apellido,email,telefono){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.telefono=telefono;
    }
}

class Pedido{
    constructor(usuario,productos){
        this.usuario=usuario;
        this.productos=productos;
    }
}

menu();