
import request from 'supertest';
import _ from 'lodash';
import { app } from '../server'
import { clearDatabase, closeDatabase } from './mockdb';

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('metrics test suite', () => {
    it('should create a metric', async () => {
        expect((await request(app).post('/metrics').send(MOCK_METRIC)).status).toBe(201)
    });
    it('should not create a metric when required fields are missing', async () => {
        const urlMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="url");
        const timestampMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="timestamp");

        expect((await request(app).post('/metrics').send(urlMissing)).status).toBe(400)
        expect((await request(app).post('/metrics').send(timestampMissing)).status).toBe(400)
    });
    it('should create a metric when non-required fields are missing', async () => {
        const ttfbMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="ttfb");
        const fcpMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="fcp");
        const domLoadMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="domLoad");
        const windowLoadEventsMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="windowLoadEvents");
        const resourcesMissing = _.omitBy(MOCK_METRIC, (value, key) => key !=="resources");

        expect((await request(app).post('/metrics').send(ttfbMissing)).status).toBe(400)
        expect((await request(app).post('/metrics').send(fcpMissing)).status).toBe(400)
        expect((await request(app).post('/metrics').send(domLoadMissing)).status).toBe(400)
        expect((await request(app).post('/metrics').send(windowLoadEventsMissing)).status).toBe(400)
        expect((await request(app).post('/metrics').send(resourcesMissing)).status).toBe(400)
    });

    it('should return metrics from last 30 minutes', async () => {
        await request(app).post('/metrics').send(MOCK_METRIC).then(async res=> {
            const metricsRequest = await request(app).get('/metrics');
            expect(metricsRequest.status).toBe(200)
            expect(metricsRequest.body.data).toHaveLength(1)
            expect(metricsRequest.body.data[0]).toMatchObject({...MOCK_METRIC, id: res.body.id})
        }).catch(err => {
            throw new Error(err)
        })
    });
    it('should return metrics within a time range', async () => {
        const OLD_MOCK_METRIC = {...MOCK_METRIC, timestamp: "2020-09-10T00:00:00.000Z"};
        await request(app).post('/metrics').send(OLD_MOCK_METRIC).then(async oldMetric => {
            await request(app).post('/metrics').send(MOCK_METRIC).then(async res=> {
                let start = "2020-04-10T00:00:00.000Z"
                let end = "2020-11-10T00:00:00.000Z"
    
                await request(app).get(`/metrics?startDate=${start}&endDate=${end}`).then(metricsRequest => {
                    expect(metricsRequest.status).toBe(200)
                    expect(metricsRequest.body.data).toHaveLength(1)
                    expect(metricsRequest.body.data[0]).toMatchObject({...OLD_MOCK_METRIC, id: oldMetric.body.id})
                });
    
                end = (new Date()).toISOString()
                await request(app).get(`/metrics?startDate=${start}&endDate=${end}`).then(metricsRequest => {
                    expect(metricsRequest.status).toBe(200)
                    expect(metricsRequest.body.data).toHaveLength(2)
                    expect(metricsRequest.body.data[1]).toMatchObject({...MOCK_METRIC, id: res.body.id})
                });                
            }).catch(err => {
                throw new Error(err)
            })
        })
        
    });
});

const MOCK_METRIC = {
    url: "https://google.com",
    ttfb: 700,
    fcp: 500,
    domLoad: 200,
    windowLoadEvents: 300,
    resources: [],
    timestamp: (new Date()).toISOString()
};