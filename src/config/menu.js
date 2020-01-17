export const defaultMenu = [
    {
        name: "building",
        title: "首页",
        icon: "md-home",
    },
    {
        name: "rooms",
        title: "房屋管理",
        icon: "md-grid",
    },
    {
        name: "contract",
        title: "租约管理",
        icon: "ios-person-outline",
        children:[
            {name:"contractAdd",title:"新增租约"},
            {name:"contractUpdate",title:"修改租约"},
            // {name:"contractPrint",title:"打印租约"},
        ]
    },
    {
        name: "bill",
        title: "账单管理",
        icon: "md-list",
        children:[
            {name:"addBill",title:"录入账单"},
            {name:"billList",title:"租金账单"},
            {name:"bill",title:"账单明细表"},
        ]
    },
    {
        name: "account",
        title: "修改资料",
        icon: "ios-people",
        children:[
            {name:"landlord",title:"修改房东"},
            {name:"houseman",title:"修改房管"},
            {name:"tenant",title:"修改租客"},
        ]
    },
   
]
