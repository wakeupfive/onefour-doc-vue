import { EmitsOptions, h, SetupContext } from "@vue/runtime-core"
import { useRouter } from "vue-router"

/** @type {*} */
export const MENU_DOC = import.meta.glob("../../../doc/**/*")

/**
 * @description 转换 doc 路径
 * @param {string[][]} list
 * @return {*} 
 */
const useCreateDoc = (list: string[][]) => {
  return list.reduce((obj, item) => {
    item.reduce((o: any, name: string) => {
      let item = o.find((ci: any): boolean => ci.name === name)
      if (!item) {
        item = {
          name: name,
          children: [],
        };
        o.push(item);
      }
      return item.children;
    }, obj)
    return obj
  }, [])
}

/**
 * @description 读取 doc 路径
 * @return {*} 
 */
const useDocAnalyze = () => {
  let list = Object.keys(MENU_DOC).map((item) => {
    let current = item.replace(/\.\.\/doc\//, "").split("/");
    return current.slice(2, current.length);
  })
  
  let allDocPath = useCreateDoc(list)
  return allDocPath
}

/**
 * @description 生成 doc menu 节点
 * @param {*} list
 * @param {*} [l=[]]
 * @return {*} 
 */
const createMenuElement = (ctx: SetupContext<EmitsOptions>, list: any = useDocAnalyze(), l: any = []) => {
  const router = useRouter()
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    l.push(
      h("section", {
        class: ["sidebar-ul"]
      }, [
        h("div", { 
          class: ["sidebar-li"],
          onClick: () => {
            const keys = Object.keys(MENU_DOC)
            const values = Object.values(MENU_DOC)
            let keyIndex = keys.findIndex((name) => name.includes(item.name))
            ctx.emit('setDocCurrent', values[keyIndex])
          }
        }, item.name),
      ])
    );
    if (item.children.length) {
      createMenuElement(ctx, item.children, l[l.length - 1].children);
    }
  }
  return l;
};


export const UseDocMenu = {
  emits: ['setDocCurrent'],
  setup(props: {}, ctx: SetupContext<EmitsOptions>) {
    return () => createMenuElement(ctx)
  }
}