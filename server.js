import ncmutils from 'ncm-audio-recognize'
import fs from 'fs'
import express from 'express';
const app = express();

const PORT = 12400

async function recognize(file_path) {
    const buffer = fs.readFileSync(file_path)
    console.log(`正在识别${file_path}`)
    const encoded = await ncmutils.encode(buffer)
    const result = await ncmutils.recognize(encoded)
    if (result == null || result.length == 0) {
        console.log(`无法识别${file_path}`)
        return ''
    }
    console.log(result[0].song.name)
    return result[0].song.name
}

// 用于解析JSON格式的请求体
app.use(express.json());

// 处理POST请求
app.post('/', async (req, res) => {
    var song_name = '';
    try {
        song_name = await recognize(req.body.file);
    }
    catch (err) {
        console.log(err);
        res.json({ result: 1, msg: err });
        return;
    }
    if (song_name == '') {
        res.json({ result: 1, msg: '无法识别' });
        return;
    }
    res.json({ result: 0, msg: 'success', data: { song_name: song_name } });
});


app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
