const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.gray} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.gray} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.gray} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.gray} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.gray} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.gray} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0 '.gray} Salir`
            }

        ]
    }
];

const inquirerMenu = async () => {

    console.clear();
    console.log('============================='.green);
    console.log('============================='.green);
    console.log('    Seleccione una opción    ');
    console.log('============================='.green);
    console.log('=============================\n'.green);
    
    const { opcion } = await inquirer.prompt(preguntas);
    
    

    return opcion;

}


const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'opcion',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    
    await inquirer.prompt(question);

}

// const ejemplo = () => {
// 
//     return new Promise( resolve =>{
//         
//         const question = [
//             {
//                 type: 'input',
//                 name: 'opcion',
//                 message: `Presione ${'ENTER'.green} para continuar`
//             }
//         ];
//         
//         resolve( inquirer.prompt(question) );
// 
//     })
// 
// };

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ]

    // Recibe un objeto. La desestructuración toma la propiedad del mismo.
    const { desc } = await inquirer.prompt( question );
    
    return desc;

};


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    //ejemplo
}