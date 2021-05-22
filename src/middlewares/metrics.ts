import { Request, Response } from 'express';
import Joi from "joi";

import validateRequest from "../utils/validateRequest"

export function createMetricSchema(req: Request, res: Response, next: Function) {
    const schema = Joi.object({
        url: Joi.string().uri().required(),
        ttfb: Joi.number(),
        fcp: Joi.number(),
        domLoad: Joi.number(),
        windowLoadEvents: Joi.number(),
        resources: Joi.array(),
        timestamp: Joi.string().isoDate().required()
    })
    validateRequest(req, next, schema)
}