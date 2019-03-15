const startCase = require("lodash.startcase");

const fs = require("fs");
const { GoogleAdsClient } = require("../build/index");
const {
  SearchGoogleAdsFieldsRequest,
  SearchGoogleAdsFieldsResponse,
  GoogleAdsFieldCategoryEnum,
} = require("../build/lib/types");

/* 
  This file is used for generating "fields.ts".
  It should only be run when updating the Google Ads API version
*/

const CLIENT_ID = process.env.GADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GADS_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GADS_REFRESH_TOKEN;
const DEVELOPER_TOKEN = process.env.GADS_DEVELOPER_TOKEN;

const client = new GoogleAdsClient({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  refresh_token: REFRESH_TOKEN,
  developer_token: DEVELOPER_TOKEN,
  parseResults: true,
});
const service = client.getService("GoogleAdsFieldService");
const stream = fs.createWriteStream(__dirname + "/../src/lib/fields.ts");

async function main() {
  const { resultsList } = await getAllFields();
  const resources = {};
  const resourceMetrics = {};
  const resourceSegments = {};
  const segments = [];
  const allMetrics = [];

  for (const row of resultsList) {
    if (isResource(row.category)) {
      resources[row.name] = [];

      /* Save the metrics */
      if (!resourceMetrics.hasOwnProperty(row.name)) {
        resourceMetrics[row.name] = [];
      }
      for (const metric in row.metrics) {
        resourceMetrics[row.name].push(row.metrics[metric]);
      }

      /* Save the segments */
      if (!resourceSegments.hasOwnProperty(row.name)) {
        resourceSegments[row.name] = [];
      }
      for (const segment in row.segments) {
        resourceSegments[row.name].push(row.segments[segment]);
      }
    }
    if (isAttribute(row.category)) {
      const resourceName = row.name.split(".")[0];
      resources[resourceName].push(row);
    }
    if (isSegment(row.category)) {
      segments.push(row);
    }
    if (isMetric(row.category)) {
      allMetrics.push(row);
    }
  }

  stream.write(`/* Autogenerated File! Do Not Edit */\n`);

  /* RESOURCES */
  stream.write(`\n/*\n  -- RESOURCES --\n*/\n`);

  /* Resource names */
  buildUnionArray(Object.keys(resources), "ResourceName");

  for (const resource in resources) {
    stream.write(`\n\n/*\n --- Start of ${toTypeCase(resource)} ---\n*/`);

    const fields = resources[resource];
    if (!fields) continue;

    /* Field values */
    stream.write(`\nexport const ${toTypeCase(resource)} = [\n`);
    for (const field of fields) {
      stream.write(`"${field.name}",\n`);
    }
    stream.write(`]\n\n`);

    /* Field types */
    buildUnionArray(fields, `${toTypeCase(resource)}Field`);

    /* Per resource metrics */
    const metrics = resourceMetrics[resource];
    if (metrics && metrics.length > 0) {
      buildUnionArray(metrics, `${toTypeCase(resource)}Metric`);
    }

    /* Per resource segments */
    const segments = resourceSegments[resource];
    if (segments && segments.length > 0) {
      buildUnionArray(segments, `${toTypeCase(resource)}Segment`);
    }

    stream.write(`\n/*\n --- End of ${toTypeCase(resource)} ---\n*/`);
  }

  /* SEGMENTS */
  stream.write(`\n/*\n  -- SEGMENTS --\n*/`);
  buildUnionArray(segments, "Segment");

  /* METRICS */
  stream.write(`\n/*\n  -- METRICS --\n*/`);
  buildUnionArray(allMetrics, "Metric");

  stream.end();
}

function buildUnionArray(fields, unionName, arrayName = "") {
  stream.write(`\nexport type ${unionName} = \n`);
  for (const field of fields) {
    stream.write(`"${field.name || field}"`);
    if (fields.indexOf(field) !== fields.length - 1) {
      stream.write(`| \n`);
    }
  }
  stream.write(`\n\nexport type ${arrayName || unionName}s = Array<${unionName}>\n`);
}

function isResource(category) {
  return category === GoogleAdsFieldCategoryEnum.GoogleAdsFieldCategory.RESOURCE;
}

function isAttribute(category) {
  return category === GoogleAdsFieldCategoryEnum.GoogleAdsFieldCategory.ATTRIBUTE;
}

function isSegment(category) {
  return category === GoogleAdsFieldCategoryEnum.GoogleAdsFieldCategory.SEGMENT;
}

function isMetric(category) {
  return category === GoogleAdsFieldCategoryEnum.GoogleAdsFieldCategory.METRIC;
}

function toTypeCase(str) {
  return startCase(str).replace(/\s/g, "");
}

async function getAllFields() {
  const request = new SearchGoogleAdsFieldsRequest();
  request.setQuery(`
    SELECT 
      name,
      category,
      selectable,
      filterable,
      metrics,
      segments
  `);
  /* Other possible fields */
  // selectable_with,
  // attribute_resources,
  // metrics,
  // segments

  const response = await service.searchGoogleAdsFields(request);
  return response;
}

main();
