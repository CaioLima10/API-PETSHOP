import ProprietarioService from '../services/proprietarios.service.js'

class ProprietarioController {
  async create(request, response) {
    try {
      const { nome, cpf, telefone } = request.body;
      await ProprietarioService.create({ nome, cpf, telefone });

      return response.status(201).send('Proprietário cadastrado com sucesso');
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(_request, response) {
    try {
      const result = await ProprietarioService.list();
      return response.json(result);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
  
  async listById(request, response) {
    try {
      const result = await ProprietarioService.listById({ 
        proprietarioId: request.params.id
      });

      return response.json(result);
    } catch (error) {
    return response.status(404).json({ message: error.message });
    }
  }

 async listPetsProprietario(request, response) {
    try {
      const result = await ProprietarioService.listPetsProprietario({ 
        proprietarioId: request.params.id
      });

      return response.json(result)
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async updateById(request, response) {
    try {
      const { nome, telefone } = request.body;
      const { id: proprietarioId } = request.params;
      
      await ProprietarioService.update({ nome, telefone, proprietarioId })
      return response.status(204).send()
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async deleteById(request, response) {
    try {
      await ProprietarioService.delete({
        proprietarioId: request.params.id
      })
      
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new ProprietarioController();