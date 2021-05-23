import { Router } from "express"
import { createMetric, getMeasures } from "../../controllers/Metrics";
import { createMetricSchema } from "../../middlewares/metrics";

const metricsRoutes = (app: Router) => {
    app.get('/metrics', getMeasures)
    app.post('/metrics', createMetricSchema, createMetric)
}

export default metricsRoutes;