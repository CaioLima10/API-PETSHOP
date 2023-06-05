export function validatePetMiddleware(request, response, next) { 

  const { name, age, weight, race, ownerId } = request.body;

  if(!name || !age || !weight || !race || !ownerId){
    return response.status(404).json({
      message: 'Necessário cadastrar todos os dados: nome, idade, peso, raca, roprietarioId',
    });
  }

  if(typeof age !== 'number') {
    return response.status(404).send('"idade" precisa ser number')
  }
  if(typeof race !== 'number') {
    return response.status(404).send('"peso" precisa ser number')
  }
  next();
}
export function validatePetMiddlewareUpdate(request, response, next) { 
  const { name, age, weight, race } = request.body;
  
  if(!name || !age ||!weight || !race) {
    return response.status(404).json({
      message: 'Necessário atualizar todos os dados: nome, idade, peso e raca',
    });
  };

  if(typeof age !== 'number') {
    return response.status(404).send('"idade" precisa ser number');
  };

  if(typeof race !== 'number') {
    return response.status(404).send('"peso" precisa ser number');
  };

  

  next();
}
