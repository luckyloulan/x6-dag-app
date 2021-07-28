/**
 * 左侧分类树 ---- 模拟数据会被接口数据代替
 * 2021年7月24日 15:35:14
 */

interface CategoryData {
  id: string | number // 一级分类ID 唯一值
  name: string // 一级分类展示名称
  children: CategoryItemData[]
  [params: string]: any
}

// 生成图节点主要使用这部分数据
interface CategoryItemData {
  id: string | number // 二级分类ID:由一级ID+‘-’+数字生成 唯一值
  name: string // 二级分类展示名称
  parentId: string // 一级分类ID
  parent: boolean // 是否为可嵌入的父节点
  description: any // 组件描述信息
  iconName: string // 使用@ant-design/icons
  nodeComponent: string // 使用常量中定义的 constants.ts\graph.ts-NODECOMPONENT_*

  [params: string]: any
}

export const algoData = [
  {
    id: 'frameworkComponent',
    name: '基础架构图组件',
    isDir: true,
    children: [
      {
        id: 'frameworkComponent-computer',
        name: '机房节点',
        description: '机房组件描述信息',
        parentId: 'frameworkComponent',
        iconName: '',
        nodeComponent: 'COMPUTER_ROOM',
        parent: true,
        iconType: 1,
        author: 'wangjiangui',
        codeName: 'algo_1',
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
      },
      {
        id: 'frameworkComponent-colony',
        name: '集群节点',
        description: '集群组件描述信息',
        parentId: 'frameworkComponent',
        iconName: '',
        nodeComponent: 'COLONY',
        parent: true,
        iconType: 1,
        author: 'demo author',
        codeName: 'algo_1',
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
      },
      {
        id: 'frameworkComponent-machine',
        name: '机器节点',
        description: '机器组件描述信息',
        parentId: 'frameworkComponent',
        iconName: '',
        nodeComponent: 'MACHINE',
        parent: false,
        iconType: 1,
        author: 'demo author',
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
      },
    ],
  },
  {
    name: '混沌实验故障清单',
    id: 'faultComponent',
    category: 'source',
    isDir: true,
    children: [
      {
        id: 'faultComponent-1',
        name: '故障一',
        description: '故障描述信息',
        parentId: 'faultComponent',
        iconName: '',
        nodeComponent: 'MACHINE', // TODO 需要新增常量来替换 ----2021年7月24日 22:30:21
        iconType: 1,
        author: 'demo author',
        codeName: 'algo_1',
        isDir: true,
        children: [
          {
            id: 'faultComponent-1-1',
            name: '场景一',
            description: '场景描述信息',
            parentId: 'sceneComponent',
            iconName: '',
            nodeComponent: 'MACHINE', // TODO 需要新增常量来替换 ----2021年7月24日 22:30:21
            iconType: 1,
            author: 'demo author',
            codeName: 'algo_1',
          },
          {
            id: 'faultComponent-2-1',
            name: '场景一',
            description: '场景描述信息',
            parentId: 'sceneComponent',
            iconName: '',
            nodeComponent: 'MACHINE', // TODO 需要新增常量来替换 ----2021年7月24日 22:30:21
            iconType: 1,
            author: 'demo author',
            codeName: 'algo_1',
          },
        ],
      },
      {
        id: 'faultComponent-2',
        name: '故障二',
        description: '故障描述信息',
        parentId: 'faultComponent',
        iconName: '',
        nodeComponent: 'MACHINE', // TODO 需要新增常量来替换 ----2021年7月24日 22:30:21
        parent: false,
        iconType: 1,
        author: 'demo author',
        codeName: 'algo_1',
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
      },
    ],
  },
  {
    name: '混沌实验场景列表',
    id: 'sceneComponent',
    category: 'analytics',
    isDir: true,
    children: [
      {
        id: 'sceneComponent-1',
        name: '场景一',
        description: '场景描述信息',
        parentId: 'sceneComponent',
        iconName: '',
        nodeComponent: 'MACHINE', // TODO 需要新增常量来替换 ----2021年7月24日 22:30:21
        parent: false,
        iconType: 1,
        author: 'demo author',
        codeName: 'algo_1',
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
      },
      {
        id: 'sceneComponent-2',
        name: '场景二',
        description: '场景描述信息',
        parentId: 'sceneComponent',
        iconName: '',
        nodeComponent: 'MACHINE', // TODO 需要新增常量来替换 ----2021年7月24日 22:30:21
        parent: false,
        iconType: 1,
        author: 'demo author',
        codeName: 'algo_1',
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
      },
    ],
  },
  {
    name: '执行计划', // 去新页面
    id: 'other',
    category: 'ai_algo',
    isDir: true,
    children: [],
    isBranch: true,
    isExpanded: false,
    codeName: 'algorithm',
  },
]

export const searchByKeyword = async (keyword: string) => {
  return Array(10)
    .fill(null)
    .map((i, idx) => {
      return {
        defSource: 2,
        docUrl: '',
        ioType: 0,
        up: 148,
        down: 11,
        iconType: 1,
        isDir: false,
        isDisabled: false,
        author: 'demo author',
        codeName: `${keyword}${idx}`,
        catId: 1,
        lastModifyTime: '2020-08-25 15:43:39',
        createdTime: '2015-04-16 13:38:11',
        engineType: 0,
        isComposite: false,
        sequence: 0,
        owner: 'system',
        description: '组件描述信息',
        name: `${keyword}__${idx}`,
        id: idx,
        parentId: 'recentlyUsed',
        isBranch: false,
        social: {
          defSource: 2,
          isEnabled: true,
          docUrl: '#',
          iconType: 1,
          isDisabled: false,
          author: 'demo author',
          name: `${keyword}-${idx}`,
          codeName: `${keyword}${idx}`,
          catId: 1,
          lastModifyTime: '2020-08-25 15:43:39',
          createdTime: '2015-04-16 13:38:11',
          owner: 'system',
          description: '组件描述信息',
          id: idx,
        },
      }
    })
}
