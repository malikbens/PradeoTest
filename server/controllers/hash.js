

const hash = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5')
    const finalHex = hash.update(fileBuffer).digest('hex');

    return finalHex;
}

exports.hash = hash;


