require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivos');
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    ejemplo
} = require('./helpers/inquirer');

//const Tarea = require('./models/terea');
const Tareas = require('./models/tareas');

// console.clear();

// const tarea1 = new Tarea('Debo seguir hasta que no pueda mas, hasta que no pueda mas.');
// const tarea2 = new Tarea('Debo seguir hasta que todo termine, hasta que todo termine.');
// const tarea3 = new Tarea('Debo seguir hasta mi corazon no pueda mas, hasta que no pueda mas.');
// 
// console.log(tarea1);
// console.log(tarea2);
// console.log(tarea3);
// 
// const tareas = new Tareas();
// tareas._listado[tarea1.id] = tarea1;
// tareas._listado[tarea2.id] = tarea2;
// tareas._listado[tarea3.id] = tarea3;
// 
// console.log(tareas);
// 
// console.log(tareas.listadoArr);

// const ejemp1 = {
//     ejemplo: 'Hola mami',
//     ejemplo2: 2
// }
// 
// const ejem = Object.assign({}, ejemp1);
// 
// console.log(ejem)


// Programa ejecutando
const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ){
        tareas.cargarTareasDBArray( tareasDB );
    };

    await pausa();

    do {

        // Imprime el menú
        opt = await inquirerMenu()

        // Interacción con el menú 
        switch ( opt ) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
            break;
    
            case '2':
                // Ver listado de tareas
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.tareasCompletadasPendientes();
            break;
            
            case '4':
                tareas.tareasCompletadasPendientes(false);
            break;
                
            case '5':
                
            break;

            case '6':
                
            break;
            
        }

        guardarDB( tareas.listadoArr );

        console.log('\n');

        // Pausa para poder observar lo anterior
        await pausa()

    } while ( opt !== '0' );

}

main();
