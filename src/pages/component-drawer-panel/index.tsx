import React, { useRef } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import DrawerContent, { Command } from './DrawerContent'

// import { saveChaosIssue } from '@/apis/Scenes'
// import { GlobalContext } from '@/layouts/Main/Main'

export interface DrawerState {
  id: any
  name: string // 进程名
  cmdline: string // 进程启动参数
  robotList: object[]
  commands: Command[]
}

export interface SceneState {
  type: number
  status: number
  strategyDefinition: string
  scene_name: string
  robotGroupList: DrawerState[]
  [param: string]: string | number | DrawerState[]
}

interface DrawerAction {
  right: boolean
  status?: string
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: '100%',
      marginBottom: '16px',
    },
    formControlLabel: {
      backgroundColor: '#fff',
      padding: '0 4px',
    },
    formGroup: {
      flexDirection: 'row',
    },
    formGroupControl: {
      width: 'calc(100% / 3)',
      flex: '1 0 auto',
    },
    robotoList: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '4px',
      padding: '8px',
      boxSizing: 'border-box',
    },
    robotoListGroup: {
      flexDirection: 'row',
    },
    root: {
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 6px 0px rgb(0 0 0 / 32%)',
    },

    table: {
      minWidth: 650,
    },

    drawerWidth: {
      width: '600px',
    },

    buttonMargin: {
      marginLeft: '10px',
    },

    sceneParamWrapper: {
      width: '100%',
      background: '#fafafa',
      padding: '15px',
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 6px 0px rgb(0 0 0 / 32%)',
    },

    sceneGraph: {
      background: '#fafafa',
    },

    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

    loadingText: {
      width: 500,
      textAlign: 'center',
    },
  }),
)

export type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface Iprops {
  open: boolean
}

const ScenesCustom: React.FC<Iprops> = (props) => {
  const classes = useStyles()
  // const { setGlobalState } = React.useContext(GlobalContext)

  const [resLoading, setResLoading] = React.useState(false)
  const [graphData, setGraphData] = React.useState(null)
  const [fieldValidate, setValidate] = React.useState({
    scene_name: false,
    strategyDefinition: false,
  })

  const sceneStateParam: SceneState = {
    type: 1,
    status: 0,
    strategyDefinition: '',
    scene_name: '',
    robotGroupList: [],
  }
  const [sceneState, setSceneState] =
    React.useState<SceneState>(sceneStateParam)
  const [drawerData, setDrawerData] = React.useState<DrawerState>({
    id: '',
    name: '', // 进程名
    cmdline: '', // 进程启动参数
    robotList: [],
    commands: [],
  })

  const [drawerState, setDrawerState] = React.useState<DrawerAction>({
    right: true,
  }) // 弹框状态

  //tigger drawer
  React.useEffect(() => {
    setDrawerState((prevState) => {
      return {
        ...prevState,
        right: props.open,
      }
    })
  }, [props.open])

  const getContainerSize = () => {
    return {
      width: 600,
      height: 600,
    }
  }
  // Request
  React.useEffect(() => {
    // setGraphData(reviewData)
  }, [])

  const deleteHandler = (id: string) => {
    const { robotGroupList, ...rest } = sceneState
    setSceneState((prev) => {
      return {
        ...rest,
        robotGroupList: robotGroupList.filter(
          (item: DrawerState) => item.id !== id,
        ),
      }
    })
  }

  const editHandler = (id: string) => {
    const editData = sceneState.robotGroupList.find(
      (item: any) => item.id === id,
    )
    if (editData) {
      setDrawerData(editData)
      setDrawerState({ ...drawerState, right: true, status: 'edit' })
    }
  }

  const toggleDrawer = (open: boolean, status?: string) => {
    setDrawerState({ ...drawerState, right: open, status: status })
  }

  //save request
  // const submit = () => {
  //   console.log(sceneState)
  //   let { robotGroupList, ...rest } = sceneState

  //   let validateFileds = ['scene_name', 'strategyDefinition', 'robotGroupList']

  //   let validateRes: any = {}
  //   let isPass = true

  //   validateFileds.forEach((field) => {
  //     let formItemValue = sceneState[field]
  //     if (!formItemValue) {
  //       validateRes[field] = true
  //       isPass = false
  //     } else if (Array.isArray(formItemValue) && !formItemValue.length) {
  //       setGlobalState({
  //         noticeProps: { type: 'error', open: true, message: '暂无场景数据，请新增', timestamp: Date.now() }
  //       })
  //     } else {
  //       validateRes[field] = false
  //     }
  //   })

  //   if (!isPass) {
  //     setValidate(validateRes)
  //     return
  //   }

  //   let robotGroupData = robotGroupList.map((item) => {
  //     return {
  //       name: item.name,
  //       cmd_keyword: item.cmdline,
  //       commands: item.commands.map((command: Command) => {
  //         return {
  //           command_id: JSON.parse(command.command_id).code,
  //           // command_id: command.command_id,
  //           err_rate: command.ratio / 100,
  //           err_code: command.code,
  //           start_time: command.openDate && new Date(command.openDate).getTime(),
  //           duration: command.endDate
  //         }
  //       }),
  //       robotList: item.robotList.map((robot: any) => robot.nodeId)
  //     }
  //   })
  //   const ployData = {
  //     ...rest,
  //     robotGroupList: robotGroupData
  //   }

  //   console.log(ployData)
  //   saveChaosIssue(ployData).then((res: any) => {
  //     if (res.code === 200) {
  //       setGlobalState({
  //         noticeProps: { type: 'success', open: true, message: '执行成功', timestamp: Date.now() }
  //       })
  //     } else {
  //       setGlobalState({
  //         noticeProps: { type: 'error', open: true, message: res.msg, timestamp: Date.now() }
  //       })
  //     }
  //   })
  // }

  const inputHandler = (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string,
  ) => {
    let value = event.target.value

    setSceneState((prev) => {
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const focusHandler = (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string,
  ) => {
    setValidate((prev) => {
      return {
        ...prev,
        [field]: false,
      }
    })
  }

  const saveCall = (state: DrawerState) => {
    const { robotGroupList } = sceneState

    const isExit = robotGroupList.find((item) => item.id === state.id)
    let newRobotGroupList: DrawerState[] = []

    if (isExit) {
      robotGroupList.forEach((item) => {
        newRobotGroupList.push(item.id !== state.id ? item : state)
      })
    } else {
      newRobotGroupList = robotGroupList.concat(state)
    }

    setSceneState((prevState) => {
      return {
        ...prevState,
        robotGroupList: newRobotGroupList,
      }
    })
  }

  console.log(drawerData)

  return (
    <DrawerContent
      drawerData={drawerData}
      drawerState={drawerState}
      toggleDrawer={toggleDrawer}
      saveCall={saveCall}
    />
  )
}

export default ScenesCustom
