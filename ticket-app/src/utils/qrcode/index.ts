import QRCode from 'qrcode'

const generateQR = async (text: string) => {
    try {
        const dataURL = await QRCode.toDataURL(text);
        return dataURL;
    } catch (err) {
        console.error(err)
    }
}

export default generateQR;