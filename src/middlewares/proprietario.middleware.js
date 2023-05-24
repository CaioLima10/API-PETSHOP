export function validateProprietarioMiddleware(request, response, next) {
  const { nome, cpf, telefone } = request.body;
  
  if(!nome || !cpf || !telefone){
    return response.status(404).json({
      message: 'Necessário enviar os dados: nome, cpf e telefone',
    });
  };

   if(typeof cpf !== 'string') {
    return response.status(404).send('cpf precisa ser string')
  }
  
  if(cpf.length !== 11) {
    return response.status(404).send('cpf precisa ter 11 números')
  }

  if(typeof telefone !== 'string') {
    return response.status(404).send('telefone precisa ser string')
  }

  if(telefone.length !== 9) {
    return response.status(404).send('telefone precisa ter 9 números')
  }
  next();
}

export function validateProprietarioMiddlewareUpdate(request, response, next) {
  const { nome, telefone } = request.body;

  if(!nome || !telefone ){
    return response.status(404).json({
      message: 'Necessário enviar os dados: nome e telefone',
    });
  };

  if(typeof telefone !== 'string') {
    return response.status(404).send('telefone precisa ser string');
  };

  if(telefone.length !== 9) {
    return response.status(404).send('telefone precisa ter 11 números');
  };
  next();
}