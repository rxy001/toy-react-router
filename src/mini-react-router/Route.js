import React, { useEffect, useState, useContext } from 'react'
import { RouterContext } from './Router'
import pathToRegexp from 'path-to-regexp'
import FixedContainer from './FixedContainer'

export default function Route(props) {
  const { path, component, mode = 'web' } = props
  const context = useContext(RouterContext)
  const match = path ? matchPath(context.location.pathname, props) : context.match
  const componentProps = {
    ...context,
    match,
  }
  if (mode === 'mobile') {
    // let isMount = context.history.historyStack.find((v) => v.pathname === path)
    // return isMount || match ? React.createElement(FixedContainer(React.createElement(component, componentProps), match)) : null
  } else {
    return match ? React.createElement(component, componentProps) : null
  }
}

const matchPath = (pathname, options = {}) => {
  if (typeof options === "string" || Array.isArray(options)) {
    options = { path: options };
  }
  const { path, exact: end = false, strict = false } = options
  const paths = [].concat(path)
  return paths.reduce((matched, path) => {
    if (!path) return null
    if (matched) return matched
    const { regexp, keys } = compilePath(path, {
      end, strict
    })
    const match = regexp.exec(pathname)
    if (!match) return null;
    const [url, ...values] = match
    return {
      path,
      url: path === '/' && url === "" ? '/' : url,
      isExact: pathname === url,
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {})
    }
  }, null)
}


const cache = {}
const compilePath = (path, options) => {
  const cacheKey = `${options.end}${options.strict}`
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {})

  if (pathCache[path]) return pathCache[path]
  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  const result = { regexp, keys }

  return pathCache[path] = result
}