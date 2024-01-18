# 本地网易云音乐识别服务

这个项目是一个简单的服务器，它使用网易云音乐的音乐识别API来识别本地路径音频文件中的歌曲，并将歌名返回给客户端。

## 功能

- 读取音频文件
- 调用网易云音乐识别API
- 返回识别到的歌曲名称

## 安装

要运行这个项目，你需要安装`Node.js`和`npm`。一旦安装好这些工具，你可以按照以下步骤进行：

1. 克隆仓库到本地

   ```shell
   git clone https://github.com/MerlinCN/ncm-recognize-api.git
   ```

2. 进入项目目录

   ```shell
   cd ncm-recognize-api
   ```

3. 安装依赖

   ```shell
   npm install
   ```

## 运行

在安装所有依赖后，你可以通过以下命令启动服务器：

```
node server.js
```

服务器将在指定的端口上运行，默认为12400。

## 使用

要使用这个服务，你需要发送一个POST请求到服务器。请求应包含要识别的音频文件。

### 请求格式

- **URL**: http://localhost:12400
- **方法**: POST
- 请求体
  - `file`: 音频文件的路径

### 响应格式

响应将是一个JSON对象，包含以下字段：

- `result`: 操作结果，0为成功，1为失败
- `msg`: 结果消息或错误信息
- `data`: （如果识别成功）包含识别到的歌曲名称

## 示例

请求:

```json
{
  "file": "path/to/your/audio/file"
}
```

成功响应:

```json
{
  "result": 0,
  "msg": "success",
  "data": {
    "song_name": "识别到的歌曲名称"
  }
}
```

失败响应:

```json
{
  "result": 1,
  "msg": "错误信息"
}
```