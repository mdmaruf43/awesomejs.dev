import { getCurrentInstance, computed } from '@vue/composition-api'

export const STORE_ROUTE_BEFORE_REDIRECT = 'dev.awesomejs.route.before-redirect'

export function useRouter () {
  return getCurrentInstance().$router
}

export function useRoute () {
  const vm = getCurrentInstance()
  return computed(() => vm.$route)
}

export function getNamedParents (routes, matched) {
  let parent = null
  const parents = []
  const parentPath = []
  for (const record of matched) {
    let path = record.path
    if (!path) {
      path = '/'
    }
    if (parent) {
      parentPath.push(parent.path)
    }
    if (parentPath.length) {
      path = path.substr(parentPath.join('/').length + 1)
    }
    let next = routes.find(r => r.path === path)
    if (next.path) {
      parent = next
      routes = next.children
      if (!next.name && next.children) {
        next = next.children.find(r => !r.path)
      }
      parents.push(next)
    } else {
      break
    }
  }
  return parents.slice(0, parents.length - 1)
}

export function computeDepthWeight (route) {
  return route.matched.reduce((total, m) => {
    if (typeof m.meta.depthWeight === 'number') {
      total += m.meta.depthWeight
    } else {
      total++
    }
    return total
  }, 0)
}
