//const FormData = require('form-data');

export default {
  async fetch(request) {
    return await handleRequest(request);
  },
};

export const corsHeaders = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET POST DELETE",
  "Access-Control-Allow-Origin": "*",
};

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return new Respose("OK", {
      headers: corsHeaders,
    });
  } else if (request.method === "GET") {
    //const value = await HELLOS.get("num");
    
    return new Response("hi", { status: 200, headers: corsHeaders });
  } else if (request.method == "POST") {
    //const value = await HELLOS.get("num");
    const form = new FormData();
    form.append("metadata", '{"key":"value"}');
    form.append("requireSignedURLs", "false");
    form.append("url", "https://image.png");
    form.forEach((a) => { console.log(a)});
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v2/direct_upload`, {
      method: 'POST',
      headers: {
        ...corsHeaders,
        "Authorization": `Bearer ${API_TOKEN}`,
        "X-Auth-Email": "timmy0x@proton.me"
      },
    });
    const result = await response.text();
    return new Response(result, { status: 200, headers: corsHeaders });
  } else if (request.method == "DELETE") {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1/${request.query.imgId}`, {
      method: "DELETE",
      headers: {
        ...corsHeaders,
        "Authorization": `Bearer ${API_TOKEN}`,
        "X-Auth-Email": "timmy0x@proton.me"
      }
    })
    const result = await response.text();
    return new Response(result, { status: 200, headers: corsHeaders });
  }
  return new Response("Empty Endpoint", { status: 404, headers: corsHeaders });
}
