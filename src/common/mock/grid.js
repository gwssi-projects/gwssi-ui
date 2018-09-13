import {
    errNo
} from '@components/request'
import {
    errDes
} from '@components/request'
import {
    content
} from '@components/request'

import {
    contentTotal
} from '@components/grid'

import tools from "@components/tools";
import Mock from 'mockjs'

var Random = Mock.Random

var json = {};
json[errNo] = '0'
json[errDes] = ''
json[content] = ''



export default {
    gridDemo1: config => {

        console.log("url = " + config.url);
        console.log("type = " + config.type);
        console.log("body = " + config.body);


        var obj = tools.param2Obj(config.url);

        var name = obj.name;
        var address = obj.address;
        var pageSize = obj.pageSize;
        var currentPage = obj.currentPage;

        var total = 226;
        var tmpPageSize = 'list|' + pageSize;
        var tableDataTemplate = {}

        //判断是否是最后一页
        if (parseInt(total / pageSize - 0) == (currentPage - 1)) {
            tmpPageSize = 'list|' + (total - pageSize * (currentPage - 1));
        }

        tableDataTemplate[tmpPageSize] = [{
            //随机的中文标题
            'name': '@ctitle(5, 15)' + name,
            //随机的描述
            'address': '@cparagraph(2, 5)' + address,
            //随机的时间
            'date': Random.now('yyyy-MM-dd')
        }];


        var mockData = Mock.mock(tableDataTemplate);

        var jsonObj = tools.deepClone(json);
        jsonObj[contentTotal] = total;
        jsonObj[content] = mockData.list;

        return jsonObj
    }
}