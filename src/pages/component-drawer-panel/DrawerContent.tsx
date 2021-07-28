import React from 'react'
import {
  Box,
  FormControl,
  MenuItem,
  FormLabel,
  FormGroup,
  Button,
  Typography,
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Drawer,
} from '@material-ui/core'
import clsx from 'clsx'

// import { getChaosNodeAll } from '@/apis/Scenes'
import { Anchor, useStyles, DrawerState } from './index'
import { GlobalContext } from '@/pages/dag-canvas/canvas-content'

export interface Command {
  command_id: any // 错误状态码
  ratio: number // 故障率
  code: number //noerr 设置值
  openDate: string //开始时间
  endDate: number // 持续时间
  [param: string]: number | string | {}
}

const SelectOptions = [
  { text: '打开文件异常', code: 1, cmd_keyword: 'fileStreamTest' },
  { text: '读文件异常', code: 3, cmd_keyword: 'fileStreamTest' },
  { text: '网络监听异常', code: 4, cmd_keyword: 'Greeting' },
  { text: '网络连接异常', code: 5, cmd_keyword: 'Greeting' },
  { text: '网络发送异常', code: 6, cmd_keyword: 'Greeting' },
  { text: '网络接收异常', code: 7, cmd_keyword: 'Greeting' },
  { text: '网络抖动延时', code: 8, cmd_keyword: 'Greeting' },
  { text: 'cpu压力测试', code: 9, cmd_keyword: 'cpu' },
  { text: '内存压力测试', code: 10, cmd_keyword: 'ram' },
  { text: '机器重启', code: 11, cmd_keyword: 'restart' },
]

