import fetch from 'node-fetch';
import FormData from 'form-data';
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://ceac.state.gov/genniv/', { waitUntil: 'networkidle2' });

    const imageSelector = '#c_default_ctl00_sitecontentplaceholder_uclocation_identifycaptcha1_defaultcaptcha_CaptchaImage'; // change to real ID
    await page.waitForSelector(imageSelector);

    const elementHandle = await page.$(imageSelector);
    const imageBuffer = await elementHandle.screenshot(); // 🧠 Screenshot as buffer

    await browser.close();

    // OCR Function
    const getOCRText = async (imageBuffer) => {
        const formData = new FormData();
        formData.append('type', 'ocr');
        formData.append('lang', 'eng');
        formData.append('retain', 'true');
        formData.append('files', imageBuffer, {
            filename: 'screenshot.jpg',
            contentType: 'image/jpeg',
        });

        const accessToken = 'RWuS9P7dKtRyRi4CylQ1tk9kFARdyzN1OYT62UfIPESuxIR8X0nbmUPfR9bsPfCW';

        const response = await fetch(`https://backend.scandocflow.com/v1/api/documents/extract?access_token=${accessToken}`, {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload failed:', errorText);
            process.exit(1);
        }

        const result = await response.json();
        const text = result.documents?.[0]?.textAnnotation?.Pages?.[0]?.Words?.[0]?.Text;

        console.log('Extracted OCR Text:', text);
        return text;
    };

    await getOCRText(imageBuffer);

})();
