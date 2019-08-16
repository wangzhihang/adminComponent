import { forEach } from './tools.js'

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
let str = ''
let arr = ''
export const getMenuByRouter = (list) => {
    // str = localStorage.getItem('auth_info') // 登录成功后，后台传入的该用户拥有的路由数组
    // arr = JSON.parse(str)
    arr = [
        { "menuId": 902050363686913, "parentId": 0, "menuName": "项目列表", "code": 189, "url": "project", "menuPessionList": [18901], "icon": "md-home", "sequence": 1 },
        {
            "menuId": 902052750245890,
            "parentId": 0,
            "menuName": "物料管理",
            "code": 190,
            "url": "material",
            "menuRoleModels": [
                { "menuId": 902052846714883, "parentId": 902052750245890, "menuName": "领料管理", "code": 191, "url": "picking", "menuPessionList": [19101], "icon": null, "sequence": 2 },
                { "menuId": 902052972544004, "parentId": 902052750245890, "menuName": "物料列表", "code": 192, "url": "list", "menuPessionList": [19201], "icon": null, "sequence": 3 }
            ],
            "menuPessionList": [],
            "icon": "md-menu",
            "sequence": 2
        },
        { "menuId": 902053714935818, "parentId": 0, "menuName": "审核管理", "code": 198, "url": "audit", "menuPessionList": [19801], "icon": "md-contact", "sequence": 3 },
        { "menuId": 902053828182027, "parentId": 0, "menuName": "操作日志", "code": 199, "url": "operate", "menuPessionList": [19901], "icon": "md-build", "sequence": 4 },
        { "menuId": 902053127733253, "parentId": 0, "menuName": "送检管理", "code": 193, "url": "inspection", "menuPessionList": [19301], "icon": "md-checkbox", "sequence": 5 },
        {
            "menuId": 902053261950982,
            "parentId": 0,
            "menuName": "设备信息管理",
            "code": 194,
            "url": "equipment",
            "menuRoleModels": [
                { "menuId": 902053341642759, "parentId": 902053261950982, "menuName": "设备管理", "code": 195, "url": "index", "menuPessionList": [19501], "icon": null, "sequence": 2 },
                { "menuId": 902053475860488, "parentId": 902053261950982, "menuName": "培养环境信息", "code": 196, "url": "science", "menuPessionList": [19601], "icon": null, "sequence": 3 },
                { "menuId": 902053572329481, "parentId": 902053261950982, "menuName": "条形码管理", "code": 197, "url": "code", "menuPessionList": [19701], "icon": null, "sequence": 4 }
            ],
            "menuPessionList": [],
            "icon": "md-menu",
            "sequence": 6
        },
        { "menuId": 902053987565580, "parentId": 0, "menuName": "细胞计数管理", "code": 200, "url": "cellCount", "menuPessionList": [20001], "icon": "md-create", "sequence": 7 },
        { "menuId": 908230414368769, "parentId": 0, "menuName": "环境确认", "code": 205, "url": "environment", "menuPessionList": [20501], "icon": "md-medical", "sequence": 8 }
    ]
    if (arr == null) return false;
    let res = []
    forEach(list, item => {
            let listItem = item;
            forEach(arr, item => {
                if (listItem.name == item.url) {
                    res.push(listItem)
                }
            })

        })
        // console.log(res)
    return res
}