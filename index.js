//const FormData = require('form-data');

export default {
  async fetch(request) {
    return await handleRequest(request);
  },
};

const ACCOUNT_ID = ""
const API_TOKEN = ""

export const corsHeaders = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, DELETE",
  "Access-Control-Allow-Origin": "*",
};

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return new Response("OK", {
      headers: corsHeaders,
    });
  } else if (request.method === "GET") {
    //const value = await HELLOS.get("num");
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v2/direct_upload`, {
      method: 'POST',
      headers: {
        ...corsHeaders,
        "Authorization": `Bearer ${API_TOKEN}`,
        "X-Auth-Email": ""
      },
    });
    const result = await response.text();
    return new Response(result, { status: 200, headers: corsHeaders });
  } else if (request.method == "DELETE") {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${request.body}`, {
      method: "DELETE",
      headers: {
        ...corsHeaders,
        "Authorization": `Bearer ${API_TOKEN}`,
        "X-Auth-Email": ""
      }
    })
    const result = await response.text();
    return new Response(result, { status: 200, headers: corsHeaders });
  }
  return new Response("Empty Endpoint", { status: 404, headers: corsHeaders });
}
