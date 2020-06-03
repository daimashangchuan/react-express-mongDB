/**
 * 点击退出按钮 组件传值(父传子)
 * 
 */
import React from 'react';

import './index.less'

function LinkButton(props) {
    return <button {...props} className='link-button'></button>
}

export default LinkButton;
