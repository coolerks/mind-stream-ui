import React from "react";
import {Tag} from "antd";

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
    title: '昵称',
    dataIndex: 'nickname',
    copyable: true,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
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
    title: '最后登录时间',
    key: 'lastLoginTime',
    dataIndex: 'lastLoginTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  }
];
