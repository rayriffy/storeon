import { PreactContext, AnyComponent, FunctionalComponent } from 'preact'

import { StoreonStore, StoreonDispatch } from '..'

declare namespace useStoreon {
  export type StoreData<State extends object = {}, EventsMap = any> = {
    dispatch: StoreonDispatch<EventsMap>
  } & State
}

/**
 * Hook to use Storeon in functional React component.
 *
 * ```js
 * import useStoreon from 'storeon/preact'
 * const Counter = () => {
 *   const { dispatch, count } = useStoreon('count')
 *   return <div>
 *     {count}
 *     <button onClick={() => dispatch('inc')}
 *   </div>
 * }
 * ```
 *
 * @param keys List of state’s field.
 * @returns The selected part of the state.
 */
export function useStoreon<State extends object = {}, EventsMap = any>(
  ...keys: (keyof State)[]
): useStoreon.StoreData<State, EventsMap>

/**
 * Context to put store for `connect` decorator.
 *
 * ```js
 * import { StoreContext } from 'storeon/preact'
 * render(
 *   <StoreContext.Provider value={store}><App /></StoreContext.Provider>,
 *   document.body
 * )
 * ```
 */
export const StoreContext: PreactContext<StoreonStore>

declare namespace connectStoreon {
  export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
  export type ConnectedComponent<ComponentProps> = FunctionalComponent<
    Partial<Omit<ComponentProps, "dispatch">>
  >
}
/**
 * Connect Preact components to the store.
 *
 * ```js
 * import connect from 'storeon/preact/connect'
 * const Counter = ({ count, dispatch }) => {
 *   return <div>
 *     {count}
 *     <button onClick={() => dispatch('inc')}
 *   </div>
 * }
 * export default connect('count', Counter)
 * ```
 *
 * @returns Wrapped component.
 */
export function connectStoreon<ComponentProps>(
  ...keysOrComponent: Array<PropertyKey | AnyComponent<ComponentProps>>
): connectStoreon.ConnectedComponent<ComponentProps>
