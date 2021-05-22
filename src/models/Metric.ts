import { Document, Model, model, Query, Schema } from "mongoose";

/**
 * Interface to model the Metric Schema for TypeScript.
 * @param url:string url of the origin
 * @param ttfb:string ttfb metric
 * @param fcp:string fcp metric
 * @param domLoad:string dom load event metric
 * @param windowLoadEvents:string window load events metric
 * @param timestamp:string timestamp of the recording
 */

export interface IMetric extends Document {
  url: string;
  ttfb: string;
  fcp: string;
  domLoad: string;
  windowLoadEvents: string;
  timestamp: string;
}

const resourceSchema: Schema = new Schema({
  type: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  responseTime: {
    type: Number,
    required: true
  },
  executionTime: {
    type: Number,
    required: true
  },
  fetchTime: {
    type: Number,
    required: true
  }
});

const metricSchema: Schema = new Schema({
  url: {
    type: String,
    required: true
  },
  ttfb: {
    type: Number
  },
  fcp: {
    type: Number
  },
  domLoad: {
    type: Number
  },
  windowLoadEvents: {
    type: Number
  },
  resources: {
    type: [resourceSchema]
  },
  timestamp: {
    type: String,
    required: true
  }
});

interface IMetricQueryHelpers {
  byTimeInterval(startDate: string, endDate: string): Query<any, Document<IMetric>> & IMetricQueryHelpers;
}
metricSchema.query.byTimeInterval = function(startDate, endDate): Query<any, Document<IMetric>> & IMetricQueryHelpers {
  return this.find({
    timestamp: {
        "$gte": startDate,
        "$lte": endDate,
    }
});
};

const Metric = model<IMetric, Model<IMetric, IMetricQueryHelpers>>('Metric', metricSchema, 'metrics');

export default Metric;