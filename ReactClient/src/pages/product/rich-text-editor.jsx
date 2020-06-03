/**
 * 用来指定的商品详情的富文本的
 */
import React, { Component } from 'react';

import PropTypes from "prop-types"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class RichTextEditor extends Component {

    constructor(props) {
        super(props);
        const { detail } = this.props;
        //  有值就创建一个富文本编辑的 html 对象
        if(detail) {  
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    static propTypes = {
        detail: PropTypes.string
    }

    state = {
        // 创建一个没有内容的编辑对象
        editorState: EditorState.createEmpty()
    }

    /**
     * 输入过程的实时回调
     */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    /**
     * 返回输入数据对应的 html 格式的文本
     */
    getDetail = () => {
        const { editorState } = this.state;
        return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    }

    /**
     * 
     */
    uploadCallback = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/manage/img/upload');
            // xhr.setRequestHeader('Authoriztion', 'Client-ID XXX');
            const data = new FormData();
            data.append('iamge', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                const imgUrl = response.data.imgUrl
                resolve(imgUrl);
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            })
        })
    }


    render() {
        
        const { editorState } = this.state;

        return (
            <div>
                <Editor editorStyle={{ border: "1px solid black", minHeight: 200, paddingLeft: "10px" }}
                  editorState={editorState} onEditorStateChange={this.onEditorStateChange}
                  toolbar={{
                    image: {
                        uploadCallback: this.imageUploadCallBack,  //图片的处理 （但是仅限于本地上传的，url方式不经过此函数）
                        alt: {present: false, mandatory: false}
                    }
                  }} />
            </div>
            
        );
    }
}

export default RichTextEditor;