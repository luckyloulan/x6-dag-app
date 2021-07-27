/**
 * 左侧分类树
 * 2021年7月24日 20:54:15
 * @description：
 */
import React, { useCallback } from 'react'
import { useModel } from 'umi'
import { Tree } from 'antd'
import { FolderFilled, FolderOpenFilled } from '@ant-design/icons'
import { NodeTitle } from './node-title'
import styles from './index.less'

const { DirectoryTree, TreeNode } = Tree

// 一级分类使用‘文件夹’样式图标
const FolderIcon = ({ expanded }: { expanded: boolean }) => {
  return expanded ? <FolderOpenFilled /> : <FolderFilled />
}

// 树形结构
export const CategoryTree = () => {
  // 数据源
  const { componentTreeNodes } = useModel('guide-algo-component')

  const renderTree = useCallback(
    (treeList: any[] = [], searchKey: string = '') => {
      return treeList.map((item) => {
        const { isDir, id, children } = item
        const key = id.toString()
        const title = <NodeTitle node={item} searchKey={searchKey} />

        if (isDir) {
          return (
            <TreeNode
              icon={FolderIcon}
              key={key}
              title={title}
              className={styles.treeFolder}
            >
              {renderTree(children, searchKey)}
            </TreeNode>
          )
        }

        return (
          <TreeNode
            isLeaf={true}
            key={key}
            icon={<span />}
            title={title}
            className={styles.treeNode}
          />
        )
      })
    },
    [],
  )

  // 过滤数据源
  const treeList = componentTreeNodes.filter((node) => node.status !== 4)

  return (
    <div className={styles.list}>
      <DirectoryTree
        showIcon={true}
        selectable={false}
        autoExpandParent={true}
        className={styles.tree}
        defaultExpandAll
        defaultExpandedKeys={[
          'frameworkComponent',
          'faultComponent',
          'sceneComponent',
        ]}
      >
        {renderTree(treeList)}
      </DirectoryTree>
    </div>
  )
}
