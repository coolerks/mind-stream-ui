import {Tag} from "antd";
import React from "react";

export default [
  {
    title: '关键词',
    dataIndex: 'keyword',
    copyable: true,
    ellipsis: true,
    hideInTable: true,
    tip: '标题过长会自动收缩'
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    ellipsis: true,
    initialValue: "null",
    valueType: 'select',
    valueEnum: {
      'null': {
        text: '全部',
        status: '1',
      },
      '1': {
        text: '启用',
        status: '0',
      },
      '0': {
        text: '禁用',
        status: '0'
      }
    },
    render: (text, record, _, action) => [
      <span key={'status-tag'}>
        {record.status === 1 ? <Tag color="cyan">启用</Tag>
          :
          <Tag color="red">禁用</Tag>
        }
      </span>
    ]
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true
  }
];

