import express from 'express';
import puppeteer from 'puppeteer';

let browser = null;

async function ssr(url) {
  if (browser == null) browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const start = Date.now();
  try {
    await page.goto(url);
    await page.waitForSelector('meta[name="render_loading"]', {hidden: true}); // ensure meta[name="render_loading"] remove from the DOM.
  } catch (err) {
    console.error(err);
    throw new Error('page.goto/waitForSelector timed out.');
  }

  let html = await page.content(); // serialized HTML of page DOM.
  const ttRenderMs = Date.now() - start;
  await page.close();

  console.info(`Headless rendered page ${url} in: ${ttRenderMs}ms`);
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi);

  return {html, ttRenderMs};
}

const app = express();

app.get('*', async (req, res, next) => {
  if (!req.url.includes('rendertron')) {
	  return res.status(200).send('');
  }
	  const {html, ttRenderMs} = await ssr(req.url.slice(1));
	  
  res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
  return res.status(200).send(html); // Serve prerendered page as response.
});

app.listen(8080, () => console.log('Server started. Press Ctrl+C to quit'));