/**
 * 上传图片组件
 */
import React from 'react';
import propTypes from "prop-types";
import { Upload, Icon, Modal, message } from 'antd';

// import { ProducServise } from "../../servise"
import { BASE_IMG_URL } from "../../utils/contransUntils"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: propTypes.array
  }

  state = {
    previewVisible: false,  //  标识是否显示大图预览 model
    previewImage: '',       //  大图的 url
    fileList: [
      /** 
        {
            uid: '-1',    // 标识符
            name: 'image.png', // 文件名
            status: 'done',     // done 上传中  uploading 正在上传中    removed 已删除
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
      */
    ],
  };

  constructor (props) {
    super(props);
    // 初始化状态
    let fileList = [];

    //  传入 imgs 属性
    const { imgs } = this.props;
    if(imgs && imgs.length>0) {
      fileList = imgs.map((img,index) => ({
        uid: -index,    // 标识符
        name: img, // 文件名
        status: 'done',     // done 上传中  uploading 正在上传中    removed 已删除
        url: BASE_IMG_URL + img,
      }))
    }
    // 修改
    this.state = {
      previewVisible: false,  //  标识是否显示大图预览 model
      previewImage: '',       //  大图的 url
      fileList
    }
  }

  /**
   * 获取所有已上传图片文件的数组
   */
  getImages = () => {
    return this.state.fileList.map(file => file.name);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log('handlePreview()', file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };


  handleChange = async ({ file, fileList }) => {
    // 上传成功修正 file
    if(file.status === 'done') {
        const result = file.response;
        if(result.code === 0) {
            message.success(result.msg);
            const { name, imgUrl } = result.data;
            file = fileList[fileList.length-1]
            file.url = imgUrl;
            file.name = name;
        } else {
            message.error(result.msg);
        }
    } else if(file.status === 'removed') {
        // //  删除指定的图片
        // const { msg } = await ProducServise.reqDeleceImg({ name: file.name });
        // message.error(msg);
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name="files"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

