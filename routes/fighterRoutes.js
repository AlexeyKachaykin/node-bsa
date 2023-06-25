import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const fighters = fighterService.searchAll()

    if (fighters) {
      res.jsonSuccess(fighters);
    }
    else {
      res.jsonNotFound()
    }
  } catch (err) {

    res.err = err;
    res.jsonNotFound()
  } finally {

    next();
  }
}
);
router.get('/:id', (req, res, next) => {

  try {
    const id = req.params.id;

    const fighter = fighterService.search({ id })

    if (fighter) {
      console.log(fighter)
      res.jsonSuccess(fighter);
    }
    else {
      res.jsonNotFound()
    }
  } catch (err) {

    res.err = err;
    res.jsonNotFound()
  } finally {

    next();
  }
}
);
router.post('/', createFighterValid, (req, res, next) => {
  try {
    const data = req.body
    data.health = 100
    const fighter = fighterService.create(data)

    if (fighter) {
      const fighterWithoutId = { ...fighter };
      delete fighterWithoutId.id;
      
      res.jsonSuccess(fighterWithoutId);
      
    }
    else {
      res.jsonNotFound()
    }
  } catch (err) {

    res.err = err;
    res.jsonNotFound()
  } finally {

    next();
  }
}
);
router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    const data = req.body

    const id = req.params.id;
    const fighter = fighterService.search({ id })

    if (fighter) {


      const fighterUpdate = fighterService.put(id, data)

      if (fighterUpdate) {
       
        res.jsonSuccess(fighterUpdate);
      }
      else {
        res.jsonNotFound()
      }
    }
    else {
      res.jsonNotFound()
    }
  } catch (err) {

    res.err = err;
    res.jsonNotFound()
  } finally {

    next();
  }
}
);

router.delete('/:id', (req, res, next) => {

  try {
    const id = req.params.id;

    const fighterDelete = fighterService.delete(id)

    if (fighterDelete) {
    
      res.jsonSuccess(fighterDelete);
    }
    else {
      res.jsonNotFound()
    }
  } catch (err) {

    res.err = err;
    res.jsonNotFound()
  } finally {

    next();
  }
}
);
export { router };
