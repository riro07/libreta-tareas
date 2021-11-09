require('colors');
const Tarea = require('./terea');

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

    borrarTarea( id = '' ){

        if( this._listado[id] ){
            delete this._listado[id];
        }
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

                    const estado = completadoEn.toString().green; 
                    const lista = `${ (contador + '.').green } ${desc} :: ${estado}`;
                
                    console.log(lista);
    
                }
    
            });
        
        }
        
        if ( completadas == false){
         
            this.listadoArr.forEach(({ desc, completadoEn })=>{
            
                if ( completadoEn == null ){
        
                    contador += 1;

                    const estado = 'Pendiente'.red; 
                    const lista = `${(contador + '.').green} ${desc} :: ${estado}`;
                
                    console.log(lista);

                }
 
            })
        }
    };

    toggleTareas( ids = [] ){
            
        ids.forEach( id =>{
            const tareas = this._listado[ id ];

            if ( !tareas.completadoEn ){
                tareas.completadoEn = new Date().toDateString()
            }
        });

        this.listadoArr.forEach( tarea =>{
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }

}

module.exports = Tareas;