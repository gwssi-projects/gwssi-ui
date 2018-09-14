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


        //用 Random. 一下就能看到能模拟数据方法

        tableDataTemplate[tmpPageSize] = [{
            //随机的中文标题
            'name': '@ctitle(5, 15)' + name,
            //随机的描述
            'address': '@cparagraph(2, 5)' + address,
            //随机的时间
            'date': '@date("yyyy-MM-dd")',
            //随机省份
            'province': '@province',
            //随机市
            'city': '@city',
            //邮编
            'zip': '@zip',
            //中文名
            'canme': '@cname()',
            //邮箱
            'email': '@email',
            //图片
            'image': "@dataImage('30x30')",
            //随机数
            'amount1': '@integer(1,100)',
            'amount2': '@integer(1,100)',
            'amount3': '@integer(1,100)',
            'id' : '@id()'
        }];


        var mockData = Mock.mock(tableDataTemplate);

        var jsonObj = tools.deepClone(json);
        jsonObj[contentTotal] = total;
        jsonObj[content] = mockData.list;

        return jsonObj
    }
}