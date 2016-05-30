# 51tbook——Technology book

## 服务器启动
1. git clone https://github.com/lansign/tbook
2. 安装nodejs
  * mac下安装命令：
  ```shell
  brew install node
  ```
  * linux下安装命令：
  ```shell
  apt-get install nodejs
  ```
  * window请自行搜索教程
3. 安装工程依赖
  ```shell
  cd tbook & npm install
  ```
4. 安装mongodb  
  * mac下安装命令：
  ```shell
  brew install mongodb
  ```
  * linux下安装命令：
  ```shell
  apt-get install mongodb
  ```
  * window请自行搜索教程
5. 创建mongodb文件夹
  ```shell
  mkdir -p /data/db
  ```
6. 运行：`node server` 

## tbook增删改示例
1 新增
```shell
curl -XPOST -H "Content-Type:application/graphql" -d 'mutation {save(title:"Read two book", content:"test"){id, title}}' http://localhost:3000
```
2 删除
```shell
-XPOST -H "Content-Type:application/graphql"  -d 'mutation {delete(id:"574be8c38db6bad4ca0cbbb0"){id, title}}' http://localhost:3000
```
3 查询
```shell
curl -XPOST -H "Content-Type:application/graphql" -d 'query { books { id,title } }' http://localhost:3000
```
