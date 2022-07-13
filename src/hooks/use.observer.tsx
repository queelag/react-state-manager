import React, { Fragment, ReactElement, ReactNode, useEffect } from 'react'
import { WatcherType } from '../definitions/enums'
import { WatcherDisposer } from '../definitions/types'
import { watch } from '../modules/watch'
import { useDispatch } from './use.dispatch'

export function useObserver(fn: () => ReactNode, targets: object[]): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    let disposers: WatcherDisposer[]

    disposers = targets.map((v: object) => watch(WatcherType.DISPATCH, dispatch, v))
    // if (disposers.length <= 0) return

    return () => disposers.forEach((v: WatcherDisposer) => v())
  }, [])

  return <Fragment>{fn()}</Fragment>
}
