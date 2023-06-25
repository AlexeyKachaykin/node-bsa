import { Router } from "express";
import { authService } from "../services/authService.js";


const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const data = authService.login(req.body);

      if (data) {
        res.jsonSuccess(data);
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
  },

);

export { router };