import PetsRepository from '../repositories/pets.repository.js'
class PetService {
  async create({ nome, idade, peso, raca, proprietarioId }){
    
    const donoEncontrado = await PetsRepository.proprietarioId({ proprietarioId });
    
    if(!donoEncontrado) {
        throw new Error('ProprietarioId informado não existe!');
    }
    
    return await PetsRepository.create({ nome, idade, peso, raca, proprietarioId })
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

  async update({nome, idade, peso, raca , petId }) {
    try {
      await PetsRepository.listById({ petId });
      return await PetsRepository.update({  nome ,idade, peso, raca , petId })
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