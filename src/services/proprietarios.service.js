import ProprietarioRepository from '../repositories/proprietario.repository.js'

class ProprietarioService {
  async create({ nome, cpf, telefone }) {
    const proprietarioJaCadastrado = await ProprietarioRepository.listByProprietario({ cpf , telefone })

    if(!proprietarioJaCadastrado) {
      throw new Error('Proprietário já existe, cpf já cadastrado!');
    }

    return await ProprietarioRepository.create({ nome, cpf, telefone })
  }

  async list() {
    try {
      return await ProprietarioRepository.list();
    } catch (error) {
      throw error
    }
  }

  async listById({ proprietarioId }) {
    try {
      const result = await ProprietarioRepository.listById({ proprietarioId });

      return { proprietario: result}
    } catch (error) {
      throw error
    }
  }

 async listPetsProprietario({proprietarioId}) {

    try {

      const proprietarioEncontrado = await ProprietarioRepository.listById({ proprietarioId })

      console.log(proprietarioEncontrado)

      return await ProprietarioRepository.listPetsProprietario({ proprietarioId })
      
    } catch (error) {
      throw error
    }
  
  }

  async update({ nome, telefone, proprietarioId }) {
    try {
      await ProprietarioRepository.listById({ proprietarioId });
      return await ProprietarioRepository.update({ nome, telefone, proprietarioId })
    } catch (error) {
      throw error
    }  
  }

  async delete({ proprietarioId }) {
    try {
      await ProprietarioRepository.listById({ proprietarioId })

      const existPets = await ProprietarioRepository.listPetsProprietario({ proprietarioId })

      if(existPets.length > 0 ){
      return new Error("Por favor deletar primeiro os Pets")
      }
      
      return await ProprietarioRepository.delete({ proprietarioId })
    } catch (error) {
      throw error
    }
  }
}

export default new ProprietarioService()