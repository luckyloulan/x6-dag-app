import { Dom, Node } from '@antv/x6'
import { ReactShape } from '@antv/x6-react-shape'
import {
  NODE_WIDTH,
  NODE_HEIGHT,
  COMPUTER_NODE_WIDTH,
  COMPUTER_NODE_HEIGHT,
  MACHINE_NODE_WIDTH,
  MACHINE_NODE_HEIGHT,
  COLONY_NODE_WIDTH,
  COLONY_NODE_HEIGHT,
} from '@/constants/graph'

export class BaseNode extends ReactShape {
  // eslint-disable-next-line class-methods-use-this
  isGroup() {
    return false
  }
}

export class X6DemoNode extends BaseNode {
  getInPorts() {
    return this.getPortsByGroup('in')
  }

  getOutPorts() {
    return this.getPortsByGroup('out')
  }
}

Node.registry.register('ais-rect-port', X6DemoNode as any)
X6DemoNode.config({
  width: NODE_WIDTH,
  height: NODE_HEIGHT,
  shape: 'ais-rect-port',
  attrs: {
    body: {
      magnet: false,
      fill: 'none',
      stroke: 'none',
      refWidth: '100%',
      refHeight: '100%',
      zIndex: 1,
    },
  },
})

/** 机房节点注册 */
Node.registry.register('computer-room-rect', X6DemoNode as any)
X6DemoNode.config({
  width: COMPUTER_NODE_WIDTH,
  height: COMPUTER_NODE_HEIGHT,
  shape: 'computer-room-rect',
  attrs: {
    body: {
      magnet: false,
      fill: 'none',
      stroke: 'none',
      refWidth: '100%',
      refHeight: '100%',
      zIndex: 1,
    },
  },
})

/** 集群节点注册 */
Node.registry.register('colony-rect', X6DemoNode as any)
X6DemoNode.config({
  width: COLONY_NODE_WIDTH,
  height: COLONY_NODE_HEIGHT,
  shape: 'colony-rect',
  attrs: {
    body: {
      magnet: false,
      fill: 'none',
      stroke: 'none',
      refWidth: '100%',
      refHeight: '100%',
      zIndex: 1,
    },
  },
})

/** 机器节点注册 */
Node.registry.register('machine-rect', X6DemoNode as any)
X6DemoNode.config({
  width: MACHINE_NODE_WIDTH,
  height: MACHINE_NODE_HEIGHT,
  shape: 'machine-rect',
  attrs: {
    body: {
      magnet: false,
      fill: 'none',
      stroke: 'none',
      refWidth: '100%',
      refHeight: '100%',
      zIndex: 1,
    },
  },
})

export class X6DemoGroupNode extends BaseNode {
  // eslint-disable-next-line class-methods-use-this
  isGroup() {
    return true
  }
}

// X6DemoGroupNode.config({
//   ports: {
//     groups: {
//       in: {
//         position: { name: 'top' },
//         zIndex: 2,
//       },
//       out: {
//         position: { name: 'bottom' },
//         zIndex: 2,
//       },
//     },
//   },
//   portMarkup: [
//     {
//       tagName: 'foreignObject',
//       selector: 'fo',
//       attrs: {
//         width: 6,
//         height: 6,
//         x: -3,
//         y: -3,
//         zIndex: 10,
//         // magnet决定是否可交互
//         magnet: 'true',
//       },
//       children: [
//         {
//           ns: Dom.ns.xhtml,
//           tagName: 'body',
//           selector: 'foBody',
//           attrs: {
//             xmlns: Dom.ns.xhtml,
//           },
//           style: {
//             width: '100%',
//             height: '100%',
//           },
//           children: [
//             {
//               tagName: 'span',
//               selector: 'content',
//               style: {
//                 width: '100%',
//                 height: '100%',
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// })
