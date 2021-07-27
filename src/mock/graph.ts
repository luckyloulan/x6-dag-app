/**
 * 2021年7月24日 15:17:27
 */
import random from 'lodash/random'

interface NodeParams {
  id: string | number
  name: string
  nodeComponent: string
  x: number
  y: number
}

export const copyNode = ({ name, x, y }: NodeParams) => {
  const id = `${Date.now()}`
  return {
    id,
    name,
    positionX: x + 200 + random(20, false),
    positionY: y + random(10, false),
    codeName: 'source_11111',
    catId: 1,
    nodeDefId: 111111,
    category: 'source',
    status: 3,
    groupId: 0,
  }
}

/**
 * 新增节点默认数据结构
 * @param param0
 * @returns
 */
// export const addNode = ({ id, name, nodeComponent, x, y }: NodeParams) => {
//   const idTime = `${id}-${Date.now()}`
//   return {
//     id: idTime, // 此处ID为algo.ts的item数据ID 加上时间戳合并而成
//     name,
//     positionX: x,
//     positionY: y,
//     catId: 1,
//     status: 3,
//     nodeComponent: nodeComponent,
//   }
// }

export const queryGraph = (id: string) => {
  return {
    lang: 'zh_CN',
    success: true,
    data: initData,
    Lang: 'zh_CN',
  }
}

export const addNodeGroup = async (groupName: string) => {
  return {
    success: true,
    data: {
      group: {
        name: groupName,
        id: Date.now(),
      },
    },
  }
}

const initData = {
  nodes: [
    {
      id: '1603716783816',
      name: '算法组件1',
      positionX: -200,
      positionY: -300,
      codeName: 'source_11111',
      status: 3,
    },
  ],
  links: [
    // {
    //   source: '1603716783816',
    //   target: '1603716786205',
    //   outputPortId: '1603716783816_out_1',
    //   inputPortId: '1603716786205_in_1',
    // },
  ],
}
