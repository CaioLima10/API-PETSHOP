import ProprietarioRepository from '../repositories/proprietario.repository.js'

class ProprietarioService {
  async create({ nome, cpf, telefone }) {
    const proprietarioJaCadastrado = await ProprietarioRepository.listByProprietario({ cpf })

    if(proprietarioJaCadastrado) {
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

  listPetsProprietario({proprietarioId}) {
    const proprietarioEncontrado = proprietarios.find((proprietario) => proprietario.id === proprietarioId);
  
    if(!proprietarioEncontrado) {
      return {
        isError: true,
        message: 'Proprietario não encontrado!'
      };
    };
  
    const petsDoProprietario = pets.filter(pet => pet.proprietarioId === proprietarioId);
    if(petsDoProprietario.length === 0) {
      return {
        isError: true,
        message: 'Proprietário não possui pets!'
      };
    };

    return {
      proprietario: proprietarioEncontrado.nome,
      pets: petsDoProprietario
    };
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
      return await ProprietarioRepository.delete({ proprietarioId })
    } catch (error) {
      throw error
    }
  }
}

export default new ProprietarioService()