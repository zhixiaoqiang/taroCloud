import Taro from '@tarojs/taro'
import { isFunction, isBoolean, isObject } from '@/utils/index'
import { showToast, hideNavigationBarLoading, hideLoading } from '@/sdk'

/**
 * ref
 */
export function useRef (initState) {
  return Taro.useRef(initState)
}
/**
 * 页面展示时的回调
 */
export function useDidShow (callback) {
  Taro.useDidShow(callback)
}

/**
 * 页面隐藏时的回调
 */
export function useDidHide (callback) {
  Taro.useDidHide(callback)
}

/**
 * 监听用户下拉刷新事件
 */
export function usePullDownRefresh (callback) {
  Taro.usePullDownRefresh(callback)
}

/**
 * 监听用户上拉触底事件
 */
export function useReachBottom (callback) {
  Taro.useReachBottom(callback)
}

/**
 * 监听用户滑动页面事件
 */
export function usePageScroll (callback) {
  Taro.usePageScroll(callback)
}

/**
 * 监听页面大小变更
 */
export function useResize (callback) {
  Taro.useResize(callback)
}

/**
 * 监听用户点击页面内转发按钮（button 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容
 */
export function useShareAppMessage (callback) {
  Taro.useShareAppMessage(callback)
}

export function useTabItemTap (callback) {
  Taro.useTabItemTap(callback)
}

/**
 * 获取页面传入路由相关参数
 */
export function useRouter (callback) {
  callback && callback(Taro.useRouter())
}

export function useEffect (callback, array) {
  Taro.useEffect(callback, array)
}

export function useLayoutEffect (callback, array) {
  Taro.useLayoutEffect(callback, array)
}

export function useCallback (callback, array) {
  Taro.useCallback(callback, array)
}

export function useMemo (callback, array) {
  Taro.useMemo(callback, array)
}

export function useMount (callback) {
  Taro.useEffect(callback, [])
}
export function useUnmount (callback) {
  Taro.useEffect(() => {
    return callback
  }, [])
}
export function useState (initState) {
  const [state, setState] = Taro.useState(initState)

  const setComboState = newState => {
    if (isObject(newState)) {
      setState(prevState => {
        return { ...prevState, ...newState }
      })
    } else {
      setState(newState)
    }
  }
  return [state, setComboState]
}

export function useEventEnhancement (initPageState, state, setState) {
  const [loading, setLoading] = useState({})
  const [error, setError] = useState(null)
  const pageEvents = {}
  // 1. 对包含异步的方法做一层封装，获得loading和error状态值
  if (initPageState.effects) {
    const asyncEvents = initPageState.effects
    for (const eventName in asyncEvents) {
      const event = asyncEvents[eventName]
      if (isFunction(event)) {
        pageEvents[eventName] = async function (...args) {
          try {
            setLoading({
              [eventName]: true,
            })
            if (error) {
              console.log('reset error')
              setError(null)
            }
            await event.call(this, ...args)
          } catch (err) {
            hideNavigationBarLoading()
            hideLoading()
            // 请求异常在request那里有打印，这里打印非请求异常，比如代码语法错误等
            if (!isBoolean(err.success)) {
              console.log('err', err)
            }
            const title = err.code
              ? err.msg ||
                err.error ||
                err.message ||
                '服务器开了小差请稍后重试'
              : '攻城狮开了小差请稍后重试'
            if (err.proxy) {
              showToast({
                title,
              })
            } else {
              setError(err)
            }
          }
          setLoading({
            [eventName]: false,
          })
        }
      }
    }
  }
  if (initPageState.reducers) {
    const events = initPageState.reducers
    for (const eventName in events) {
      const event = events[eventName]
      if (isFunction(event)) {
        pageEvents[eventName] = event
      }
    }
  }

  initPageState._instance = Object.assign(initPageState._instance, {
    state,
    setState,
    loading,
    ...pageEvents,
  })

  // 2. 将所有方法加入到this环境中，这样就可以直接调用其他方法
  for (const propName in pageEvents) {
    const handler = pageEvents[propName]
    if (isFunction(handler)) {
      pageEvents[propName] = function (...args) {
        // 此处可以收集formId，以及点击事件
        return handler.call(initPageState._instance, ...args)
      }
    }
  }
  return [pageEvents, loading, error]
}

/**
 * 此方法提供了页面所需的数据
 * state: view层数据
 * events: 页面事件
 * loading: 包含所有异步方法的loading状态，e.g. 获取test方法的执行状态, loading.test
 * error: 页面错误
 */

export function usePage (initPageState = {}) {
  if (!initPageState._instance) initPageState._instance = {}
  const [state, setState] = useState(initPageState.state || {})

  // 缓存路由信息
  useRouter(params => {
    initPageState._instance.location = params
  })

  // 添加一个实例，卸载的时候清理掉，原因是避免this被清掉
  useEffect(() => {
    return () => {
      initPageState._instance = null
    }
  }, [initPageState._instance])
  // 可在此重写setState，来支持a.b.c修改
  // 此处应该深拷贝一份state, 避免直接操作state

  const [events, loading, error] = useEventEnhancement(
    initPageState,
    state,
    setState
  )
  return [state, events, loading, error]
}
