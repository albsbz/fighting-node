import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    try {
      if (res.err) throw res.err
      res.data = fighterService.getAll();
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      if (res.err) throw res.err
      res.data = fighterService.search({ id: req.params.id });
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      if (res.err) throw res.err
      res.data = fighterService.createNew(req.body);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      if (res.err) throw res.err
      res.data = fighterService.update(req.params.id, req.body);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      if (res.err) throw res.err
      res.data = fighterService.delete(req.params.id);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
