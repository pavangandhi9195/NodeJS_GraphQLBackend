const fs = require('fs');
const qrcode = require('qrcode');

const generateQRCode = (productId, sku) => {
    return new Promise(async (resolve, reject) => {
        try {
            var base64String = await qrcode.toDataURL(sku);
            var fileData = base64String.split(';base64,').pop();
            var fileExtension = base64String.split(';')[0].split('/')[1];
            var qrCodeFilePath = __dirname + '../../public/QR/';
            var qrCodeFileName = productId + "." + fileExtension;
            var fullQRCodeFilePath = qrCodeFilePath + qrCodeFileName;
            
            if (!fs.existsSync(qrCodeFilePath))
                fs.mkdirSync(qrCodeFilePath, { recursive: true });
            fs.writeFileSync(fullQRCodeFilePath, fileData, {encoding: 'base64'});
            return resolve(qrCodeFileName);
        } catch(err) {
            return reject(err);
        }
    });
}

module.exports = {
    generateQRCode
};