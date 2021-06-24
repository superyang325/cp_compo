import React, { Fragment } from 'react'
import { Progress, Icon } from 'antd'
import PropTypes from 'prop-types'
import Upload from 'rc-upload'
import previewImage from '../../util/previewImage'
import './upload.less'
export default class CustomerUpload extends React.Component {
  onStart = file => {
    const { onChange } = this.props
    previewImage(file).then(thumbUrl => {
      const fileList = this.props.fileList ? [...this.props.fileList] : []
      fileList.push(
        Object.assign(file, { thumbUrl, status: 'uploading', percent: 0 })
      )
      typeof onChange === 'function' && onChange(fileList)
    })
  }

  onProgress = (event, file) => {
    const fileList = this.props.fileList ? [...this.props.fileList] : []
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      file.percent = event.percent
      file.percent = 100
      file.status = 'done'
      onChange(fileList)
    }
  }
  onSuccess = (response, file) => {
    // console.log(response,file)
    const fileList = this.props.fileList ? [...this.props.fileList] : []
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      file.percent = 100
      file.status = 'done'
      file.response = response
      onChange(fileList)
    }
  }
  onRemove = index => {
    const { onChange } = this.props
    if (!onChange) {
      return
    }
    const fileList = [...this.props.fileList]
    fileList.splice(index, 1)
    onChange(fileList)
  }
  onUp = index => {
    const { onChange } = this.props
    if (!onChange) {
      return
    }
    const fileList = [...this.props.fileList]
    fileList[index - 1] = fileList.splice(index, 1, fileList[index - 1])[0]
    onChange(fileList)
  }
  onDown = index => {
    const { onChange } = this.props
    if (!onChange) {
      return
    }
    const fileList = [...this.props.fileList]
    fileList[index + 1] = fileList.splice(index, 1, fileList[index + 1])[0]
    onChange(fileList)
  }
  onError = () => {}
  render() {
    //参数与回调函数对应
    //图片 列表显示 删除 添加 预览
    const { fileList, beforeUpload, onPreview } = this.props
    return (
      <Fragment>
        <Upload
          {...this.props}
          multiple={true}
          onStart={this.onStart}
          onProgress={this.onProgress}
          onSuccess={this.onSuccess}
          onError={this.onError}
          beforeUpload={beforeUpload}
        >
          {this.props.children}
        </Upload>
        {Array.isArray(fileList)
          ? fileList.map((file, index, arr) => {
              return (
                <div key={file.uid} className="customer-file-container">
                  <div className="left">
                    <img
                      className="pic"
                      src={file.thumbUrl || file.url}
                      alt={file.name}
                    ></img>
                    <span className="pic-detail">
                      <div className="pic-name">{file.name}</div>
                      {file.status !== 'done' ? (
                        <Progress
                          size="small"
                          percent={file.percent}
                          showInfo={false}
                          strokeWidth={2}
                          strokeColor="#72c140"
                          status={file.percent === 100 ? 'success' : 'active'}
                        ></Progress>
                      ) : null}
                    </span>
                  </div>
                  <div className="right">
                    <span>
                      {file.status === 'done' ? (
                        <React.Fragment>
                          {arr.length !== 1 && index !== 0 ? (
                            <Icon
                              onClick={() => {
                                this.onUp(index)
                              }}
                              className="pic-btn"
                              type="arrow-up"
                            />
                          ) : null}
                          {arr.length !== 1 && index !== arr.length - 1 ? (
                            <Icon
                              onClick={() => {
                                this.onDown(index)
                              }}
                              className="pic-btn"
                              type="arrow-down"
                            />
                          ) : null}
                          <Icon
                            type="eye"
                            className="pic-btn"
                            onClick={() => {
                              typeof onPreview === 'function' && onPreview(file)
                            }}
                          />
                          <Icon
                            className="pic-btn"
                            onClick={() => {
                              window.open(
                                file.url
                                  ? file.url
                                  : file.response &&
                                      file.response.data &&
                                      file.response.data[0]
                              )
                            }}
                            type="download"
                          />
                        </React.Fragment>
                      ) : null}
                      <Icon
                        className="pic-btn"
                        type="delete"
                        onClick={() => {
                          this.onRemove(index)
                        }}
                      />
                    </span>
                  </div>
                </div>
              )
            })
          : null}
      </Fragment>
    )
  }
}

CustomerUpload.propTypes = {
  onChange: PropTypes.func,
  fileList: PropTypes.array
}
