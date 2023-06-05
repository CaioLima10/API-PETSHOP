import PetsRepository from '../repositories/pets.repository.js'
class PetService {
  async create({ name, age, weight, race, ownerId }){
    
    const ownerFound = await PetsRepository.ownerId({ ownerId });
    
    if(!ownerFound) {
        throw new Error('ProprietarioId informado não existe!');
    }
    
    return await PetsRepository.create({ name, age, weight, race, ownerId })
  }

  async list() {
    try {
      return await PetsRepository.list();
    } catch (error) {
      throw error
    }
  }

  async listById({ petId }) {
    try {
      const result = await PetsRepository.listById({ petId })

      if(!result) {
        throw new Error("Pet não encontrado")
      }
      
      return { proprietario: result}
    } catch (error) {
      throw error
    }
  }

  async update({name, age, weight, race , petId }) {
    try {
      await PetsRepository.listById({ petId });
      return await PetsRepository.update({  name ,age, weight, race , petId })
    } catch (error) {
      throw error
    }  
  }

  async delete({ petId }) {
    try {
      await PetsRepository.listById({ petId })
      return await PetsRepository.deleteById({ petId })
    } catch (error) {
      throw error
    }
  }
}



export default new PetService()