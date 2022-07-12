import { Administration } from './administration'

type MapClear = () => void
type MapDelete<K> = (key: K) => boolean
type MapSet<K, V> = (key: K, value: V) => Map<K, V>

export class ObservableMap {
  static make<T extends object, K, V>(root: T, map: Map<K, V>): Map<K, V> {
    let _clear: MapClear, _delete: MapDelete<K>, _set: MapSet<K, V>

    _clear = map.clear
    _delete = map.delete
    _set = map.set

    map.clear = () => {
      _clear()
      Administration.onChange(root)
    }
    map.delete = (key: K) => {
      let deleted: boolean

      deleted = _delete(key)
      if (!deleted) return false

      Administration.onChange(root)

      return true
    }
    map.set = (key: K, value: V) => {
      let map: Map<K, V>

      map = _set(key, value)
      Administration.onChange(root)

      return map
    }

    return map
  }
}
