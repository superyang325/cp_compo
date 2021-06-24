import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {Modal} from "antd";
import './ImageCardList.less';

export default class ImageCardList extends Component {
  state = {
    visible: false,
    previewUrl: '',
  };
  openModal = (previewUrl) => {
    this.setState({
      previewUrl,
      visible: true,
    })
  }
  closeModal = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const {imageUrlList = []} = this.props;
    const {visible, previewUrl} = this.state;
    return (
      <Fragment>
        <div className="image-card-list-component">
          {imageUrlList.map((imageUrl, index) => {
            return (
              <span className="image-item-container" key={index} onClick={() => {this.openModal(imageUrl)}}>
                <img src={imageUrl} className="image-item" alt={'img'}/>
              </span>
            )
          })}
        </div>
        <Modal visible={visible} footer={null} onCancel={this.closeModal} destroyOnClose={true} width={820}>
          <div style={{textAlign: 'center', padding: '0 10px'}}>
            <img src={previewUrl} alt="img" style={{maxHeight: 500, maxWidth: '100%'}}/>
          </div>
        </Modal>
      </Fragment>
    )
  }
}
ImageCardList.propTypes = {
  imageUrlList: PropTypes.array,// 图片url数组 默认[]
}
