import OwnerRepository from '../repositories/proprietario.repository.js'

class OwnerService {
  async create({ name, cpf, telephone }) {
    const proprietarioJaCadastrado = await OwnerRepository.listByOwner({ cpf })

    if(proprietarioJaCadastrado) {
      throw new Error('Proprietário já existe, cpf já cadastrado!');
    }

    return await OwnerRepository.create({ name, cpf, telephone })
  }

  async list() {
    try {
      return await OwnerRepository.list();
    } catch (error) {
      throw error
    }
  }

  async listById({ ownerId }) {
    try {
      const result = await OwnerRepository.listById({ ownerId });

      return { owner: result}
    } catch (error) {
      throw error
    }
  }

 async listPetsOwner({ ownerId }) {
    try {
      const ownerFound = await OwnerRepository.listById({ ownerId })

      if(!ownerFound) {
        throw new Error("Proprietário não encontrado")
      }

      const areTherePets = await OwnerRepository.listPetsOwner({ ownerId })

      if(areTherePets.length === 0) {
        throw new Error("Proprietário não possui pets")
      }

      return areTherePets
      
    } catch (error) {
      throw error
    }
  
  }

  async update({ name, telephone, ownerId }) {
    try {
      await OwnerRepository.listById({ ownerId });
      return await OwnerRepository.update({ name, telephone, ownerId })
    } catch (error) {
      throw error
    }  
  }

  async delete({ ownerId }) {
    try {
      const ownerFound = await OwnerRepository.listById({ ownerId })

      if(!ownerFound) {
        throw new Error("proprietário não encontrado")
      }

      const existPets = await OwnerRepository.listPetsOwner({ ownerId })
      
      if(existPets.length > 0 ){
        throw new Error("Por favor deletar primeiro os Pets")
      }
      
      return await OwnerRepository.delete({ ownerId })
    } catch (error) {
      throw error
    }
  }
}

export default new OwnerService()