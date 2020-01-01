export const defaultMenu = [
    {
        name: "building",
        title: "首页",
        icon: "md-grid",
    },
    {
        name: "contract",
        title: "合同管理",
        icon: "ios-person-outline",
        children:[
            {name:"contractAdd",title:"新增合同"},
            {name:"contractUpdate",title:"修改合同"},
            {name:"contractPrint",title:"打印合同"},
        ]
    },
    {
        name: "bill",
        title: "账单管理",
        icon: "md-list",
        children:[
            {name:"addBill",title:"录入账单"},
            {name:"billList",title:"账单列表"},
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
