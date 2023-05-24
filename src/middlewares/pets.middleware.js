export function validatePetMiddleware(request, response, next) { 

  const { nome, idade, peso, raca, proprietarioId } = request.body;

  if(!nome || !idade || !peso || !raca || !proprietarioId){
    return response.status(404).json({
      message: 'Necessário cadastrar todos os dados: nome, idade, peso, raca, roprietarioId',
    });
  }

  if(typeof idade !== 'number') {
    return response.status(404).send('"idade" precisa ser number')
  }
  if(typeof peso !== 'number') {
    return response.status(404).send('"peso" precisa ser number')
  }
  next();
}
export function validatePetMiddlewareUpdate(request, response, next) { 
  const { nome, idade, peso, raca } = request.body;
  
  if(!nome || !idade ||!peso || !raca) {
    return response.status(404).json({
      message: 'Necessário atualizar todos os dados: nome, idade, peso e raca',
    });
  };

  if(typeof idade !== 'number') {
    return response.status(404).send('"idade" precisa ser number');
  };

  if(typeof peso !== 'number') {
    return response.status(404).send('"peso" precisa ser number');
  };
  next();
}
