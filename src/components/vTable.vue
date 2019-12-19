<template>
  <div>
       <Row class="table-con">
            <Table v-bind="table" :columns="columns"  v-on="tableMethod" ></Table>
        </Row>
        <Row class="pagination-con" v-if="showPage">
            <Page :page-size="pageSize" :total="total" @on-change="changePage" show-elevator show-sizer @on-page-size-change="changePageSize" show-total :current.sync="curPage"></Page>
        </Row>
      
  </div>
</template>

<script>
    // import {Table} from "iview";
    export default{
        data(){
            return {
                curPage:1,
                columns:[]
            }
        },
        // mixins: [Table],
        props:{
            table:{},
            tableMethod:{},
            pageSize:{
               default: 10
            },
            total:{},
            current:{
                default:0,
            },
            showPage:{
                default:false,
            }
        },
        methods:{
            changePage(page){
                this.$emit("change-page",page);
            },
            changePageSize(size){
                this.$emit('update:pageSize', size);
                this.$emit("change-page",1);
            },
            _changeColumns(){
                if(!this.$slots.default){
                    this.columns = [];
                    return;
                }
                let columns = [];
                //获取输入的插槽 并重新处理成iview需要的columns
                this.$slots.default.map(item=>{
                    //过滤一下空节点
                    if(item.tag){
                        let defaultData = {key:item.data.key,className:item.data.staticClass};
                        //处理插槽或者子节点
                        if(item.data.scopedSlots || item.children){
                            defaultData.render = (h,params)=>{
                                let cell = [];
                                if(item.children){
                                    cell = [...item.children];
                                }
                               if(item.data.scopedSlots){
                                   cell.push(item.data.scopedSlots.default(params.row));
                               } 
                                return cell.length==1?cell[0]:h("div",cell);
                            }
                        }
                        columns.push({...defaultData,...item.data.attrs,...item.data.on});
                    }
                })
                this.columns = columns;
            }
        },
        watch:{
            curPage(val){
                this.$emit('update:current', val);
            },
            current(val){
                this.curPage = val;
            }
        },
        mounted(){
            this._changeColumns();
        }
    }
</script>