import React from 'react'

type HostProps = React.PropsWithChildren<Record<string, unknown>>

function createHostComponent(tagName: string, displayName: string) {
  const Component = React.forwardRef<unknown, HostProps>(({ children, testID, ...props }, ref) => {
    const domProps = {
      ...props,
      ref,
      ...(typeof testID === 'string' ? { 'data-testid': testID } : {}),
    }

    return React.createElement(tagName, domProps, children)
  })

  Component.displayName = displayName

  return Component
}

export const View = createHostComponent('div', 'View')
export const Text = createHostComponent('span', 'Text')
export const Pressable = createHostComponent('button', 'Pressable')
export const ScrollView = createHostComponent('div', 'ScrollView')
export const SafeAreaView = createHostComponent('main', 'SafeAreaView')
export const TextInput = createHostComponent('input', 'TextInput')
export const Image = createHostComponent('img', 'Image')

export const StyleSheet = {
  create<T>(styles: T) {
    return styles
  },
  flatten<T>(styles: T) {
    return styles
  },
}

export const Platform = {
  OS: 'ios',
  select<T>(options: { ios?: T; android?: T; default?: T }) {
    return options.ios ?? options.default ?? options.android
  },
}

export function useWindowDimensions() {
  return {
    width: 390,
    height: 844,
    scale: 3,
    fontScale: 1,
  }
}
