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
                name: `${'0.'.gray} Salir`
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

const menuBorrar = async ( tareas = [] ) => {

    const choices = tareas.map(( tarea, index ) =>{
        
        const idx = `${index+1}.`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Atras'
    });

    //choices.push({value: '0', name: `${'0.'.green} Salir`});

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );
    return id;

};

const confirmacion = async ( message )=>{

    const confirma = [
        {
            type: 'confirm',
            name: 'validar',
            message
        }
    ]

    const { validar } = await inquirer.prompt( confirma );
    return validar;

}

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

const completarTarea = async ( tareas = [] ) =>{

    const choices = tareas.map(( tarea, index ) =>{
        
        const idx = `${index+1}.`.green;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn )? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( pregunta );
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    menuBorrar,
    confirmacion,
    completarTarea
}