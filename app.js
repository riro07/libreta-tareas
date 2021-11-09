require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivos');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    menuBorrar,
    confirmacion,
    completarTarea
} = require('./helpers/inquirer');

//const Tarea = require('./models/terea');
const Tareas = require('./models/tareas');

// Programa ejecutando
const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        tareas.cargarTareasDBArray( tareasDB );
    };

    //await pausa();

    do {

        // Imprime el menú
        opt = await inquirerMenu()

        // Interacción con el menú 
        switch ( opt ) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
            break;
    
            case '2': // Ver listado de tareas
                tareas.listadoCompleto();
            break;

            case '3': // Listado tareas completas
                tareas.tareasCompletadasPendientes(true);
            break;
            
            case '4': // Listado tareas pendientes
                tareas.tareasCompletadasPendientes(false);
            break;
                
            case '5': // Toggle completado | pendiente
                const ids = await completarTarea( tareas.listadoArr );
                tareas.toggleTareas( ids );
            break;

            case '6': // Borrar
                //console.log( tareas.listadoArr );
                const id = await menuBorrar( tareas.listadoArr );
                
                if ( !(id === '0')){
                    const valor = await confirmacion('¿Estás seguro de eliminar está tarea?');
                    if (valor == true){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                };
                
            break;
            
        }

        guardarDB( tareas.listadoArr );

        console.log('\n');

        // Pausa para poder observar lo anterior
        await pausa()

    } while ( opt !== '0' );

}

main();
