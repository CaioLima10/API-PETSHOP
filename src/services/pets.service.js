import PetRepository from '../repositories/pets.repository.js'

class PetService {

  async createById({nome, idade, peso, raca, proprietarioId }) {
  try {
    const donoEncontrado = await PetRepository.proprietarioId({ proprietarioId })
    
    if(donoEncontrado) {
      throw new Error('Proprietário já existe, cpf já cadastrado!');
    }
  } catch (error) {
    return await PetRepository.create({ nome, idade, peso, raca, proprietarioId})
    
  }}

    
async list() {
   try {
    return await PetRepository.list()
   } catch (error) {
    throw error
   }
}

async listById({ petId }) {
  try {
    const result = await PetRepository.listById({ petId })

    if(!result) {
      throw new Error("Pet não encontrado")
    }
    
    return { proprietario: result}
  } catch (error) {
    throw error
  }
}


  update({nome, idade, peso, raca, petId}) {
    const indexPet = pets.findIndex(({ id }) => id === petId);
    
    if(indexPet === -1) {
      return {
        isError: true,
        message: 'Pet não encontrado!'
      };
    };

    pets[indexPet].nome = nome;
    pets[indexPet].idade = idade;
    pets[indexPet].peso = peso;
    pets[indexPet].raca = raca;
  }

  delete({petId}) {
    const indexPet = pets.findIndex(({ id }) => id === petId);

    if(indexPet === -1) {
      return {
        isError: true,
        message: 'Pet não encontrado'
      };
    };
      
    pets.splice(indexPet, 1);
  }

}
export default new PetService()