import moment from 'moment';
import { Request, Response } from "express";
import Metric, { IMetric } from "../models/Metric";

export async function createMetric(req: Request, res: Response) {
    try {
        const { url, ttfb, fcp, domLoad, windowLoadEvents, resources, timestamp } = req.body
        const metric = new Metric({ url, ttfb, fcp, domLoad, windowLoadEvents, resources, timestamp: moment(timestamp).toISOString() })
        await metric.save().then((result: any) => {
            return res.status(201).send({ id: result._id })
        }).catch(err => {
            return handleError(res, err)
        })
        return;

    } catch (err) {
        return handleError(res, err)
    }
}

export async function getMeasures(req: Request, res: Response) {
    try {
        let startDate, endDate;
        if(req.query.startDate && req.query.endDate){
            startDate = req.query.startDate as string
            endDate = req.query.endDate as string
        } else if(!req.query.startDate && !req.query.endDate){
            startDate = moment().subtract(30, 'minutes').toISOString()
            endDate = moment().toISOString()
        } else {
            return handleError(res, {code: 400, message: "Please provide a proper time range."})
        }
        
        const metrics: object | Array<IMetric> = await Metric.find().byTimeInterval(startDate, endDate).exec().then((query: object) => {
            return query
        });
        if (metrics instanceof Array) {
            const data = metrics.map((item: any) => {
                const { _id, url, ttfb, fcp, domLoad, windowLoadEvents, resources, timestamp } = item
                return {
                    id: _id,
                    url,
                    ttfb,
                    fcp,
                    domLoad,
                    windowLoadEvents,
                    resources,
                    timestamp
                }
            });
            return res.status(200).send({ data });
        }
        return;
    } catch (err) {
        return handleError(res, err)
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
