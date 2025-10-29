const PLAYER_IMAGES = [
	'images/playerIcon1.jpg',
	'images/playerIcon2.jpg',
	'images/playerIcon3.jpg',
	'images/playerIcon4.jpg',
];

function _pickPlayerImage(playerName) {
	if( !playerName || PLAYER_IMAGES.length === 0 ) {
		return ''
	}

	const sum = Math.floor(Math.random() * PLAYER_IMAGES.length);

	return PLAYER_IMAGES[ sum % PLAYER_IMAGES.length ];
}



class Jugador{
    #nombre;		// nombre del jugador
    #mazos;			// array con los mazos del jugador
    #puntos;		// puntos acumulados en combates
	#mazoElegido;	// índice del mazo seleccionado para el combate (-1 si no hay mazo seleccionado)
    
    constructor(nombre){
      this.#nombre = nombre;
      this.#mazos=[];
		  this.#mazoElegido = -1;
		  this.#puntos = 0;
    }
	
    getNombre(){
        return this.#nombre;
    }
    
    getPuntos(){
        return this.#puntos;
    }
    
	// Añade un mazo a la colección de mazos. Si solo hay un mazo, lo elige de forma automática
    addMazo(mazo){
        // Copiamos el contenido del mazo
        
        mazo.setPropietario(this.#nombre);
        this.#mazos.push(mazo);
        
		if (this.#mazos.length === 1){
			this.elegirMazo(0);
		}
    }
    
	// Saca por pantalla todos los mazos y su contenido
    listMazos(){
        console.log("-- Mazos del jugador " + this.#nombre);
		for (let i=0; i<this.#mazos.length; i++){
			let mazo = this.#mazos[i].print();
		}
    }
	
	// Elige el mazo indicado para el siguiente combate
	elegirMazo(numeroMazo){
		if (numeroMazo >= 0 && numeroMazo < this.#mazos.length){
			this.#mazoElegido = numeroMazo;
		} else {
			console.log(this.#nombre + " no puede elegir ese mazo (" + numeroMazo +"): fuera de límites");
		}
	}
	
	getMazoElegido(){
		return this.#mazos[this.#mazoElegido];
	}
	
	sacarCarta(){
		return this.getMazoElegido().sacarCarta();
	}
	
	recogerCarta(carta){
		this.getMazoElegido().devolverCarta();
	}
	
	render(zona){
		zona.innerHTML = "";

		const cont = document.createElement('div');
		cont.className = 'player-container';

		const img = document.createElement('img');
		img.src = _pickPlayerImage( this.#nombre );
		img.alt = this.#nombre;
		img.className = 'player-icon';

		const nombreElto = document.createElement('h3');
		nombreElto.textContent = this.#nombre;

		cont.appendChild(img);
		cont.appendChild(nombreElto);

		zona.appendChild(cont);

	}
	
	#getinfoZoneName(){
		return this.getNombre()+"_info";
	}

}
