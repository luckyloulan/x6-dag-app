export const GROUP_HORIZONTAL__PADDING = 24 // 分组横向 padding
export const GROUP_VERTICAL__PADDING = 40 // 分组纵向 padding
export const NODE_WIDTH = 120
export const NODE_HEIGHT = 40

// 机房节点默认宽高
export const COMPUTER_NODE_WIDTH = 600
export const COMPUTER_NODE_HEIGHT = 200

// 集群节点默认宽高
export const COLONY_NODE_WIDTH = 360
export const COLONY_NODE_HEIGHT = 120

// 机器节点默认宽高
export const MACHINE_NODE_WIDTH = 120
export const MACHINE_NODE_HEIGHT = 40

// 触发画布重新渲染事件
export const RERENDER_EVENT = 'RERENDER_EVENT'

/*
 * 以下是拖拽相关
 */

export const DRAGGABLE_ALGO_COMPONENT = 'ALGO_COMPONENT'
export const DRAGGABLE_MODEL = 'MODEL'

/**
 * 拖拽生成节点时，判断节点展示的样式
 * ? 1、格式化单个节点，新增时使用 grap-util.tsx-formatNodeInfoToNodeMeta()
 * ? 2、定义左侧分类树 algo.ts时使用
 * ? 3、生成图节点 experiment-graph.tsx-renderNode()时使用
 */
export const NODECOMPONENT_COMPUTER_ROOM =  'COMPUTER_ROOM' // 机房
export const NODECOMPONENT_COLONY =  'COLONY' // 集群
export const NODECOMPONENT_MACHINE =  'MACHINE' // 机器
