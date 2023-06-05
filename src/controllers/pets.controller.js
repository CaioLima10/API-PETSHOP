import PetService from '../services/pets.service.js';

class PetController {
  async create(request, response) {
    try {
      const { name, age, Weight, race, ownerId } = request.body;
      await PetService.create({ name, age, Weight, race, ownerId });
        
      return response.status(201).send('Pet cadastrado com sucesso!');

    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async list(_request, response) {
    try {
      const result = await PetService.list();
      return response.json(result);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async listById(request, response) {
    try {
      const result = await PetService.listById({ 
        petId: request.params.id
      });

      return response.json(result);
    } catch (error) {
    return response.status(404).json({ message: error.message });
    }
  }

  async updateById(request , response){
    try {
       const { name , age , weight , race } = request.body
       const { id: petId } = request.params
      
      await PetService.update({ name , age , weight , race , petId })
      return response.status(204).send()

    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

 async deleteById(request, response) {

    try {
        await PetService.delete({
        petId: request.params.id
      });
      
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}



export default new PetController();