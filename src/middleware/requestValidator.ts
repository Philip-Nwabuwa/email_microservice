import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { createError } from '../utils/error';

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(error.details[0].message, 400);
    }
    next();
  };
};
