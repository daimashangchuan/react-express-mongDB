/**
 * 上传图片保存到本地服务器
 */

// 随机 size 位数的字符串
function shuffle(size) {
  let json = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+'
  let arr = json.split('')
  size = size ? Math.min(arr.length, size) : arr.length
  for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      const item = arr[randomIndex]
      arr[randomIndex] = arr[i]
      arr[i] = item
  }
  arr.length = size
  return arr.join('')
}

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/'); //当前目录下建立文件夹uploads
    },
    filename: function (req, file, cb) {
      const mimetype = file.mimetype.split('/')[1];
      const imageName = shuffle(5) + new Date().getTime() + shuffle(5) + "." + mimetype
      cb(null,  imageName);
    }
  });
const upload = multer({ storage }); 







//导出对象
module.exports = upload;

