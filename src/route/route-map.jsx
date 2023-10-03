import route from "./index.jsx";

const map = {};

function mapRoute(list = [], parent = '') {
  list.forEach(it => {
    if (it.path !== undefined) {
      const key = parent !== '' ? `${parent}/${it.path}` : `${it.path}`
      map[key] = {
        layout: it?.layout === undefined ? true : it?.layout,
        verify: it?.verify === undefined ? true : it.verify
      }
      mapRoute(it.children, key);
    }
  })
  return map;
}

export const routeMap = mapRoute(route);
