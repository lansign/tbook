# 51tbook——Technology book

## 服务器启动
1. git clone https://github.com/lansign/tbook
2. cd tbook & npm install(如果未安装nodejs，请先下载安装：mac:`brew install node`，linux:`apt-get install nodejs`，window请自行搜索教程)
3. 安装mongodb，mac:`brew install mongodb`，linux:`apt-get install mongodb`，window请自行搜索教程
4. 运行：`node server` 

## tbook增删改示例
1. 新增
```shell
curl -XPOST -H "Content-Type:application/graphql" -d 'mutation {save(title:"Read two book", content:"test"){id, title}}' http://localhost:3000
```
2. 删除
```shell
-XPOST -H "Content-Type:application/graphql"  -d 'mutation {delete(id:"574be8c38db6bad4ca0cbbb0"){id, title}}' http://localhost:3000
```
3. 查询
```shell
curl -XPOST -H "Content-Type:application/graphql" -d 'query { books { id,title } }' http://localhost:3000
```
