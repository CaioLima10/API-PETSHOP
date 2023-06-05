export function validateOwnerMiddleware(request, response, next) {
  const { name, cpf, telephone } = request.body;
  
  if(!name || !cpf || !telephone){
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

  if(typeof telephone !== 'string') {
    return response.status(404).send('telefone precisa ser string')
  }

  if(telephone.length !== 9) {
    return response.status(404).send('telefone precisa ter 9 números')
  }
  next();
}

export function validateOwnerMiddlewareUpdate(request, response, next) {
  const { name, telephone } = request.body;

  if(!name || !telephone ){
    return response.status(404).json({
      message: 'Necessário enviar os dados: nome e telefone',
    });
  };

  if(typeof telephone !== 'string') {
    return response.status(404).send('telefone precisa ser string');
  };

  if(telephone.length !== 9) {
    return response.status(404).send('telefone precisa ter 11 números');
  };
  next();
}