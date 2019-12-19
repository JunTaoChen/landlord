import vTable from "@/components/vTable.vue";
import searchCard from "@/components/searchCard.vue";
import util from "@/util";
export default {
    components: { vTable, searchCard },
    data() {
        return {
            curPage: 1,
            pageSize: 10,
            total: 0,
            data: [],
            url: "",
            searchData: {},
            queryTerms: {},
            tableLoaing: false,
            tempData: null
        }
    },
    methods: {
        beforeDataChange(data) {
            return data;
        },
        changePage(page) {
            this.curPage = page;
            this.tableLoaing = true;
            util
                .ajax(this.url, {
                    params: Object.assign({ pageSize: this.pageSize, pageNumber: page }, this.queryTerms),
                    loading: false,
                })
                .then(({ code, data }) => {
                    this.tableLoaing = false;
                    if (code === 0) {
                        if (data instanceof Array) {
                            this.data = this.beforeDataChange(data);
                        } else {
                            this.total = data.total;
                            this.data = this.beforeDataChange(data.records);
                        }

                        // this.total = data.total;
                    }
                }, () => {
                    this.tableLoaing = false;
                });
        },
        // changePageSize(pageSize) {
        //     this.pageSize = pageSize;
        //     this.changePage(1);
        // },
        search() {
            this.queryTerms = this.searchData;
            this.changePage(1);
        },
        reset() {
            let value;
            for (let i in this.searchData) {
                value = this.searchData[i]
                if (typeof value == 'object') {
                    for (let j in value) {
                        value[j] = "";
                    }
                } else {
                    this.searchData[i] = "";
                }

            }
            // this.data = [];
            this.queryTerms = {};
            this.changePage(1);
        },
    }
}