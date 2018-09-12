import {
    errNo
} from '@components/request'
import {
    errDes
} from '@components/request'
import {
    content
} from '@components/request'

import tools from "@components/tools";
import Mock from 'mockjs'

var Random = Mock.Random

var json = {};
json[errNo] = '0'
json[errDes] = ''
json[content] = ''

const dataMap = {
    tableData1: [{
            date: "2016-05-02",
            name: "王小虎1",
            address: "上海市普陀区金沙江路 1518 弄"
        },
        {
            date: "2016-05-04",
            name: "王小虎2",
            address: "上海市普陀区金沙江路 1517 弄"
        },
        {
            date: "2016-05-01",
            name: "王小虎3",
            address: "上海市普陀区金沙江路 1519 弄"
        },
        {
            date: "2016-05-03",
            name: "王小虎4",
            address: "上海市普陀区金沙江路 1516 弄"
        }, {
            date: "2016-05-02",
            name: "王小虎5",
            address: "上海市普陀区金沙江路 1518 弄"
        },
        {
            date: "2016-05-04",
            name: "王小虎6",
            address: "北京市 1517 弄"
        },
        {
            date: "2016-05-01",
            name: "王小虎7",
            address: "北京市 1519 弄"
        },
        {
            date: "2016-05-03",
            name: "王小虎8",
            address: "北京市 1516 弄"
        }, {
            date: "2016-05-02",
            name: "王小虎9",
            address: "北京市 1518 弄"
        },
        {
            date: "2016-05-04",
            name: "王小虎10",
            address: "上海市普陀区金沙江路 1517 弄"
        },
        {
            date: "2016-05-01",
            name: "王小虎11",
            address: "上海市普陀区金沙江路 1519 弄"
        },
        {
            date: "2016-05-03",
            name: "王小虎12",
            address: "上海市普陀区金沙江路 1516 弄"
        }
    ]
}

export default {
    gridDemo1: config => {

        var jsonObj = tools.deepClone(json);
        jsonObj[content] = dataMap.tableData1;

        return jsonObj
    }
}