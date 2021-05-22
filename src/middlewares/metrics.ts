import { Request, Response } from 'express';
import Joi from "joi";

import validateRequest from "../utils/validateRequest"

export function createMetricSchema(req: Request, res: Response, next: Function) {
    const schema = Joi.object({
        url: Joi.string().uri().required(),
        ttfb: Joi.string(),
        fcp: Joi.string(),
        domLoad: Joi.string(),
        windowLoadEvents: Joi.string(),
        timestamp: Joi.string().isoDate().required()
    })
    validateRequest(req, next, schema)
}