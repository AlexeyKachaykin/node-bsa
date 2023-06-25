import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";


const router = Router();
router.get('/', (req, res, next) => {
  try {
    const users = userService.searchAll()

    if (users) {

      res.jsonSuccess(users);
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

    const user = userService.search({ id })

    if (user) {

      res.jsonSuccess(user);
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

router.post('/', createUserValid, (req, res, next) => {
  try {
    const data = req.body
   
    const userNew = userService.create(data)
    
    if (userNew) {
      const userNewWithoutId = { ...userNew };
      delete userNewWithoutId.id;
      
      res.jsonSuccess(userNewWithoutId);
      
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
router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    const data = req.body

    const id = req.params.id;
    const user = userService.search({ id })

    if (user) {
      const userUpdate = userService.put(id, data)
      if (userUpdate) {
        console.log(userUpdate)
        res.jsonSuccess(userUpdate);
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
    const userDelete = userService.delete(id)

    if (userDelete) {
      res.jsonSuccess(userDelete);
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
// TODO: Implement route controllers for user



export { router };
