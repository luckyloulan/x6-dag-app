import React, { useCallback, useRef } from 'react'
import {
  PlaySquareOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useClickAway } from 'ahooks'
import { useObservableState } from '@/common/hooks/useObservableState'
import { Menu } from '@antv/x6-react-components'
import { useExperimentGraph } from '@/pages/rx-models/experiment-graph'
import { graphPointToOffsetPoint } from '@/pages/common//utils/graph'
import { GlobalContext } from '@/pages/dag-canvas/canvas-content'

import styles from './index.less'

interface Props {
  experimentId: string
  data: any
  openDrawer: () => void
}

export const NodeContextMenu: React.FC<Props> = (props) => {
  const { experimentId, data } = props
  const containerRef = useRef<HTMLDivElement>(null as any)
  const expGraph = useExperimentGraph(experimentId)
  const [activeNodeInstance] = useObservableState(
    () => expGraph.activeNodeInstance$,
  )
  const { setGlobalState } = React.useContext(GlobalContext)

  useClickAway(() => {
    expGraph.clearContextMenuInfo()
  }, containerRef)

  const onNodeCopy = useCallback(async () => {
    await expGraph.onCopyNode(data.node)
  }, [expGraph, activeNodeInstance])

  const onNodeDel = useCallback(async () => {
    await expGraph.requestDeleteNodes([data.node.id])
  }, [expGraph, activeNodeInstance])

  const onGraphRun = useCallback(async () => {
    await expGraph.runGraph()
  }, [expGraph])

  const { x: left, y: top } = graphPointToOffsetPoint(
    expGraph.graph!,
    data,
    expGraph.wrapper!,
  )

  console.log({
    props,
    expGraph,
  })

  const openConfigPanel = () => {
    const machines = expGraph.nodes.filter(
      (item) => item.shape === 'machine-rect',
    )
    const robots = machines.map((item) => {
      let data = item.data
      return {
        checked: false,
        description: data.description,
        nodeId: data.id,
        name: data.name,
      }
    })

    setGlobalState({
      drawerOpen: true,
      robotList: robots,
    })
  }

  return (
    <div
      ref={containerRef}
      className={styles.graphContextMenu}
      style={{ top, left }}
    >
      <Menu hasIcon={true}>
        <Menu.Item onClick={onNodeCopy} icon={<CopyOutlined />} text="复制" />
        <Menu.Item onClick={onNodeDel} icon={<DeleteOutlined />} text="删除" />
        <Menu.Item disabled={true} icon={<EditOutlined />} text="重命名" />
        <Menu.Item
          disabled={true}
          icon={<EditOutlined />}
          text={props.data.node.shape}
        />
        {props.data.node.shape !== ' machine-rect' ? (
          <Menu.Item
            onClick={openConfigPanel}
            icon={<EditOutlined />}
            text="新增场景"
          />
        ) : null}
        <Menu.Divider />
        <Menu.Item
          onClick={onGraphRun}
          icon={<PlaySquareOutlined />}
          text="执行"
        />
      </Menu>
    </div>
  )
}
