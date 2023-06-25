import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  searchAll() {
    const items = fighterRepository.getAll();
    if (items.length === 0) {
      throw Error("fighters not found");
    }
    return items;
  }


  search(search) {
    const item = fighterRepository.getOne(search);
    console.log("item",item)
    if (!item) {
      return null;
    }
    return item;
  }


  create(newFighter) {
    const item = fighterRepository.create(newFighter);
    if (!item) {
      throw Error("fighter not create");
    }
    return item;
  }
  put(id, data) {


    const item = fighterRepository.update(id, data);

    if (!item) {
      throw Error("fighter not update");
    }
    return item;
  }
  delete(id) {
    const item = fighterRepository.delete(id);

    if (item.length === 0) {
      throw Error("fighter not found");
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
