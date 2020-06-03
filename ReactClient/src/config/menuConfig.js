/**
 * 右侧分类的数据
 */

const menuList = [
    {
        title:"首页",   // 菜单标题名称
        path:"/home",   // 对应的路劲
        icon:"home",    // 图标名称
        isPublic: true  // 公开的
    },{
        title:"商品",
        path:"/products",
        icon:"appstore",
        children: [
            {
                title:"品类管理",
                path:"/category",
                icon:"bars"
            },{
                title:"商品管理",
                path:"/product",
                icon:"tool"
            },
        ]
    },{
        title:"用户管理",
        path:"/user",
        icon:"user",
    },{
        title:"角色管理",
        path:"/role",
        icon:"safety"
    },{
        title:"图形图表",
        path:"/charts",
        icon:"area-chart",
        children: [
            {
                title:"柱形图",
                path:"/charts/bar",
                icon:"bar-chart"
            },{
                title:"折线图",
                path:"/charts/line",
                icon:"line-chart"
            },{
                title:"饼状图",
                path:"/charts/pie",
                icon:"pie-chart"
            }
        ]
    }
]

export default menuList
