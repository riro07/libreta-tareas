const { guardarDB } = require('../helpers/guardarArchivos');
const Tarea = require('./terea');
require('colors');

/*
    _listado:
        { 
            'uuid-234234-324242': { 
                id: 3, desc:'tarea a resolver', terminado:20/02/22
            },
            'uuid-234234-324242': { 
                id: 3, desc:'tarea a resolver', terminado:20/02/22
            }
        }

*/

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        
        Object.keys( this._listado ).forEach( key => {
            // accede a su tarea mediante su key unica
            const tarea = this._listado[ key ];
            listado.push( tarea );
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc );
        this._listado[ tarea.id ]= tarea;
    }

    cargarTareasDBArray( data = [] ) {

        data.forEach( d => {
            this._listado[ d.id ]= d; 
        });

    }

    listadoCompleto() {
        
        console.log();

        this.listadoArr.forEach(({ desc, completadoEn }, index)=>{

            const estado = ( completadoEn )? 'Completado'.green : 'Pendiente'.red
            const lista = `${index+1}. ${desc} :: ${estado}`;
        
            console.log(lista);
        
        });
        
    }

    tareasCompletadasPendientes( completadas = true ){
        
        let contador = 0;

        if ( completadas ){
            
            this.listadoArr.forEach(({ desc, completadoEn })=>{
    
                if( completadoEn ){
    
                    contador += 1;

                    const estado = 'Completado'.green; 
                    const lista = `${contador.toString().green}. ${desc} :: ${estado}`;
                
                    console.log(lista);
    
                }
    
            });
        
        }
        
        if ( completadas == false){
         
            this.listadoArr.forEach(({ desc, completadoEn })=>{
            
                if ( completadoEn == null ){
        
                    contador += 1;

                    const estado = 'Pendiente'.red; 
                    const lista = `${contador.toString().green}. ${desc} :: ${estado}`;
                
                    console.log(lista);

                }
 
            })
        }
    };

    //tareasCompletadas(){
    //    
    //    console.log();
//
    //    this.listadoArr.forEach(({ desc, completadoEn }, index)=>{
//
//
    //        if( completadoEn ){
//
    //            const estado = 'Completado'.green; 
    //            const lista = `${index+1}. ${desc} :: ${estado}`;
    //        
    //            console.log(lista);
    //        };
//
    //    
    //    });
    //    
    //};
//
    //tareasPendientes(){
//
    //    console.log();
//
    //    this.listadoArr.forEach(({ desc, completadoEn }, index)=>{
//
//
    //        if( completadoEn === null ){
//
    //            const estado = 'Pendiente'.red; 
    //            const lista = `${index+1}. ${desc} :: ${estado}`;
    //        
    //            console.log(lista);
    //        };
    //    
    //    });
    //};

}

module.exports = Tareas;