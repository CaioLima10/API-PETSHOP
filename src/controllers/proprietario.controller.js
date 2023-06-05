import OwnerService from '../services/proprietarios.service.js'

class OwnerController {
  async create(request, response) {
    try {
      const { name, cpf, telephone } = request.body;
      await OwnerService.create({ name, cpf, telephone });

      return response.status(201).send('Proprietário cadastrado com sucesso');
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(_request, response) {
    try {
      const result = await OwnerService.list();
      return response.json(result);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }
  
  async listById(request, response) {
    try {
      const result = await OwnerService.listById({ 
        ownerId: request.params.id
      });

      return response.json(result);
    } catch (error) {
    return response.status(404).json({ message: error.message });
    }
  }

 async listPetsOwner(request, response) {
    try {
      const result = await OwnerService.listPetsOwner({ 
        ownerId: request.params.id
      });

      return response.json(result)
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async updateById(request, response) {
    try {
      const { name, telephone } = request.body;
      const { id: ownerId } = request.params;
      
      await OwnerService.update({ name, telephone, ownerId })
      return response.status(204).send()
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async deleteById(request, response) {
    try {
      await OwnerService.delete({
        ownerId: request.params.id
      })
      
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new OwnerController();