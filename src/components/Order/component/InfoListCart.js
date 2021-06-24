import React from 'react';
import { Col, Row } from 'antd';
import SectionHeader from './SectionHeader';
import { Fragment } from 'react';
const ROWSPACE = 4;

export default function InfoListCart (props) {
  const { fieldList, title } = props;
  const groupList = [];
  let counter = 0;
  let group = [];
  groupList.push(group);

  fieldList.forEach((item) => {
    const space = item.space || 1;
    if (counter + space > ROWSPACE) {
      counter = space;
      group = [item];
      groupList.push(group);
    } else {
      counter += space;
      group.push(item);
    }
  });
  return (
    <Fragment>
      <SectionHeader>{title}</SectionHeader>
      {groupList.map((group, index) => {
        return (
          <Row key={index} style={{ paddingTop: '32px' }}>
            {group.map((item, subIndex) => {
              const space = item.space || 1;
              const weight = 6;
              return (
                <Col key={subIndex} span={weight * space}>{`${item.label} : ${
                  item.value || '-'
                }`}</Col>
              );
            })}
          </Row>
        );
      })}
    </Fragment>
  );
}