// DrawerContent
const DrawerContent = (props: any) => {
  const classes = useStyles()

  const { globalState, setGlobalState } = React.useContext(GlobalContext)

  const { drawerData, saveCall } = props

  console.log('drawerContent', { globalState, props })

  const command: Command = {
    // command_id: 1, // 错误状态码
    command_id: JSON.stringify({
      text: '打开文件异常',
      code: 1,
      cmd_keyword: 'fileStreamTest',
    }), // 错误状态码
    ratio: 0, // 故障率
    code: -1, //noerr 设置值
    openDate: '', //开始时间戳
    endDate: 60000, //结束时间戳
  }

  const initData: DrawerState = {
    id: null,
    scene_name: '',
    strategyDefinition: '',
    name: '', // 进程名
    cmdline: '', // 进程启动参数
    robotList: [],
    commands: [command],
  }

  const [state, setState] = React.useState<any>(initData)

  const [robotList, setRobotList] = React.useState<any[]>([])

  console.log(state)

  React.useEffect(() => {
    setRobotList(globalState.robotList)
  }, [globalState.robotList])

  // React.useEffect(() => {
  //   if (globalState.isEdit && drawerData.id) {
  //     let { robotList } = drawerData
  //     let checkedRobots = robotList.map((item: any) => item.nodeId)

  //     setState(drawerData)
  //     setRobotList((prevState: any) => {
  //       return prevState.map((item: any) => ({
  //         ...item,
  //         checked: checkedRobots.includes(item.nodeId),
  //       }))
  //     })
  //   } else {
  //     setRobotList((prevState: any) => {
  //       return prevState.map((item: any) => ({ ...item, checked: false }))
  //     })
  //   }
  // }, [globalState.isEdit, drawerData.id])

  const [fieldValidate, setValidate] = React.useState<any>({
    scene_name: false,
    strategyDefinition: false,
    name: false,
    cmdline: false,
    robotList: false,
    command_id: false,
    ratio: false,
    openDate: false,
    endDate: false,
  })

  //mount
  // React.useEffect(() => {
  //   getChaosNodeAll().then((res: any) => {
  //     if (res.code === 200) {
  //       //回显状态
  //       if (drawerState.status === 'edit') {
  //         let { robotList } = drawerData
  //         let checkedRobots = robotList.map((item: any) => item.nodeId)
  //         setRobotList(
  //           res.data.map((item: any) => ({
  //             nodeId: item.device_id,
  //             sourceIp: item.listIp[0].sourceIp,
  //             checked: checkedRobots.includes(item.device_id)
  //           }))
  //         )
  //       } else {
  //         setRobotList(
  //           res.data.map((item: any) => ({ nodeId: item.device_id, sourceIp: item.listIp[0].sourceIp, checked: false }))
  //         )
  //       }
  //     }
  //   })
  // }, [])

  // 进程
  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: event.target.value })
  }
  // 进程参数
  const cmdlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, cmdline: event.target.value })
  }
  // 机器列表
  const robotListChange =
    (robot: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let isExit: any = state.robotList.find(
        (item: any) => item.nodeId === robot.nodeId,
      )
      let newRobotList = []
      if (isExit) {
        isExit.checked = false
        newRobotList = state.robotList.filter(
          (item: any) => item.nodeId !== isExit.nodeId,
        )
      } else {
        newRobotList = state.robotList.concat(
          Object.assign({ checked: true }, robot),
        )
      }

      setRobotList((prevState: any) => {
        return prevState.map((item: any) => {
          return item.nodeId !== robot.nodeId
            ? item
            : {
                ...item,
                checked: !item.checked,
              }
        })
      })
      setState({ ...state, robotList: newRobotList })
    }
  // 错误
  // const commandIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const commandIdChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: any }>,
    child?: any,
  ) => {
    setState((prev: DrawerState) => {
      prev.commands[0].command_id = event.target.value

      prev.cmdline = child.props.cmd_keyword
      return prev
    })
  }
  // 比例
  const ratioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value)
    setState({
      ...state,
      commands: [
        {
          ...state.commands[0],
          ratio: value > 100 ? 100 : value < 0 ? 0 : value,
        },
      ],
    })
  }
  // 开始时间
  const openDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const openDateValue = event.target.value
    setState({
      ...state,
      commands: [{ ...state.commands[0], openDate: openDateValue }],
    })
  }
  // 结束时间
  const endDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endDateValue = Number(event.target.value)
    setState({
      ...state,
      commands: [{ ...state.commands[0], endDate: endDateValue }],
    })
  }

  const save = () => {
    let validateFileds = [
      'scene_name',
      'strategyDefinition',
      'name',
      'cmdline',
      'robotList',
      'commands.code',
      'commands.ratio',
      'commands.openDate',
      'commands.endDate',
    ]

    let validateRes: any = {}
    let isPass = true

    let commands: Command = state.commands[0]

    validateFileds.forEach((field: any) => {
      let formItemValue = state[field]
        ? state[field]
        : commands[field.split('.')[1]]

      console.log(field, formItemValue)
      if (formItemValue === '' || formItemValue === undefined) {
        validateRes[field] = true
        isPass = false
      } else if (Array.isArray(formItemValue) && formItemValue.length === 0) {
        validateRes[field] = true
      } else {
        validateRes[field] = false
      }
    })

    if (!isPass) {
      setValidate(validateRes)
      return
    }

    let data = Object.assign(state, { id: state.id ? state.id : Date.now() })
    saveCall(data)
    close()
  }

  const close = () => {
    setState(initData)
    setValidate({})
    setGlobalState({
      drawerOpen: false,
    })
  }

  const focusHandler = (field: string) => (evt: React.SyntheticEvent) => {
    setValidate((prev: any) => {
      return {
        ...prev,
        [field]: false,
      }
    })
  }

  const inputHandler =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value

      setState((prev: any) => {
        return {
          ...prev,
          [field]: value,
        }
      })
    }

  return (
    <Drawer
      className={classes.configPanel}
      anchor="right"
      open={globalState.drawerOpen}
      onClose={close}
    >
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        p={2}
        className={clsx(classes.drawerWidth)}
        role="presentation"
      >
        {/* 标题 */}
        <Typography variant="h5" gutterBottom>
          标题
        </Typography>
        {/* 场景说明 */}
        <TextField
          error={fieldValidate['scene_name']}
          className={classes.formControl}
          label="场景名称"
          value={state.scene_name}
          onChange={inputHandler('scene_name')}
          onFocus={focusHandler('scene_name')}
          size="small"
          multiline
          variant="outlined"
        />
        <TextField
          error={fieldValidate['strategyDefinition']}
          className={classes.formControl}
          label="场景说明"
          value={state.strategyDefinition}
          onChange={inputHandler('strategyDefinition')}
          onFocus={focusHandler('strategyDefinition')}
          size="small"
          multiline
          variant="outlined"
        />
        {/* 服务名 */}
        <TextField
          error={fieldValidate['name']}
          id="outlined-multiline-flexible"
          className={classes.formControl}
          label="服务名"
          size="small"
          variant="outlined"
          value={state.name}
          onChange={nameChange}
          onFocus={focusHandler('name')}
        />
        {/* 服务信息 */}
        <TextField
          id="outlined-multiline-flexible"
          className={classes.formControl}
          label="服务关键启动参数"
          size="small"
          multiline
          variant="outlined"
          error={fieldValidate['cmdline']}
          value={state.cmdline}
          onChange={cmdlineChange}
          onFocus={focusHandler('cmdline')}
        />

        {/* 机器列表 */}
        <FormControl
          size="small"
          className={clsx(classes.formControl, classes.robotoList)}
          error={fieldValidate['robotList']}
          onFocus={focusHandler('robotList')}
        >
          <FormLabel component="legend">选择机器</FormLabel>
          <FormGroup className={clsx(classes.robotoListGroup)}>
            {robotList.length ? (
              robotList.map((robot: any) => (
                <FormControlLabel
                  key={robot.nodeId}
                  control={
                    <Checkbox
                      checked={robot.checked}
                      name={robot.nodeId}
                      onChange={robotListChange(robot)}
                      onFocus={focusHandler('robotList')}
                    />
                  }
                  label={robot.name}
                />
              ))
            ) : (
              <div>节点下暂无机器</div>
            )}
          </FormGroup>
        </FormControl>

        {/*用例 */}
        <FormControl
          className={classes.formControl}
          error={fieldValidate['commands.code']}
        >
          <FormGroup className={classes.formGroup}>
            {/* 用例下拉 - 一级 */}
            <FormControl
              variant="outlined"
              size="small"
              className={classes.formGroupControl}
            >
              <InputLabel id="error-select-first-label">用例</InputLabel>
              <Select
                id="error-select-first"
                labelId="error-select-first-label"
                label="用例"
                name="用例"
                value={state.commands[0].command_id}
                onChange={commandIdChange}
                onFocus={focusHandler('robotList')}
              >
                {SelectOptions.map((option: any) => (
                  <MenuItem
                    key={option.code}
                    value={JSON.stringify(option)}
                    {...option}
                  >
                    {option.text}
                  </MenuItem>
                ))}

                {/* <MenuItem value={256}>最大API_hook数量</MenuItem> */}
              </Select>
            </FormControl>
          </FormGroup>
        </FormControl>

        {/* 比例 */}
        <TextField
          id="outlined-basic"
          type="number"
          label="错误比例(%)"
          size="small"
          className={classes.formControl}
          variant="outlined"
          inputProps={{ step: 10 }}
          error={fieldValidate['commands.ratio']}
          value={state.commands[0].ratio}
          onChange={ratioChange}
        />

        {/* 开始时间 */}
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}
          error={fieldValidate['commands.openDate']}
        >
          <InputLabel
            htmlFor="open-date"
            shrink
            variant="outlined"
            className={classes.formControlLabel}
          >
            开始时间
          </InputLabel>
          <OutlinedInput
            id="open-date"
            label="开始时间"
            type="datetime-local"
            defaultValue={state.commands[0].openDate}
            onChange={openDateChange}
            onFocus={focusHandler('commands.openDate')}
          />
        </FormControl>
        {/* 持续时间 */}
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}
          error={fieldValidate['commands.endDate']}
        >
          <InputLabel htmlFor="end-date" shrink variant="outlined">
            持续时间（毫秒）
          </InputLabel>
          <OutlinedInput
            id="end-date"
            label="持续时间（毫秒）"
            type="number"
            defaultValue={state.commands[0].endDate}
            onChange={endDateChange}
            onFocus={focusHandler('commands.endDate')}
          />
        </FormControl>
        {/* {console.log(state)} */}
        <Box
          display="flex"
          justifyContent="cneter"
          justifyItems="center"
          alignItems="center"
        >
          <Button variant="contained" color="secondary" onClick={close}>
            取消
          </Button>
          <Button
            className={classes.buttonMargin}
            variant="contained"
            color="primary"
            onClick={save}
          >
            确定
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DrawerContent
