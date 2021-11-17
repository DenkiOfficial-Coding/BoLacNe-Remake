
const { create, BinFile } = require('sourcebin-wrapper');
module.exports = {
    post: async function(content) {
        const res = await create([
            new BinFile({
                name: 'content.js',
                content: content,
                languageId: 'js',
            }),
        ]);
        return res.shortened;
    },
};