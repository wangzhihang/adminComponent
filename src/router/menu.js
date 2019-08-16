import Main from '@/components/main/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
        path: '/project',
        name: 'project',
        meta: {
            hideInMenu: true,
            title: '项目管理',
            icon: 'md-home'
        },
        redirect: '/project/index',
        component: Main,
        children: [{
                path: 'projectIndex',
                name: 'projectIndex',
                meta: {
                    hideInMenu: true,
                    title: '项目列表',
                    icon: 'md-home'
                },
                component: () =>
                    import ('@/views/single/list')
            },
            {
                path: 'detail/:id',
                name: 'projectDetail',
                meta: {
                    hideInMenu: true,
                    title: '项目详情',
                    icon: 'md-home'
                }
            }
        ]
    },
    {
        path: '/material',
        name: 'material',
        meta: {
            hideInMenu: true,
            icon: 'md-menu',
            title: '物料管理'
        },
        component: Main,
        children: [{
                path: 'pick',
                name: 'pick',
                meta: {
                    hideInMenu: true,
                    icon: 'md-funnel',
                    title: '领料管理'
                },
                // component: parentView,
                children: [{
                    path: 'addpick',
                    name: 'addpick',
                    meta: {
                        hideInMenu: true,
                        icon: 'md-funnel',
                        title: '领料信息'

                    }
                }]
            },
            {
                path: 'picking',
                name: 'picking',
                meta: {
                    hideInMenu: true,
                    icon: 'md-funnel',
                    title: '领料管理'
                }
            },
            {
                path: 'list',
                name: 'list',
                meta: {
                    hideInMenu: true,
                    icon: 'md-funnel',
                    title: '物料列表'
                }
            }

        ]
    },
    {
        path: '/inspection',
        name: 'inspection',
        redirect: '/inspection',
        component: Main,
        children: [{
            path: '/inspection',
            name: 'inspection',
            meta: {
                hideInMenu: true,
                title: '送检管理',
                notCache: true,
                icon: 'md-checkbox'
            },
            component: () =>
                import ('@/views/single/table')
        }]
    },
    {
        path: '/environment',
        name: 'environment',
        redirect: '/environment',
        component: Main,
        children: [{
            path: 'environment',
            name: 'environment',
            meta: {
                hideInMenu: true,
                title: '环境确认',
                notCache: true,
                icon: 'md-medical'
            }
        }]
    },
    {
        path: '/equipment',
        name: 'equipment',
        meta: {
            hideInMenu: true,
            icon: 'md-menu',
            title: '设备信息管理'
        },
        component: Main,
        children: [{
                path: 'index',
                name: 'index',
                meta: {
                    hideInMenu: true,
                    icon: 'md-funnel',
                    title: '设备管理'
                }
            },
            {
                path: 'science',
                name: 'science',
                meta: {
                    hideInMenu: true,
                    icon: 'md-funnel',
                    title: '培养环境信息'
                }
            },
            {
                path: 'code',
                name: 'code',
                meta: {
                    hideInMenu: true,
                    icon: 'md-funnel',
                    title: '条形码管理'
                }
            }
        ]
    },
    {
        path: '/audit',
        name: 'audit',
        redirect: '/audit',
        component: Main,
        children: [{
            path: 'audit',
            name: 'audit',
            meta: {
                hideInMenu: true,
                title: '审核管理',
                notCache: true,
                icon: 'md-contact'
            }
        }]
    },
    {
        path: '/operate',
        name: 'operate',
        redirect: '/operate',
        component: Main,
        children: [{
            path: 'operate',
            name: 'operate',
            meta: {
                hideInMenu: true,
                title: '操作日志',
                notCache: true,
                icon: 'md-build'
            }
        }]
    },
    {
        path: '/cellCount',
        name: 'cellCount',
        redirect: '/cellCount',
        component: Main,
        children: [{
            path: 'cellCount',
            name: 'cellCount',
            meta: {
                hideInMenu: true,
                title: '细胞计数管理',
                notCache: true,
                icon: 'md-create'
            }
        }]
    }
]