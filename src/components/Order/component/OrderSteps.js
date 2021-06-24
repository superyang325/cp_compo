import React, { Fragment } from 'react';
import { Steps } from 'antd';
import SectionHeader from './SectionHeader';
export default function OrderSteps(props) {
  const { statusList, current } = props;
  return (
    <Fragment>
      <SectionHeader>进度</SectionHeader>
      <div style={{padding: '12px 0'}}>
        订单状态 :{current !== -1 ? statusList[current].label : ''}
      </div>
      <Steps current={current}>
        {statusList.map((info, index) => (
          <Steps.Step
            key={index}
            title={info.label}
            description={info.createTime}
          />
        ))}
      </Steps>
    </Fragment>
  );
}
